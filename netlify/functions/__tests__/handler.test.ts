import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  HandlerEvent,
  HandlerContext,
  HandlerResponse,
} from '@netlify/functions';

vi.mock('@sanity/client', () => ({
  createClient: () => ({
    assets: {
      upload: vi.fn().mockResolvedValue({ _id: 'image-abc-123' }),
    },
    create: vi.fn().mockResolvedValue({
      _id: 'recipe-xyz',
      slug: { current: 'test-recipe' },
    }),
  }),
}));

vi.mock('dotenv', () => ({ default: { config: vi.fn() } }));

import { handler, getNetlifyUser } from '../create-recipe';

function makeEvent(overrides: Partial<HandlerEvent> = {}): HandlerEvent {
  return {
    httpMethod: 'POST',
    body: JSON.stringify({
      title: 'Test Recipe',
      featured: false,
      ingredients: [{ name: 'Salt' }],
      instructions: 'Step one\nStep two',
    }),
    headers: {},
    multiValueHeaders: {},
    isBase64Encoded: false,
    path: '/.netlify/functions/create-recipe',
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    rawUrl: 'http://localhost/.netlify/functions/create-recipe',
    rawQuery: '',
    ...overrides,
  };
}

function makeContext(
  user: Record<string, unknown> | null = { email: 'a@b.c' },
): HandlerContext {
  const base: HandlerContext = {
    callbackWaitsForEmptyEventLoop: true,
    functionName: 'create-recipe',
    functionVersion: '1',
    invokedFunctionArn: '',
    memoryLimitInMB: '128',
    awsRequestId: 'test',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: () => 5000,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  };
  if (!user) return base;

  const encoded = Buffer.from(JSON.stringify({ user })).toString('base64');
  return {
    ...base,
    clientContext: { custom: { netlify: encoded } },
  };
}

async function callHandler(
  event: HandlerEvent,
  context: HandlerContext,
): Promise<HandlerResponse> {
  const res = await handler(event, context);
  if (!res) throw new Error('Handler returned void');
  return res;
}

beforeEach(() => {
  vi.stubEnv('SANITY_PROJECT_ID', 'test-project');
  vi.stubEnv('SANITY_API_TOKEN', 'test-token');
});

describe('handler – HTTP method & auth', () => {
  it('returns 405 for non-POST requests', async () => {
    const res = await callHandler(
      makeEvent({ httpMethod: 'GET' }),
      makeContext(),
    );
    expect(res.statusCode).toBe(405);
  });

  it('returns 401 when no user in context', async () => {
    const res = await callHandler(makeEvent(), makeContext(null));
    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res.body!)).toHaveProperty('error');
  });

  it('returns 200 and a slug on success', async () => {
    const res = await callHandler(makeEvent(), makeContext());
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body!);
    expect(body.slug).toBe('test-recipe');
  });
});

describe('getNetlifyUser', () => {
  it('returns null when no clientContext', () => {
    expect(getNetlifyUser({})).toBeNull();
  });

  it('returns null for invalid base64', () => {
    expect(
      getNetlifyUser({
        clientContext: { custom: { netlify: '%%%invalid%%%' } },
      }),
    ).toBeNull();
  });

  it('decodes a valid user', () => {
    const user = { email: 'chef@kitchen.cz' };
    const encoded = Buffer.from(JSON.stringify({ user })).toString('base64');
    const result = getNetlifyUser({
      clientContext: { custom: { netlify: encoded } },
    });
    expect(result).toEqual(user);
  });

  it('returns null when user key is missing in payload', () => {
    const encoded = Buffer.from(JSON.stringify({ foo: 'bar' })).toString(
      'base64',
    );
    expect(
      getNetlifyUser({
        clientContext: { custom: { netlify: encoded } },
      }),
    ).toBeNull();
  });
});

import { describe, it, expect } from 'vitest';
import { slugify } from '../create-recipe';

describe('slugify', () => {
  it('converts basic text to a slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('strips Czech diacritics', () => {
    expect(slugify('Svíčková na smetaně')).toBe('svickova-na-smetane');
  });

  it('handles háčky and čárky correctly', () => {
    expect(slugify('Řízek s brambůrky')).toBe('rizek-s-bramburky');
    expect(slugify('Žluťoučký kůň')).toBe('zlutoucky-kun');
  });

  it('collapses multiple spaces, hyphens, and underscores', () => {
    expect(slugify('foo   bar--baz__qux')).toBe('foo-bar-baz-qux');
  });

  it('removes special characters', () => {
    expect(slugify('Recept #1: "Nejlepší" guláš!')).toBe(
      'recept-1-nejlepsi-gulas',
    );
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  --hello--  ')).toBe('hello');
  });

  it('handles an empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('handles strings with only special characters', () => {
    expect(slugify('!!!@@@###')).toBe('');
  });
});

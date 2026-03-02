/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vite/client" />

declare module 'netlify-identity-widget' {
  export interface User {
    id: string;
    email?: string;
    app_metadata: Record<string, unknown>;
    user_metadata: Record<string, unknown>;
    jwt(): Promise<string>;
  }

  function init(opts?: Record<string, unknown>): void;
  function open(tab?: 'login' | 'signup'): void;
  function close(): void;
  function logout(): void;
  function refresh(): Promise<void>;
  function currentUser(): User | null;

  function on(event: 'login', cb: (user: User) => void): void;
  function on(event: 'init', cb: (user: User | null) => void): void;
  function on(event: 'logout' | 'open' | 'close', cb: () => void): void;
  function on(event: 'error', cb: (error: Error) => void): void;

  function off(event: 'login', cb: (user: User) => void): void;
  function off(event: 'init', cb: (user: User | null) => void): void;
  function off(event: 'logout' | 'open' | 'close', cb: () => void): void;
  function off(event: 'error', cb: (error: Error) => void): void;

  const netlifyIdentity: {
    init: typeof init;
    open: typeof open;
    close: typeof close;
    logout: typeof logout;
    refresh: typeof refresh;
    currentUser: typeof currentUser;
    on: typeof on;
    off: typeof off;
  };
  export default netlifyIdentity;
}

declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

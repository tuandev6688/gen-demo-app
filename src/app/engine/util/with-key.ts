import { splitPath } from './split-path';

export function withKey(path: string, key: string | number): string {
  const segments = splitPath(path);
  segments[segments.length - 1] = String(key);
  return segments.join('/');
}

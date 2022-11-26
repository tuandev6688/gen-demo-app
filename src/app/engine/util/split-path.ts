export function splitPath(path: string): string[] {
  const segments = path.split('/');

  if (segments.length === 0) {
    throw new Error(`Path cannot be empty.`);
  }

  return segments;
}

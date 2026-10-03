export function formatExternalUrl(url?: string): string {
  if (!url) return '#';
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return '#';
  if (trimmed.startsWith('@')) {
    return `https://www.instagram.com/${trimmed.substring(1)}`;
  }
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

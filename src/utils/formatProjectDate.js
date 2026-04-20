/**
 * Format a repository creation instant for display (GitHub `created_at` is UTC).
 * @param {string | undefined} iso ISO 8601 string (e.g. from GitHub API) or YYYY-MM-DD
 * @returns {string | null}
 */
export function formatRepoCreatedAt(iso) {
  if (!iso || typeof iso !== 'string') return null
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return null
  const datePart = d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const timePart = d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false,
  })
  return `${datePart} · ${timePart} UTC`
}

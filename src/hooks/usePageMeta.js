import { useEffect } from 'react'
import { ORIGIN } from '../../shared/routes.js'

function setMeta(selector, value) {
  const el = document.head.querySelector(selector)
  if (!el || value == null) return
  if (el.tagName === 'LINK') el.setAttribute('href', value)
  else el.setAttribute('content', value)
}

/** Keep the document title and social tags aligned after client-side navigation. */
export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title
    const canonical = path ? `${ORIGIN}${path === '/' ? '/' : path}` : null
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', canonical)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    setMeta('link[rel="canonical"]', canonical)
  }, [title, description, path])
}

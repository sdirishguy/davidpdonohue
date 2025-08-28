'use client'

/**
 * Safely open external links and validate URLs/emails.
 * Use in client components only.
 */
export function openSecureLink(
  href: string,
  opts: {
    target?: '_blank' | '_self'
    allowedProtocols?: string[] // defaults to ['http:', 'https:', 'mailto:', 'tel:']
  } = {},
) {
  if (!href) return

  const allowed = opts.allowedProtocols ?? ['http:', 'https:', 'mailto:', 'tel:']

  // Internal links: prefer normal navigation (no new window)
  if (href.startsWith('/')) {
    window.location.assign(href)
    return
  }

  // Validate/guard protocol
  try {
    // Accept mailto: and tel:
    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      window.location.href = href
      return
    }

    const u = new URL(href)
    if (!allowed.includes(u.protocol)) {
      console.warn('[openSecureLink] Blocked protocol:', u.protocol)
      return
    }
  } catch {
    console.warn('[openSecureLink] Invalid URL:', href)
    return
  }

  // Open with noopener/noreferrer to prevent tabnabbing and referrer leakage
  const target = opts.target ?? '_blank'
  const features = 'noopener,noreferrer'
  const newWin = window.open(href, target, features)
  if (newWin) newWin.opener = null // extra defense
}

/** Basic but strict email validation */
export function validateSecureEmail(email: string): boolean {
  if (!email) return false
  if (email.length < 5 || email.length > 254) return false
  if (/[<>"'&]/.test(email)) return false // avoid dangerous chars in mailto links
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return re.test(email)
}
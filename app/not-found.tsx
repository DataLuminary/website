import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="zh-CN">
      <body style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>404</h1>
        <p>Page not found.</p>
        <Link href="/">Back to home</Link>
      </body>
    </html>
  )
}

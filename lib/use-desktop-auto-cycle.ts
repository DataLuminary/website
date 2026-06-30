'use client'

import { useCallback, useEffect, useState } from 'react'

const DESKTOP_QUERY = '(min-width: 1024px)'

export function useDesktopAutoCycle(length: number, intervalMs = 3000) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || length <= 1) return

    const mq = window.matchMedia(DESKTOP_QUERY)

    const id = window.setInterval(() => {
      if (mq.matches) {
        setIndex((i) => (i + 1) % length)
      }
    }, intervalMs)

    return () => window.clearInterval(id)
  }, [paused, length, intervalMs])

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
  }

  const select = useCallback((i: number) => setIndex(i), [])

  return { index, select, pauseProps }
}

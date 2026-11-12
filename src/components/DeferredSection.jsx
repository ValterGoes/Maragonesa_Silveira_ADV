import { createElement, Suspense, useEffect, useRef, useState } from 'react'

export default function DeferredSection({ Component, id }) {
  const sectionRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(() => {
    if (typeof window === 'undefined') return false

    return (
      !('IntersectionObserver' in window) ||
      (id && window.location.hash === `#${id}`)
    )
  })

  useEffect(() => {
    if (shouldLoad) return

    const section = sectionRef.current
    if (!section) return

    const loadForHash = () => {
      if (id && window.location.hash === `#${id}`) {
        setShouldLoad(true)
      }
    }

    loadForHash()
    window.addEventListener('hashchange', loadForHash)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', loadForHash)
    }
  }, [id, shouldLoad])

  return (
    <div id={id} ref={sectionRef} className="min-h-[60vh]">
      {shouldLoad && (
        <Suspense fallback={<div className="min-h-[25vh]" aria-hidden="true" />}>
          {createElement(Component, { id: null })}
        </Suspense>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import styles from './Horses.module.css'

const tabletSlides = [
  { src: '/images/horse-tablet-1.jpg', name: 'Юджин' },
  { src: '/images/horse-tablet-2.jpg', name: 'Мелиса' },
  { src: '/images/horse-tablet-3.jpg', name: 'Циан' },
]

const desktopSlides = [
  { src: '/images/horse-desktop-5.jpg', name: 'Жазель' },
  { src: '/images/horse-tablet-1.jpg', name: 'Юджин' },
  { src: '/images/horse-tablet-2.jpg', name: 'Мелиса' },
  { src: '/images/horse-tablet-3.jpg', name: 'Циан' },
  { src: '/images/horse-desktop-4.jpg', name: 'Хесана' },
]

const caption =
  'Уроки профессиональной верховой езды для любителей и начинающих'

function relativeIndex(index: number, active: number, length: number) {
  let rel = (index - active + length) % length
  if (rel > Math.floor(length / 2)) rel -= length
  return rel
}

export function Horses() {
  const [index, setIndex] = useState(0)
  const [desktopIndex, setDesktopIndex] = useState(2)
  const [mode, setMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const last = tabletSlides.length - 1

  useEffect(() => {
    const tabletMedia = window.matchMedia('(min-width: 768px)')
    const desktopMedia = window.matchMedia('(min-width: 1280px)')
    const onChange = () => {
      if (desktopMedia.matches) setMode('desktop')
      else if (tabletMedia.matches) setMode('tablet')
      else setMode('mobile')
    }
    onChange()
    tabletMedia.addEventListener('change', onChange)
    desktopMedia.addEventListener('change', onChange)
    return () => {
      tabletMedia.removeEventListener('change', onChange)
      desktopMedia.removeEventListener('change', onChange)
    }
  }, [])

  const step = mode === 'tablet' ? 40 : 86
  const transform =
    index === last
      ? `translateX(calc(-${index * step - (mode === 'tablet' ? 20 : 14)}% - ${mode === 'tablet' ? 24 : 16}px))`
      : `translateX(-${index * step}%)`

  const prevDesktop = () => {
    setDesktopIndex(
      (value) => (value - 1 + desktopSlides.length) % desktopSlides.length,
    )
  }

  const nextDesktop = () => {
    setDesktopIndex((value) => (value + 1) % desktopSlides.length)
  }

  return (
    <section className={styles.horses}>
      <h2 className={styles.title}>Наши лошади</h2>
      <div className={styles.viewport}>
        <div className={styles.row} style={{ transform }}>
          {tabletSlides.map((slide) => (
            <article key={slide.src} className={styles.slide}>
              <div className={styles.card}>
                <img className={styles.photo} src={slide.src} alt="" />
                <h3 className={styles.name}>{slide.name}</h3>
                <span className={styles.line} />
                <p className={styles.text}>{caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={styles.viewportDesktop}>
        <div className={styles.rowDesktop}>
          {desktopSlides.map((slide, slideIndex) => {
            const rel = relativeIndex(
              slideIndex,
              desktopIndex,
              desktopSlides.length,
            )
            const posClass =
              Math.abs(rel) === 2
                ? styles.posOuter
                : Math.abs(rel) === 1
                  ? styles.posMid
                  : styles.posCenter
            return (
              <article
                key={slide.name}
                className={`${styles.slideDesktop} ${posClass}`}
                style={{ order: rel + 2 }}
              >
                <div className={styles.card}>
                  <img className={styles.photo} src={slide.src} alt="" />
                  <h3 className={styles.name}>{slide.name}</h3>
                  <span className={styles.line} />
                  <p className={styles.text}>{caption}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.arrow}
          type="button"
          aria-label="Назад"
          disabled={mode !== 'desktop' && index === 0}
          onClick={() => {
            if (mode === 'desktop') prevDesktop()
            else setIndex((value) => value - 1)
          }}
        >
          <img src="/images/arrow-left.svg" alt="" />
        </button>
        <div className={styles.track}>
          <span
            className={styles.thumb}
            style={{ transform: `translate(${index * 32}px, -50%)` }}
          />
        </div>
        <div className={styles.dots} aria-hidden="true">
          {desktopSlides.map((slide, slideIndex) => (
            <button
              key={slide.name}
              type="button"
              className={
                slideIndex === desktopIndex ? styles.dotActive : styles.dot
              }
              aria-label={slide.name}
              onClick={() => setDesktopIndex(slideIndex)}
            />
          ))}
        </div>
        <button
          className={styles.arrow}
          type="button"
          aria-label="Вперёд"
          disabled={mode !== 'desktop' && index === last}
          onClick={() => {
            if (mode === 'desktop') nextDesktop()
            else setIndex((value) => value + 1)
          }}
        >
          <img className={styles.arrowNext} src="/images/arrow-left.svg" alt="" />
        </button>
      </div>
    </section>
  )
}

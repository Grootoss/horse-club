import { useState } from 'react'
import styles from './Horses.module.css'

const slides = [
  { src: '/images/horse-tablet-1.jpg', name: 'Юджин' },
  { src: '/images/horse-tablet-2.jpg', name: 'Мелиса' },
  { src: '/images/horse-tablet-3.jpg', name: 'Циан' },
]

const caption =
  'Уроки профессиональной верховой езды для любителей и начинающих'

export function Horses() {
  const [index, setIndex] = useState(0)
  const last = slides.length - 1

  return (
    <section className={styles.horses}>
      <h2 className={styles.title}>Наши лошади</h2>
      <div className={styles.viewport}>
        <div
          className={styles.row}
          style={{
            transform:
              index === last
                ? `translateX(calc(-${index * 86 - 14}% - 16px))`
                : `translateX(-${index * 86}%)`,
          }}
        >
          {slides.map((slide) => (
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
      <div className={styles.controls}>
        <button
          className={styles.arrow}
          type="button"
          aria-label="Назад"
          disabled={index === 0}
          onClick={() => setIndex((value) => value - 1)}
        >
          <img src="/images/arrow-left.svg" alt="" />
        </button>
        <div className={styles.track}>
          <span
            className={styles.thumb}
            style={{ transform: `translate(${index * 32}px, -50%)` }}
          />
        </div>
        <button
          className={styles.arrow}
          type="button"
          aria-label="Вперёд"
          disabled={index === last}
          onClick={() => setIndex((value) => value + 1)}
        >
          <img className={styles.arrowNext} src="/images/arrow-left.svg" alt="" />
        </button>
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import styles from './Reviews.module.css'

const reviews = [
  {
    text: 'Развивает силу, гибкость и координацию всадника; Выпрямляется осанка и повышается стрессоустойчивость; Общение с лошадью лечит умственные отклонения.',
    name: 'Константин Сюткин',
    ava: '/images/ava-sutkin.svg',
  },
  {
    text: 'Позитивные эмоции, расслабление, чувство ответственности и даже некоторой сказочности, сразу появляется красивая осанка, работают все группы мышц.',
    name: 'Валентина Сорокина',
    ava: '/images/ava-sorokina.svg',
  },
  {
    text: 'Плюсов до безумия много! Реакция, общение, понимание, взаимопонимание, терпение — перечислять и перечислять очень много всего полезного.',
    name: 'Светлана Мирная',
    ava: '/images/ava-mirnaya.svg',
  },
  {
    text: 'Привезла дочь на пробное занятие — теперь не можем представить выходные без конюшни. Тренеры внимательные, лошади спокойные, атмосфера семейная и тёплая.',
    name: 'Анна Петрова',
    ava: '/images/ava-petrova.svg',
  },
]

function relativeIndex(index: number, active: number, length: number) {
  let rel = (index - active + length) % length
  if (rel > Math.floor(length / 2)) rel -= length
  return rel
}

function ReviewCard({
  text,
  name,
  ava,
}: {
  text: string
  name: string
  ava: string
}) {
  return (
    <div className={styles.card}>
      <p className={styles.text}>{text}</p>
      <button className={styles.more} type="button">
        Подробнее
        <img src="/images/arrow-down.svg" alt="" />
      </button>
      <div className={styles.author}>
        <img className={styles.ava} src={ava} alt="" />
        <div className={styles.meta}>
          <p className={styles.name}>{name}</p>
          <div className={styles.socials}>
            <a href="#!" aria-label="Instagram">
              <img src="/images/social-insta.svg" alt="" />
            </a>
            <a href="#!" aria-label="ВКонтакте">
              <img src="/images/social-vk.svg" alt="" />
            </a>
          </div>
        </div>
        <img className={styles.quote} src="/images/quote.svg" alt="" />
      </div>
    </div>
  )
}

export function Reviews() {
  const [index, setIndex] = useState(0)
  const [desktopIndex, setDesktopIndex] = useState(0)
  const [mode, setMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const last = reviews.length - 1

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

  const step = mode === 'tablet' ? 48 : 86
  const transform =
    index === last
      ? `translateX(calc(-${index * step - (mode === 'tablet' ? 4 : 14)}% - ${mode === 'tablet' ? 24 : 16}px))`
      : `translateX(-${index * step}%)`

  const prevDesktop = () => {
    setDesktopIndex((value) => (value - 1 + reviews.length) % reviews.length)
  }

  const nextDesktop = () => {
    setDesktopIndex((value) => (value + 1) % reviews.length)
  }

  return (
    <section className={styles.reviews}>
      <h2 className={styles.title}>О нас говорят клиенты</h2>
      <div className={styles.viewport}>
        <div className={styles.row} style={{ transform }}>
          {reviews.map((item) => (
            <article key={item.name} className={styles.slide}>
              <ReviewCard {...item} />
            </article>
          ))}
        </div>
      </div>
      <div className={styles.viewportDesktop}>
        <div className={styles.rowDesktop}>
          {reviews.map((item, slideIndex) => {
            const rel = relativeIndex(slideIndex, desktopIndex, reviews.length)
            const posClass =
              rel === -1 || rel === 2 ? styles.posOuter : styles.posCenter

            return (
              <article
                key={item.name}
                className={`${styles.slideDesktop} ${posClass}`}
                style={{ order: rel + 1 }}
              >
                <ReviewCard {...item} />
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
            style={{
              transform: `translate(${(index / last) * 64}px, -50%)`,
            }}
          />
        </div>
        <div className={styles.dots} aria-hidden="true">
          {reviews.map((item, slideIndex) => (
            <button
              key={item.name}
              type="button"
              className={
                slideIndex === desktopIndex ? styles.dotActive : styles.dot
              }
              aria-label={item.name}
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

import { useEffect, useRef, useState } from 'react'
import styles from './Reviews.module.css'
import { asset } from '../../lib/asset'

const reviews = [
  {
    text: 'Развивает силу, гибкость и координацию всадника; Выпрямляется осанка и повышается стрессоустойчивость; Общение с лошадью лечит умственные отклонения. После месяца занятий чувствую себя увереннее и спокойнее в повседневной жизни.',
    name: 'Константин Сюткин',
    ava: asset('/images/ava-sutkin.svg'),
  },
  {
    text: 'Позитивные эмоции, расслабление, чувство ответственности и даже некоторой сказочности, сразу появляется красивая осанка, работают все группы мышц. Рекомендую всем, кто ищет баланс между спортом и отдыхом на природе.',
    name: 'Валентина Сорокина',
    ava: asset('/images/ava-sorokina.svg'),
  },
  {
    text: 'Плюсов до безумия много! Реакция, общение, понимание, взаимопонимание, терпение — перечислять и перечислять очень много всего полезного для детей и взрослых.',
    name: 'Светлана Мирная',
    ava: asset('/images/ava-mirnaya.svg'),
  },
  {
    text: 'Привезла дочь на пробное занятие — теперь не можем представить выходные без конюшни. Тренеры внимательные, лошади спокойные, атмосфера семейная и тёплая.',
    name: 'Анна Петрова',
    ava: asset('/images/ava-petrova.svg'),
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
  onMore,
}: {
  text: string
  name: string
  ava: string
  onMore: () => void
}) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const node = textRef.current
    if (!node) return

    const check = () => {
      setShowMore(node.scrollHeight > node.clientHeight + 1)
    }

    check()
    const observer = new ResizeObserver(check)
    observer.observe(node)
    return () => observer.disconnect()
  }, [text])

  return (
    <div className={styles.card}>
      <p className={styles.text} ref={textRef}>
        {text}
      </p>
      {showMore ? (
        <button className={styles.more} type="button" onClick={onMore}>
          Подробнее
          <img src={asset("/images/arrow-down.svg")} alt="" />
        </button>
      ) : (
        <span className={styles.moreSpacer} />
      )}
      <div className={styles.author}>
        <img className={styles.ava} src={ava} alt="" />
        <div className={styles.meta}>
          <p className={styles.name}>{name}</p>
          <div className={styles.socials}>
            <a href="#!" aria-label="Instagram">
              <img src={asset("/images/social-insta.svg")} alt="" />
            </a>
            <a href="#!" aria-label="ВКонтакте">
              <img src={asset("/images/social-vk.svg")} alt="" />
            </a>
          </div>
        </div>
        <img className={styles.quote} src={asset("/images/quote.svg")} alt="" />
      </div>
    </div>
  )
}

export function Reviews() {
  const [index, setIndex] = useState(0)
  const [desktopIndex, setDesktopIndex] = useState(0)
  const [mode, setMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const [popup, setPopup] = useState<(typeof reviews)[number] | null>(null)
  const last = reviews.length - 1
  const touchStartX = useRef<number | null>(null)

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

  useEffect(() => {
    if (!popup) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPopup(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [popup])

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

  const onTouchStart = (clientX: number) => {
    touchStartX.current = clientX
  }

  const onTouchEnd = (clientX: number) => {
    if (touchStartX.current === null) return
    const delta = clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (mode === 'desktop') {
      if (delta < 0) nextDesktop()
      else prevDesktop()
      return
    }
    if (delta < 0 && index < last) setIndex((value) => value + 1)
    if (delta > 0 && index > 0) setIndex((value) => value - 1)
  }

  return (
    <section className={styles.reviews}>
      <h2 className={styles.title}>О нас говорят клиенты</h2>
      <div
        className={styles.viewport}
        onTouchStart={(event) => onTouchStart(event.changedTouches[0].clientX)}
        onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].clientX)}
      >
        <div className={styles.row} style={{ transform }}>
          {reviews.map((item) => (
            <article key={item.name} className={styles.slide}>
              <ReviewCard {...item} onMore={() => setPopup(item)} />
            </article>
          ))}
        </div>
      </div>
      <div
        className={styles.viewportDesktop}
        onTouchStart={(event) => onTouchStart(event.changedTouches[0].clientX)}
        onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].clientX)}
      >
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
                <ReviewCard {...item} onMore={() => setPopup(item)} />
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
          <img src={asset("/images/arrow-left.svg")} alt="" />
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
          <img className={styles.arrowNext} src={asset("/images/arrow-left.svg")} alt="" />
        </button>
      </div>
      {popup ? (
        <div
          className={styles.popup}
          role="dialog"
          aria-modal="true"
          aria-label="Отзыв"
          onClick={() => setPopup(null)}
        >
          <div
            className={styles.popupCard}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.popupClose}
              type="button"
              aria-label="Закрыть"
              onClick={() => setPopup(null)}
            >
              ×
            </button>
            <p className={styles.popupText}>{popup.text}</p>
            <div className={styles.author}>
              <img className={styles.ava} src={popup.ava} alt="" />
              <div className={styles.meta}>
                <p className={styles.name}>{popup.name}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

import styles from './Visitors.module.css'

const rows = [
  ['/images/visitor-mobile-1.jpg', '/images/visitor-mobile-2.jpg'],
  ['/images/visitor-mobile-3.jpg', '/images/visitor-mobile-4.jpg'],
  ['/images/visitor-mobile-5.jpg', '/images/visitor-mobile-6.jpg'],
  ['/images/visitor-mobile-7.jpg', '/images/visitor-mobile-8.jpg'],
]

export function Visitors() {
  return (
    <section className={styles.visitors}>
      <h2 className={styles.title}>Наши посетители</h2>
      <div className={styles.grid}>
        {rows.map((row, index) => (
          <div
            key={row[0]}
            className={index % 2 === 0 ? styles.row : styles.rowAlt}
          >
            {row.map((src) => (
              <a key={src} className={styles.photoLink} href="#!">
                <img className={styles.photo} src={src} alt="" />
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button className={styles.arrow} type="button" aria-label="Назад" disabled>
          <img src="/images/arrow-left.svg" alt="" />
        </button>
        <div className={styles.track}>
          <span className={styles.thumb} />
        </div>
        <button className={styles.arrow} type="button" aria-label="Вперёд" disabled>
          <img className={styles.arrowNext} src="/images/arrow-left.svg" alt="" />
        </button>
      </div>
    </section>
  )
}

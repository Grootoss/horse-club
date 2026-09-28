import styles from './Reviews.module.css'

export function Reviews() {
  return (
    <section className={styles.reviews}>
      <h2 className={styles.title}>О нас говорят клиенты</h2>
      <article className={styles.card}>
        <p className={styles.text}>
          Развивает силу, гибкость и координацию всадника; Выпрямляется осанка
          и повышается стрессоустойчивость; Общение с лошадью лечит умственные
          отклонения.
        </p>
        <button className={styles.more} type="button">
          Подробнее
          <img src="/images/arrow-down.svg" alt="" />
        </button>
        <div className={styles.author}>
          <img className={styles.ava} src="/images/ava-sutkin.svg" alt="" />
          <div className={styles.meta}>
            <p className={styles.name}>Константин Сюткин</p>
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
      </article>
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

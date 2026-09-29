import { Link } from 'react-router-dom'
import styles from './Promo.module.css'
import { asset } from '../../lib/asset'

export function Promo() {
  return (
    <section className={styles.promo}>
      <img
        className={styles.bgMobile}
        src={asset("/images/promo-mobile-bg.png")}
        alt=""
      />
      <img
        className={styles.bgTablet}
        src={asset("/images/promo-tablet-bg.jpg")}
        alt=""
      />
      <img
        className={styles.bgDesktop}
        src={asset("/images/promo-desktop-bg.jpg")}
        alt=""
      />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Окунитесь в мир
          <br />
          лошадей вместе с нами
        </h1>
        <span className={styles.line} />
        <p className={styles.text}>
          Уроки верховой езды, фотосессии и мероприятия
          <br />
          в частном конном клубе г. <strong>Санкт-Петербург</strong>
        </p>
        <Link className={styles.signup} to="/contacts">
          Записаться
        </Link>
      </div>
    </section>
  )
}

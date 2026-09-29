import type { FormEvent } from 'react'
import styles from './Answer.module.css'

export function Answer() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className={styles.answer}>
      <form className={styles.card} onSubmit={onSubmit}>
        <h2 className={styles.title}>Отвечаем на вопросы</h2>
        <p className={styles.text}>
          Мы ответим на все ваши вопросы по телефону, или вы можете записаться
          на <strong>бесплатное</strong> пробное занятие
        </p>
        <input className={styles.field} name="name" placeholder="Ваше имя" />
        <input
          className={styles.field}
          name="phone"
          type="tel"
          placeholder="Ваш телефон"
        />
        <button className={styles.submit} type="submit">
          <span className={styles.submitMobile}>Записаться</span>
          <span className={styles.submitDesktop}>Задать вопрос</span>
        </button>
        <label className={styles.consent}>
          <input className={styles.checkbox} type="checkbox" defaultChecked />
          <span className={styles.mark} />
          <span>
            Даю согласие на обработку <a href="#!">данных</a>
          </span>
        </label>
      </form>
      <img
        className={styles.overDesktop}
        src="/images/contacts-desktop-over-bg.png"
        alt=""
      />
      <img
        className={styles.overlayDesktop}
        src="/images/contacts-desktop-overlay.png"
        alt=""
      />
    </section>
  )
}

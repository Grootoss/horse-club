import { useState, type FormEvent } from 'react'
import styles from './Answer.module.css'

type FieldErrors = {
  name?: string
  phone?: string
  consent?: string
}

const namePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/
const phonePattern = /^[\d\s+()-]+$/

function validateName(value: string) {
  const trimmed = value.trim()
  if (!trimmed || !namePattern.test(trimmed)) return 'Введите буквы'
  return undefined
}

function validatePhone(value: string) {
  const trimmed = value.trim()
  if (!trimmed || !/\d/.test(trimmed) || !phonePattern.test(trimmed)) {
    return 'Введите цифры'
  }
  return undefined
}

export function Answer() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(true)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState({ name: false, phone: false })

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: FieldErrors = {
      name: validateName(name),
      phone: validatePhone(phone),
      consent: consent ? undefined : 'Подтвердите согласие',
    }
    setTouched({ name: true, phone: true })
    setErrors(nextErrors)
  }

  const nameValid = touched.name && !errors.name && name.trim().length > 0
  const phoneValid = touched.phone && !errors.phone && phone.trim().length > 0

  return (
    <section className={styles.answer}>
      <form className={styles.card} onSubmit={onSubmit} noValidate>
        <h2 className={styles.title}>Отвечаем на вопросы</h2>
        <p className={styles.text}>
          Мы ответим на все ваши вопросы по телефону, или вы можете записаться
          на <strong>бесплатное</strong> пробное занятие
        </p>
        <div className={styles.fieldWrap}>
          {errors.name ? <span className={styles.fieldError}>{errors.name}</span> : null}
          <input
            className={`${styles.field} ${errors.name ? styles.fieldInvalid : ''} ${nameValid ? styles.fieldValid : ''}`}
            name="name"
            placeholder="Ваше имя"
            value={name}
            onChange={(event) => {
              const value = event.target.value
              setName(value)
              if (touched.name) {
                setErrors((prev) => ({ ...prev, name: validateName(value) }))
              }
            }}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, name: true }))
              setErrors((prev) => ({ ...prev, name: validateName(name) }))
            }}
          />
        </div>
        <div className={styles.fieldWrap}>
          {errors.phone ? (
            <span className={styles.fieldError}>{errors.phone}</span>
          ) : null}
          <input
            className={`${styles.field} ${errors.phone ? styles.fieldInvalid : ''} ${phoneValid ? styles.fieldValid : ''}`}
            name="phone"
            type="tel"
            placeholder="Ваш телефон"
            value={phone}
            onChange={(event) => {
              const value = event.target.value
              setPhone(value)
              if (touched.phone) {
                setErrors((prev) => ({ ...prev, phone: validatePhone(value) }))
              }
            }}
            onBlur={() => {
              setTouched((prev) => ({ ...prev, phone: true }))
              setErrors((prev) => ({ ...prev, phone: validatePhone(phone) }))
            }}
          />
        </div>
        <button className={styles.submit} type="submit">
          <span className={styles.submitMobile}>Записаться</span>
          <span className={styles.submitDesktop}>Задать вопрос</span>
        </button>
        <label
          className={`${styles.consent} ${errors.consent ? styles.consentInvalid : ''}`}
        >
          <input
            className={styles.checkbox}
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              const value = event.target.checked
              setConsent(value)
              setErrors((prev) => ({
                ...prev,
                consent: value ? undefined : 'Подтвердите согласие',
              }))
            }}
          />
          <span className={styles.mark} />
          <span>
            Даю согласие на обработку <a href="#!">данных</a>
          </span>
        </label>
        {errors.consent ? (
          <span className={styles.consentError}>{errors.consent}</span>
        ) : null}
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

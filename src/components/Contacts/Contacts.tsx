import styles from './Contacts.module.css'

const socials = [
  { src: '/images/insta.svg', label: 'Instagram' },
  { src: '/images/youtube.svg', label: 'YouTube' },
  { src: '/images/whatsup.svg', label: 'WhatsApp' },
  { src: '/images/vk.svg', label: 'ВКонтакте' },
]

export function Contacts() {
  return (
    <section className={styles.contacts}>
      <picture>
        <source
          media="(min-width: 1280px)"
          srcSet="/images/contacts-map-desktop.jpg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/images/contacts-map-tablet.jpg"
        />
        <img
          className={styles.map}
          src="/images/contacts-map-mobile.jpg"
          alt=""
        />
      </picture>
      <div className={styles.card}>
        <h2 className={styles.title}>Контакты</h2>
        <span className={styles.line} />
        <ul className={styles.list}>
          <li className={styles.row}>
            <span className={styles.icon}>
              <img src="/images/pin.svg" alt="" />
            </span>
            <span>ул. Ленина, 25, офис 65</span>
          </li>
          <li className={styles.row}>
            <span className={styles.icon}>
              <img src="/images/phone.svg" alt="" />
            </span>
            <a href="tel:+74950000000">+7 (495) 000-00-00</a>
          </li>
          <li className={styles.row}>
            <span className={styles.icon}>
              <img src="/images/mail.svg" alt="" />
            </span>
            <a href="mailto:mail@somemail.com">mail@somemail.com</a>
          </li>
          <li className={styles.row}>
            <span className={styles.icon}>
              <img src="/images/time.svg" alt="" />
            </span>
            <span className={styles.hours}>
              Пн-Пт: 10:00 - 19:00
              <br />
              Сб: 10:00 - 17:00
              <br />
              Вс: выходной
            </span>
          </li>
        </ul>
        <div className={styles.socials}>
          {socials.map((item) => (
            <a key={item.label} href="#!" aria-label={item.label}>
              <img src={item.src} alt="" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

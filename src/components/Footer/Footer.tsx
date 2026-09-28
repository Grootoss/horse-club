import { Link, NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

const links = [
  { to: '/about', label: 'О нас' },
  { to: '/services', label: 'Услуги и цены' },
  { to: '/gallery', label: 'Фотоальбом' },
  { to: '/contacts', label: 'Контакты' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav} aria-label="Разделы">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.linkActive}` : styles.link
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <a className={styles.call} href="tel:+74950000000">
        Заказать звонок
      </a>
      <Link to="/" className={styles.logoLink}>
        <img
          className={styles.logo}
          src="/images/logo-footer.svg"
          alt="Максимус — конный клуб"
        />
      </Link>
      <div className={styles.legal}>
        <a href="#!">Соглашение на обработку персональных данных</a>
        <a href="#!">Политика конфиденциальности</a>
      </div>
      <p className={styles.year}>2022</p>
    </footer>
  )
}

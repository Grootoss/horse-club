import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const menuLinks = [
  { to: '/about', label: 'О нас' },
  { to: '/services', label: 'Услуги и цены' },
  { to: '/gallery', label: 'Фотоальбом' },
  { to: '/contacts', label: 'Контакты' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const onPromo = location.pathname === '/' && !open

  return (
    <>
      <header
        className={
          open
            ? `${styles.header} ${styles.headerOpen}`
            : onPromo
              ? `${styles.header} ${styles.headerOnPromo}`
              : styles.header
        }
      >
        {!open && (
          <Link to="/" className={styles.logoLink}>
            <img
              className={styles.logo}
              src="/images/logo.svg"
              alt="Максимус — конный клуб"
            />
          </Link>
        )}
        <div className={styles.controls}>
          {!open ? (
            <button
              type="button"
              className={styles.menu}
              aria-expanded={false}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              <span className={styles.burger} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className={styles.menuLabel}>Меню</span>
            </button>
          ) : (
            <button
              type="button"
              className={styles.close}
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
            >
              <span />
              <span />
            </button>
          )}
        </div>
      </header>
      {open && (
        <div className={styles.overlay} id="site-menu">
          <nav className={styles.nav} aria-label="Разделы">
            {menuLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={styles.link}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}

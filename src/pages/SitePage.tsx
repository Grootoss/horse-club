import styles from './SitePage.module.css'

function SitePage({ title }: { title: string }) {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.notice}>Страница в разработке</p>
    </section>
  )
}

export function AboutPage() {
  return <SitePage title="О нас" />
}

export function ServicesPage() {
  return <SitePage title="Услуги и цены" />
}

export function GalleryPage() {
  return <SitePage title="Фотоальбом" />
}

export function ContactsPage() {
  return <SitePage title="Контакты" />
}

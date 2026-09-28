import { Link } from 'react-router-dom'
import styles from './Service.module.css'

const services = [
  {
    image: '/images/service-mobile-1.jpg',
    title: 'Уроки верховой езды',
    text: 'Уроки профессиональной верховой езды для любителей и начинающих',
  },
  {
    image: '/images/service-mobile-2.jpg',
    title: 'Прогулки верхом с тренером',
    text: 'Тренировка клиентов, подготовка к занятиям конным спортом на профессиональном уровне под руководством опытных тренеров',
  },
  {
    image: '/images/service-mobile-3.jpg',
    title: 'Фотосессии',
    text: 'Уроки профессиональной верховой езды для любителей и начинающих',
  },
  {
    image: '/images/service-mobile-4.jpg',
    title: 'Прогулки верхом с тренером',
    text: 'Тренировка клиентов, подготовка к занятиям конным спортом на профессиональном уровне под руководством опытных тренеров',
  },
  {
    image: '/images/service-mobile-5.jpg',
    title: 'Прогулки верхом с тренером',
    text: 'Тренировка клиентов, подготовка к занятиям конным спортом на профессиональном уровне под руководством опытных тренеров',
  },
]

export function Service() {
  return (
    <section className={styles.service}>
      <h2 className={styles.title}>Направления клуба</h2>
      <p className={styles.subtitle}>Подзаголовок блока</p>
      <ul className={styles.list}>
        {services.map((item) => (
          <li key={item.image} className={styles.card}>
            <img className={styles.photo} src={item.image} alt="" />
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <span className={styles.line} />
            <p className={styles.text}>{item.text}</p>
          </li>
        ))}
      </ul>
      <Link className={styles.signup} to="/contacts">
        Записаться
      </Link>
    </section>
  )
}

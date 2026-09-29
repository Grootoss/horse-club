import { Link } from 'react-router-dom'
import styles from './Service.module.css'
import { asset } from '../../lib/asset'

const services = [
  {
    mobile: asset('/images/service-mobile-1.jpg'),
    tablet: asset('/images/service-tablet-1.jpg'),
    desktop: asset('/images/service-desktop-1.jpg'),
    title: 'Уроки верховой езды',
    text: 'Уроки профессиональной верховой езды для любителей и начинающих',
  },
  {
    mobile: asset('/images/service-mobile-2.jpg'),
    tablet: asset('/images/service-tablet-2.jpg'),
    desktop: asset('/images/service-desktop-2.jpg'),
    title: 'Прогулки верхом с тренером',
    text: 'Тренировка клиентов, подготовка к занятиям конным спортом на профессиональном уровне под руководством опытных тренеров',
  },
  {
    mobile: asset('/images/service-mobile-3.jpg'),
    tablet: asset('/images/service-tablet-3.jpg'),
    desktop: asset('/images/service-desktop-3.jpg'),
    title: 'Фотосессии',
    text: 'Уроки профессиональной верховой езды для любителей и начинающих',
  },
  {
    mobile: asset('/images/service-mobile-4.jpg'),
    tablet: asset('/images/service-tablet-4.jpg'),
    desktop: asset('/images/service-desktop-4.jpg'),
    title: 'Прогулки верхом с тренером',
    text: 'Тренировка клиентов, подготовка к занятиям конным спортом на профессиональном уровне под руководством опытных тренеров',
  },
  {
    mobile: asset('/images/service-mobile-5.jpg'),
    tablet: asset('/images/service-tablet-5.jpg'),
    desktop: asset('/images/service-desktop-5.jpg'),
    title: 'Фотосессии',
    text: 'Уроки профессиональной верховой езды для любителей и начинающих',
  },
  {
    mobile: asset('/images/service-mobile-6.jpg'),
    tablet: asset('/images/service-tablet-6.jpg'),
    desktop: asset('/images/service-desktop-6.jpg'),
    title: 'Прогулки верхом с тренером',
    text: 'Тренировка клиентов, подготовка к занятиям конным спортом на профессиональном уровне под руководством опытных тренеров',
  },
]

const columns = [
  [0, 3],
  [1, 4],
  [2, 5],
]

function ServiceCard({
  item,
  order,
}: {
  item: (typeof services)[number]
  order: number
}) {
  return (
    <article className={styles.card} style={{ order }}>
      <picture>
        <source media="(min-width: 1280px)" srcSet={item.desktop} />
        <source media="(min-width: 768px)" srcSet={item.tablet} />
        <img className={styles.photo} src={item.mobile} alt="" />
      </picture>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <span className={styles.line} />
      <p className={styles.text}>{item.text}</p>
    </article>
  )
}

export function Service() {
  return (
    <section className={styles.service}>
      <h2 className={styles.title}>Направления клуба</h2>
      <p className={styles.subtitle}>Подзаголовок блока</p>
      <div className={styles.list}>
        {columns.map((indexes) => (
          <div key={indexes[0]} className={styles.col}>
            {indexes.map((index) => (
              <ServiceCard
                key={services[index].desktop}
                item={services[index]}
                order={index + 1}
              />
            ))}
          </div>
        ))}
      </div>
      <Link className={styles.signup} to="/contacts">
        Записаться
      </Link>
      <img
        className={styles.overDesktop}
        src={asset("/images/service-desktop-over-bg.png")}
        alt=""
      />
    </section>
  )
}

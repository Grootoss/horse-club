import styles from './About.module.css'
import { asset } from '../../lib/asset'

const reasons = [
  {
    icon: asset('/images/about-mobile-1.svg'),
    title: 'Удобное расположение',
    text: 'Мы находимся недалеко от автостанции «Восточный» чтобы вам было удобно добираться',
  },
  {
    icon: asset('/images/about-mobile-2.svg'),
    title: 'Обеденная зона',
    text: 'Имеется столовая, чтобы Вы могли перекусить и немного отдохнуть. Бесплатно чай, кофе, печенки.',
  },
  {
    icon: asset('/images/about-mobile-3.svg'),
    title: 'Профессиональные тренера',
    text: 'Наши преподаватели имеют награды в конном спорте, и отличные отзывы среди наших учеников',
  },
  {
    icon: asset('/images/about-mobile-4.svg'),
    title: 'Бесплатная парковка',
    text: 'У нас имеется просторная парковка, чтобы вы могли без проблем припарковать свой автомобиль',
  },
]

const stats = [
  {
    value: '1100+',
    label: 'Довольных посетителей за последний год',
  },
  {
    value: '50+',
    label: 'Проведенных мероприятий за 6 месяцев',
  },
  {
    value: '20+',
    label: 'Выпущенных профессиональных спортсменов за 1 год',
  },
  {
    value: '15+',
    label: 'Регулярных занятий в неделю с профессиональными наставниками',
  },
]

export function About() {
  return (
    <>
      <section className={styles.about}>
        <h2 className={styles.title}>О нашем клубе</h2>
        <div className={styles.row}>
          <picture className={styles.girlPic}>
            <source
              media="(min-width: 1280px)"
              srcSet={asset("/images/about-desktop-girl.png")}
            />
            <img
              className={styles.girl}
              src={asset("/images/about-tablet-girl.png")}
              alt=""
            />
          </picture>
          <ul className={styles.stats}>
            {stats.map((item) => (
              <li key={item.value} className={styles.stat}>
                <p className={styles.value}>{item.value}</p>
                <p className={styles.label}>{item.label}</p>
              </li>
            ))}
          </ul>
          <p className={styles.text}>
            Занятия проводятся индивидуально и в группах, стоимость также будет
            зависеть от ваших навыков и умений. Более выгодные условия
            предусмотрены для регулярных занятий при покупке абонементов. Для
            тех, кто хочет отточить своё мастерство, разработаны программы по
            специализации (конкур, выездка и другие), участие в соревнованиях и
            чемпионатах. Для самых маленьких любителей лошадей действуют
            пони-клубы, где ребята учатся ухаживать за животными и ездить на
            милых и добрых пони.
          </p>
        </div>
      </section>
      <section className={styles.reasons}>
        <h2 className={styles.title}>Почему нас выбирают</h2>
        <p className={styles.subtitle}>Подзаголовок блока</p>
        <ul className={styles.reasonList}>
          {reasons.map((item) => (
            <li key={item.icon} className={styles.reason}>
              <img className={styles.icon} src={item.icon} alt="" />
              <h3 className={styles.reasonTitle}>{item.title}</h3>
              <p className={styles.reasonText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

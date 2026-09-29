import styles from './Visitors.module.css'
import { asset } from '../../lib/asset'

const photos = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  mobile: asset(`/images/visitor-mobile-${n}.jpg`),
  tablet: asset(`/images/visitor-tablet-${n}.jpg`),
}))

const desktopPhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) =>
  asset(`/images/visitor-desktop-${n}.jpg`),
)

const mobileRows = [
  [photos[0], photos[1]],
  [photos[2], photos[3]],
  [photos[4], photos[5]],
  [photos[6], photos[7]],
]

const tabletRows = [
  [photos[0], photos[1], photos[2], photos[3]],
  [photos[4], photos[5], photos[6], photos[7]],
]

const desktopRows = [
  desktopPhotos.slice(0, 5),
  desktopPhotos.slice(5, 10),
]

function PhotoLink({
  item,
}: {
  item: { mobile: string; tablet: string }
}) {
  return (
    <a className={styles.photoLink} href="#!">
      <picture>
        <source media="(min-width: 768px)" srcSet={item.tablet} />
        <img className={styles.photo} src={item.mobile} alt="" />
      </picture>
    </a>
  )
}

export function Visitors() {
  return (
    <section className={styles.visitors}>
      <h2 className={styles.title}>Наши посетители</h2>
      <div className={styles.gridMobile}>
        {mobileRows.map((row, index) => (
          <div
            key={row[0].mobile}
            className={index % 2 === 0 ? styles.row : styles.rowAlt}
          >
            {row.map((item) => (
              <PhotoLink key={item.mobile} item={item} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.gridTablet}>
        {tabletRows.map((row, index) => (
          <div
            key={row[0].tablet}
            className={index === 0 ? styles.rowTablet1 : styles.rowTablet2}
          >
            {row.map((item) => (
              <PhotoLink key={item.tablet} item={item} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.gridDesktop}>
        {desktopRows.map((row, index) => (
          <div
            key={row[0]}
            className={index === 0 ? styles.rowDesktop1 : styles.rowDesktop2}
          >
            {row.map((src) => (
              <a key={src} className={styles.photoLink} href="#!">
                <img className={styles.photo} src={src} alt="" />
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button className={styles.arrow} type="button" aria-label="Назад" disabled>
          <img src={asset("/images/arrow-left.svg")} alt="" />
        </button>
        <div className={styles.track}>
          <span className={styles.thumb} />
        </div>
        <div className={styles.dots} aria-hidden="true">
          <span className={styles.dotActive} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <button className={styles.arrow} type="button" aria-label="Вперёд" disabled>
          <img className={styles.arrowNext} src={asset("/images/arrow-left.svg")} alt="" />
        </button>
      </div>
    </section>
  )
}

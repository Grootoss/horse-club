import { About } from '../../components/About/About'
import { Answer } from '../../components/Answer/Answer'
import { Contacts } from '../../components/Contacts/Contacts'
import { Promo } from '../../components/Promo/Promo'
import { Reviews } from '../../components/Reviews/Reviews'
import { Service } from '../../components/Service/Service'
import { Horses } from '../../components/Horses/Horses'
import { Visitors } from '../../components/Visitors/Visitors'

export function HomePage() {
  return (
    <>
      <Promo />
      <About />
      <Service />
      <Visitors />
      <Horses />
      <Answer />
      <Reviews />
      <Contacts />
    </>
  )
}

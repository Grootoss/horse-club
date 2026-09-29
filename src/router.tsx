import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { HomePage } from './pages/HomePage/HomePage'
import { AboutPage, ContactsPage, GalleryPage, ServicesPage } from './pages/SitePage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'services', element: <ServicesPage /> },
        { path: 'gallery', element: <GalleryPage /> },
        { path: 'contacts', element: <ContactsPage /> },
      ],
    },
  ],
  { basename: '/horse-club' },
)

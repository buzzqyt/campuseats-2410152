import { Outlet } from 'react-router'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout

import { createFileRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const Route = createFileRoute('/_marketing')({
  component: MarketingLayout
})

function MarketingLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

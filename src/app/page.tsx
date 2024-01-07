import Image from 'next/image'
import NavBar from '@/app/components/navbar'
import Home from '@/app/components/home'
import Body from '@/app/components/body'
import Footer from '@/app/components/footer'

export default function App() {
  return (
    <div>
      <NavBar />
      <Home />
      <Body />
      <Footer />
    </div>
  )
}

import { Footer, Header } from './Chrome'
import About from './pages/About'
import { Article, Blog } from './pages/Blog'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Services from './pages/Services'
import { useHashRoute } from './ui'

export default function Site() {
  const route = useHashRoute()
  const [path, query] = route.split('?')

  let page
  if (path.startsWith('/services')) page = <Services focus={path.split('/')[2]} />
  else if (path.startsWith('/about')) page = <About />
  else if (path.startsWith('/contact')) page = <Contact service={new URLSearchParams(query).get('service')} />
  else if (path.startsWith('/blog/')) page = <Article slug={path.replace('/blog/', '')} />
  else if (path.startsWith('/blog')) page = <Blog />
  else page = <Home />

  return (
    <>
      <Header route={path} />
      <main key={path.split('/').slice(0, 3).join('/')}>{page}</main>
      <Footer />
    </>
  )
}

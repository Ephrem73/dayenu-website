import Poster from './Poster'
import Site from './site/Site'

export default function App() {
  // The concert poster stays available at ?poster
  if (new URLSearchParams(window.location.search).has('poster')) return <Poster />
  return <Site />
}

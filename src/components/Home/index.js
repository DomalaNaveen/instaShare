import {Link} from 'react-router-dom'
import Header from '../Header'
import Stories from '../Stories'
import './index.css'

const Home = () => (
  <Link to="/">
    <div>
      <Header />
      <Stories />
    </div>
  </Link>
)

export default Home

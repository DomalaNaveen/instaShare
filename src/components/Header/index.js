import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import {AiFillCloseCircle} from 'react-icons/ai'
import SearchContext from '../../Context/SearchContext'
import './index.css'

const Header = props => (
  <SearchContext.Consumer>
    {value => {
      const {
        searchInput,
        click,
        onChangeSearchInput,
        setSearchInput,
        onMoreOptionsState,
        searchBox,
        searchValue,
        closeHeaderButtonIn,
      } = value

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const CloseHeaderButton = () => {
        closeHeaderButtonIn()
      }

      const onMoreOptions = () => {
        onMoreOptionsState()
      }

      const changeSearchInput = event => {
        onChangeSearchInput(event.target.value)
      }

      const onsetSearchInput = () => {
        setSearchInput()
      }

      const searchContainerView = () => {
        searchBox()
      }

      const searchBoxContainer = () => (
        <div className="input-container">
          <input
            className="search-input"
            placeholder="Search Caption"
            type="search"
            value={searchInput}
            onChange={changeSearchInput}
          />
          <button
            className="search-button"
            type="button"
            onChange={onsetSearchInput}
          >
            <FaSearch className="search-icon" />
          </button>
        </div>
      )

      const onMoreOptionsBar = () => (
        <div className="options-container">
          <ul className="links">
            <li className="link-tag">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <button
              className="search-button"
              type="button"
              onClick={searchContainerView}
            >
              Search
            </button>
            <li className="link-tag">
              <Link to="/my-profile" className="link">
                Profile
              </Link>
            </li>
          </ul>
          <button className="" type="button" onClick={CloseHeaderButton}>
            <AiFillCloseCircle className="close-button" />
          </button>
        </div>
      )

      return (
        <div>
          <nav className="nav-header">
            <div className="img-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/naveen-ccbp/image/upload/v1672771588/dn/login/Standard_Collection_8_kd7c1v.png"
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
              <h1 className="heading">Insta Share</h1>
            </div>
            <div className="search-container">
              <div className="input-container">
                <input
                  className="search-input"
                  placeholder="Search Caption"
                  type="search"
                  value={searchInput}
                  onChange={changeSearchInput}
                />
                <button
                  className="search-button"
                  type="button"
                  onChange={onsetSearchInput}
                >
                  <FaSearch className="search-icon" />
                </button>
              </div>
              <ul className="links">
                <li className="link-tag">
                  <Link to="/" className="link">
                    Home
                  </Link>
                </li>
                <li className="link-tag">
                  <Link to="/my-profile" className="link">
                    Profile
                  </Link>
                </li>
              </ul>
              <button type="button" className="button" onClick={onLogout}>
                Logout
              </button>
            </div>
            <div className="medium-view">
              <button
                type="button"
                className="medium-button"
                onClick={onMoreOptions}
              >
                <GoThreeBars className="more" />
              </button>
            </div>
          </nav>
          {click && onMoreOptionsBar()}
          {searchValue && searchBoxContainer()}
        </div>
      )
    }}
  </SearchContext.Consumer>
)

export default withRouter(Header)

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Stories extends Component {
  state = {storiesList: [], storiesStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    this.setState({storiesStatus: apiStatusConstants.inProgress})
    const Token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data)
      const updatedData = {
        usersStories: data.users_stories.map(each => ({
          userId: each.user_id,
          userName: each.user_name,
          storyUrl: each.story_url,
        })),
      }
      this.setState({
        storiesList: updatedData,
        storiesStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({storiesStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => {
    this.setState({storiesStatus: apiStatusConstants.inProgress})
    return (
      <div className="loader-container">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    )
  }

  renderSuccessView = () => {
    const {storiesList} = this.state
    return (
      <div>
        <Slider {...settings}>
          {storiesList.map(eachLogo => (
            <div className="slick-container" key={eachLogo.userId}>
              <img
                className="logo-image"
                src={eachLogo.storyUrl}
                alt="user story"
              />
              <p className="name">{eachLogo.userName}</p>
            </div>
          ))}
        </Slider>
      </div>
    )
  }

  onRetry = () => {
    this.setState(
      {storiesStatus: apiStatusConstants.inProgress},
      this.getStories,
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/naveen-ccbp/image/upload/v1672947128/dn/login/alert-triangle_hczx0o_y1nlpv.png"
        alt="failure view"
        className="failure-img"
      />
      <p>Something went wrong.Please try again</p>
      <button className="button" type="button" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderStories = () => {
    const {storiesStatus} = this.state

    switch (storiesStatus) {
      case storiesStatus.success:
        return this.renderSuccessView()
      case storiesStatus.inProgress:
        return this.renderLoadingView()
      case storiesStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderStories()
  }
}

export default Stories

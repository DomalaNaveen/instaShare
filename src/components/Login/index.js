import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitFailure = msg => {
    this.setState({errorMsg: msg, showErrorMsg: true})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          className="input"
          value={username}
          placeholder="USERNAME"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          className="input"
          value={password}
          placeholder="PASSWORD"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/naveen-ccbp/image/upload/v1672771444/dn/login/Vector_4_izhghn.png"
            alt="website login"
            className="website-login"
          />
        </div>
        <div className="login-card">
          <img
            src="https://res.cloudinary.com/naveen-ccbp/image/upload/v1672771588/dn/login/Standard_Collection_8_kd7c1v.png"
            alt="website logo"
          />
          <h1 className="website-heading">Insta Share</h1>
          <form className="form" onSubmit={this.submitLoginForm}>
            <>{this.renderUsername()}</>
            <>{this.renderPassword()}</>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
            <button className="button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login

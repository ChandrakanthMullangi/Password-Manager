import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isPasswordShow: false,
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickAddNewPassword = event => {
    event.preventDefault()

    const {usernameInput, websiteInput, passwordInput} = this.state

    const initial = websiteInput.slice(0, 1).toUpperCase()

    const randomProfileBackgroundColor =
      colorList[Math.floor(Math.random() * colorList.length)]

    const newPassword = {
      id: uuidv4(),
      initialLetter: initial,
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      profileBackgroundColor: randomProfileBackgroundColor,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    console.log(event.target.checked)
    if (event.target.checked) {
      this.setState({isPasswordShow: true})
    } else {
      this.setState({isPasswordShow: false})
    }
  }

  onClickDeleteItem = id => {
    const {passwordsList} = this.state

    const filteredList = passwordsList.filter(eachValue => eachValue.id !== id)

    this.setState({passwordsList: filteredList})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      isPasswordShow,
      searchInput,
    } = this.state

    let {isTrue} = this.state

    const filteredList = passwordsList.filter(eachValue =>
      eachValue.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (filteredList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="main-container">
        {/* PASSWORD MANAGER SECTION */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />
        {/* ADD NEW PASSWORD SECTION */}
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="sub-div1-image2"
            alt="password manager"
          />
          <form className="add-details" onSubmit={this.onClickAddNewPassword}>
            <h1 className="detail-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-image"
                alt="website"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.onChangeWebsiteInput}
                value={websiteInput}
              />
            </div>

            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-image"
                alt="username"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.onChangeUsernameInput}
                value={usernameInput}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-image"
                alt="password"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.onChangePasswordInput}
                value={passwordInput}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="sub-div1-image1"
            alt="password manager"
          />
        </div>
        {/* YOUR PASSWORDS SECTION */}
        <div className="sub-div2">
          <div className="first-div">
            <div className="your-password">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{filteredList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="input-image"
                alt="search"
              />
              <input
                type="search"
                className="input-element"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          {/* SHOW PASSWORDS */}
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {/* NO PASSWORDS SECTION */}
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="empty-image"
                alt="no passwords"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {/* PASSWORDS SECTION */}
          {isTrue && (
            <ul className="result-container">
              {filteredList.map(eachObj => (
                <li className="item-list" id={eachObj.id} key={eachObj.id}>
                  <p className={`initial ${eachObj.profileBackgroundColor}`}>
                    {eachObj.initialLetter}
                  </p>
                  <div className="list-content">
                    <p className="website">{eachObj.website}</p>
                    <p className="website">{eachObj.username}</p>
                    {/* PASSWORDS HIDE IF FALSE */}
                    {!isPasswordShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {/* PASSWORDS SHOW IF TRUE */}
                    {isPasswordShow && (
                      <p className="website">{eachObj.password}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.onClickDeleteItem(eachObj.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App

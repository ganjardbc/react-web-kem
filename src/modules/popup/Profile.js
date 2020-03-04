import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import AuthAction from '../../redux/AuthRedux'
import { connect } from 'react-redux'

var opActivePopup = 'app-small-profile active'
var clActivePopup = 'app-small-profile'

var opContentPopup = 'app-menu-popup'
var clContentPopup = 'app-menu-popup app-menu-popup-hide'

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      profileClass: clContentPopup,
      smallProfileClass: clActivePopup
    }
  }

  opProfile = () => {
    if (this.state.profileClass === clContentPopup) {
      this.setState({ profileClass: opContentPopup })
      this.setState({ smallProfileClass: opActivePopup })
    } else {
      this.setState({ profileClass: clContentPopup })
      this.setState({ smallProfileClass: clActivePopup })
    }
  }

  logout() {
    this.props.authLogout()
  }

  render() {
    return (
      <div>
        <div
          onClick={this.opProfile}
          className={this.state.smallProfileClass}
          style={{ float: 'right' }}>
          <div className="asp-col-1">
            <div className="image image-circle image-30px background-green">
              <img width="100%" height="100%" />
            </div>
          </div>
          <div className="asp-col-2">
            <div className="ttl">
              <i className="fa fa-lw fa-angle-down txt-site txt-primary txt-16" />
            </div>
            {/*<div className="ttl">
              <div className="txt-site txt-main txt-12 txt-cap">
              	Admin
              </div>
            </div>*/}
          </div>
        </div>

        <div
          style={{ top: "45px", width: "200px" }}
          className={this.state.profileClass}>
          <ul>
            <NavLink to="/">
              <li onClick={this.logout.bind(this)}>
                <i className="icn fa fa-lw fa-user"></i>
                Profile
              </li>
            </NavLink>
            <NavLink to="/">
              <li onClick={this.logout.bind(this)}>
                <i className="icn fa fa-lw fa-power-off"></i>
                Logout
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authLogout: () => dispatch(AuthAction.authLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
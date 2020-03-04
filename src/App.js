import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink, HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/login/login'
import Home from './components/dashboard/home'
import ProfilePopup from './modules/popup/Profile'
import './App.css';
import Texts from './components/texts/texts'
import Students from './components/students/students'
import Training from './components/training/training'

// icon
let angle = 'fa fa-lg fa-angle-right'

// sub menu
let opSubMenu = 'app-menu app-submenu-themes app-submenu'

let opMenu = 'list'

class App extends Component {

  constructor() {

    super()
    this.state = {
      appClass: 'app', //app-side-big-icon
      appButtonClass: 'fa fa-lg fa-bars',
      travelClass: opMenu,
      travelSubmenu: opSubMenu,
      travelMoreIcon: angle,
      timeClass: opMenu,
      timeSubmenu: opSubMenu,
      timeMoreIcon: angle,
      leaveClass: opMenu,
      leaveSubmenu: opSubMenu,
      leaveMoreIcon: angle,
      overtimeClass: opMenu,
      overtimeSubmenu: opSubMenu,
      overtimeMoreIcon: angle,
      employeeClass: opMenu,
      employeeSubmenu: opSubMenu,
      employeeMoreIcon: angle,
    }

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.id !== this.props.auth.id) {
      setTimeout(() => {
          this.props.onLogoOut(nextProps.auth.id) 
      }, 60000) //one minute 
  
    }
  }

  render() {
    return (
      <HashRouter history={Router.browserHistory}>
         
        <div>
          {/* Single Page */}
          <div className="app">
            <Route exact path="/" component={Login} />
          </div>

          {/* Multiple Page */}
          <div className={this.state.appClass}>
            <div className="app-slide">
              <div className="slide-content background-green">
                <div className="app-title">
                  <div className="col-1">
                    <h1 className="txt-site txt-white txt-upp txt-18 txt-bold post-center margin-left-10px">
                      ADMIN KEM
                    </h1>
                  </div>
                  <div className="col-2">
                    {/* <button
                      className="btn btn-grey btn-circle"
                      onClick={this.opSlide}>
                      <i className={this.state.appButtonClass} />
                    </button> */}
                  </div>
                </div>
                {/* menu */}
                <div className="slide-list change-scrollbar">
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-dashboard" />
                    <NavLink to='/home'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-home" />
                        </span>
                        <span className="app-space-text">
                          DASHBOARD
                        </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-dashboard" />
                    <NavLink to='/training'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-book" />
                        </span>
                        <span className="app-space-text">
                          DATA LATIHAN
                        </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-dashboard" />
                    <NavLink to='/students'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-users" />
                        </span>
                        <span className="app-space-text">
                          DATA MURID
                        </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-dashboard" />
                    <NavLink to='/home'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-list" />
                        </span>
                        <span className="app-space-text">
                          DATA HASIL KEM
                        </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-dashboard" />
                    <NavLink to='/home'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-cogs" />
                        </span>
                        <span className="app-space-text">
                          PENGATURAN AKUN
                        </span>
                      </label>
                    </NavLink>
                  </div>
                  <div className="app-space">
                    <input type="radio" name="mainmenu" id="mainmenu-dashboard" />
                    <NavLink to='/'>
                      <label htmlFor="mainmenu-dashboard" className="list">
                        <span className="app-space-icon">
                          <i className="fa fa-1x fa-power-off" />
                        </span>
                        <span className="app-space-text">
                          LOGOUT
                        </span>
                      </label>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="app-main">
              <div className="app-panel">
                <div className="panel-content">

                  <div className="col-1">
                    <div className="app-mobile">
                      <button className="btn btn-circle btn-primary">
                        <i className="fa fa-lg fa-search" />
                      </button>
                    </div>
                    {/* <div className="app-desktop">
                      <SearchPopup />
                    </div> */}
                  </div>
                  <div className="col-2 content-right">
                    <div className="panel-button">
                      <ProfilePopup />
                    </div>
                  </div>
                </div>
              </div>
              <div className="app-place">
                <Route exact path="/home" component={Home} />
                <Route exact path="/texts" component={Texts} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/training" component={Training} />
              </div>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }

}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, null)(App)

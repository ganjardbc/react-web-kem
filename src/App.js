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
import Kem from './components/kem/kem'
import Qa from './components/qa/qa'

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

  createSubMenu = (icon, val, link) => {
    return (
      <NavLink to={link}>
        <li className="content">
          <div className="list">
              <div className="icn"><i className={icon}></i></div>
              <div className="ttl">{val}</div>
              <div className="icn txt-site txt-right txt-12"></div>
          </div>
        </li>
      </NavLink>
    )
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
              <div className="slide-content background-white">
                <div className="app-title">
                  <div className="col-1">
                    <h1 className="txt-site txt-main txt-upp txt-18 txt-bold post-center margin-left-10px">
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
                <div className="slide-content-place change-scrollbar">
                  <div className="app-space">
                    DASHBOARD
                  </div>
                  <ul className="app-menu">
                    {this.createSubMenu('fa fa-lg fa-home', 'Dashboard', '/home')}
                  </ul>

                  <div className="app-space">
                    MASTERDATA
                  </div>
                  <ul className="app-menu">
                    {this.createSubMenu('fa fa-lg fa-running', 'Data Latihan', '/training')}
                    {this.createSubMenu('fa fa-lg fa-book', 'Data Bacaan', '/texts')}
                    {/* {this.createSubMenu('fa fa-lg fa-question', 'Data Soal & Jawaban', '/qa')} */}
                    {this.createSubMenu('fa fa-lg fa-users', 'Data Murid', '/students')}
                    {this.createSubMenu('fa fa-lg fa-chart-pie', 'Data Hasil KEM', '/kem')}
                  </ul>

                  <div className="app-space">
                    AKUN
                  </div>
                  <ul className="app-menu">
                    {/* {this.createSubMenu('fa fa-lg fa-cogs', 'Pengaturan Akun', '/404')} */}
                    {this.createSubMenu('fa fa-lg fa-key', 'Ubah Password', '/404')}
                    {this.createSubMenu('fa fa-lg fa-mask', 'Ubah Avatar', '/404')}
                  </ul>

                  <div className="app-space">
                    LAINNYA
                  </div>
                  <ul className="app-menu">
                    {this.createSubMenu('fa fa-lg fa-power-off', 'Logout', '/404')}
                  </ul>

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
                <Route exact path="/kem" component={Kem} />
                <Route exact path="/qa" component={Qa} />
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

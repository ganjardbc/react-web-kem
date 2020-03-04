import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Redirect } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
// import logo from './../../assets/img/logo.jpg';
import AuthAction from '../../redux/AuthRedux';
import { connect } from 'react-redux';


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nisn: '',
            password: '',
            redirect: props.auth.user ? true : false
        }
        this.handleChangenisn = this.handleChangenisn.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangenisn(event) {
        this.setState({ nisn: event.target.value })
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.login()
    }

    componentWillReceiveProps(newProps) {
        if (!newProps.auth.fetching) {
            if (newProps.auth && !newProps.auth.error) {
                this.setState({ redirect: true });
                this.onFinishFetch()
            } else {
                this.onFinishFetch()
            }
        }
    }

    login() {
        this.startFetch()
        const { nisn, password } = this.state
        let payload = {
            nisn: nisn,
            password: password
        }
        this.props.authRequest(payload);
    }

    startFetch = () => {
        this.LoadingBar.continousStart()
    }

    onFinishFetch = () => {
        if (typeof this.LoadingBar === "object") this.LoadingBar.complete()
    }

    render() {

        console.info(this.state.redirect)
        if (this.state.redirect) {
            return <Redirect push to="/home"></Redirect>
        }

        return (
            <HashRouter history={Router.browserHistory}>
                <div className="main-content">
                    <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                    <div className="app-login background-green">
                        <div className="login-small">
                            {/* <div className="logo-faded">
                                <div
                                    className="image image-circle background-white border-all"
                                    style={{ margin: "auto" }}>
                                    <img src={logo} alt=""></img>
                                </div>
                            </div> */}

                            <div className="margin-10px grid grid-2x">
                                <div className="col-1">
                                    <div className="txt-site txt-16 txt-bold txt-main">
                                        Sign In
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className="margin-15px">
                                    <div className="margin-bottom-5px txt-site txt-10 txt-main txt-bold">
                                        NISN
                                    </div>
                                    <input
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        value={this.state.nisn}
                                        onChange={this.handleChangenisn}
                                        required></input>
                                </div>
                                <div className="margin-15px">
                                    <div className="margin-bottom-5px txt-site txt-10 txt-main txt-bold">
                                        Password
                                    </div>
                                    <input
                                        type="password"
                                        className="txt txt-sekunder-color"
                                        value={this.state.password}
                                        onChange={this.handleChangePassword}
                                        required></input>
                                </div>
                                <div className="margin-15px">
                                    <input
                                        type="submit"
                                        value="Sign In"
                                        className="btn btn-width-all background-green">
                                    </input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authRequest: obj => dispatch(AuthAction.authRequest(obj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
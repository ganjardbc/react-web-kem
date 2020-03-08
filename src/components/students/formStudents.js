import React, { Component } from "react"
// import CalendarPicker from '../../modules/popup/Calendar'
// import Dropzone from 'react-dropzone'
// import Loader from 'react-loader-spinner'
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
// import MUIDataTable from "mui-datatables-bitozen"
// import api from "../../services/Api"
// import M from 'moment'

let ct = require("../../modules/custom/customTable")

let defaultPayload = {
	"nisn": 0,
	"password": "",
	"nama": "",
	"kelas": "",
	"email": "",
	"sekolah": ""
}

class FormEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.payload 
                ? {
                    ...props.payload,
                }
                : defaultPayload,
        }
    }

    renderForm() {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content-small background-white border-radius">
                    <div className="border-bottom padding-15px grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                {this.props.type === "create"
                                    ? "Tambah - Siswa"
                                    : this.props.type === "update"
                                        ? "Edit - Siswa"
                                        : "View - Siswa"}
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle btn-grey"
                                onClick={this.props.onClickClose}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>
                    <form action="#"
                        onSubmit={(e) => {
                            e.preventDefault()
                            this.props.onClickSave(this.state.data)}
                        }
                    >
                        <div className="border-bottom padding-15px grid-mobile-none gap-20px">
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        NISN
                                    </span>
                                </div>
                                <input
                                    readOnly={this.props.type === "view" ? true : false}
                                    style={
                                        this.props.type === "view"
                                            ? { backgroundColor: "#E6E6E6" }
                                            : null
                                    }
                                    type="text"
                                    className="txt txt-sekunder-color"
                                    placeholder="NISN"
                                    required
                                    value={this.state.data.nisn}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                nisn: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Nama Lengkap
                                    </span>
                                </div>
                                <input
                                    readOnly={this.props.type === "view" ? true : false}
                                    style={
                                        this.props.type === "view"
                                            ? { backgroundColor: "#E6E6E6" }
                                            : null
                                    }
                                    type="text"
                                    className="txt txt-sekunder-color"
                                    placeholder="Nama Lengkap"
                                    required
                                    value={this.state.data.nama}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                nama: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Kelas
                                    </span>
                                </div>
                                <input
                                    readOnly={this.props.type === "view" ? true : false}
                                    style={
                                        this.props.type === "view"
                                            ? { backgroundColor: "#E6E6E6" }
                                            : null
                                    }
                                    type="text"
                                    className="txt txt-sekunder-color"
                                    placeholder="Kelas"
                                    required
                                    value={this.state.data.kelas}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                kelas: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        sekolah
                                    </span>
                                </div>
                                <input
                                    readOnly={this.props.type === "view" ? true : false}
                                    style={
                                        this.props.type === "view"
                                            ? { backgroundColor: "#E6E6E6" }
                                            : null
                                    }
                                    type="text"
                                    className="txt txt-sekunder-color"
                                    placeholder="sekolah"
                                    required
                                    value={this.state.data.sekolah}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                sekolah: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Email
                                    </span>
                                </div>
                                <input
                                    readOnly={this.props.type === "view" ? true : false}
                                    style={
                                        this.props.type === "view"
                                            ? { backgroundColor: "#E6E6E6" }
                                            : null
                                    }
                                    type="email"
                                    className="txt txt-sekunder-color"
                                    placeholder="Email"
                                    required
                                    value={this.state.data.email}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                email: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Password
                                    </span>
                                </div>
                                <input
                                    readOnly={this.props.type === "view" ? true : false}
                                    style={
                                        this.props.type === "view"
                                            ? { backgroundColor: "#E6E6E6" }
                                            : null
                                    }
                                    type="password"
                                    className="txt txt-sekunder-color"
                                    placeholder="Password"
                                    required
                                    value={this.state.data.password}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                password: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className="padding-15px">
                            <div className="grid grid-2x">
                                <div className="col-1" />
                                <div className="col-2 content-right">
                                    {this.props.type !== "view" ? (
                                        <button
                                            style={{ marginLeft: "15px" }}
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                        <span>SAVE</span>
                                        </button>
                                    ) : null}
                                    <button
                                        style={{ marginLeft: "15px" }}
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={this.props.onClickClose}
                                    >
                                        <span>CLOSE</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="padding-bottom-20px" />
            </div>
        )
    }

    render() {
        return (
            <div>
                { this.renderForm() }
            </div>
        )
    }
}

export default FormEmployee
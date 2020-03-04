import React, { Component } from "react"
import CalendarPicker from '../../modules/popup/Calendar'
// import UploadFile from '../../modules/upload/upload'
import Dropzone from 'react-dropzone'
import Loader from 'react-loader-spinner'
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import MUIDataTable from "mui-datatables-bitozen"
import api from "../../services/Api"
// import M from 'moment'

let ct = require("../../modules/custom/customTable")

let defaultPayload = {
    "accountNonExpired": true,
    "accountNonLocked": true,
    "address": "",
    "birthDate": "",
    "birthPlace": "",
    "contactNumber": "",
    "credentialsNonExpired": true,
    "email": "",
    "employeePhotoURL": "",
    "enabled": true,
    "firstName": "",
    "id": "",
    "lastName": "",
    "nik": "",
    "password": "",
    "position": {
        "id": "",
        "positionName": ""
    },
    "role": "ROLE_USER",
    "username": ""
}

class FormEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataDetail: props.payload 
                ? {
                    ...props.payload,
                    // birthDate: props.payload.birthDate ? M(props.payload.birthDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
                }
                : defaultPayload,
            dataTablePosition: props.tablePosition ? props.tablePosition : [],
            visiblePopupPosition: false,
            loading: false,
            imageUrl: ''
        }
    }

    getMuiTheme = () => createMuiTheme(ct.customTable())
    options = ct.customOptions()

    columns = [
        "No",
        "ID",
        "Nama Jabatan",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div>
                            <button
                                className="btn btn-green btn-small"
                                style={{ marginRight: 5 }}
                                onClick={() =>
                                    this.openChoosePosition(tableMeta.rowData)
                                }>
                                PILIH
                            </button>
                        </div>
                    )
                }
            }
        }
    ]

    componentDidMount() {
        console.log('mount', this.state.dataDetail)
        this.getImageBlob(this.state.dataDetail.id, this.state.dataDetail.employeePhotoURL)
    }

    async getImageBlob(id, fileName) {
        let payload = id+'/'+fileName
        let res = await api.create("EMPLOYEE").downloadFotoEmployee(payload)
        if (res && res.status === 200) {
            return this.setState({ 
                imageUrl: res.config.url
            })
        }
        console.log(res)
    }

    async onDrop(acceptedFiles) {
        const formData = new FormData()
        formData.append('file', acceptedFiles[0])
        formData.append('id', this.state.dataDetail.id)
        let response = await api.create('EMPLOYEE').uploadFotoEmployee(formData)
        if (response && response.status === 200) {
            this.setState({
                dataDetail: {
                    ...this.state.dataDetail,
                    employeePhotoURL: response.data.fileName
                }
            })
            this.getImageBlob(this.state.dataDetail.id, response.data.fileName)
        } else {
            alert(response.data.message)
        }
    }

    onClickVisiblePosition = () => {
        this.setState({
            visiblePopupPosition: !this.state.visiblePopupPosition
        })
    }

    openChoosePosition = (val) => {
        let payload = {
            "id": val[1],
            "positionName": val[2]
        }
        this.setState({
            dataDetail: {
                ...this.state.dataDetail,
                position: payload
            }
        })
        this.onClickVisiblePosition()
    }

    renderPosition() {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content-small background-white border-radius">
                    <div className="padding-15px background-green grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                Jabatan Pegawai
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle background-green"
                                onClick={this.onClickVisiblePosition.bind(this)}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>

                    <div className="padding-5px">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Jabatan Pegawai"}
                                data={this.state.dataTablePosition}
                                columns={this.columns}
                                options={this.options}
                            />
                        </MuiThemeProvider>
                    </div>

                    <div className="padding-15px">
                        <div className="grid grid-2x">
                            <div className="col-1" />
                            <div className="col-2 content-right">
                                <button
                                    style={{ marginLeft: "15px" }}
                                    className="btn btn-white"
                                    type="button"
                                    onClick={this.onClickVisiblePosition.bind(this)}
                                >
                                    <span>CLOSE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="padding-top-20px" />
            </div>
        )
    }

    renderForm() {
        let {dataDetail} = this.state
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="padding-15px background-green grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                {this.props.type === "create"
                                    ? "Tambah - Pegawai"
                                    : this.props.type === "update"
                                        ? "Edit - Pegawai"
                                        : "View - Pegawai"}
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle background-green"
                                onClick={this.props.onClickClose}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>
                    
                    {this.props.type === "edit" ? (
                        <div className="margin-30px">
                            <div className="width width-160px width-center">
                                <div
                                    className="image image-160px image-circle margin-bottom-20px"
                                    style={{
                                        margin: "auto",
                                        backgroundColor: "#f8f8f8",
                                    }}>
                                    {this.state.loading && (
                                        <Loader
                                            type="ThreeDots"
                                            style={{display:'flex', justifyContent:'center',marginTop:45}}
                                            color={"#somecolor"}
                                            height={80}
                                            width={80}
                                            loading={this.state.loading}
                                    />
                                    )}
                                    {(this.state.imageUrl === "")
                                        ? this.state.loading === true ? <i />
                                        : (<i className="icn far fa-user fa-3x" />)
                                        : (<img src={this.state.imageUrl} alt="img" />)
                                    }
                                </div>
                                <div>
                                    {this.props.type !== 'view'
                                        ?
                                        <button
                                        className="btn btn-red btn-small-circle"
                                        type="button"
                                        align="center"
                                        style={{
                                            position: "absolute",
                                            bottom: "30px",
                                            right: "0"
                                        }}
                                        >
                                        <Dropzone onDrop={this.onDrop.bind(this)}>
                                            {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <i className="fa fa-lw fa-pencil-alt"></i>
                                            </div>
                                            )}
                                        </Dropzone>
                                        </button>
                                        : null}
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <span style={{ color: "red", fontSize: 11, marginBottom: 5 }}>*Image max 1Mb</span>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    <form 
                        action="#" 
                        onSubmit={(e) => { 
                            e.preventDefault() 
                            this.props.onSave(this.state.dataDetail) 
                        }}>
                            
                        <div className="border-bottom padding-15px grid grid-2x grid-mobile-none gap-20px">
                            <div className="col-1">
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Name Depan
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    firstName: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.firstName}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Name Belakang
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    lastName: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.lastName}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Tempat Lahir
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    birthPlace: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.birthPlace}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Tanggal Lahir
                                        </span>
                                    </div>
                                    <CalendarPicker
                                        date={dataDetail.birthDate}
                                        disabled={this.props.type === 'view' ? true : false}
                                        onChange={e => this.setState({
                                            dataDetail: {
                                                ...this.state.dataDetail,
                                                birthDate: e
                                            }
                                        })} />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Username
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    username: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.username}
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
                                        type="text"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    password: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.password}
                                    />
                                </div>
                            </div>


                            <div className="col-2">
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Jabatan
                                        </span>
                                    </div>

                                    <div className="card-date-picker" >
                                        <div className="double">
                                            <div className="input">
                                            <input
                                                type="text"
                                                className="ip"
                                                value={dataDetail.position.positionName}
                                                readOnly />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-grey border-left btn-no-radius"
                                                onClick={this.onClickVisiblePosition.bind(this)}>
                                                <i className="fa fa-lg fa-search" />
                                            </button> 
                                        </div>
                                    </div>
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Role
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    role: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.role}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Alamat
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    address: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.address}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Nomor Telpon
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    contactNumber: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.contactNumber}
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
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    email: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.email}
                                    />
                                </div>
                                <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            NIK
                                        </span>
                                    </div>
                                    <input
                                        readOnly={this.props.type === "view" ? true : false}
                                        style={
                                            this.props.type === "view"
                                                ? { backgroundColor: "#E6E6E6" }
                                                : null
                                        }
                                        type="number"
                                        className="txt txt-sekunder-color"
                                        placeholder=""
                                        required
                                        onChange={(e) => {
                                            this.setState({
                                                dataDetail: {
                                                    ...this.state.dataDetail,
                                                    nik: e.target.value
                                                }
                                            })
                                        }}
                                        value={dataDetail.nik}
                                    />
                                </div>
                                {/* {this.props.type === "edit" ? <div className="margin-bottom-15px">
                                    <div className="margin-5px">
                                        <span className="txt-site txt-11 txt-main txt-bold">
                                            Upload foto
                                        </span>
                                    </div>
                                    <UploadFile
                                        type={this.state.uploadStatus}
                                        percentage={this.state.percentage} 
                                        result={false}
                                        acceptedFiles={['png','jpg','jpeg']}
                                        onHandle={(dt) => {
                                            this.handleChange(dt)
                                        }}
                                        onUpload={() => {
                                          this.uploadDocument()  
                                        }}
                                    />
                                </div> : null} */}
                            </div>
                        </div>

                        <div className="padding-15px">
                            <div className="grid grid-2x">
                                <div className="col-1" />
                                <div className="col-2 content-right">
                                    {this.props.type !== "view" ? (
                                        <button
                                            style={{ marginLeft: "15px" }}
                                            className="btn btn-green"
                                            type="submit"
                                        >
                                            <span>SAVE</span>
                                        </button>
                                    ) : null}
                                    <button
                                        style={{ marginLeft: "15px" }}
                                        className="btn btn-white"
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
                <div className="padding-top-20px" />
            </div>
        )
    }

    render() {
        let {visiblePopupPosition} = this.state
        return (
            <div>
                { this.renderForm() }
                {
                    visiblePopupPosition && (
                        this.renderPosition()
                    )
                }
            </div>
        )
    }
}

export default FormEmployee
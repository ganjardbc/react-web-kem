import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
// import PopUp from "../../pages/PopUpAlert";
import api from "../../services/Api";
import FormStudents from "./formStudents";
import FormKem from "./formKem";
// import M from 'moment';

let ct = require("../../modules/custom/customTable")

class Students extends Component {
    constructor() {
        super()
        this.state = {
            rawData: [],
            dataTable: [],
            rawDataPosition: [],
            dataTablePosition: [],
            deletePopUpVisible: false,
            createVisible: false,
            editVisible: false,
            deletePopUpVisible: false,
            linearProgress: false,
            formKemVisible: false,
            selectedIndex: 0,
            limit: 5,
            number: 0,
            table_query: "",
            positionCount: 0
        }
    }

    componentDidMount() {
        this.getData(this.state.limit, this.state.number)
    }

    linearProgress = () => {
        this.setState({ linearProgress: !this.state.linearProgress })
    }

    async getCountData() {

        let param = {
            "id_user": 1
        }

        let response = await api.create('MAIN').getAllPagingStudents(param)
        if (response.status === 200) {
            this.setState({
                positionCount: response.data.length
            })
        }

        console.log(response)
    }

    async getData(limit, number) {
        this.linearProgress()

        let params = {
            "id_user": 1
        }

        let response = await api.create('MAIN').getAllPagingSiswa(params)
        if (response.status === 200 && response.data.status === 'S') {
            let dataTable = response.data.data.map((value, index) => {
                let {id, nisn, username, nama, kelas, email, sekolah, id_avatar} = value
                return [
                    index += 1,
                    id, 
                    nisn,
                    username,
                    nama,
                    kelas,
                    email,
                    sekolah, 
                    id_avatar
                ]
            })
            this.setState({
                rawData: response.data.data,
                dataTable
            })
            this.linearProgress()
        } else {
            if (response.data && response.data.message) alert(response.data.message)
            this.linearProgress()
        }
    }

    handleSubmit = async (data) => {
        let payload = {
            ...data
        }
        let response = await api.create('MAIN').createSiswa(payload)
        if (response.ok && response.status === 200) {
            this.openCreateForm()
            this.getData(this.state.limit, this.state.number)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
        console.log(response)
    }

    handleUpdate = async (data) => {
        var a = window.confirm('ubah data ini?')
        if (a) {
            let payload = {
                ...data,
                "id_user": 1,
                "id_siswa": this.state.rawData[this.state.selectedIndex].id
            }
            let response = await api.create('MAIN').updateSiswa(payload)
            if (response.ok && response.status === 200) {
                this.openEditForm()
                this.getData(this.state.limit, this.state.number)
            } else {
                if (response.data && response.data.message) alert(response.data.message)
            }
            console.log(response)
        }
    }

    handleDelete = async (index) => {
        var a = window.confirm('hapus data ini?')
        if (a) {
            let payload = {
                "id_user": 1,
                "nisn": index,
            }
            let response = await api.create('MAIN').deleteSiswa(payload)
            if (response.ok && response.status === 200) {
                this.getData(this.state.limit, this.state.number)
            } else {
                if (response.data && response.data.message) alert(response.data.message)
            }
            console.log(response)
        }
    }

    openFormKem = (index = null) => {
        this.setState({ formKemVisible: !this.state.formKemVisible, selectedIndex: index })
    }

    openCreateForm = () => {
        this.setState({ createVisible: !this.state.createVisible })
    };

    openEditForm = (index = null) => {
        this.setState({ editVisible: !this.state.editVisible, selectedIndex: index })
        console.log(this.state.rawData[index])
    };
 
    openDeletePopup = (index) => {
        this.setState({ deletePopUpVisible: !this.state.deletePopUpVisible, selectedIndex: index })
    };

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    columns = [
        "No",
        "ID",
        "NISN",
        "Username",
        "Nama",
        "Kelas",
        "Email",
        "Sekolah",
        "Avatar",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div style={{width: '160px'}} className="display-flex-normal">
                            <button
                                className="btn btn-small btn-primary btn-radius"
                                style={{ marginRight: 5 }}
                                onClick={() => {
                                    this.openFormKem(tableMeta.rowData[1])
                                }}
                            >
                                Hasil Kem
                            </button>
                            <button
                                className="btn btn-primary btn-small-circle"
                                style={{ marginRight: 5 }}
                                onClick={() => this.openEditForm(tableMeta.rowIndex)}
                            >
                                <i className="fa fa-lw fa-pencil-alt" />
                            </button>
                            <button
                                className="btn btn-primary btn-small-circle"
                                onClick={() => this.handleDelete(tableMeta.rowData[2])}>
                                <i className="fa fa-lw fa-trash-alt" />
                            </button>
                        </div>
                    )
                }
            }
        }
    ]

    render() {
        let {positionCount, table_query} = this.state
        let tableOptions = {
            ...this.options,
            serverSide: true,
            count: positionCount,
            searchText: table_query,
            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changePage':
                        this.setState({ table_page: tableState.page })
                        this.getData(tableState.rowsPerPage, tableState.page);
                        break;
                    case 'changeRowsPerPage':
                        this.setState({ table_limit: tableState.rowsPerPage })
                        this.getData(tableState.rowsPerPage, tableState.page);
                        break;
                    case 'search':
                        let searchText = tableState.searchText ? tableState.searchText : ""
                        this.setState({ table_query: searchText }, () => {
                            this.getData(tableState.rowsPerPage, tableState.page)
                        })
                        break;
                    default:
                        break;
                }
            }
        }
        return (
            <div className="main-content">
                <div className="padding-5px">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Siswa"}
                            key={positionCount}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={tableOptions}
                            buttonCreate={true}
                            linearProgress={this.state.linearProgress}
                            onCreate={this.openCreateForm.bind(this)}
                        />
                    </MuiThemeProvider>
                </div>

                {this.state.createVisible && (
                    <FormStudents
                        type={"create"}
                        onClickClose={this.openCreateForm}
                        onClickSave={this.handleSubmit.bind(this)}
                    />
                )}

                {this.state.editVisible && (
                    <FormStudents
                        type={"edit"}
                        payload={this.state.rawData[this.state.selectedIndex]}
                        onClickClose={this.openEditForm}
                        onClickSave={this.handleUpdate.bind(this)}
                    />
                )}

                {this.state.formKemVisible && (
                    <FormKem
                        id_user={this.state.rawData[this.state.selectedIndex].id}
                        onClickClose={this.openFormKem}
                    />
                )}
            </div>
        )
    }
}

export default Students
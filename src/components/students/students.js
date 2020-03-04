import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";
import PopUp from "../../pages/PopUpAlert";
import api from "../../services/Api";
import FormStudents from "./formStudents";
import M from 'moment';

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
            selectedIndex: 0,
            limit: 5,
            number: 0,
            table_query: "",
            positionCount: 0
        }
    }

    componentDidMount() {
        this.startFetch()
        this.getData(this.state.limit, this.state.number)
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
        let params = {
            "id_user": 1
        }

        let response = await api.create('MAIN').getAllPagingSiswa(params)
        if (response.status === 200 && response.data.status === 'S') {
            let dataTable = response.data.data.map((value, index) => {
                let {id, nisin, username, nama, kelas, email, sekolah, id_avatar} = value
                return [
                    index += 1,
                    id, 
                    nisin,
                    username,
                    nama,
                    kelas,
                    email,
                    sekolah, 
                    id_avatar
                ]
            })
            this.setState({
                rawData: response.data,
                dataTable
            })
            this.onFinishFetch()
            // console.log('succ', response)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
            this.onFinishFetch()
        }
    }

    handleSubmit = async (data) => {
        let payload = {
            ...data,
            birthDate: M(data.birthDate).format("YYYY-MM-DD")
        }
        console.log(payload)
        let response = await api.create('Students').postStudents(payload)
        if (response.ok && response.status === 200) {
            this.setState({ createVisible: false, editVisible: false })
            this.getData(this.state.limit, this.state.number)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
        console.log(response)
    }

    handleUpdate = async (data) => {
        let payload = {
            ...data,
            birthDate: M(data.birthDate).format("YYYY-MM-DD")
        }
        let response = await api.create('Students').putStudents(payload)
        if (response.ok && response.status === 200) {
            this.setState({ createVisible: false, editVisible: false })
            this.getData(this.state.limit, this.state.number)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
        console.log(response)
    }

    handleDelete = async (data) => {
        let payload = {
            "id": this.state.rawData[this.state.selectedIndex].id,
        }
        let response = await api.create('Students').deleteStudents(payload.id)
        if (response.ok && response.status === 200) {
            this.setState({ deletePopUpVisible: false })
            this.getData(this.state.limit, this.state.number)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
        console.log(payload)
    }

    openCreateForm = () => {
        this.setState({ createVisible: !this.state.createVisible })
    };

    openEditForm = (index = null) => {
        this.setState({ editVisible: !this.state.editVisible, selectedIndex: index })
    };
 
    openDeletePopup = (index) => {
        this.setState({ deletePopUpVisible: !this.state.deletePopUpVisible, selectedIndex: index })
    };

    startFetch = () => {
        this.LoadingBar.continousStart()
    }

    onFinishFetch = () => {
        if (typeof this.LoadingBar === "object") this.LoadingBar.complete()
    }

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
                        <div className="display-flex-normal">
                            <button
                                className="btn btn-green btn-small-circle"
                                style={{ marginRight: 5 }}
                                onClick={() =>
                                    this.openEditForm(tableMeta.rowIndex)
                                }
                            >
                                <i className="fa fa-lw fa-pencil-alt" />
                            </button>
                            <button
                                className="btn btn-red btn-small-circle"
                                onClick={() => this.openDeletePopup(tableMeta.rowIndex)}>
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
                <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                <div className="padding-5px">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Murid"}
                            key={positionCount}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={tableOptions}
                            buttonCreate={true}
                            onCreate={this.openCreateForm.bind(this)}
                        />
                    </MuiThemeProvider>
                </div>

                {this.state.createVisible && (
                    <FormStudents
                        type={"create"}
                        tablePosition={this.state.dataTablePosition}
                        onClickClose={this.openCreateForm}
                        onSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.editVisible && (
                    <FormStudents
                        type={"edit"}
                        tablePosition={this.state.dataTablePosition}
                        payload={this.state.rawData[this.state.selectedIndex]}
                        onClickClose={this.openEditForm}
                        onSave={this.handleUpdate.bind(this)}
                    />
                )}

                {this.state.deletePopUpVisible && (
                    <PopUp
                        type={"delete"}
                        class={"app-popup app-popup-show"}
                        onClickDelete={this.handleDelete}
                        onClick={this.openDeletePopup}
                    />
                )}
            </div>
        )
    }
}

export default Students
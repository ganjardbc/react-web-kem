import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import FormTexts from "./formTexts";
import FormQa from "./formQa";
import api from "../../services/Api";

let ct = require("../../modules/custom/customTable")
const options = ct.customOptions();

class Texts extends Component {
    constructor() {
        super()
        this.state = {
            clEditAble: '',
            editAble: false,
            rawData: [],
            dataTable: [],
            createVisible: false,
            editVisible: false,
            formQaVisible: false,
            linearProgress: false,
            table_limit: 5,
            table_page: 0,
            table_query: "",
            textsCount: 0,
        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    opEditAble = () => {
        if (this.state.editAble === false) {
            this.setState({
                clEditAble: 'edit-able',
                editAble: true,
            })
        } else {
            this.setState({
                clEditAble: '',
                editAble: false,
            })
        }
    }

    openFormQa = (index = null) => {
        this.setState({ formQaVisible: !this.state.formQaVisible, selectedIndex: index })
    }

    openCreateForm = () => {
        this.setState({ createVisible: !this.state.createVisible })
    }

    openEditForm = (index = null) => {
        this.setState({ editVisible: !this.state.editVisible, selectedIndex: index })
    }

    componentDidMount() {
        this.getData();
    }

    linearProgress = () => {
        this.setState({ linearProgress: !this.state.linearProgress })
    }

    handleSubmit = async (data) => {
        let payload = data
        let response = await api.create('MAIN').createBacaan(payload)
        if (response.ok && response.status === 200) {
            if (response.data.status === 'S') {
                alert(response.data.message)
                this.openCreateForm()
                this.getData()
            } else {
                alert(response.data.message)
            }
        } else {
            if(response.data && response.data.message) alert(response.data.message)
        }
    }

    handleUpdate = async (data) => {
        var a = window.confirm('ubah data ini?')
        if (a) {
            let payload = {
                "id_user": 1,
                "id_bacaan": data.id,
                "judul": data.judul,
                "isi": data.isi
            }
            console.info('payload ==> ', payload)
            let response = await api.create('MAIN').updateBacaan(payload)
            if (response.ok && response.status === 200) {
                if (response.data.status === 'S') {
                    alert(response.data.message)
                    this.openEditForm()
                    this.getData()
                } else {
                    alert(response.data.message)
                }
            } else {
                if(response.data && response.data.message) alert(response.data.message)
            }
        }
    }

    handleDelete = async (id) => {
        var a = window.confirm('hapus data ini?')
        if (a) {
            let payload = {
                "id_user": 1,
                "id_bacaan": id
            }
            let response = await api.create('MAIN').deleteBacaan(payload)
            if (response.ok && response.status === 200) {
                if (response.data.status === 'S') {
                    alert(response.data.message)
                    this.getData()
                } else {
                    alert(response.data.message)
                }
            } else {
                if (response.data && response.data.message) alert(response.data.message)
            }
        }
    }

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    async getData(){
        this.linearProgress()

        let param = {
            "id_user": 1
        }

        let response = await api.create('MAIN').getAllPagingBacaan(param)
        if(response.status === 200 && response.data.status === 'S'){
            let dataTable = response.data.data.map((value, index) => {
                const { id, judul, jumlah_kata } = value;
                return [
                    index += (1 + (this.state.table_page * this.state.table_limit)),
                    id,
                    judul,
                    jumlah_kata
                ]
            })
            this.setState({
                rawData: response.data.data,
                dataTable
            })
            this.linearProgress()
        } else {
            this.linearProgress()
        }
        // this.getCountData()
        // console.log(response)
    }

    async getCountData() {
        let param = {
            id_user: '1'
        }

        let response = await api.create('LATIHAN').getAllPagingLatihan(param)
        if (response.status === 200) {
            this.setState({
                textsCount: response.data.length
            })
        }
    }

    columns = [
        "No",
        "ID",
        "Judul",
        "Jumlah Kata",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div style={{width: '240px'}} className="display-flex-number">
                            <button
                                className="btn btn-small btn-primary btn-radius"
                                style={{ marginRight: 5 }}
                                onClick={() => {
                                    this.openFormQa(tableMeta.rowData[1])
                                }}
                            >
                                Lihat Soal & Jawaban
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
                                onClick={() => this.handleDelete(tableMeta.rowData[1])}>
                                <i className="fa fa-lw fa-trash-alt" />
                            </button>
                        </div>
                    )
                }
            }
        }
    ]

    render() {

        let { textsCount, table_query } = this.state
        let tableOptions = {
            ...options,
            serverSide: true,
            count: textsCount,
            searchText: table_query,
            onTableChange: (action, tableState) => {
                switch (action) {
                    case 'changePage':
                        this.setState({ table_page: tableState.page })
                        this.getData(tableState.rowsPerPage, tableState.page)
                        break;
                    case 'changeRowsPerPage':
                        this.setState({ table_limit: tableState.rowsPerPage })
                        this.getData(tableState.rowsPerPage, tableState.page)
                        break;
                    case 'search':
                        let searchText = tableState.searchText ? tableState.searchText: ""
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
                            title={"Daftar Bacaan"}
                            key={textsCount}
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
                    <FormTexts
                        type={"create"}
                        onClickClose={this.openCreateForm}
                        onClickSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.editVisible && (
                    <FormTexts
                        type={"update"}
                        data={this.state.rawData[this.state.selectedIndex]}
                        onClickClose={this.openEditForm}
                        onClickSave={this.handleUpdate.bind(this)}
                    />
                )}
                {this.state.formQaVisible && (
                    <FormQa
                        id_bacaan={this.state.selectedIndex}
                        onClickClose={this.openFormQa} />
                )}
            </div>
        );
    }
}

export default Texts
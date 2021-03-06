import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import PopUp from "../../pages/PopUpAlert";
import api from "../../services/Api";
import FormKem from "./formKem";
import M from 'moment';

let ct = require("../../modules/custom/customTable")

class Kem extends Component {
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

        let response = await api.create('MAIN').getAllPagingKem(param)
        if (response.status === 200) {
            this.setState({
                positionCount: response.data.length
            })
        }

        console.log(response)
    }

    async getData(limit, number) {
        this.linearProgress()

        let params = {}

        let response = await api.create('MAIN').getAllPagingKem(params)
        console.log(response)
        if (response.status === 200 && response.data.status === 'S') {
            let dataTable = response.data.data.map((value, index) => {
                let {id, nilai, waktu, jumlah_benar, bacaan, user} = value
                return [
                    index += 1,
                    id, 
                    nilai,
                    waktu,
                    jumlah_benar,
                    bacaan.judul,
                    user.nama,
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
            ...data,
            birthDate: M(data.birthDate).format("YYYY-MM-DD")
        }
        console.log(payload)
        let response = await api.create('Kem').postKem(payload)
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
        let response = await api.create('Kem').putKem(payload)
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
        let response = await api.create('Kem').deleteKem(payload.id)
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

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    columns = [
        "No",
        "ID",
        "Nilai",
        "Waktu",
        "Jumlah Benar",
        "Bacaan",
        "Siswa",
    //     {
    //         name: "Action",
    //         options: {
    //             customBodyRender: (val, tableMeta) => {
    //                 return (
    //                     <div className="display-flex-normal">
    //                         <button
    //                             className="btn btn-primary btn-small-circle"
    //                             style={{ marginRight: 5 }}
    //                             onClick={() =>
    //                                 this.openEditForm(tableMeta.rowIndex)
    //                             }
    //                         >
    //                             <i className="fa fa-lw fa-pencil-alt" />
    //                         </button>
    //                         <button
    //                             className="btn btn-primary btn-small-circle"
    //                             onClick={() => this.openDeletePopup(tableMeta.rowIndex)}>
    //                             <i className="fa fa-lw fa-trash-alt" />
    //                         </button>
    //                     </div>
    //                 )
    //             }
    //         }
    //     }
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
                            title={"Hasil KEM"}
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
                    <FormKem
                        type={"create"}
                        tablePosition={this.state.dataTablePosition}
                        onClickClose={this.openCreateForm}
                        onSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.editVisible && (
                    <FormKem
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

export default Kem
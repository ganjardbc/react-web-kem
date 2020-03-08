import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import PopUp from "../../pages/PopUpAlert";
import FormTraining from "./formTraining";
import FormReads from "./reads";
import api from "../../services/Api";

let ct = require("../../modules/custom/customTable")
const options = ct.customOptions();

class Training extends Component {
    constructor() {
        super()
        this.state = {
            clEditAble: '',
            editAble: false,
            rawData: [],
            dataTable: [],
            createVisible: false,
            editVisible: false,
            savePopUpVisible: false,
            readsPopUpVisible: false,
            linearProgress: false,
            table_limit: 5,
            table_page: 0,
            table_query: "",
            trainingCount: 0,
            id_bacaan: 0
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

    openReadsForm = () => {
        this.setState({ readsPopUpVisible: !this.state.readsPopUpVisible })
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

    openSavePopUp = () => {
        this.setState({ savePopUpVisible: !this.state.savePopUpVisible })
    };

    linearProgress = () => {
        this.setState({ linearProgress: !this.state.linearProgress })
    }

    componentDidMount() {
        this.getData(this.state.table_limit, this.state.table_page);
    }

    handlePopUp = () => {
        this.getData()
        this.setState({
            savePopUpVisible: false,
            createVisible: false,
            editVisible: false
        })
    }

    handleSubmit = async (data) => {
        let payload = {
            "TrainingName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('Training').postTraining(payload)
        if (response.ok && response.status === 200) {
            this.openSavePopUp()
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if(response.data && response.data.message) alert(response.data.message)
        }
    }

    handleUpdate = async (data) => {
        let payload = {
            "id": this.state.rawData[this.state.selectedIndex].id,
            "TrainingName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('Training').postTraining(payload)
        if (response.ok && response.status === 200) {
            this.openSavePopUp()
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if (response.data && response.data.message) alert(response.data.messagae)
        }
    }

    handleDelete = async (data) => {
        let payload = {
            "id": this.state.rawData[this.state.selectedIndex].id,
            "TrainingName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('Training').deleteTraining(payload.id)
        if (response.ok && response.status === 200) {
            this.setState({ deletePopUpVisible: false })
            this.getData(this.state.table_limit, this.state.table_page)
        } else {
            if (response.data && response.data.message) alert(response.data.message)
        }
    }

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    async getData(limit, number){
        this.linearProgress()

        let param = {
            "id_user": 1
        }

        let response = await api.create('MAIN').getAllPagingLatihan(param)
        if(response.status === 200 && response.data.status === 'S'){
            let dataTable = response.data.data.map((value, index) => {
                const { id, judul, jumlah_kata, done } = value;
                return [
                    index += (1 + (this.state.table_page * this.state.table_limit)),
                    id,
                    judul,
                    jumlah_kata,
                    done
                ]
            })
            this.setState({
                rawData: response.data,
                dataTable
            })
            this.linearProgress()
        } else {
            this.linearProgress()
        }
    }

    async getCountData() {
        let param = {
            id_user: '1'
        }

        let response = await api.create('MAIN').getAllPagingLatihan(param)
        if (response.status === 200) {
            this.setState({
                trainingCount: response.data.length
            })
        }
    }

    columns = [
        "No",
        "ID",
        "Judul",
        "Jumlah Kata",
        "Status",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div className="display-flex-normal">
                            <button
                                className="btn btn-small btn-primary btn-radius"
                                style={{ marginRight: 5 }}
                                onClick={() => {
                                    this.openReadsForm()
                                    this.setState({
                                        id_bacaan: tableMeta.rowData[1]
                                    })
                                    console.log(tableMeta.rowData[1])
                                }}
                            >
                                Lihat Bacaan
                            </button>
                            {/* <button
                                className="btn btn-primary btn-small-circle"
                                style={{ marginRight: 5 }}
                                onClick={() =>
                                    this.openEditForm(tableMeta.rowIndex)
                                }
                            >
                                <i className="fa fa-lw fa-pencil-alt" />
                            </button>
                            <button
                                className="btn btn-primary btn-small-circle"
                                onClick={() => this.openDeletePopup(tableMeta.rowIndex)}>
                                <i className="fa fa-lw fa-trash-alt" />
                            </button> */}
                        </div>
                    )
                }
            }
        }
    ]

    render() {

        let { trainingCount, table_query } = this.state
        let tableOptions = {
            ...options,
            serverSide: true,
            count: trainingCount,
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
                            title={"Latihan"}
                            key={trainingCount}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={tableOptions}
                            buttonCreate={true}
                            linearProgress={this.state.linearProgress}
                            onCreate={this.openCreateForm.bind(this)}
                        />
                    </MuiThemeProvider>
                </div>
                {this.state.readsPopUpVisible && (
                    <FormReads
                        id_bacaan={this.state.id_bacaan}
                        onClickClose={this.openReadsForm}
                    />
                )}
                {this.state.createVisible && (
                    <FormTraining
                        type={"create"}
                        onClickClose={this.openCreateForm}
                        onClickSave={this.handleSubmit.bind(this)}
                    />
                )}
                {this.state.editVisible && (
                    <FormTraining
                        type={"update"}
                        data={this.state.rawData[this.state.selectedIndex]}
                        onClickClose={this.openEditForm}
                        onClickSave={this.handleUpdate.bind(this)}
                    />
                )}
                {this.state.savePopUpVisible && (
                    <PopUp
                        type={"save"}
                        class={"app-popup app-popup-show"}
                        onClick={this.handlePopUp.bind(this)}
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
        );
    }
}

export default Training
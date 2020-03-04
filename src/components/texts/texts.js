import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import LoadingBar from "react-top-loading-bar";
import PopUp from "../../pages/PopUpAlert";
import FormTexts from "./formTexts";
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
            savePopUpVisible: false,
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

    startFetch = () => {
        this.LoadingBar.continousStart()
    }

    onFinishFetch = () => {
        if (typeof this.LoadingBar === "object") this.LoadingBar.complete()
    }

    componentDidMount() {
        this.startFetch();
        this.getData(this.state.table_limit, this.state.table_page);
        console.log('id', localStorage.getItem('id'))
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
            "TextsName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('TEXTS').postTexts(payload)
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
            "TextsName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('TEXTS').postTexts(payload)
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
            "TextsName": data
        }
        console.info('payload ==> ', payload)
        let response = await api.create('TEXTS').deleteTexts(payload.id)
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
            this.onFinishFetch()
        } else {
            this.onFinishFetch()
        }
        // this.getCountData()
        console.log(response)
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
        "Status",
        {
            name: "Action",
            options: {
                customBodyRender: (val, tableMeta) => {
                    return (
                        <div>
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
                <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
                {/* <div className="col-2 content-right">
                    <button
                        type="button"
                        className="btn btn-circle background-green"
                        style={{ marginRight: 5 }}
                        onClick={this.openCreateForm.bind(this)}
                    >
                        <i className="fa fa-1x fa-plus" />
                    </button>
                </div> */}
                <div className="padding-5px">
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={"Latihan"}
                            key={textsCount}
                            data={this.state.dataTable}
                            columns={this.columns}
                            options={tableOptions}
                            buttonCreate={true}
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

export default Texts
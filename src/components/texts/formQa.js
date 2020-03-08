import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import api from "../../services/Api";

let ct = require("../../modules/custom/customTable")
// const options = ct.customOptions();

let defaulPayload = {
	"id_user": "1",
	"id_bacaans": 0,
	"data": [
		{
			"soal": "aku kenapa",
			"indexJawabanBenar": 0,
			"jawaban": [
				"Aku gatau",
				"Kamu gatau",
				"Mereka gatau",
				"Kita sama sama gatau"
			]
		}
	]
}

class PageQA extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_bacaan: props.idBacaan,
            linearProgress: false,
            visibleJawaban: false,
            data: {
                ...defaulPayload,
                "id_bacaans": props.id_bacaan
            }
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData(){
        this.linearProgress()

        let param = {
            "id_user": 1,
            "id_bacaan": this.props.id_bacaan
        }

        let response = await api.create('MAIN').getListSoalByBacaanId(param)
        if(response.status === 200 && response.data.status === 'S'){
            let dataTable = response.data.data.map((value, index) => {
                const { id, soal, id_jawaban_benar } = value;
                return [
                    index += 1,
                    id,
                    soal,
                    id_jawaban_benar
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
        console.log(response)
    }

    linearProgress = () => {
        this.setState({ linearProgress: !this.state.linearProgress })
    }

    openJawaban = (index = null) => {
        let dataTableJawaban = []
        if (index !== null) {
            let soal = this.state.rawData[index]
            let jawaban = soal.jawaban
            dataTableJawaban = jawaban.map((value, index) => {
                const {id, jawaban} = value
                return [
                    index += 1,
                    id,
                    jawaban
                ]
            })
        }
        this.setState({ visibleJawaban: !this.state.visibleJawaban, dataTableJawaban })
    }

    getMuiTheme = () => createMuiTheme(ct.customTable());
    options = ct.customOptions()

    renderMain() {
        let columns = [
            "No",
            "ID",
            "Soal",
            "Jawaban Benar",
            {
                name: "Action",
                options: {
                    customBodyRender: (val, tableMeta) => {
                        return (
                            <div style={{width: '200px'}} className="display-flex-number">
                                <button
                                    className="btn btn-small btn-primary btn-radius"
                                    style={{ marginRight: 5 }}
                                    onClick={() => this.openJawaban(tableMeta.rowIndex)}
                                >
                                    Lihat Jawaban
                                </button>
                                <button
                                    className="btn btn-primary btn-small-circle"
                                    style={{ marginRight: 5 }}
                                    onClick={() => alert(tableMeta.rowIndex)}
                                >
                                    <i className="fa fa-lw fa-pencil-alt" />
                                </button>
                                <button
                                    className="btn btn-primary btn-small-circle"
                                    onClick={() => alert(tableMeta.rowData[1])}>
                                    <i className="fa fa-lw fa-trash-alt" />
                                </button>
                            </div>
                        )
                    }
                }
            }
        ]
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="border-bottom padding-15px grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold txt-main post-center">
                                Daftar Soal
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

                    <div className="border-bottom padding-15px">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Daftar Soal"}
                                data={this.state.dataTable}
                                columns={columns}
                                options={this.options}
                                buttonCreate={true}
                                linearProgress={this.state.linearProgress}
                                onCreate={() => {alert('ahuy')}}
                            />
                        </MuiThemeProvider>
                    </div>

                    <div className="padding-15px">
                        <div className="grid grid-2x">
                            <div className="col-1" />
                            <div className="col-2 content-right">
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
                </div>
                <div className="padding-bottom-20px" />
            </div>
        )
    }

    renderJawaban() {
        let columns = [
            "No",
            "ID",
            "Jawaban",
            {
                name: "Action",
                options: {
                    customBodyRender: (val, tableMeta) => {
                        return (
                            <div className="display-flex-number">
                                <button
                                    className="btn btn-primary btn-small-circle"
                                    style={{ marginRight: 5 }}
                                    onClick={() => alert(tableMeta.rowIndex)}
                                >
                                    <i className="fa fa-lw fa-pencil-alt" />
                                </button>
                                <button
                                    className="btn btn-primary btn-small-circle"
                                    onClick={() => alert(tableMeta.rowData[1])}>
                                    <i className="fa fa-lw fa-trash-alt" />
                                </button>
                            </div>
                        )
                    }
                }
            }
        ]
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="border-bottom padding-15px grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold txt-main post-center">
                                Daftar Jawaban
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle btn-grey"
                                onClick={() => this.openJawaban()}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>

                    <div className="border-bottom padding-15px">
                        <MuiThemeProvider theme={this.getMuiTheme()}>
                            <MUIDataTable
                                title={"Daftar Jawaban"}
                                data={this.state.dataTableJawaban}
                                columns={columns}
                                options={this.options}
                                buttonCreate={true}
                                linearProgress={this.state.linearProgress}
                                onCreate={() => {alert('ahuy')}}
                            />
                        </MuiThemeProvider>
                    </div>

                    <div className="padding-15px">
                        <div className="grid grid-2x">
                            <div className="col-1" />
                            <div className="col-2 content-right">
                                <button
                                    style={{ marginLeft: "15px" }}
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => this.openJawaban()}
                                >
                                    <span>CLOSE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="padding-bottom-20px" />
            </div>
        )
    }

    render() {
        return(
            <div>
                { this.renderMain() }

                { this.state.visibleJawaban && (
                    this.renderJawaban()
                ) }
            </div>
        )
    }

}

export default PageQA;
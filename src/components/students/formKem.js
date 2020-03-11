import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import api from "../../services/Api";

let ct = require("../../modules/custom/customTable")
// const options = ct.customOptions();

class PageKem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_bacaan: props.idBacaan,
            linearProgress: false
        }
    }

    componentDidMount() {
        this.getData()
    }

    async getData(){
        this.linearProgress()

        let param = {
            "id_user": this.props.id_user
        }

        let response = await api.create('MAIN').getChartsKem(param)
        if(response.status === 200 && response.data.status === 'S'){
            let dataTable = response.data.data.map((value, index) => {
                const { nilai, judul } = value;
                return [
                    index += 1,
                    nilai,
                    judul,
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

    getMuiTheme = () => createMuiTheme(ct.customTable());

    options = ct.customOptions()

    columns = [
        "No",
        "Nilai",
        "Judul"
    ]

    render() {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="border-bottom padding-15px grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold txt-main post-center">
                                Hasil Kem Per-siswa
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
                                title={"Hasil Kem"}
                                data={this.state.dataTable}
                                columns={this.columns}
                                options={this.options}
                                linearProgress={this.state.linearProgress}
                                // buttonCreate={true}
                                // onCreate={() => {alert('ahuy')}}
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
        );
    }

}

export default PageKem;
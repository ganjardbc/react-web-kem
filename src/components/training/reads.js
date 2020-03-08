import React, { Component } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables-bitozen";
import api from "../../services/Api";

let ct = require("../../modules/custom/customTable")

class PageReads extends Component {
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
            "id_user": 1,
            "id_bacaan": this.props.id_bacaan
        }

        let response = await api.create('MAIN').getFullBacaan(param)
        if(response.status === 200 && response.data.status === 'S'){
            let data = response.data.data
            this.setState({
                judul: data.judul,
                isi: data.isi,
                soal: data.soal
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

    // getMuiTheme = () => createMuiTheme(ct.customTable());

    // options = ct.customOptions()

    // columns = [
    //     "No",
    //     "Nilai",
    //     "Judul"
    // ]

    render() {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="border-bottom padding-15px grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold txt-main post-center">
                                Bacaan
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
                        <div className="padding-15px border-bottom">
                            <div className="margin-bottom-20px">
                                <h1>
                                    {this.state.judul}
                                </h1>
                            </div>
                            <div>
                                <p>
                                    {this.state.isi}
                                </p>
                            </div>
                        </div>
                        <div className="padding-15px">
                            <ol className="padding-left-15px">
                                {this.state.soal && this.state.soal.map((value, index) => {
                                    return (
                                        <li className="margin-bottom-10px">
                                            <div className="txt-site txt-11 txt-bold txt-main">
                                                {value.soal}
                                            </div>
                                            <ol type="a" className="padding-left-15px">
                                                {value.jawaban && value.jawaban.map((value2, index2) => {
                                                    return(
                                                        <li>
                                                            <div className="txt-site txt-11 txt-thin txt-main">
                                                                {value2.jawaban}
                                                            </div>
                                                        </li>
                                                    ) 
                                                })}
                                            </ol>
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>
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

export default PageReads;
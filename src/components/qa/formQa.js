import React, { Component } from "react";

const payloadDefault = {
    "id_user": 1,
    "judul": "",
	"isi": "",
}

class FormRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.data ? props.data :
            {
                ...payloadDefault
            }
        }
    }

    // componentDidMount() {
    //     console.log(this.props.data)
    // }

    render() {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="border-bottom padding-15px grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                {this.props.type === "create"
                                    ? "Tambah - Soal & Jawaban"
                                    : this.props.type === "update"
                                        ? "Edit - Soal & Jawaban"
                                        : "View - Soal & Jawaban"}
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
                    <form action="#"
                        onSubmit={(e) => {
                            e.preventDefault()
                            this.props.onClickSave(this.state.data)}
                        }
                    >
                        <div className="border-bottom padding-15px grid-mobile-none gap-20px">
                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        Judul
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
                                    placeholder="Judul"
                                    required
                                    value={this.state.data.judul}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                judul: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>

                            <div className="margin-bottom-15px">
                                <div className="margin-5px">
                                    <span className="txt-site txt-11 txt-main txt-bold">
                                        isi
                                    </span>
                                </div>
                                <textarea
                                    readOnly={this.props.type === "view" ? true : false}
                                    style={
                                        this.props.type === "view"
                                            ? { backgroundColor: "#E6E6E6" }
                                            : null
                                    }
                                    type="text"
                                    className="txt txt-sekunder-color edit-text"
                                    placeholder="Isi"
                                    required
                                    value={this.state.data.isi}
                                    onChange={(e) => {
                                        this.setState({
                                            data: {
                                                ...this.state.data,
                                                isi: e.target.value
                                            }
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="padding-15px">
                            <div className="grid grid-2x">
                                <div className="col-1" />
                                <div className="col-2 content-right">
                                    {this.props.type !== "view" ? (
                                        <button
                                            style={{ marginLeft: "15px" }}
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                        <span>SAVE</span>
                                        </button>
                                    ) : null}
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
                    </form>
                </div>
                <div className="padding-bottom-20px" />
            </div>
        );
    }

}

export default FormRoom;
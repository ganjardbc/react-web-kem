import React, { Component } from "react";

class PageReads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_bacaan: props.idBacaan
        }
    }

    componentDidMount() {
        console.log(this.props.id_bacaan)
    }

    render() {
        return (
            <div className={"app-popup app-popup-show"}>
                <div className="padding-top-20px" />
                <div className="popup-content background-white border-radius">
                    <div className="padding-15px background-green grid grid-2x">
                        <div className="col-1">
                            <div className="txt-site txt-12 txt-bold post-center">
                                Daftar Bacaan
                            </div>
                        </div>
                        <div className="col-2 content-right">
                            <button
                                className="btn btn-circle background-green"
                                onClick={this.props.onClickClose}
                            >
                                <i className="fa fa-lg fa-times" />
                            </button>
                        </div>
                    </div>
                    <div className="border-bottom padding-15px">

                    </div>

                    <div className="padding-15px">
                        <div className="grid grid-2x">
                            <div className="col-1" />
                            <div className="col-2 content-right">
                                <button
                                    style={{ marginLeft: "15px" }}
                                    className="btn btn-white"
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
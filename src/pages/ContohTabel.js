import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIDataTable from "mui-datatables"
import LoadingBar from 'react-top-loading-bar'

var ct = require("../../modules/custom/customTable")

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://radiant-temple-76163.herokuapp.com/pertamina/";

class Pages extends Component {

  constructor () {
    super()
    this.state = {
      clEditAble: '',
      editAble: false,
      rawData: [],
      dataTable: [],
      createVisible: false
    }
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

  opDeleteAble = () => {
    alert('delete');
  }

  componentDidMount() {
    this.startFetch();
    this.getData();
  }

  getData() {
    fetch(proxyurl + url + 'purchase_requisition')
    .then((response) => response.json())
    .then((responseJson) => {
      this.onFinishFetch()
      let dataTable = responseJson.map((value, index) => {
        const { plant, number, docdate, deliverydate, kimap, materialname } = value;
        return [
          index += 1,
          plant,
          number,
          docdate,
          deliverydate,
          kimap,
          materialname
        ]
      })

      this.setState({
        rawData: responseJson,
        dataTable
      })
    })
}

startFetch = () => {
  this.LoadingBar.continousStart()
}

onFinishFetch = () => {
  if(typeof this.LoadingBar === "object") this.LoadingBar.complete()
}

  getMuiTheme = () => createMuiTheme(ct.customTable());

  options = ct.customOptions()

  columns = [
    "No",
    "Plant", 
    "Purchase Requisition Number", 
    "Document Date", 
    "Delivery Date",
    "KIMAP",
    "Material Name",
    {
      name: "Action",
      options: {
        customBodyRender: () => {
          return (
            <div>
              <button 
                className="btn btn-red btn-small-circle"
                onClick={ this.opDeleteAble }>
                <i className="fa fa-lw fa-trash-alt" />
              </button>
            </div>
          )
        }
      }
    }
  ]

  render () {

    return (
      <div className="main-content">
      <LoadingBar onRef={ref => (this.LoadingBar = ref)} />
        <div className="txt-site txt-18 txt-bold txt-main padding-top-5px margin-left-5px margin-bottom-5px">
          Tabel Pintar
        </div>

        <div className="padding-5px">

          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              title={"Contoh Tabel PR"}
              data={this.state.dataTable}
              columns={this.columns}
              options={this.options}
            />
          </MuiThemeProvider>

        </div>

      </div>
    )
  }

}

export default Pages
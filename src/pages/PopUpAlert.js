import React, { Component } from 'react'

class PopUp extends Component {
   render() {
        return (
        this.props.type === 'save' ?
        <div className={this.props.class}>
            <div className="padding-top-20px"></div>
            <div className="popup-content background-white border-radius" style={{width: '20%'}}>
              <div className="padding-15px background-white grid grid-2x">
                <div className="col-1">
                  <div className="txt-site txt-12 txt-bold post-center">
                    Information
                  </div>
                </div>
                <div className="col-2 content-right">
                  <button className="btn btn-circle background-white" onClick={ this.props.onClick }>
                    <i className="fa fa-lg fa-times"></i>
                  </button>
                </div>
              </div>
                        
              <div style={{textAlign: 'center', marginTop:10, color:'green', fontSize:44}}>
                <i className="fa fa-lw fa-check-circle"/>
              </div>                        
              <div className="padding-20px" style={{textAlign: 'center', fontWeight:'bold'}}>
                  PROCESS SUCCESSFULL!
              </div>
              <div className="padding-15px" style={{textAlign: 'center'}}>
                <button 
                    className="btn padding-5px" 
                    type="button"
                    style={{width:'50%', backgroundColor:'#6495ED', color:'white'}}
                    onClick={ this.props.onClick }>
                    <span>OK, GOT IT!</span>
                </button>
              </div>
            </div>
            <div className="padding-bottom-20px"></div>
        </div> :

        this.props.type === 'delete' ?
        <div className={this.props.class}>
            <div className="padding-top-20px"></div>
                <div className="popup-content border-radius" style={{width: '30%', backgroundColor:'#FF7F50'}}>
                <div className="grid grid-2x padding-15px">
                    <div className="col-1" style={{textAlign: 'center', backgroundColor:'#FF7F50', color:'white'}}>
                    <div className="txt-site txt-12 txt-bold post-center">
                        Your Attention is Required
                    </div>
                    </div>
                    <div className="col-2 content-right">
                    <button className="btn btn-circle" style={{backgroundColor:'#FF7F50', color:'white'}} onClick={ this.props.onClick }>
                        <i className="fa fa-lg fa-times"></i>
                    </button>
                    </div>
                </div>
                <div style={{textAlign: 'center', marginTop:10, color:'white', fontSize:44}}>
                    <i className="fa fa-lw fa-bell"/>
                </div>                        
                <div className="padding-20px" style={{textAlign: 'center', fontWeight:'bold', color:'white'}}>
                    Apakah Anda Yakin Menghapus Data Ini ?
                </div>
                <div className="padding-15px grid grid-2x" style={{alignContent: 'center'}}>
                    <div className="col-1">
                    <button 
                        className="btn padding-5px"
                        type="button"
                        onClick={ this.props.onClickDelete }>
                        <span>OK, GOT IT!</span>
                    </button>
                    </div>
                    <div className="col-2">
                    <button 
                        className="btn padding-5px" 
                        type="button"
                        onClick={ this.props.onClick }>
                        <span>CLOSE</span>
                    </button>
                    </div>
                </div>
            </div>
            <div className="padding-bottom-20px"></div>
        </div> :

        <div className={this.props.class}>
          <div className="popup-content-mikro background-white border-radius post-center">
            
            <div className="padding-15px background-white border-bottom grid grid-2x">
              <div className="col-1">
                  <div className="txt-site txt-12 txt-bold post-center">
                    {this.props.title}
                  </div>
              </div>
              <div className="col-2 content-right">
                  <button 
                    className="btn btn-circle btn-grey" 
                    onClick={ this.props.onClick }>
                      <i className="fa fa-lg fa-times"></i>
                  </button>
              </div>
            </div>

            <div className="padding-15px background-grey">

              <input 
                type="file" 
                id="upload-image" 
                style={{'display': 'none'}}
                onChange={this.props.onChange} />

              <input 
                type="file" 
                id="upload-image" 
                style={{'display': 'none'}}
                onChange={this.props.onChange} />

              
                <div className="upload-image">

                  <div className="u-i-info">
                    <div className="u-i-icon">
                      <i className="fa fa-lg fa-images" />
                    </div>
                    <div className="u-i-label">
                      Upload a file
                    </div>
                  </div>
                  
                  <div 
                    className="u-i-image image image-all"
                    style={{'backgroundImage': 'url('+this.props.file+')'}}>

                      <div className="u-i-btn">
                        <label htmlFor="upload-image">
                          <div className="btn btn-circle-div btn-green border-all">
                            <i className="fa fa-lg fa-plus" />
                          </div>
                        </label>
                        <button 
                          onClick={this.props.removeChange}
                          type="button"
                          className="btn btn-circle btn-red border-all">
                          <i className="fa fa-lg fa-trash-alt" />
                        </button>
                      </div>

                  </div>
                </div>
              
              
              <div className="grid margin-top-15px">
                <div className="content-right">
                  <button className="btn background-blue"
                    onClick={ this.props.onClick }>
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
        )
    }
}

export default PopUp



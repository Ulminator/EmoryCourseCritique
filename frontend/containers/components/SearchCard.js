import React, {Component} from "react";
import axios from 'axios';

class SearchCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ratings: []
      
    }
    this.onClick = this.onClick.bind(this);
    this.reviewPage=this.reviewPage.bind(this);
  }

  onClick() {
    if(this.props.isProf)
    {
        var pname = this.props.cnum;
        pname=pname.replace(", ","_");
        var querystring = require('querystring');
          
          var url2 = '/prof?'+querystring.stringify({
              prof: pname,
          });
              window.location.href = url2; 
    }
    else
    {
      var querystring = require('querystring');
          
          var url2 = '/course?'+querystring.stringify({
              course: this.props.cnum,
          });
              window.location.href = url2;  
             //this.props.history.push(url2); 
    }    
  }

  reviewPage(event) {
    if(this.props.isProf)
    {
      var pname = this.props.cnum;
      pname=pname.replace(", ","_");
      console.log(pname);
      var querystring = require('querystring');
          
          var url2 = '/rating?'+querystring.stringify({
              course: event.currentTarget.dataset.id,
              prof:pname
          });
              window.location.href = url2; 
    }
    else
    {
      var pname = event.currentTarget.dataset.id;
      pname=pname.replace(", ","_");
      console.log(pname);
      var querystring = require('querystring');
          
          var url2 = '/rating?'+querystring.stringify({
              course: this.props.cnum,
              prof:pname
          });
              window.location.href = url2; 
    }
  }
  
  componentWillMount() {
    $(document).ready(function(){
    $('.collapsible').collapsible();
  });
  }

  render() {
    
    var rating = 0;
    var ratingColor = "grey-text";
    if(this.props.rating === null || this.props.rating == "NaN" || this.props.rating==0){
        rating = "N/A";
    }else if(this.props.rating > 4){ //its pretty good rating
      rating = this.props.rating.toFixed(2);
      ratingColor = "green-text";

    }else if(this.props.rating > 3){ //meh rating
      rating = this.props.rating.toFixed(2);
      ratingColor = "light-green-text";
    }else if(this.props.rating > 2){ //garbo rating
      rating = this.props.rating.toFixed(2);
      ratingColor = "orange-text";
    }
    else{ //disgusting
      rating = this.props.rating.toFixed(2);
      ratingColor = "red-text text-lighten-1";
    }
    var sections=[];
    for(var i=0;i<this.props.sections.length;i++) 
    {
      var section_overall=this.props.sections[i].average_overall;

      var ratingColor2 = "grey-text";
      if(section_overall === null || section_overall == "NaN" || section_overall==0){
        section_overall = "N/A";
      }else if(section_overall > 4){ //its pretty good rating
        ratingColor2 = "green-text";
        section_overall=section_overall.toFixed(2);
      }else if(section_overall > 3){ //meh rating
        ratingColor2 = "light-green-text";
        section_overall=section_overall.toFixed(2);
      }else if(section_overall > 2){ //garbo rating
        ratingColor2 = "orange-text";
        section_overall=section_overall.toFixed(2);
      }
      else if(section_overall>0){ //disgusting
        ratingColor2 = "red-text text-lighten-1";
        section_overall=section_overall.toFixed(2);
      }

      if(i>0)
        sections.push(<li className="divider" key={i-0.5}></li>);
      sections.push(<li onClick={this.reviewPage} data-id={this.props.sections[i].section_name} key={i} style={{cursor:"pointer", margin:"18px 24px"}}>
                      <div style={{display:"inline"}}>{this.props.sections[i].section_name}</div>
                      <div className={ratingColor2} style={{display:"inline", float:"right"}}>{section_overall}</div>
                    </li>);
    }
    return (
      <div className="card-panel white black-text nohover2" >
        <div className="row">
          <div className="col s6" >
            
            <span
              style={{
                fontWeight: 300,
                fontSize: '0.9rem'
                
              }}
            >
              {this.props.cnum}: {this.props.cname} {" "}
              <i className="material-icons" onClick={this.onClick} style={{fontSize:"16px", verticalAlign:"text-bottom", cursor:'pointer', color:"#225894"}}>info_outline</i>
            </span>{" "}

          </div>
          <div className ="col s6">
          <h5 className={ratingColor}
            style={{
              fontWeight: 300,
              float: "right",
              fontSize: '2.5rem',
              lineHeight: "15px",
              marginBottom: "30px"
            }}
          >
            {rating}
          </h5>
          </div>
        </div>

          <ul className="collapsible shadowOverride" data-collapsible="accordion" style={{margin:-25}}>
            <li>
              <div className="collapsible-header" style={{width:"100%"}}>
                <i className="material-icons" style={{color:"#d38e02"}}>library_books</i>Sections
                <i className="material-icons" style={{width:"100%", textAlign:"right"}}>arrow_drop_down</i>
              </div>
              <div className="collapsible-body">
                <ul style={{margin:"-28px", fontSize:"0.9rem", fontWeight:"300"}}>
                  {sections}
                </ul>
              </div>
            </li>
          </ul>


      </div>

    );
  }
}

export default SearchCard;

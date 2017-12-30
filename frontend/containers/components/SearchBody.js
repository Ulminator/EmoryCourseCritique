import React from "react";
import Inputfield from "./Inputfield";
import SearchCard from "./SearchCard";
import ReviewCard from "./ReviewCard";
import Footer from "./Footer";
import axios from 'axios';
import { connect } from 'react-redux';
import {filterOn} from '../../actions.js';

class SearchBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
      profs: [],
      depts: [{id:"AAS", name:"African American Studies", checked:false},{id:"AFS", name:"African Studies", checked:false}],
      lookup: {AAS:0, AFS:1},
      levels: [false, false, false, false]


    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleLevel = this.handleLevel.bind(this);

  }

  

  componentWillMount() {


      var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));

    var urlDepts = parsed.dept;
    var urlLevels = parsed.level;

    var paramExist=false;

    if(urlDepts)
    {
      paramExist=true;
      if(urlDepts.constructor===Array) {     
        var tempDepts=this.state.depts;
        for(var i=0;i<urlDepts.length;i++) {
          tempDepts[this.state.lookup.urlDepts[i]].checked=true;
        }
        this.setState({depts:tempDepts});
      }
      else {
        var tempDepts=this.state.depts;
        tempDepts[this.state.lookup[urlDepts]].checked=true;
        this.setState({depts:tempDepts});
      }
    }

    if(urlLevels)
    {
      paramExist=true;
      if(urlLevels.constructor===Array) {
        var tempLevels=this.state.levels;
        for(var i=0;i<urlLevels.length;i++) {
          tempLevels[urlLevels[i]-1]=true;
        }
        this.setState({levels:tempLevels});
      }
      else {
        var tempLevels=this.state.levels;
        tempLevels[urlLevels-1]=true;
        this.setState({levels:tempLevels});
      }
    }

    if(!paramExist)
      this.props.saveFilter(false);
    else
      this.props.saveFilter(location.search);
    
    console.log(this.state);


          var self=this;
      axios.get('/test'+location.search)
        .then(function (response) {
          
            self.setState({
              courses:response.data.courses,
              profs:response.data.profs
            })
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
      $(document).ready(function(){
        $('.section.table-of-contents').pushpin({
          top: 0,
          offset: 0
        });
      }); 
      $(document).ready(function(){
        $('.scrollspy').scrollSpy();
      });

    $(document).ready(function(){
      $('.dropdown-container')
      .on('click', '.filter-button', function() {
          var currList = $(this).siblings('.dropdown-list');
          $('.dropdown-list').not(currList).hide();
          currList.toggle();
      })
      .on('input', '.dropdown-search', function() {
          var target = $(this);
          var search = target.val().toLowerCase();
        
          if (!search) {
                $('li').show();
                return false;
            }
        
          $(event.currentTarget).find('li').each(function() {
              var text = $(this).text().toLowerCase();
                var match = text.indexOf(search) > -1;
                $(this).toggle(match);
            });
      })
      .on('change', '[type="checkbox"]', function() {
          var numChecked = $(this).parent().parent().find('[type="checkbox"]:checked').length;
          $(event.currentTarget).find('.quantity').text(numChecked || 'Any');
      });
  });  



  }
/*
  componentWillReceiveProps(nextProps){
    this.setState({user: nextProps.user})
  }*/

  handleCheck(event) {
    console.log(event.currentTarget);
    var newUrl;
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));
    if(event.target.checked)
    {
      if(parsed.dept)
      {
        if(parsed.dept.constructor===Array)
          parsed.dept.push(event.currentTarget.id);
        else 
        {
          var dept=[];
          dept.push(parsed.dept);
          dept.push(event.currentTarget.id);
          parsed.dept=dept;
        }
      }
      else
        parsed.dept=event.currentTarget.id;
      newUrl=querystring.stringify(parsed);
    }
    else
    {
      if(parsed.dept.constructor===Array)
      {
        var index=parsed.dept.indexOf(event.currentTarget.id);
        parsed.dept.splice(index,1);
        newUrl=querystring.stringify(parsed);
      }
      else
      {
        delete parsed.dept;
        newUrl=querystring.stringify(parsed);
      }
    }

    window.history.replaceState('','', "search?"+newUrl);
    var self=this;
      axios.get('/test'+location.search)
        .then(function (response) {
          
            self.setState({
              courses:response.data.courses,
              profs:response.data.profs
            })
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  handleLevel(event) {
    console.log(event.currentTarget);
    var newUrl;
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));
    if(event.target.checked)
    {
      if(parsed.level)
      {
        if(parsed.level.constructor===Array)
          parsed.level.push(event.currentTarget.id);
        else 
        {
          var dept=[];
          dept.push(parsed.level);
          dept.push(event.currentTarget.id);
          parsed.level=dept;
        }
      }
      else
        parsed.level=event.currentTarget.id;
      newUrl=querystring.stringify(parsed);
    }
    else
    {
      if(parsed.level.constructor===Array)
      {
        var index=parsed.level.indexOf(event.currentTarget.id);
        parsed.level.splice(index,1);
        newUrl=querystring.stringify(parsed);
      }
      else
      {
        delete parsed.level;
        newUrl=querystring.stringify(parsed);
      }
    }

    window.history.replaceState('','', "search?"+newUrl);
    var self=this;
      axios.get('/test'+location.search)
        .then(function (response) {
          
            self.setState({
              courses:response.data.courses,
              profs:response.data.profs
            })
          
          
        })
        .catch(function (error) {
          console.log(error);
        });
  }



  render() {
    
    var cards = [];
    var profcards = [];
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));
    console.log(Object.values(parsed));
    var input = parsed.q;

    console.log(parsed.q);

    var subjects = [];
    for(var i=0;i<this.state.depts.length;i++)
    {

      if(this.state.depts[i].checked)
        subjects.push(<li key={i+0.2}><input id={this.state.depts[i].id} onClick={this.handleCheck} type="checkbox" defaultChecked key={i}/><label htmlFor={this.state.depts[i].id} key={i+0.5}>{this.state.depts[i].name}</label></li>);
      else
        subjects.push(<li key={i+0.2}><input id={this.state.depts[i].id} onClick={this.handleCheck} type="checkbox" key={i}/><label htmlFor={this.state.depts[i].id} key={i+0.5}>{this.state.depts[i].name}</label></li>);
    }

    var levels = [];
    for(var i=0;i<this.state.levels.length;i++)
    {

      if(this.state.levels[i])
        levels.push(<li key={i+0.2}><input id={i+1} onClick={this.handleLevel} type="checkbox" defaultChecked key={i}/><label htmlFor={i+1} key={i+0.5}>{i+1}00</label></li>);
      else
        levels.push(<li key={i+0.2}><input id={i+1} onClick={this.handleLevel} type="checkbox" key={i}/><label htmlFor={i+1} key={i+0.5}>{i+1}00</label></li>);
    }
      
      if(this.state.courses)
      {
        for (var i = 0; i < this.state.courses.length; i++) {
          cards.push(<SearchCard cnum= {this.state.courses[i].course_num} cname={this.state.courses[i].course_name} sections={this.state.courses[i].sections} rating={this.state.courses[i].course_avg_overall} key={i}/>);
        }
      }
      if(this.state.profs)
      {
        for (var i = 0; i < this.state.profs.length; i++) {
          profcards.push(<SearchCard cnum= {this.state.profs[i].professor} sections={this.state.profs[i].sections} rating={this.state.profs[i].course_avg_overall} isProf={true} key={i}/>);
        }
      }
    
    return (
      <sbody >

        
        
      <div style={{height: "60px"}}></div>

        <div className="container" style={{width: "95%", maxWidth: 1000}}>
          
          
          <div className="row" style={{minHeight: "-webkit-fill-available"}}>
            <div className="col hide-on-small-only m2">
              <div className="card-panel white nohover2 hide-on-med-and-down" style={{position:"fixed", padding:"15px"}}>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: '0.9rem'
                    
                  }}
                >
                  Filters
                </span>
                <li className="divider" />
                <br/>
                <span
                  style={{
                    fontWeight: 5400,
                    fontSize: '0.9rem'
                    
                  }}
                >
                Subjects:
                </span>
                <div className="dropdown-container">
                    <div className="filter-button noSelect" style={{fontSize:"12px"}}>
                        <div className="dropdown-label">Subjects</div>
                        <div className="dropdown-quantity">(<span className="quantity">Any</span>)</div>
                        <i className="fa fa-filter"></i>
                    </div>
                    <div className="dropdown-list" style={{display: "none", fontSize:"12px"}}>
                        <input type="search" placeholder="Search" className="dropdown-search browser-default"/>
                        <ul style={{fontSize:"10px"}}>
                          {subjects}
                        </ul>
                    </div>
                </div>
                <li className="divider" />
                <br/>
                <span
                  style={{
                    fontWeight: 5400,
                    fontSize: '0.9rem'
                    
                  }}
                >
                  GER:
                </span>
                <div className="dropdown-container">
                    <div className="filter-button noSelect" style={{fontSize:"12px"}}>
                        <div className="dropdown-label">GER</div>
                        <div className="dropdown-quantity">(<span className="quantity">Any</span>)</div>
                        <i className="fa fa-filter"></i>
                    </div>
                    <div className="dropdown-list" style={{display: "none", fontSize:"12px"}}>
                        <input type="search" placeholder="Search" className="dropdown-search browser-default"/>
                        <ul style={{fontSize:"10px"}}>
                          <li><input id="FSEM" type="checkbox"/><label htmlFor="FSEM">FSEM</label></li>
                          <li><input id="FWRT" type="checkbox"/><label htmlFor="FWRT">FWRT</label></li>
                          <li><input id="WRT" type="checkbox"/><label htmlFor="WRT">WRT</label></li>
                          <li><input id="MQR" type="checkbox"/><label htmlFor="MQR">MQR</label></li>
                          <li><input id="SNT" type="checkbox"/><label htmlFor="SNT">SNT</label></li>
                          <li><input id="HSC" type="checkbox"/><label htmlFor="HSC">HSC</label></li>
                          <li><input id="HAP" type="checkbox"/><label htmlFor="HAP">HAP</label></li>
                          <li><input id="HAL" type="checkbox"/><label htmlFor="HAL">HAL</label></li>
                          <li><input id="HTH" type="checkbox"/><label htmlFor="HTH">HTH</label></li>
                          <li><input id="PED" type="checkbox"/><label htmlFor="PED">PED</label></li>
                        </ul>
                    </div>
                </div>
                <li className="divider" />
                <br/>
                <span
                  style={{
                    fontWeight: 5400,
                    fontSize: '0.9rem'
                    
                  }}
                >
                  Course-level: &emsp;
                </span>
                <div className="dropdown-container">
                    <div className="filter-button noSelect" style={{fontSize:"12px"}}>
                        <div className="dropdown-label">Levels</div>
                        <div className="dropdown-quantity">(<span className="quantity">Any</span>)</div>
                        <i className="fa fa-filter"></i>
                    </div>
                    <div className="dropdown-list" style={{display: "none", fontSize:"12px"}}>
                        <input type="search" placeholder="Search" className="dropdown-search browser-default"/>
                        <ul style={{fontSize:"10px"}}>
                          {levels}
                        </ul>
                    </div>
                </div>
                <li className="divider" />
                <br/>
                <div>
                  <div style={{color:"black", fontSize:"12px", display:"inline-block"}}>Start new search or</div>
                  <div style={{display: "inline-block",
                              fontSize: "12px",
                              padding: "2px",
                              background: "#2c64a4",
                              border: "#2c64a4",
                              borderRadius: "5px",
                              float: "right",
                              color: "white",
                              cursor: "pointer"}}>Apply
                  </div>
                </div>
                <div className="hide-on-med-and-down" style={{position:"fixed", marginTop:"36px"}}>
                  <label>Sort By:</label>
                    <select className="browser-default">
                      <option value="">Relevance</option>
                      <option value="1">Overall</option>
                      <option value="2">Workload</option>
                      <option value="3">Difficulty</option>
                    </select>
                </div>
              </div>
              
            </div>
            <div className="col hide-on-med-and-down l1" style={{width:"0px", marginRight:"15px"}}/>
            <div className="col s12 m8" >
              <h5 className="center grey-text text-darken-2"
                style={{
                  fontWeight: 300
                }}>

                <br/>
                Course Results for <span className="black-text" style={{fontWeight: "400"}}>{input}</span>
              </h5>
              <div style={{height: "20px"}}></div>
              <div id="courses" className="section scrollspy">
                {cards}
              </div>
              <h5 className="center grey-text text-darken-2"
                style={{
                  fontWeight: 300
                }}>

                <br/>
                Professor Results for <span className="black-text" style={{fontWeight: "400"}}>{input}</span>
              </h5>
              <div id="professors" className="section scrollspy">
              {profcards}
              </div>
            </div>
            <div className="col hide-on-small-only m2 l1">
              
              <ul className="section table-of-contents" style={{marginTop:"72px"}}>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#professors">Professors</a></li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </sbody>
    );
  }
}

const mapStateToProps = (state) => {
  return{ 
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveFilter: url => {
      dispatch(filterOn(url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBody);

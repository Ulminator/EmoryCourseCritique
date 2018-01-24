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
      depts: [{id:"AAS", name:"African American Studies", checked:false},{id:"AFS", name:"African Studies", checked:false},{id:"AMST", name:"American Studies", checked:false},{id:"ANCMED", name:"Ancient Mediterranean Studies", checked:false},{id:"ANT", name:"Anthropology", checked:false},{id:"ARAB", name:"Arabic", checked:false},{id:"ARTHIST", name:"Art History", checked:false},{id:"ARTVIS", name:"Visual Arts", checked:false},{id:"BIOL", name:"Biology", checked:false},{id:"CBSC", name:"Community Bldg & Social Change", checked:false},{id:"CHEM", name:"Chemistry", checked:false},{id:"CHN", name:"Chinese Language", checked:false},{id:"CL", name:"Classics", checked:false},{id:"CPLT", name:"Comparative Literature", checked:false},{id:"CS", name:"Computer Science", checked:false},{id:"DANC", name:"Dance", checked:false},{id:"EAS", name:"East Asian Studies", checked:false},{id:"ECON", name:"Economics", checked:false},{id:"ECS", name:"Emory College Seminar", checked:false},{id:"ENG", name:"English", checked:false},{id:"ENGCW", name:"Creative Writing", checked:false},{id:"ENVS", name:"Environmental Studies", checked:false},{id:"FILM", name:"Film and Media Studies", checked:false},{id:"FREN", name:"French", checked:false},{id:"GER", name:"German", checked:false},{id:"GRK", name:"Greek", checked:false},{id:"HEBR", name:"Hebrew", checked:false},{id:"HIST", name:"History", checked:false},{id:"HLTH", name:"Human Health Program", checked:false},{id:"HNDI", name:"Hindi", checked:false},{id:"IDS", name:"Interdisciplinary Studies", checked:false},{id:"ITAL", name:"Italian", checked:false},{id:"JPN", name:"Japanese", checked:false},{id:"JS", name:"Jewish Studies", checked:false},{id:"KRN", name:"Korean", checked:false},{id:"LACS", name:"Latin Amer & Caribbean Studies", checked:false},{id:"LAT", name:"Latin", checked:false},{id:"LING", name:"Linguistics", checked:false},{id:"MATH", name:"Mathematics", checked:false},{id:"MESAS", name:"Middle Eastern & South Asian", checked:false},{id:"MUS", name:"Music", checked:false},{id:"NBB", name:"Neuroscience & Behavioral Sci", checked:false},{id:"NRSG", name:"Nursing", checked:false},{id:"OISP", name:"Academic Study Abroad Course", checked:false},{id:"PACE", name:"PACE", checked:false},{id:"PE", name:"Health and Physical Education", checked:false},{id:"PERS", name:"Persian", checked:false},{id:"PHIL", name:"Philosophy", checked:false},{id:"PHYS", name:"Physics", checked:false},{id:"POLS", name:"Political Science", checked:false},{id:"PORT", name:"Portuguese", checked:false},{id:"PSYC", name:"Psychology", checked:false},{id:"QTM", name:"Quantitative Theory & Methods", checked:false},{id:"REES", name:"Russian, E European, Eurasian", checked:false},{id:"REL", name:"Religion - Undergraduate", checked:false},{id:"RUSS", name:"Russian", checked:false},{id:"SIRE", name:"Scholarly Inquiry and Research", checked:false},{id:"SOC", name:"Sociology", checked:false},{id:"SPAN", name:"Spanish", checked:false},{id:"TBT", name:"Tibetan", checked:false},{id:"THEA", name:"Theater Studies", checked:false},{id:"WGS", name:"Women's Gender & Sexuality", checked:false}],
      lookup: {AAS:0, AFS:1, AMST:2, ANCMED:3, ANT:4, ARAB: 5, ARTHIST: 6, ARTVIS:7, BIOL:8, CBSC:9,CHEM:10,CHN:11,CL:12,CPLT:13,CS:14,DANC:15,EAS:16,ECON:17,ECS:18,ENG:19,ENGCW:20,ENVS:21,FILM:22,FREN:23,GER:24,GRK:25,HEBR:26,HIST:27,HLTH:28,HNDI:29,IDS:30,ITAL:31,JPN:32,JS:33,KRN:34,LACS:35,LAT:36,LING:37,MATH:38,MESAS:39,MUS:40,NBB:41,NRSG:42,OISP:43,PACE:44,PE:45,PERS:46,PHIL:47,PHYS:48,POLS:49,PORT:50,PSYC:51,QTM:52,REES:53,REL:54,RUSS:55,SIRE:56,SOC:57,SPAN:58,TBT:59,THEA:60,WGS:61},
      ger: {FSEM:false, FWRT:false, WRT:false, MQR:false, SNT:false, HSC:false, HAP:false, HAL:false, HTH:false, PED:false},
      levels: [false, false, false, false],
      sortOverall: false


    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleLevel = this.handleLevel.bind(this);
    this.handleGER = this.handleGER.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

  }

  

  componentWillMount() {


      var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));

    var urlDepts = parsed.dept;
    var urlLevels = parsed.level;
    var urlGERs =parsed.ger;
    var urlSort = parsed.sort;

    var paramExist=false;

    if(urlDepts)
    {
      paramExist=true;
      if(urlDepts.constructor===Array) {     
        var tempDepts=this.state.depts;
        for(var i=0;i<urlDepts.length;i++) {
          tempDepts[this.state.lookup[urlDepts[i]]].checked=true;
        }
        this.setState({depts:tempDepts});
      }
      else {
        var tempDepts=this.state.depts;
        console.log(urlDepts)
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

    if(urlGERs)
    {
      paramExist=true;
      if(urlGERs.constructor===Array) {
        var tempGERs=this.state.ger;
        for(var i=0;i<urlGERs.length;i++) {
          tempGERs[urlGERs[i]]=true;
        }
        this.setState({ger:tempGERs});
      }
      else {
        var tempGERs=this.state.ger;
        tempGERs[urlGERs]=true;
        this.setState({ger:tempGERs});
      }
    }

    if(urlSort)
    {
      
      if(urlSort==="overall") {
        paramExist=true;
        this.setState({sortOverall:true});
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

  componentDidMount() {
    $(document).ready(function(){
        $('.wrapper').pushpin({
          top: 0,
          bottom: $('.page-footer').offset().top - $(window).height(),
          offset: 0
        });
        
      }); 
  }

  componentDidUpdate() {
    $(document).ready(function(){
        $('.wrapper').pushpin({
          top: 0,
          bottom: $('.page-footer').offset().top - $(window).height(),
          offset: 0
        });
        
      }); 
  }
/*
  componentWillReceiveProps(nextProps){
    this.setState({user: nextProps.user})
  }*/

  clearFilter() {
    var newUrl;
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));
    var newparse = {q:parsed.q};
    newUrl="search?"+querystring.stringify(newparse);
    

    window.location.href= newUrl;
    
  }

  clearSearch() {
    var newUrl;
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));
    parsed["q"] ="";
    newUrl="search?"+querystring.stringify(parsed);
    

    window.location.href= newUrl;
  }

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
    this.props.saveFilter(location.search);
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

  handleGER(event) {
    console.log(event.currentTarget);
    var newUrl;
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));
    if(event.target.checked)
    {
      if(parsed.ger)
      {
        if(parsed.ger.constructor===Array)
          parsed.ger.push(event.currentTarget.id);
        else 
        {
          var ger=[];
          ger.push(parsed.ger);
          ger.push(event.currentTarget.id);
          parsed.ger=ger;
        }
      }
      else
        parsed.ger=event.currentTarget.id;
      newUrl=querystring.stringify(parsed);
    }
    else
    {
      if(parsed.ger.constructor===Array)
      {
        var index=parsed.ger.indexOf(event.currentTarget.id);
        parsed.ger.splice(index,1);
        newUrl=querystring.stringify(parsed);
      }
      else
      {
        delete parsed.ger;
        newUrl=querystring.stringify(parsed);
      }
    }

    window.history.replaceState('','', "search?"+newUrl);
    this.props.saveFilter(location.search);
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
    this.props.saveFilter(location.search);
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

  handleSort(event) {
    console.log(event.currentTarget);
    var newUrl;
    var querystring = require('querystring');
    var parsed = querystring.parse(location.search.slice(1));
    if(event.target.value==="overall")
    {
      
      parsed.sort=event.target.value;
      newUrl=querystring.stringify(parsed);
    }
    else
    {
      if(parsed.sort)
      {
        delete parsed.sort;
        newUrl=querystring.stringify(parsed);
      }
      
    }

    window.history.replaceState('','', "search?"+newUrl);
    this.props.saveFilter(location.search);
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

    var gers = [];
    var i=0;
    for(var key in this.state.ger)
    {

      if(this.state.ger[key])
        gers.push(<li key={i+0.2}><input id={key} onClick={this.handleGER} type="checkbox" defaultChecked key={i}/><label htmlFor={key} key={i+0.5}>{key}</label></li>);
      else
        gers.push(<li key={i+0.2}><input id={key} onClick={this.handleGER} type="checkbox" key={i}/><label htmlFor={key} key={i+0.5}>{key}</label></li>);
      i++;
    }

    var overallOption;
    if(this.state.sortOverall)
      overallOption=<option value="overall" selected>Overall</option>;
    else
      overallOption=<option value="overall">Overall</option>;
      
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
            <div className="col hide-on-small-only m3 l2">
              <div className="wrapper" style={{minWidth:"fit-content"}}>
                <ul className="section table-of-contents" style={{marginTop:"72px"}}>
                  <li><a href="#courses">Courses</a></li>
                  <li><a href="#professors">Professors</a></li>
                </ul>
                <div className="card-panel white nohover2 show-on-med-and-up" style={{padding:"15px"}}>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: '0.9rem'
                      
                    }}
                  >
                    Filters
                  </span>
                  <div style={{display: "inline-block",
                                fontSize: "12px",
                                padding: "1px 4px",
                                background: "#2c64a4",
                                border: "#2c64a4",
                                borderRadius: "5px",
                                float: "right",
                                color: "white",
                                cursor: "pointer"}} onClick={this.clearFilter}>Clear
                    </div>
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
                            {gers}
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
                    <div style={{color:"black", fontSize:"12px", display:"inline-block"}}>Clear Search Input:</div>
                    <div style={{display: "inline-block",
                                fontSize: "12px",
                                padding: "1px 6px",
                                background: "#2c64a4",
                                border: "#2c64a4",
                                borderRadius: "5px",
                                float: "right",
                                color: "white",
                                cursor: "pointer"}} onClick={this.clearSearch}>Go
                    </div>
                  </div>
                  
                </div>
                <div className="show-on-med-and-up" style={{marginTop:"36px"}}>
                    <label>Sort By:</label>
                      <select className="browser-default" onChange={this.handleSort}>
                        <option value="">Relevance</option>
                        {overallOption}
                      </select>
                  </div>
              </div> 
            </div>
            <div className="col hide-on-med-and-down l1" style={{width:"0px", marginRight:"15px"}}/>
            <div className="col s12 m9 l8" >
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

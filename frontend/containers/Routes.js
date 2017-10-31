import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import MainPageContainer from './MainPageContainer';
import SignUpPageContainer from './SignUpPageContainer';
import LoginPageContainer from './LoginPageContainer';
import SearchPageContainer from './SearchPageContainer';
import RegisterSuccessContainer from './RegisterSuccessContainer';
import ResendEmailContainer from './ResendEmailContainer';
import RatePageContainer from './RatePageContainer';


export default class Routes extends Component {
   render() {
      return(
       <div>
         <Switch>
           <Route path="/" exact={true} component={MainPageContainer}/>
           <Route path="/signup" exact={true} component={SignUpPageContainer}/>
           <Route path="/success" exact={true} component={RegisterSuccessContainer}/>
           <Route path="/login" exact={true} component={LoginPageContainer}/>
           <Route path="/rate" exact={true} component={RatePageContainer}/>
           <Route path="/search" exact={true} component={SearchPageContainer}/>
           <Route path="/resend" exact={true} component={ResendEmailContainer}/>

         </Switch>
       </div>
     )
   }
}

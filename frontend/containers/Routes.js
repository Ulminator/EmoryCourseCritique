import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import MainPageContainer from './MainPageContainer';
import AboutPageContainer from './AboutPageContainer';
import FAQPageContainer from './FAQPageContainer';
import ProfilePageContainer from './ProfilePageContainer'
import SignUpPageContainer from './SignUpPageContainer';
import LoginPageContainer from './LoginPageContainer';
import SearchPageContainer from './SearchPageContainer';
import ResendEmailContainer from './ResendEmailContainer';
import RatePageContainer from './RatePageContainer';
import ReviewPageContainer from './ReviewPageContainer';


export default class Routes extends Component {
   render() {
      return(
       <div>
         <Switch>
           <Route path="/" exact={true} component={MainPageContainer}/>
           <Route path="/about" exact={true} component={AboutPageContainer}/>
           <Route path="/FAQ" exact={true} component={FAQPageContainer}/>
           <Route path="/course" exact={true} component={ProfilePageContainer}/>
           <Route path="/prof" exact={true} component={ProfilePageContainer}/>
           <Route path="/signup" exact={true} component={SignUpPageContainer}/>
           <Route path="/login" exact={true} component={LoginPageContainer}/>
           <Route path="/rate" exact={true} component={RatePageContainer}/>
           <Route path="/search" exact={true} component={SearchPageContainer}/>
           <Route path="/rating" exact={true} component={ReviewPageContainer}/>
           <Route path="/resend" exact={true} component={ResendEmailContainer}/>

         </Switch>
       </div>
     )
   }
}

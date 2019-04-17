import React from 'react';
import Header from "../components/Header";
import LoginComponent from "../components/LoginComponent";
import WarningComponent from "../components/WarningComponent";

import {REGISTRATION_PAGE} from "../Views";
import SpecialLink from '../components/Link';

export default class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>

        <div>
          <Header title={'Login page'}/>

          {window.sessionStorage.getItem('isAuthorised') === 'true'
            ?
            <div className={'warning'}>
              To login again, please, log out.
            </div>
            :
            <div>

              <div className={'title'}>
                Enter your data to login
              </div>

              <LoginComponent/>

              <WarningComponent/>

              <SpecialLink path={REGISTRATION_PAGE} label={'Register!'}/>
            </div>
          }
        </div>
      </div>
    );
  }
}
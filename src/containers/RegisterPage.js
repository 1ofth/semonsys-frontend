import React from 'react';
import Header from "../components/Header";
import RegisterComponent from "../components/RegisterComponent";
import WarningComponent from "../components/WarningComponent";
import {LOGIN_PAGE} from "../Views";
import SpecialLink from "../components/Link";

export default class LoginPage extends React.Component{
  render(){
    return (
      <div className={'container'}>

        <div>
          <Header title={'Register page'}/>
          {
            window.sessionStorage.getItem('isAuthorised') === 'true'
              ?
              <div className={'warning'}>
                To register, please, log out.
              </div>
              :
              <div>
                <div className={'title'}>
                  Enter your data to register
                </div>

                <RegisterComponent/>
                <WarningComponent/>

                <SpecialLink path={LOGIN_PAGE} label={'Log in!'}/>
              </div>
          }
        </div>
      </div>
    );
  }
}
import React from 'react';
import Header from "../components/Header";
import WarningComponent from "../components/WarningComponent";
import {LOGIN_PAGE} from "../Views";
import history from "../History";
import Chart from "../components/Chart";

export default class MainPage extends React.Component {
  render(){
    return (
      <div className={'container'}>
        <Header title={'Main page'}/>
        {!(window.sessionStorage.getItem('isAuthorised') === 'true') ? history.push(LOGIN_PAGE) :
          <div id={'mainPageContainer'}>
            <WarningComponent/>
          </div>
        }
        <Chart/>
      </div>
    );
  }
}
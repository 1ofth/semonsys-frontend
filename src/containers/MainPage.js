import React from 'react'
import {Segment} from 'semantic-ui-react'
import {Route, Switch} from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import ServersPage from './ServersPage';
import DisplayData from "../components/DisplayData";
import history from "../History";
import {path, LOGIN_PAGE, ACCOUNT_PAGE} from "../Views";
import {SERVERS_URL} from "../ApiUrls";

export default class MainPage extends React.Component {
    render() {
        if (!(window.sessionStorage.getItem('isAuthorised') === 'true')) history.push(path + LOGIN_PAGE);

        return (
            <div>
                <HeaderMenu/>
                <Segment basic attached>
                    {/*using render instead of component when need to pass props*/}
                    <Switch>
                        <Route path={this.props.match.path} exact render={(props) =>
                            <ServersPage {...props} url={SERVERS_URL}/>}/>
                        <Route path={this.props.match.path + '/server/:serverName'} component={DisplayData}/>
                        {/* @TODO */ }
                        {/*<Route path={this.props.match.path + ACCOUNT_PAGE} component={AccountPage}/>*/}
                    </Switch>
                </Segment>
            </div>
        );
    }
}

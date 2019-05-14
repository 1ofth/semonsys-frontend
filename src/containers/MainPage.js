import React from 'react';
import {Segment} from 'semantic-ui-react'
import {Route, Switch} from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import history from "../History";
import {path, LOGIN_PAGE} from "../Views";
import DataPage from "./DataPage";
import ServersPage from "./ServersPage";

export default class MainPage extends React.Component {
    render() {
        if (!(window.sessionStorage.getItem('isAuthorised') === 'true')) history.push(path + LOGIN_PAGE);

        return (
            <div>
                <HeaderMenu/>
                {/*<Segment basic attached>*/}
                    {/*<NavBar />*/}
                {/*</Segment>*/}
                <Segment fluid basic attached style={{paddingLeft: '0px'}}>
                    {/*using render instead of component when need to pass props*/}
                    <Switch>
                        {/*<Route path={this.props.match.path} exact render={(props) =>*/}
                            {/*<ServersPage {...props} url={SERVERS_URL}/>}/>*/}
                        <Route path={this.props.match.path} exact component={ServersPage}/>
                        <Route path={this.props.match.path + '/server/:serverName'} component={DataPage}/>
                        {/* @TODO */ }
                        {/*<Route path={this.props.match.path + ACCOUNT_PAGE} component={AccountPage}/>*/}
                    </Switch>
                </Segment>
            </div>
        );
    }
}

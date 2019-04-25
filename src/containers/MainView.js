import React from 'react'
import {
    Container
} from 'semantic-ui-react'

import {Route, Switch} from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import HomePage from '../containers/HomePage';
import DataPage from "./DataPage";
const Venues = () => <h1>Venues</h1>;

export default class MainView extends React.Component {
    render() {
        return (
            <div>
                <HeaderMenu/>
                <Container fluid style={{marginTop: '5em'}}>
                    {/*using render instead of component when it need to pass props*/}
                    <Switch>
                        <Route path={this.props.match.path} exact render={(props) =>
                            <HomePage {...props} url={'http://185.43.5.178/server/rest/secured/server'} />} />
                        <Route path={this.props.match.path + '/server/:id'} component={DataPage}/>
                        <Route path={this.props.match.path + '/venues'} component={Venues}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

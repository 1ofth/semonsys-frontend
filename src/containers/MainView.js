import React from 'react'
import {
    Container,
    Header,
} from 'semantic-ui-react'

import TableComponent from '../components/TableComponent';
import {Route, Switch} from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";

const Home = () => <h1>Home</h1>;
const Places = () => <h1>Places</h1>;
const Venues = () => <h1>Venues</h1>;
const Floors = () => <h1>Floors</h1>;

export default class MainView extends React.Component {
    render() {
        return (
            <div>
                <HeaderMenu/>
                <Container style={{marginTop: '7em'}}>
                    {console.log(this.props.match)}
                    <Switch>
                        <Route path={this.props.match.path} exact component={Home}/>
                        <Route path={this.props.match.path + '/places'} component={Places}/>
                        <Route path={this.props.match.path + '/venues'} component={Venues}/>
                        <Route path="/floors" component={Floors}/>
                    </Switch>
                </Container>
                <Container text style={{marginTop: '7em'}}>
                    <Header as='h1'>Top processes information</Header>
                    <TableComponent/>
                </Container>
            </div>
        );
    }
}

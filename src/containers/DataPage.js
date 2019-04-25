import React from 'react'
import {
    Container,
    Grid
} from 'semantic-ui-react'

import {Route, Switch} from "react-router-dom";
import DisplayData from "../components/DisplayData";
import AccordionMenu from "../components/AccordionMenu";
import TableComponent from "../components/TableComponent";

export default class DataPage extends React.Component {
    render() {
        return (
            <Container fluid>
                <Grid columns={2}  >
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <AccordionMenu />

                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Switch>
                                <Route path={this.props.match.path} exact component={TableComponent} />
                                <Route path={this.props.match.path} exact render={(props) =>
                                    <DisplayData {...props} url={'http://185.43.5.178/server/rest/secured/server'} />} />
                                <Route path={this.props.match.path + '/data/:id'} render={(props) =>
                                    <DisplayData {...props} url={'http://185.43.5.178/server/rest/secured/server'} />} />
                                <Route path={this.props.match.path} render={(props) =>
                                    <DisplayData {...props} url={'http://185.43.5.178/server/rest/secured/server'} />} />
                                <Route path={this.props.match.path} render={(props) =>
                                    <DisplayData {...props} url={'http://185.43.5.178/server/rest/secured/server'} />} />
                                <Route path={this.props.match.path} render={(props) =>
                                    <DisplayData {...props} url={'http://185.43.5.178/server/rest/secured/server'} />} />
                                <Route path={this.props.match.path} render={(props) =>
                                    <DisplayData {...props} url={'http://185.43.5.178/server/rest/secured/server'} />} />
                            </Switch>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
                <Container >

                </Container>
            </Container>
        );
    }
}

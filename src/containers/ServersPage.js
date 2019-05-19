import React from 'react';
import {Header, Grid} from "semantic-ui-react";
import ServersComponent from "../components/ServersComponent";
import {SERVERS_URL} from "../ApiUrls";
import AddServer from "../components/AddServer";
import WarningComponent from "../components/WarningComponent";

export default class ServersPage extends React.Component {
    render() {
        return (
            <div>
                <Grid centered>

                    <Grid.Row>
                        <AddServer url={SERVERS_URL}/>
                    </Grid.Row>

                    <Grid.Row>
                        <Header as='h2' color='black' textAlign='center'>
                            Activated servers
                        </Header>
                    </Grid.Row>

                    <Grid.Row>
                        <ServersComponent url={SERVERS_URL} active={true}/>
                    </Grid.Row>

                    <Grid.Row>
                        <WarningComponent/>
                    </Grid.Row>

                    <Grid.Row>
                        <Header as='h2' color='black' textAlign='center'>
                            Blank servers
                        </Header>
                    </Grid.Row>

                    <Grid.Row>
                        <ServersComponent url={SERVERS_URL} active={false}/>
                    </Grid.Row>

                </Grid>
            </div>
        );
    }
}
import React from 'react';
import {Header} from "semantic-ui-react";
import ServersComponent from "../components/ServersComponent";
import {SERVERS_URL} from "../ApiUrls";
import AddServer from "../components/AddServer";

export default class ServersPage extends React.Component {
    render() {
        return (
            <div>
                <AddServer url={SERVERS_URL}/>
                <Header as='h2' color='black' textAlign='center'>
                    Activated servers
                </Header>
                <ServersComponent url={SERVERS_URL} active={true}/>

                <Header as='h2' color='black' textAlign='center'>
                    Blank servers
                </Header>
                <ServersComponent url={SERVERS_URL} active={false}/>
            </div>

        );
    }
}
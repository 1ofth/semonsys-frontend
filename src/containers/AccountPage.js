import React from "react";
import {Button, Container, Header, Segment} from 'semantic-ui-react'
    const AccountPage = () => (
    <Container text  textAlign='center'>
        <Header as='h1'>Start using Semonsys</Header>
        <p>
            This tutorial will explain you how to install agent to your server.

            First of all, you should download jar
        </p>
            <Button as={'a'} href={'http://185.43.5.178/static/agent.jar'} content='Download'/>
        <p>
        Now start agent with command java -jar agent.jar

            If you want to configure agent's parameters you can edit agent.properties file.
        </p>
    </Container>
);
export default AccountPage;
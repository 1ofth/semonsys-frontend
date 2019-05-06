import React from "react";
import {Button, Header, Segment} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {path, LOGIN_PAGE, REGISTRATION_PAGE} from "../Views";

const AboutPage = () => (
    <Segment inverted>
        <Button as={Link} to={path + LOGIN_PAGE} inverted floated='right'>
            Log in
        </Button>
        <Button as={Link} to={path + REGISTRATION_PAGE} inverted floated='right'>
            Sign Up
        </Button>
        <Header as='h1' color='black' textAlign='center'>
            Semonsys. To be continued...
        </Header>
    </Segment>
);
export default AboutPage;
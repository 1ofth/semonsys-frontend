import React from "react";
import {Button, Header, Image, Segment, Menu, Container} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {path, LOGIN_PAGE, REGISTRATION_PAGE} from "../Views";
import chart_1 from "../styles/about_1.jpg";
/*
fluid inverted vertical attached='top'
 */
const AboutPage = () => (
    <div>
        <Menu  size='large'>
            <Container>
                <Menu.Item position='right'>

                    <Button as={Link} to={path + LOGIN_PAGE}>
                        Log in
                    </Button>
                    <Button as={Link} to={path + REGISTRATION_PAGE}  style={{ marginLeft: '0.5em' }}>
                        Sign Up
                    </Button>
                </Menu.Item>
            </Container>
        </Menu>


        <Segment >
            <Header as='h1' color='black' textAlign='center'>
                Semonsys
            </Header>
            <Header as='h2' color='black' textAlign='center'>
                Servers monitoring system
            </Header>
            <Image src={chart_1}/> Build interactive charts from
        </Segment>
    </div>
);
export default AboutPage;
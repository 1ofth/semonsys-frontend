import React from 'react';
import {path, REGISTRATION_PAGE} from "../Views";
import {Grid, Header, Image, Message} from "semantic-ui-react";
import logo from "../styles/logo.png";
import {Link} from "react-router-dom";
import WarningComponent from "../components/WarningComponent";
import LoginComponent from "../components/LoginComponent";

export default class LoginPage extends React.Component {
    render() {
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='black' textAlign='center'>
                            <Image src={logo}/> Log-in to your account
                        </Header>
                        <LoginComponent/>
                        <WarningComponent/>
                        <Message>
                            New to us? <Link to={path + REGISTRATION_PAGE}>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}
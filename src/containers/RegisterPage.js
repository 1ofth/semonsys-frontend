import React from 'react';
import {Grid, Header, Image, Message} from "semantic-ui-react";
import logo from "../styles/logo.png";
import WarningComponent from "../components/WarningComponent";
import {Link} from "react-router-dom";
import {LOGIN_PAGE, path} from "../Views";
import RegisterComponent from "../components/RegisterComponent";

export default class RegisterPage extends React.Component {
    render() {
        return (
            <div className='reg-form'>
                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='black' textAlign='center'>
                            <Image src={logo}/> Create your account
                        </Header>
                        <RegisterComponent/>
                        <WarningComponent/>
                        <Message>
                            Already have an account? <Link to={path + LOGIN_PAGE}>Log in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../store/Actions';
import {Button, Form, Segment} from "semantic-ui-react";

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {login, password} = this.state;
        this.props.loginU(login, password);
    };


    render() {
        return (
            <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                    <Form.Input required fluid icon='user' iconPosition='left' placeholder='Login'
                                name='login' value={this.state.login} onChange={this.handleChange}/>
                    <Form.Input required
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password' value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <Button color='black' fluid size='large'>
                        Login
                    </Button>
                </Segment>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginU: bindActionCreators(login, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(LoginComponent);

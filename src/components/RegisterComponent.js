import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login, register} from '../store/Actions';
import {Button, Form, Segment} from "semantic-ui-react";
import history from "../History";
import {MAIN_PAGE} from "../Views";

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            email: ''
        };

    }

    componentDidUpdate() {
        if (this.props.login !== '' && this.props.login !== undefined) {
            console.log(this.props.login);
            this.props.loginU(this.props.login, this.state.password);
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {login, password} = this.state;
        this.props.register(login, password);
    };

    render() {
        return (
            <Form size='large' onSubmit={this.handleSubmit}>
                <Segment stacked>
                    <Form.Input required fluid icon='user' iconPosition='left' placeholder='Login'
                                name='login' value={this.state.login} onChange={this.handleChange}/>
                    <Form.Input
                        required
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                        name='password' value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <Form.Input name='email' value={this.state.email} type={'email'} onChange={this.handleChange}
                                fluid icon='mail' iconPosition='left' placeholder='E-mail address'/>

                    <Button color='black' fluid size='large'>
                        Register
                    </Button>
                </Segment>
            </Form>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginU: bindActionCreators(login, dispatch),
        register: bindActionCreators(register, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {login, makeWarning} from '../store/Actions';

class LoginComponent extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = (login, password) => event => {
    this.props.loginU(login, password);
  };

  render(){
    return (
        <table className={'inputs'}>
          <tr>
            <td>Login</td>
            <td>
              <input
                type='text'
                onChange={this.handleChange('login')}
              />
            </td>
          </tr>

          <tr>
            <td>Password</td>
            <td>
              <input
                type='password'
                onChange={this.handleChange('password')}
              />
            </td>
          </tr>

          <tr>
            <td></td>
            <td >
              <input
                type='button'
                value='Login'
                onClick={this.loginUser(this.state.login, this.state.password)}
              />
            </td>
          </tr>
        </table>
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
    makeWarning : bindActionCreators(makeWarning, dispatch),
    loginU: bindActionCreators(login, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

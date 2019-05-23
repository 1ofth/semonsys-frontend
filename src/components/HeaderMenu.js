import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import logo from "../styles/logo.png";
import {ACCOUNT_PAGE, MAIN_PAGE, path} from "../Views";
import {Image, Menu, Container, Button} from 'semantic-ui-react'
import history from "../History";
import {logout} from "../store/Actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class HeaderMenu extends Component {
    logOut = () => {
        this.props.logout();
        window.sessionStorage.setItem('accessToken', '');
        window.sessionStorage.setItem('refreshToken', '');
        window.sessionStorage.setItem('expires_in', '');
        window.sessionStorage.setItem('isAuthorised', 'false');
        window.sessionStorage.setItem('login', '');
        history.push(path);
    };
    render() {
        return (
            <Menu attached={'top'} inverted stackable>
                {/*this.props.match.url*/}
                <Container>
                    <Menu.Item as={Link} to={path + MAIN_PAGE} header>
                        <Image size='mini' src={logo} style={{marginRight: '1.5em'}}/>
                        My servers
                    </Menu.Item>

                    <Menu.Item as={Link} to={path + MAIN_PAGE + ACCOUNT_PAGE}>
                        {window.sessionStorage.getItem('login')}
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Button onClick={this.logOut} inverted compact>
                            Log out
                        </Button>
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: bindActionCreators(logout, dispatch)
    }
};

export default withRouter(connect(null, mapDispatchToProps)(HeaderMenu));

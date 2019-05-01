import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import logo from "../styles/logo.png";
import {ACCOUNT_PAGE, MAIN_PAGE, path} from "../Views";
import {Image, Menu, Container} from 'semantic-ui-react'

class HeaderMenu extends Component {
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
                </Container>
            </Menu>
        );
    }
}

export default withRouter(HeaderMenu);

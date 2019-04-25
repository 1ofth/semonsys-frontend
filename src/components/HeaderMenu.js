import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../styles/logo.png";
import {MAIN_PAGE, path} from "../Views";
import {
    Container,
    Image,
    Menu
} from 'semantic-ui-react'
class HeaderMenu extends Component {
    render() {
        return (
            <Menu fixed='top' inverted>
                <Container>
                    {/*this.props.match.url*/}
                    <Menu.Item as={Link} to={path + MAIN_PAGE} header>
                        <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                        Semonsys
                    </Menu.Item>

                    <Menu.Item  as={Link} to={path + MAIN_PAGE + '/venues'}>
                        {window.sessionStorage.getItem('login')}
                    </Menu.Item>

                </Container>
            </Menu>

        );
    }
}

export default withRouter(HeaderMenu);

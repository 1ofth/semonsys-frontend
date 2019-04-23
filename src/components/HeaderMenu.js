import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../styles/logo.png";
import {MAIN_PAGE, path} from "../Views";
import {
    Container,
    Dropdown,
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

                    <Dropdown as={Link} to={path + MAIN_PAGE + '/places'}
                              item simple text='My servers'>
                        <Dropdown.Menu>
                            <Dropdown.Item  >List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    <Menu.Item  as={Link} to={path + MAIN_PAGE + '/venues'}>
                        {window.sessionStorage.getItem('login')}
                    </Menu.Item>

                </Container>
            </Menu>

        );
    }
}

export default withRouter(HeaderMenu);

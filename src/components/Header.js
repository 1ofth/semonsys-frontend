import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {logout, makeWarning} from "../store/Actions";
import history from '../History';

class Header extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.title !== undefined) {
            document.title = this.props.title;
        } else {
            document.title = 'Semonsys';
        }
    }

    logOut = () => {
        this.props.logout();
        window.sessionStorage.setItem('isAuthorised', 'false');
        window.sessionStorage.setItem('login', '');
        history.push('log');
    };

    render() {
        return (
            <div className={'header'}>
                <div id={'authors'}>
                    Ибраимов Эдем, Морозов Иван, P3212
                </div>
                <div id={'variant'}>
                    Вариант: 569812
                </div>

                <div id={'userMenu'}>
                    <table>
                        <tbody>
                        <tr>
                            <td id={'userName'}>
                                Hello,
                                {
                                    window.sessionStorage.getItem('isAuthorised') === 'true'
                                        ? window.sessionStorage.getItem('login')
                                        : '  Anonymous'
                                }
                            </td>
                            <td id={'spacer'}/>
                            <td>
                                <input id={'logoutButton'}
                                       type="button"
                                       value="logout"
                                       style={window.sessionStorage.getItem('isAuthorised') !== 'true' ? {'display': 'none'} : {}}
                                       onClick={this.logOut()}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeWarning: bindActionCreators(makeWarning, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
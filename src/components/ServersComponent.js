import React from 'react'
import {Accordion, Button, Form, Icon, Segment} from 'semantic-ui-react'
import {bindActionCreators} from "redux";
import {loadData, makeWarning} from "../store/Actions";
import {Link} from "react-router-dom";
import {MAIN_PAGE, path} from "../Views";
import {connect} from "react-redux";
import {SERVER_ACTIVATE_URL} from "../ApiUrls";

class ServersComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            login: '',
            password: ''
        };

    }

    click = () => {
        console.log('click');
    };


    handleSubmit = (e, {formData}) => {
        console.log(e);
        console.log(formData);
    };

    componentDidMount() {
        if (this.props.servers === undefined) {
            this.props.loadData(this.props.url, 'servers');
        }
    }

    activate = (serverName, event, data) => {
        console.log(serverName);
        fetch(SERVER_ACTIVATE_URL.replace('name=', `name=${serverName}`), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken'),
            }
        }).then((response) => {
            console.log(response)
        });
    };
    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({activeIndex: newIndex})
    };
    generatePanels = (activ) => {
        if (this.props.servers === undefined) return null;
        let lines = [];
/*
   <Button floated='right' icon size='mini' onClick={this.click}>
                                <Icon name='delete'/>
                            </Button>
                            <Button floated='right' icon size='mini'>
                                <Icon name='edit'/>
                            </Button>
 */
        for (let i = 0; i < this.props.servers.length; i++) {
            let serv = this.props.servers[i];
            if (activ === serv.a) {
                lines.push([
                        <Accordion.Title active={this.state.activeIndex === i} index={i} key={i + 1}
                                         onClick={this.handleClick}>
                            <Icon name='dropdown'/>
                            <Link to={path + MAIN_PAGE + `/server/${serv.n}`}>{serv.n}</Link>

                        </Accordion.Title>,
                        <Accordion.Content key={i * 1001} active={this.state.activeIndex === i}>
                            <Form size='large' onSubmit={this.handleSubmit}>
                                <Segment stacked>
                                    <Form.Input required placeholder='Name'
                                                name='name' defaultValue={serv.n}
                                                readOnly/>
                                    <Form.Input required placeholder='Ip'
                                                name='ip' defaultValue={serv.i}
                                                readOnly/>
                                    <Form.Input required placeholder='Port'
                                                name='port' defaultValue={serv.p}
                                                readOnly/>
                                    <Form.Input required
                                                placeholder='Description'
                                                name='description' value={serv.d}
                                                readOnly
                                    />
                                    {activ ? '' :
                                        <Button color='black' onClick={this.activate.bind(this, serv.n)} type='submit'
                                                size='medium'>
                                            Activate
                                        </Button>}

                                </Segment>
                            </Form>
                        </Accordion.Content>
                    ]
                );
            }
        }
        return lines;
    };

    render() {
        console.log('rerender server component ' + this.props.active === true);
        return (
                <Accordion styled>
                    {this.generatePanels(this.props.active)}
                </Accordion>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        servers: state.servers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeWarning: bindActionCreators(makeWarning, dispatch),
        loadData: bindActionCreators(loadData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ServersComponent);

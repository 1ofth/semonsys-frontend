import React from 'react'
import {Button, Form, Confirm} from 'semantic-ui-react'
import {bindActionCreators} from "redux";
import {activateOrDeleteServer, addServer, makeWarning} from "../store/Actions";
import {connect} from "react-redux";
import {SERVER_ACTIVATE_URL, SERVERS_URL} from "../ApiUrls";

class ServerDataForm extends React.Component {

    constructor(props) {
        super(props);
        const {n, i, p, d} = this.props.server;
        this.state = {
            name: n,
            ip: i,
            port: p,
            description: d,
            changed: false,
            openConfirmDelete: false,
            openConfirmUpdate: false
        }
    }

    handleChange = (e, {name, value}) => {
        this.setState({changed: true});
        this.setState({[name]: value});
    };

    showConfirmDelete = () => this.setState({openConfirmDelete: true});
    showConfirmUpdate = () => this.setState({openConfirmUpdate: true});

    handleCancelDelete = () => this.setState({openConfirmDelete: false});
    handleCancelUpdate = () => this.setState({openConfirmUpdate: false});

    onConfirmDelete = () => {
        this.setState({openConfirmDelete: false});
        this.delete();
    };

    onConfirmUpdate = () => {
        this.setState({openConfirmUpdate: false});
        this.save();
    };

    delete = () => {
        this.props.updateServers('DELETE', SERVERS_URL, this.props.server.n);
    };

    activate = () => {
        this.props.updateServers('GET', SERVER_ACTIVATE_URL, this.props.server.n);
    };

    save = () => {
        const {name, ip, port, description} = this.state;
        this.props.saveServer('PUT', name, ip, port, description);
    };

    generatePanels = () => {
        return <Form size='large'>
            <Form.Input required placeholder='Name' onChange={this.handleChange}
                        name='name' value={this.state.name}
            />
            <Form.Input required placeholder='IP' onChange={this.handleChange}
                        name='ip' value={this.state.ip}
            />
            <Form.Input required placeholder='Port' onChange={this.handleChange}
                        name='port' value={this.state.port}
            />
            <Form.Input onChange={this.handleChange}
                        placeholder='Description' name='description'
                        value={this.state.description}
            />

            {this.props.server.a ? '' :
                <Button color='black' onClick={this.activate} type='submit'
                        size='medium'>
                    Activate
                </Button>}


            <Button color='black' onClick={this.showConfirmDelete} type='submit'
                    size='medium'>
                Delete
            </Button>

            {this.state.changed ?
                <Button color='black' onClick={this.showConfirmUpdate} type='submit'
                        size='medium'>
                    Save
                </Button> : ''}

            <Confirm size={'tiny'}
                     open={this.state.openConfirmDelete}
                     content='Are you sure you want delete server?'
                     onCancel={this.handleCancelDelete}
                     onConfirm={this.onConfirmDelete}
            />
            <Confirm
                open={this.state.openConfirmUpdate}
                content='Are you sure you want to save changes?'
                onCancel={this.handleCancelUpdate}
                onConfirm={this.onConfirmUpdate}
            />
        </Form>
    };

    render() {
        return (
            <div>
                {this.generatePanels(this.props.active)}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        makeWarning: bindActionCreators(makeWarning, dispatch),
        saveServer: bindActionCreators(addServer, dispatch),
        updateServers: bindActionCreators(activateOrDeleteServer, dispatch)

    }
};

export default connect(null, mapDispatchToProps)(ServerDataForm);

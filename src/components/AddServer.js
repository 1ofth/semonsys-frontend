import React from "react";

import {Modal, Form, Button, Icon, Segment} from 'semantic-ui-react';
import {bindActionCreators} from "redux";
import {addServer, loadData, makeWarning} from "../store/Actions";
import connect from "react-redux/es/connect/connect";

class AddServer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ip: '',
            port: '',
            description: '',
            showModal: false
        }
    }

    closeModal = () => {
        this.setState({showModal: false})
    };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const {name, ip, port, description} = this.state;
        this.props.addServer('POST', name, ip, port, description);
        this.setState({showModal: false});
    };

    render() {
        const {showModal} = this.state;

        return (
            <Modal closeIcon onClose={this.closeModal} open={showModal}
                   trigger={<Button floated='right' onClick={() => this.setState({showModal: true})}><Icon
                       className='plus'/>New
                       Server</Button>}>
                <Modal.Header>Add blank server</Modal.Header>
                <Modal.Content>
                    <Form size='large' onSubmit={this.handleSubmit}>
                        <Form.Input required placeholder='Name' onChange={this.handleChange}
                                    name='name' value={this.state.name}/>
                        <Form.Input required placeholder='Ip' onChange={this.handleChange}
                                    name='ip' value={this.state.ip}/>
                        <Form.Input required placeholder='Port' onChange={this.handleChange}
                                    name='port' value={this.state.port}/>
                        <Form.Input placeholder='Description' onChange={this.handleChange}
                                    name='description' value={this.state.description}/>

                        <Button color='blue' type='submit'
                                size='medium'>
                            Add
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        makeWarning: bindActionCreators(makeWarning, dispatch),
        loadData: bindActionCreators(loadData, dispatch),
        addServer: bindActionCreators(addServer, dispatch)
    }
};

export default connect(null, mapDispatchToProps)(AddServer);

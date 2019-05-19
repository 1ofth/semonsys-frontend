import React from 'react'
import {Accordion, Container, Icon} from 'semantic-ui-react'
import {bindActionCreators} from "redux";
import {loadData, makeWarning} from "../store/Actions";
import {Link} from "react-router-dom";
import {MAIN_PAGE, path} from "../Views";
import {connect} from "react-redux";
import ServerDataForm from "./ServerDataForm";

class ServersComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            login: '',
            password: ''
        };
    }

    componentDidMount() {
        if (this.props.servers === undefined) {
            this.props.loadData(this.props.url, 'servers');
        }
    }

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
                            <Container textAlign={'left'}>
                                <Icon corner={'top left'} name='dropdown'/>
                                {serv.a === true ? <Link to={path + MAIN_PAGE + `/server/${serv.n}`}>{serv.n}</Link>
                                    : serv.n}
                            </Container>
                        </Accordion.Title>,
                        <Accordion.Content key={i * 1001} active={this.state.activeIndex === i}>
                            <ServerDataForm server={serv}/>
                        </Accordion.Content>
                    ]
                );
            }
        }
        return lines;
    };

    render() {
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

import React from 'react'
import {Accordion, Icon, Segment} from 'semantic-ui-react'
import {bindActionCreators} from "redux";
import {loadData, makeWarning} from "../store/Actions";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import {MAIN_PAGE, path} from "../Views";

class ServersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
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
    render() {
        let lines = [];
        if (this.props.servers === undefined) return null;
        for (let i = 0; i < this.props.servers.length; i++) {
            let serv = this.props.servers[i];

            let out = '';
            for (const prop in serv) {
                if (serv.hasOwnProperty(prop))
                   out = out.concat(`${prop}: ${serv[prop]}`).concat("\n");
            }
            lines.push([
                    <Accordion.Title active={this.state.activeIndex === i} index={i} key={i+1}  onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        <Link  to={path + MAIN_PAGE + `/server/${serv.n}`}>{serv.n}</Link>

                    </Accordion.Title>,
                    <Accordion.Content key={i * 1001} active={this.state.activeIndex === i}>
                        <Segment>{out}</Segment>
                        {/*possible here <Divider/>*/}
                    </Accordion.Content>
                ]
            );
        }
        return (
            <Accordion styled>
                {lines}
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

export default connect(mapStateToProps, mapDispatchToProps)(ServersPage);

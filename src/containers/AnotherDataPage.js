import React from 'react'
import {Accordion, Icon, Segment } from 'semantic-ui-react'
import {bindActionCreators} from "redux";
import {loadData, makeWarning} from "../store/Actions";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import {MAIN_PAGE, path} from "../Views";

class AnotherDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
        };

        this.handleClick = this.handleClick.bind(this);
    }
    // вызывается после каждой отрисовки при обновлении
    // componentDidUpdate() {
    //     this.props.loadData(this.props.url);
    // }
    // вызывается один раз после первой отрисовки
    componentDidMount() {
        if (this.props.servers === undefined) {
            this.props.loadData(this.props.url);
        }
    }

    render() {
        // to make all tabs collapsed by default you could use this shit:
        // const {activeIndex} = this.state;
        let lines = [];
        if (this.props.servers === undefined) return null;
        for (let i = 0; i < this.props.servers.length; i++) {
            let serv = this.props.servers[i];

            let out = '';
            for (const prop in serv) {
                if (serv.hasOwnProperty(prop))
                    out = out.concat(`${prop}: ${serv[prop]}`);
            }

            const level2Panels = [
                { key: 'panel-2a', title: 'Level 2A', content: 'Level 2A Contents' },
                { key: 'panel-2b', title: 'Level 2B', content: 'Level 2B Contents' },
            ];
            const level1Panels = [
                { key: 'panel-1a', title: 'Level 1A', content: <Accordion.Accordion panels={level2Panels}/>},
                { key: 'panel-ba', title: 'Level 1B', content: 'Level 1B Contents' }
            ];
            lines.push([
                    <Accordion.Title active={this.state.activeIndex === i} index={i} key={i+1}  onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        <Link  to={path + MAIN_PAGE + `/server/${serv.id}`}>{serv.name}</Link>

                    </Accordion.Title>,
                    <Accordion.Content key={i * 1001} active={this.state.activeIndex === i}>
                        <Segment>{out}</Segment>
                        <Accordion.Accordion panels={level1Panels}/>
                        {/*possible here <Divider/>*/}
                    </Accordion.Content>
                ]
            );
        }

        return (
            <Accordion  >
                {lines}
            </Accordion>
        )
    }
    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({activeIndex: newIndex})
    };
}

const mapStateToProps = (store) => {
    return {
        servers: store.servers,
        dataGroups: store.dataGroups,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeWarning: bindActionCreators(makeWarning, dispatch),
        loadData: bindActionCreators(loadData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AnotherDataPage);

import {Accordion, Loader} from 'semantic-ui-react'
import React from 'react';
import '../styles/accord.css';
import {bindActionCreators} from "redux";
import {loadData, makeWarning} from "../store/Actions";
import connect from "react-redux/es/connect/connect";

class LazySubAccordion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            size: 'medium',
            show: false,
            activeIndex: 0,
        };
        this.showImage = this.showImage.bind(this);

    }

    showImage = () => {
        // console.log('thread is on show func');

        this.setState({
            show: true,
        })
    };

    // componentDidMount() {
    //     if (this.props.servers === undefined) {
    //         console.log('thread is on componentDidMount');
    //
    //         // this.props.loadData(this.props.url);
    //     }
    // }

    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({activeIndex: newIndex})
    };

    render() {

        if (this.props.dataGroups === undefined)

            return <Loader active inline="centered">Loading data</Loader>;
        else {
            console.log('efweefewefwe' + this.props.dataGroups);

            return <Accordion.Accordion style={{marginLeft: "20px"}}
                                        className="no-padding" panels={this.props.panels}/>;
        }

    }

}

const mapStateToProps = (store) => {
    console.log('thread is on mapStateToProps func');

    return {
        // dataGroups: store.dataGroups,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeWarning: bindActionCreators(makeWarning, dispatch),
        loadData: bindActionCreators(loadData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LazySubAccordion);

import {connect} from 'react-redux';
import React from "react";
import {Message} from "semantic-ui-react";

class WarningComponent extends React.Component {
    render() {
        if (this.props.warning === undefined || this.props.warning === '') {
            return null;
        } else {
            return <Message negative>
                {this.props.warning}
            </Message>;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        warning: state.message
    };
};

export default connect(mapStateToProps)(WarningComponent);
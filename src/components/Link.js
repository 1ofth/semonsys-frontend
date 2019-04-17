import React from 'react';
import {bindActionCreators} from "redux";
import {makeWarning} from "../store/Actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import history from '../History';

class SpecialLink extends React.Component {
  constructor(props) {
    super(props);

    this.clearWarning = this.clearWarning.bind(this);
  }

  clearWarning(event) {
    event.preventDefault();

    this.props.makeWarning('');
    history.push(this.props.path);
  }

  render(){
    return (
      <Link className={'specialLink'} onClick={this.clearWarning} href={this.props.path} to={this.props.path}>{this.props.label}</Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning: bindActionCreators(makeWarning, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialLink);

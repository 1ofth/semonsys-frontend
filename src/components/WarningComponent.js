import { connect } from 'react-redux';
import * as React from "react";

class WarningComponent extends React.Component{
  render() {
    return (
      <div className={'warning'}>
        {this.props.warning}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    warning: state.message
  };
};

export default connect(mapStateToProps)(WarningComponent);
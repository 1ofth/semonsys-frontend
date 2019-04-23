import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {makeWarning} from "../store/Actions";

class TableComponent extends React.Component{
  constructor(props){
    super(props);

    this.getRows = this.getRows.bind(this);
  }

  getRows() {
    let result = [];

    const shouldRValuesBeEqual = false;

    for (let i = 0; i < this.props.dots.length; i++) {
      let dot = this.props.dots[i];
      if (!shouldRValuesBeEqual || dot.r === this.props.chartR) {
        result.push(
          <tr>
            <td>{(+dot.x).toFixed(2)}</td>
            <td>{(+dot.y).toFixed(2)}</td>
            <td>{dot.r}</td>
            <td>{(String)(dot.inArea)}</td>
          </tr>
        )
      }
    }

    result.reverse();

    return result;
  }

  render(){
    return(
      <div>
        <table id={'table'}>
          <tbody>
            <tr id={'tableTitle'}><td>x</td><td>y</td><td>r</td><td>result</td></tr>
            {this.getRows()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    updateChart: state.updateChart,
    chartR: state.chartR,
    dots: state.dots
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning: bindActionCreators(makeWarning, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
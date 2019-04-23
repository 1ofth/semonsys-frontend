import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {addDot, makeWarning, updateChart} from "../store/Actions";

import {checkDotInArea} from "./Chart";


class DataInputComponent extends React.Component{
  handleChange = name => event => {
    event.preventDefault();

    if ((String)(event.target.value).length > 8) {
      this.props.makeWarning(name + " should have not more than 7 digits");
      return;
    }

    if(!isNaN(parseFloat((String)(event.target.value).replace(',', '.')))) {
      this.setState({
        [name]: (String)(event.target.value).replace(',', '.'),
      });
      if (this.props.warning !== '') {
        this.props.makeWarning('');
      }
    } else {
      this.props.makeWarning(name + " should be a number");
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      r: this.props.chartR
    };

    this.addNewDot = this.addNewDot.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeR = this.changeR.bind(this);
    this.createOptions = this.createOptions.bind(this);
  }

  /* TODO something wrong happens:
    if I change r value a fetch request is sent to the server.
   once it fall down at all
   dots are being added by themselves using data in inputs
  */
  changeR = event => {
    event.preventDefault();

    this.setState({
      r: +event.target.value
    });
    this.props.updateChart(+event.target.value);
  };

  addNewDot(event) {
    event.preventDefault();

    this.props.addDot(
      this.state.x,
      this.state.y,
      this.state.r,
      checkDotInArea(this.state.x, this.state.y, this.state.r)
    );
  }

  createOptions() {
    let result = [];
    for (let i = 5; i > 0; i--) {
      result.push(<option selected={+this.props.chartR === i} value={(String)(i)}>{i}</option>);
    }
    return result;
  }

  render(){
    return (
      <div>
        <div className={'inputField'}>
          X
          <select onChange={this.handleChange('x')}>
            <option value={'3'}>3</option>
            <option value={'2'}>2</option>
            <option value={'1'}>1</option>
            <option selected={true} value={'0'}>0</option>
            <option value={'-1'}>-1</option>
            <option value={'-2'}>-2</option>
            <option value={'-3'}>-3</option>
            <option value={'-4'}>-4</option>
            <option value={'-5'}>-5</option>
          </select>
        </div>

        <div className={'inputField'}>
          Y
          <input type={'text'} onChange={this.handleChange('y')}/>
        </div>

        <div className={'inputField'}>
          R
          <select onChange={this.changeR}>
            {this.createOptions()}
          </select>
        </div>

        <input
          id={'dotButton'}
          type={'button'}
          disabled={
            this.props.warning !== undefined && (String)(this.props.warning).indexOf('should be a number') >= 0
          }
          onClick={this.addNewDot}
          value={'Check'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    chartR: state.chartR
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeWarning : bindActionCreators(makeWarning, dispatch),
    addDot: bindActionCreators(addDot, dispatch),
    updateChart: bindActionCreators(updateChart, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataInputComponent);
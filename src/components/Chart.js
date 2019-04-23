import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import { loadData, makeWarning} from "../store/Actions";
import connect from "react-redux/es/connect/connect";

import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

class Chart extends Component{

  constructor(props) {
    super(props);
      // in chart "palettecolors": "111111"
      this.state = {
          timeseriesDs: {
              type: 'timeseries',
              renderAt: 'container',
              width: '800',
              height: '600',
              dataSource: {
                  chart: {
                      theme: "candy",
                      showLegend: 0
                  },
                  caption: {
                      text: 'CPU usage of process with pid 5542'
                  },
                  yAxis: [
                      {
                          plot: {
                              value: 'CPU usage',
                              type: 'area'
                          },
                          title: 'CPU usage (in %)'
                      }
                  ],
                  data: null
              }
          }
      };
      this.createDataTable = this.createDataTable.bind(this);
  }

    createDataTable() {
        fetch('http://185.43.5.178/server/rest/secured/data/composite/after?server_id=1&identifier=Process 5542&time=0', {
            method: 'GET',
            withCredentials: true,
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                return response.json()
            }). then ((response) => {
            let data = [];
            response.forEach((e) => {
                data.push([e.data[1].time, e.data[1].value]);
            });
            const schema = [
                {
                    "name": "Time",
                    "type": "date",
                    "format": "%b %d, %Y %H:%M:%S %p"
                },
                {
                    "name": "CPU usage",
                    "type": "number"
                }
            ];

            const fusionDataStore = new FusionCharts.DataStore();
            const fusionTable = fusionDataStore.createDataTable(data, schema);
            const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
            timeseriesDs.dataSource.data = fusionTable;
            this.setState({
                timeseriesDs
            });
        });

    }

    componentDidMount() {
        this.createDataTable();
    }
  render(){

    return(
        <ReactFC {...this.state.timeseriesDs} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeWarning : bindActionCreators(makeWarning, dispatch),
        loadDots: bindActionCreators(loadData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import {bindActionCreators} from "redux";
import {loadData} from "../store/Actions";

ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);
let field;

class Chart extends Component {

    timerId;

    constructor(props) {
        super(props);
        // in chart "palettecolors": "111111"
        field = this.props.location.state.field;
        this.state = {
            timeseriesDs: {
                type: 'timeseries',
                renderAt: 'container',
                width: window.innerWidth / 2,
                height: window.innerHeight / 2,
                dataSource: {
                    chart: {
                        theme: "candy",
                        showLegend: 0
                    },
                    caption: {
                        text: this.props.location.state.label
                    },
                    yAxis: [
                        {
                            plot: {
                                value: this.props.location.state.label,
                                type: 'area'
                            },
                            title: this.props.location.state.label
                        }
                    ],
                    data: null
                }
            }
        };

        this.timerId = setInterval(() => {
            this.updateChart();
        }, 15000);
    }

    updateChart() {
        let lastDate;
        if (this.props.field !== undefined) {
            lastDate = this.props.field.maxTime;
        } else lastDate = 1;
        let url = this.props.location.state.url.replace('time=', `time=${lastDate}`);
        this.props.loadData(url, field);
    }

    componentDidMount() {
        this.updateChart();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        const schema = [
            {
                "name": "Time",
                "type": "date",
                "format": "%d.%m %H:%M:%S"
            },
            {
                "name": this.props.location.state.label,
                "type": "number"
            }
        ];

        let data = [];
        if (this.props.field !== undefined) {
            data = this.props.field.data;
        }

        const fusionDataStore = new FusionCharts.DataStore();
        const fusionTable = fusionDataStore.createDataTable(data, schema);
        const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
        timeseriesDs.dataSource.data = fusionTable;
        // this.setState({
        //     timeseriesDs
        // });

        return (
            <ReactFC {...timeseriesDs} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        field: state[field]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: bindActionCreators(loadData, dispatch)
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chart));
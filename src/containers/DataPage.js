import React from "react";
import {CHART_PAGE} from "../Views";
import {Grid, Responsive} from "semantic-ui-react";
import {Route} from "react-router-dom";
import DisplayData from "../components/DisplayData";
import Chart from "../components/Chart";

export default class DataPage extends React.Component {
    render() {
        return (
            <Grid columns={2} fluid doubling stackable>
                <Grid.Row>
                    <Grid.Column>
                        <DisplayData match={this.props.match}/>
                    </Grid.Column>
                    <Grid.Column>
                        <Responsive minWidth={Responsive.onlyComputer.minWidth} >
                            <Route path={this.props.match.path + CHART_PAGE} render={(props) =>
                                <Chart {...props} width={window.innerWidth / 2}/>}/>
                        </Responsive>
                        <Responsive maxWidth={Responsive.onlyTablet.maxWidth} >
                            <Route path={this.props.match.path + CHART_PAGE} render={(props) =>
                                <Chart {...props} width={window.innerWidth}/>}/>
                        </Responsive>
                    </Grid.Column>

                </Grid.Row>
            </Grid>
        );
    }
}

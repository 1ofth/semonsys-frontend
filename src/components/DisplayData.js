import React from 'react';
import '../styles/accord.css';
import {Accordion, Grid, Loader} from 'semantic-ui-react'
import {bindActionCreators} from "redux";
import {loadData, cleanStore} from "../store/Actions";
import connect from "react-redux/es/connect/connect";
import TableComponent from "../components/TableComponent";
import Chart from "./Chart";
import {Route} from "react-router-dom";
import {COMPOSITE_IDS_URL, DATA_GROUPS_URL, SINGLE_LAST_URL} from "../ApiUrls";
import {CHART_PAGE} from "../Views";

let toSubscribe = [];

class DisplayData extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (this.props.dataGroups === undefined) {
            this.props.loadData(DATA_GROUPS_URL, 'dataGroups');
        }
    }

    componentWillUnmount() {
        this.props.cleanStore(toSubscribe);
    }

    showImage = (url, event, data) => {
        if (!data.active) {
            for (let i = 0; i < url.length; i++) {
                let substitution;
                if (url[i].search('identifier=') !== -1) {
                    substitution = url[i].replace('identifier=', `identifier=${data.content}`);
                } else {
                    substitution = url[i].replace('group=', `group=${data.content}`);
                }
                substitution = substitution.replace('server=', `server=${this.props.match.params.serverName}`);
                this.props.loadData(substitution, data.content);
            }
        }
    };

    // accept array to iterate through !!!!
    // returns array of panels suitable to Accordion

    generatePanels = (initial) => {
        let lines = [];
        if (initial === undefined)
            return lines;
        for (let i = 0; i < initial.length; i++) {
            let dataGroup = this.props[initial[i].n];
            console.log(initial[i].n);
            console.log(dataGroup);

            let grp = initial[i].n;
            toSubscribe.push(grp);
            let accordionContent;
            let rows = [], urls = {}, fields = {}, labels = {};
            let subAccordionPanel;
            if (Array.isArray(dataGroup)) {
                // х*ардкодим
                for (let i = 0; i < dataGroup.length; i++) {
                    if (!Array.isArray(dataGroup[i])) {
                        rows.push({name: dataGroup[i].t, value: dataGroup[i].p.v, observable: dataGroup[i].m});
                        if (dataGroup[i].m) {
                            urls[dataGroup[i].t] = `http://185.43.5.178/server/rest/secured/data/sing/series?group=${grp}&server=${this.props.match.params.serverName}&type=${dataGroup[i].t}&time=`;
                            fields[dataGroup[i].t] = `${this.props.match.params.serverName}${grp}${dataGroup[i].t}`.replace(/\s/g, '');
                            labels[dataGroup[i].t] = dataGroup[i].t;
                        }
                    } else {
                        subAccordionPanel = <Accordion.Accordion onTitleClick={this.showImage.bind(this, [
                            `http://185.43.5.178/server/rest/secured/data/comp/last?group=${grp}&server=&identifier=`
                        ])}
                                                                 className="no-padding"
                                                                 panels={this.generatePanels(dataGroup[i])}
                        />;
                    }
                }
                accordionContent = <div className="indent">
                    <TableComponent headerRow={['Name', 'Value', 'Chart']} tableData={rows}
                                    urls={urls} fields={fields} labels={labels} link={this.props.match.url}/>
                    {subAccordionPanel}
                </div>;
            } else {
                accordionContent = <Loader active inline="centered">Loading data</Loader>;
            }

            lines.push({
                title: initial[i].n,
                content: {content: accordionContent, key: initial[i].n + ' ' + i},
                key: initial[i].n
            });

        }
        return lines;
    };

    render() {
        console.log('rerender display data');
        return (
            <Grid columns={2} fluid doubling stackable>
                <Grid.Row>
                    <Grid.Column>
                        <Accordion styled fluid onTitleClick={this.showImage.bind(this, [
                            SINGLE_LAST_URL, COMPOSITE_IDS_URL
                        ])} panels={this.generatePanels(this.props.dataGroups)}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Route path={this.props.match.path + CHART_PAGE} component={Chart}/>
                    </Grid.Column>

                </Grid.Row>
            </Grid>

        )
    }

}

const mapStateToProps = (store) => {
    let temp = {};
    for (let i = 0; i < toSubscribe.length; i++) {
        temp[toSubscribe[i]] = store[toSubscribe[i]];
    }
    temp.dataGroups = store.dataGroups;
    toSubscribe = [];
    return temp;
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: bindActionCreators(loadData, dispatch),
        cleanStore: bindActionCreators(cleanStore, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayData);

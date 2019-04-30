import React from 'react';
import '../styles/accord.css';
import {Accordion} from 'semantic-ui-react'
import {bindActionCreators} from "redux";
import {loadData} from "../store/Actions";
import connect from "react-redux/es/connect/connect";
import LazySubAccordion from "./LazySubAccordion";
import TableComponent from "../components/TableComponent";

let toSubscribe = [];
class DisplayData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
        };
    }

    // accept array to iterate through !!!!
    // returns array of panels suitable to Accordion
    /*
    */
    SubAccordionPanels = [
        {
            title: 'Sub Accordion 1',
            content: {content: 'asaasa', key: 'sa1-content'},
            key: 'sub-accordion-1'
        }, {
            title: 'Sub Accordion 2',
            content: {content: 'asaasa', key: 'sa2-content'},
            key: 'sub-accordion-2'
        }, {
            title: 'Sub Accordion 3',
            content: {content: 'asaasa', key: 'sa3-content'},
            key: 'sub-accordion-3'
        }
    ];

    generateContent = (data) => {
        let rows = [];
        for (let i = 0; i < data.length; i++) {
            rows.push({name: data[i].t, value: data[i].p.v, observable: data[i].m});
        }
        return <TableComponent headerRow={['Name', 'Value', 'Chart']} tableData={rows}/>
    };

    componentDidMount() {
        if (this.props.dataGroups === undefined) {
            this.props.loadData('http://185.43.5.178/server/rest/secured/group', 'dataGroups');
        }
    }

    /*
    'http://185.43.5.178/server/rest/secured/server'

     /rest/secured/group

     http://185.43.5.178/server/rest/secured/data/sing/last?group=название группы&server=имя сервера
     /rest/secured/data/comp/identifiers?group=...&server=...

     http://185.43.5.178/server/rest/secured/data/comp/last?group=...&server=...&identifier=..
     */
    showImage = (url, event, data) => {
        console.log('thread is on show func e e ');
        for (let i = 0; i < url.length; i++) {
            let substitution;
            if (url[i].search('identifier=') !== -1) {
                substitution = url[i].replace('identifier=', `identifier=${data.content}`);
            } else {
                substitution = url[i].replace('group=', `group=${data.content}`);
            }
            substitution = substitution.replace('server=', `server=${this.props.match.params.serverName}`);
            setTimeout(() => {
                // if (this.props[data.content] === undefined) {
                    this.props.loadData(substitution, data.content);
            }, 1000);
        }
        console.log('ta');
    };

    generatePanels = (initial) => {
        let lines = [];
        // marked to remove
        if (initial === undefined)
            return lines;
        // array  / undefined
        // object can represent both tab content and tab name
        for (let i = 0; i < initial.length; i++) {
            let dataGroup = this.props[initial[i].n];
            let grp = initial[i].n;
            toSubscribe.push(grp);
            console.log(dataGroup);
            let accordionContent;
            let rows = [];
            let subAccordionPanel;
            if (Array.isArray(dataGroup)) {
                // х*ардкодим
                /*
                    store:
                        data_groups : [{n: 'OS', d: 'описание'}, ....],
                            os
                                os : [ {p: {}, t: 'name', m: false}, {p: {}, t: 'arch', m: false}, [{n: 'Process 1', d: 'описание'}, 'Process 12', 'Process 21']]

                                    process 1: [ {p: {}, t: 'mem', m: true}, {p: {}, t: 'cpu', m: true}]

                     */
                for (let i = 0; i < dataGroup.length; i++) {
                    if (!Array.isArray(dataGroup[i])) {
                        rows.push({name: dataGroup[i].t, value: dataGroup[i].p.v, observable: dataGroup[i].m});
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
                    <TableComponent headerRow={['Name', 'Value', 'Chart']} tableData={rows}/>
                    {subAccordionPanel}
                </div>;
            } else {
                accordionContent = <div className="indent">
                    <LazySubAccordion
                        style={{marginLeft: "20px"}}
                        className="no-padding"
                        panels={this.SubAccordionPanels}
                    />
                </div>;
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
        return (
            <Accordion styled fluid onTitleClick={this.showImage.bind(this, [
                `http://185.43.5.178/server/rest/secured/data/sing/last?group=&server=`,
                'http://185.43.5.178/server/rest/secured/data/comp/identifiers?group=&server='
            ])}
                       defaultActiveIndex={0}
                       panels={this.generatePanels(this.props.dataGroups)}
            />
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

// const mapStateToProps = (state) => {
//     console.log('mapStateToProps DisplayData');
//
//     return {
//         servers: state.servers,
//         OS: state.OS,
//         dataGroups: state.dataGroups,
//         Test: state.Test
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: bindActionCreators(loadData, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayData);

import React from 'react'
import { Table } from 'semantic-ui-react'
import {LOGIN_PAGE, path} from "../Views";
import SpecialLink from "./Link";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {makeWarning} from "../store/Actions";

// const tableData = [
//     { name: 'Jimmy', status: 'Requires Action', notes: undefined },
//     { name: 'Jamie', status: undefined, notes: 'Hostile' },
//     { name: 'Jill', status: undefined, notes: undefined },
// ];
//
// const headerRow = ['PID', '%MEM', '%CPU'];
//
// const renderBodyRow = ({ name, status, notes }, i) => ({
//     key: name || `row-${i}`,
//     cells: [
//         name ? {key: 'link', content: <SpecialLink path={path + LOGIN_PAGE} label={name}/>} : name,
//         status ? { key: 'status', icon: 'attention', content: status } : 'Unknown',
//         notes ? { key: 'notes', icon: 'attention', content: notes, warning: true } : 'None',
//     ]
// });
// {/*<Table celled headerRow={this.props.headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />*/}
//
// const TableComponent = () => (
// );
//
// export default TableComponent;


class TableComponent extends React.Component{
    constructor(props){
        super(props);

    }

    renderBodyRow = ({ name, value, observable }, i) => ({
        key: name + `row-${i}`,
        cells: [
            name ? { key: 'name',  content: name } : 'None',
            value ? { key: 'value', content: value } : 'Unknown',
            observable ? {key: 'chart', content: <SpecialLink path={path + LOGIN_PAGE} label={name}/>} : ''
        ]
    });

    render(){
        return(
            <Table {...this.props} celled renderBodyRow={this.renderBodyRow} />

        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
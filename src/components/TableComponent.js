import React from 'react'
import { Table } from 'semantic-ui-react'
import {LOGIN_PAGE, path} from "../Views";
import SpecialLink from "./Link";
const tableData = [
    { name: 'Jimmy', status: 'Requires Action', notes: undefined },
    { name: 'Jamie', status: undefined, notes: 'Hostile' },
    { name: 'Jill', status: undefined, notes: undefined },
];

const headerRow = ['PID', '%MEM', '%CPU'];

const renderBodyRow = ({ name, status, notes }, i) => ({
    key: name || `row-${i}`,
    cells: [
        name ? {key: 'link', content: <SpecialLink path={path + LOGIN_PAGE} label={name}/>} : name,
        status ? { key: 'status', icon: 'attention', content: status } : 'Unknown',
        notes ? { key: 'notes', icon: 'attention', content: notes, warning: true } : 'None',
    ]
});
const TableComponent = () => (
    <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />
);

export default TableComponent;

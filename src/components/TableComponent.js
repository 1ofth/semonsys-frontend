import React from 'react'
import { Table } from 'semantic-ui-react'
import SpecialLink from './Link';
import {LOGIN_PAGE, path} from "../Views";
const tableData = [
    { name: 'Jimmy', status: 'Requires Action', notes: undefined },
    { name: 'Jamie', status: undefined, notes: 'Hostile' },
    { name: 'Jill', status: undefined, notes: undefined },
];

const headerRow = ['PID', '%MEM', '%CPU'];

const renderBodyRow = ({ name, status, notes }, i) => ({
    key: name || `row-${i}`,
    cells: [
        <SpecialLink path={path + LOGIN_PAGE} label={name}/>,
        status || 'Unknown',
        notes || 'None',
    ],
});
const TableComponent = () => (
    <Table celled headerRow={headerRow} renderBodyRow={renderBodyRow} tableData={tableData} />
);

export default TableComponent;

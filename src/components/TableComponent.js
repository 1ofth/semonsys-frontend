import React from 'react'
import {Table, Button, Icon} from 'semantic-ui-react'
import history from "../History";
import {CHART_PAGE} from "../Views";

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    click = (name) => {
        history.push({
            pathname: this.props.link + CHART_PAGE,
            state: {
                url: this.props.urls[name],
                field: this.props.fields[name],
                label: this.props.labels[name]
            }
        });
    };

    renderBodyRow = ({name, value, observable}, i) => ({
        key: name + `row-${i}`,
        cells: [
            name ? {key: 'name', content: name} : 'None',
            value ? {key: 'value', content: value} : 'Unknown',
            observable ? {
                key: 'chart', content:
                    <Button icon onClick={this.click.bind(this, name)}>
                        <Icon name='chart area'/>
                    </Button>
            } : ''
        ]
    });

    render() {
        return (
            <Table {...this.props} celled renderBodyRow={this.renderBodyRow}/>
        )
    }
}


export default TableComponent;
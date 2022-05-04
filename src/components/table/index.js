import React from 'react';

import './index.scss';

export default class Table extends React.Component {
  state = {
    selections: [],
    allChecked: false
  };

  getAllChecked = () => {
    const {
      selections = []
    } = this.state;
    const {
      dataSource = []
    } = this.props;

    if (selections.length < dataSource.length) return false;
    for(let i = 0; i < dataSource.length; i++) {
      if (selections.indexOf(dataSource[i].id) < 0) return false;
    }
    return true;
  };

  onAllSelect = (e) => {
    let selections = [...this.state.selections];
    if (e.target.checked) {
      selections = this.props.dataSource.map(data => data.id);
    } else {
      selections = selections.filter(selection => {
        const index = this.props.dataSource.findIndex(data => data.id === selection);
        console.log(index)
        return index < 0;
      })
    }
    this.setState({ selections });
    this.props.onSelectionChange && this.props.onSelectionChange(selections);
  };

  onSingleSelect = (id, checked) => {
    let selections = [...this.state.selections];
    if (checked) {
      selections.push(id);
    } else {
      const index = selections.indexOf(id);
      selections.splice(index, 1)
    }
    this.setState({ selections });
    this.props.onSelectionChange && this.props.onSelectionChange(selections);
  };

  render() {
    const {
      enableSelection,
      columns = [],
      dataSource = []
    } = this.props;
    const {
      selections
    } = this.state;

    return (
      <table className="table-wrapper">
        <thead>
          <tr>
            { enableSelection &&
              <th>
                <input checked={this.getAllChecked()} type="checkbox" onChange={this.onAllSelect} />
              </th>
            }
            {
              columns.map(column => <th key={column.headerName}>{column.headerName}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            dataSource.map((data, index) => (
              <tr key={index}>
                { enableSelection &&
                  <td>
                    <input type="checkbox" checked={selections.indexOf(data.id) > -1} onChange={(e) => this.onSingleSelect(data.id, e.target.checked)} />
                  </td>
                }
                {
                  columns.map(column => {
                    const cellProps = column.cellProps && column.cellProps(data[column.field]);
                    return (
                      <td key={column.field} {...cellProps}>
                        {data[column.field].toString()}
                      </td>
                    );
                  })
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

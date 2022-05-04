import React from 'react';
import { Chart, registerables } from 'chart.js';
import AppBanner from '../components/app-banner';
import Toolbar from '../components/toolbar';
import Tabs from '../components/tabs';
import Loading from '../components/loading';
import Table from '../components/table';

import './index.scss';

const columns = [
  { headerName: 'Severity', field: 'condition-severity', cellProps: (value) => ({
    className: value ? value.toLowerCase() : 'default'
  })},
  { headerName: 'Description', field: 'native-condition-type' },
  { headerName: 'Node Type', field: 'node-type' },
  { headerName: 'Clearable', field: 'manual-clearable' },
  { headerName: 'State', field: 'state' },
  { headerName: 'Raise Time', field: 'last-raise-time' }
];

const columnsWithoutProps = [
  { headerName: 'Severity', field: 'condition-severity' },
  { headerName: 'Description', field: 'native-condition-type' },
  { headerName: 'Node Type', field: 'node-type' },
  { headerName: 'Clearable', field: 'manual-clearable' },
  { headerName: 'State', field: 'state' },
  { headerName: 'Raise Time', field: 'last-raise-time' }
];

export default class Main extends React.Component {
  state = {
    loading: true,
    activeTab: 'alarms',
    data: {},
    selectedData: [],
  }
  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ data, loading: false }, () => {
          let chartStatus = Chart.getChart('myChart');
          if (chartStatus !== undefined) {
            chartStatus.destroy();
          }
          Chart.register(...registerables);
          new Chart(document.getElementById('myChart'), {
              type: 'bar',
              data: {
                  labels: data.facets['condition-severity'].map(item => item.key),
                  datasets: [{
                      label: '# of severity',
                      data: data.facets['condition-severity'].map(item => item.count),
                      backgroundColor: ['rgba(231,29,29,0.6)', 'rgba(239,142,0,0.6)', 'rgba(221,211,38,0.6)']
                  }]
              }
          });
        });
      });
  }

  onTabChange = activeTab => {
    this.setState({ activeTab });
  }

  getTableProps = () => {
    if (this.state.activeTab === 'alarms') {
      return {
        dataSource: this.state.data.items,
        columns,
      };
    } else if (this.state.activeTab === 'nodeType') {
      const dataSource = [...this.state.data.items];
      dataSource.sort((a, b) => {
        if (a['node-type'] > b['node-type']) {
            return 1;
        }
        if (b['node-type'] > a['node-type']) {
            return -1;
        }
        return 0;
      });
      return {
        dataSource,
        columns,
      };
    } else {
      const dataSource = this.state.data.items.filter(item => item['condition-severity'] === this.state.activeTab);
      return {
        dataSource,
        columns: columnsWithoutProps
      };
    }
  }

  onSelectionChange = (selections) => {
    const selectedData = this.state.data.items.filter(data => selections.indexOf(data.id) > -1);
    this.setState({ selectedData });
  }

  render() {
    return (
      <div className="main-wrapper">
        <AppBanner data={this.state.selectedData} />
        <Toolbar />
        <div className="subtitle">Alarms Views</div>
        <Tabs value={this.state.activeTab} onChange={this.onTabChange}>
          <Tabs.Tab value="alarms">Alarms</Tabs.Tab>
          <Tabs.Tab value="nodeType">Node Type</Tabs.Tab>
          {
            this.state.data.facets && this.state.data.facets['condition-severity']
              .map(item => item.count > 0 && <Tabs.Tab key={item.key} value={item.key}>{item.key}</Tabs.Tab>)
          }
        </Tabs>
        {
          this.state.loading
            ? <Loading />
            : <React.Fragment>
                <Table
                  enableSelection
                  onSelectionChange={this.onSelectionChange}
                  {...this.getTableProps()}
                />
                <div className="chart-wrapper">
                  <div className="subtitle">Chart</div>
                  <canvas id="myChart" />
                </div>
              </React.Fragment>

        }
      </div>
    );
  }
}

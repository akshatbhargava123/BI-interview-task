import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { FakeServer, ServerSideDatasource } from './utils';

class Table extends Component {
	constructor(props) {
		super(props);

		this.state = {
			columnDefs: [{
				headerName: "ID",
				width: 50,
				valueGetter: "node.id",
				suppressMenu: true,
				sortable: false
			},{
				headerName: 'Name', field: 'athlete'
			}, {
				headerName: 'Age', field: 'age'
			}, {
				headerName: 'Country', field: 'country'
			}, {
				headerName: 'Date', field: 'date'
			}, {
				headerName: 'Sport', field: 'sport'
			}],
      defaultColDef: {
				resizable: true,
				sortable: true,
				filter: true,
				cellRenderer: 'loadingCellRenderer'
			},
      components: {
        loadingCellRenderer: function(params) {
          if (params.value !== undefined) {
            return params.value;
          } else {
            return '<img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/loading.gif">';
          }
        }
      },
      rowBuffer: 0,
      rowSelection: "multiple",
      rowModelType: "infinite",
      paginationPageSize: 100,
      cacheOverflowSize: 1,
      maxConcurrentDatasourceRequests: 1,
      infiniteInitialRowCount: 100,
      maxBlocksInCache: 10
		};

		this.onGridReady = this.onGridReady.bind(this);
	}

	componentDidMount() {
		
	}

	onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = data => {			
			const fakeServer = FakeServer(data);
			const dataSource = ServerSideDatasource(fakeServer);
			params.api.setDatasource(dataSource);
		};

		// load all data to mock as paginated API on frontend
		fetch('https://raw.githubusercontent.com/akshatbhargava123/BI-interview-task/master/src/assets/fakeData.json')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				updateData(data);
			});
	}

	render() {
		return (
			<div
				className="ag-theme-balham"
				style={{
					height: '500px',
					width: '800px'
				}}
			>
				<AgGridReact
					columnDefs={this.state.columnDefs}
					defaultColDef={this.state.defaultColDef}
					components={this.state.components}
					rowBuffer={this.state.rowBuffer}
					rowSelection={this.state.rowSelection}
					rowDeselection={true}
					rowModelType={this.state.rowModelType}
					paginationPageSize={this.state.paginationPageSize}
					cacheOverflowSize={this.state.cacheOverflowSize}
					maxConcurrentDatasourceRequests={this.state.maxConcurrentDatasourceRequests}
					infiniteInitialRowCount={this.state.infiniteInitialRowCount}
					maxBlocksInCache={this.state.maxBlocksInCache}
					onGridReady={this.onGridReady}
				/>
			</div>
		);
	}
}

export default Table;

export function ServerSideDatasource(server) {
  return {
		rowCount: null,
    getRows(params) {
      setTimeout(function() {
        const response = server.getResponse(params);
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 500);
    }
  };
}

export function FakeServer(allData) {
  return {
    getResponse(request) {
			console.log("asking for rows: " + request.startRow + " to " + request.endRow);
			const dataAfterSortingAndFiltering = applySort(allData, request.sortModel, request.filterModel);
			const rowsThisPage = dataAfterSortingAndFiltering.slice(request.startRow, request.endRow);
			let lastRow = -1;
			if (dataAfterSortingAndFiltering.length <= request.endRow) {
				lastRow = dataAfterSortingAndFiltering.length;
			}
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow
      };
    }
  };
}

export function applySort(allOfTheData, sortModel, filterModel) {
  return sortData(sortModel, allOfTheData);
}

export function sortData(sortModel, data) {
  var sortPresent = sortModel && sortModel.length > 0;
  if (!sortPresent) {
    return data;
  }
  var resultOfSort = data.slice();
  resultOfSort.sort(function(a, b) {
    for (var k = 0; k < sortModel.length; k++) {
      var sortColModel = sortModel[k];
      var valueA = a[sortColModel.colId];
      var valueB = b[sortColModel.colId];
      if (valueA === valueB) {
        continue;
      }
      var sortDirection = sortColModel.sort === "asc" ? 1 : -1;
      if (valueA > valueB) {
        return sortDirection;
      } else {
        return sortDirection * -1;
      }
    }
    return 0;
  });
  return resultOfSort;
}
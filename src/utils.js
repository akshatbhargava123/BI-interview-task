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
      const rowsThisPage = allData.slice(request.startRow, request.endRow);
      const lastRow = allData.length <= request.endRow ? allData.length : -1;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow
      };
    }
  };
}

function getDataFromTable(){
    var regionid = $.request.parameters.get('regionid');
    var conn = $.db.getConnection();
    var pstmt;
    var rs;
    var query;
    var output = {results: [] };
    try {
        query = 'SELECT REGION_ID, PRODUCT_ID, SALES_AMOUNT FROM \"SHANKAA\".\"SALES\" WHERE REGION_ID = ?';
        pstmt = conn.prepareStatement(query);
        pstmt.setString(1, regionid);
        rs = pstmt.executeQuery();

        while (rs.next()) {
               var record = {};
                record.REGION_ID = rs.getString(1);
                record.PRODUCT_ID = rs.getString(2);
                record.SALES_AMOUNT = rs.getString(3);
                output.results.push(record);
        }
        rs.close();
        pstmt.close();
        conn.close();
                } 
    catch (e) {
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody(e.message);
        return;
    }
    var body = JSON.stringify(output);
    $.response.contentType = 'application/json';
    $.response.setBody(body);
    $.response.status = $.net.http.OK;
}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
    case "select":
        getDataFromTable();
        break;
    default:
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
        $.response.setBody('Invalid Command: ', aCmd);
}
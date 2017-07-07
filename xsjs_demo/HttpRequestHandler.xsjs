function performAdd() {
    var body = '';
    var num1 = $.request.parameters.get('num1');
    var num2 = $.request.parameters.get('num2');
   
    var answer;

    //request.parameters are of type String. Parse them to Integer
    answer = parseInt(num1) + parseInt(num2);

    body = answer.toString();

    $.response.setBody(body);
    $.response.status = $.net.http.OK;
}

function getRequestDetails() {
       var queryParameterDetails = 'QUERY PARAMETER DETAILS:' +" <br><br>";
       var noOfParams = $.request.parameters.length;
       queryParameterDetails = queryParameterDetails + 'NO OF QUERY PARAMTERS ARE:' + noOfParams + " <br>";
       queryParameterDetails = queryParameterDetails + 'QUERY PARAMTERS AND THEIR VALUES ARE: ' + " <br>";
      
       var i;
       for (i = 0; i < $.request.parameters.length; ++i) {
              queryParameterDetails = queryParameterDetails + $.request.parameters[i].name + ': ' + $.request.parameters[i].value + '<br>';
       }
      
       var requestHeaderDetails = '<br>' + 'REQUEST HEADER DETAILS:' + '<br><br>';
       requestHeaderDetails = requestHeaderDetails + 'HOST NAME IS: ' + $.request.headers.get('host')+ " <br>";
       requestHeaderDetails = requestHeaderDetails + 'REQUEST METHOD IS: ' + $.request.headers.get('~request_method')+ " <br>";
       requestHeaderDetails = requestHeaderDetails + 'SERVER PORT IS: ' + $.request.headers.get('~server_port')+ " <br>";
       requestHeaderDetails = requestHeaderDetails + 'CLIENT PROTOCOL IS: ' + $.request.headers.get('clientprotocol')+ "<br>";
       requestHeaderDetails = requestHeaderDetails + 'URL PATH: ' + $.request.headers.get('~path')+ " <br>";
       requestHeaderDetails = requestHeaderDetails + 'QUERY STRING: ' + $.request.headers.get('~query_string')+ " <br><br>";
      
      
       var httpMethodName = 'HTTP METHOD IS: ';
       switch ($.request.method) {
       case $.net.http.GET:
              httpMethodName = httpMethodName + 'GET';
              break;
       case $.net.http.POST:
              httpMethodName = httpMethodName + 'POST';
              break;
       case $.net.http.PUT:
              httpMethodName = httpMethodName + 'PUT';
              break;
       default:
              break;
       }     
       $.response.contentType = "text/html";
       $.response.status = $.net.http.OK;
       $.response.setBody(queryParameterDetails + requestHeaderDetails + httpMethodName);

}

var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
    case "add":
        performAdd();
        break;
    case "metadata":
        getRequestDetails();
        break;
    default:
       $.response.status = $.net.http.BAD_REQUEST;
       $.response.setBody('Invalid Command');
      
}
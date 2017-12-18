var request = require('request');
exports.findworkplan = function(data,callback){
    const url = `http://192.168.0.70:3001/api/workplanmssqls/getworkplan`;
    const options = {
        method: 'POST',
        uri: url,
        json: true, // Automatically parses the JSON string in the response,
        timeout: 3000,
        body: data,
    };
    request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log(body);
            return callback(null,body);
        } else if (error) {
            return callback(error);
        } else {
            return callback(body);
        }
    });
}

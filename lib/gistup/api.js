var request = require("request");

module.exports = function(method, url, token, message, callback) {
  var json = JSON.stringify(message);

  var req = request({
    uri: "https://api.github.com"+url,
    method: method,
    body: json,
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": "token " + token,
      "User-Agent": "mbostock/gistup",
      "Content-Type": "application/json;charset=utf8",
      "Content-Length": Buffer.byteLength(json, "utf8")
    }
  }, function(error, response, body) {
    if(error) return callback(error);
    var response, id = null, error;
    try { response = JSON.parse(body); }
    catch (e) { error = e; }
    if (!error && !response) error = new Error("empty API response");
    if (error) console.warn(os.EOL + chunks.join(""));
    callback(error, response);
  });
}

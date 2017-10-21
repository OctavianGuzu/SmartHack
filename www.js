var debug = require('debug')('as-market-w');
var app = require('./app');

app.set('port', process.env.PORT || 5555);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

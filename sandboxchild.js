var fs = require('fs');

process.on('message', function(msg) {
  console.log(process.pid + " : " + msg[0] + " : " + msg[1]);
  if(fs.readFileSync("/Users/tonchen/Downloads/logs/Archive/" + msg[0], 'utf-8').indexOf(msg[1]) != -1) {
  	process.send(msg + " contains " + msg[1]);
  }
  process.exit(0);
})
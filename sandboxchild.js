var fs = require('fs');

process.on('message', function(msg) {
  console.log(process.pid + " : " + msg + " content: " + fs.readFileSync("/Users/tonchen/Downloads/logs/Archive/" + msg));
  
  process.send('Hello from ' + process.pid)
  process.exit(0);
})
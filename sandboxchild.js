var fs = require('fs');

process.on('message', function(msg, search) {
  console.log(process.pid + " : " + msg + " content: " + fs.readFileSync("/Users/tonchen/Downloads/logs/Archive/" + msg));
  
  if(fs.readFileSync("/Users/tonchen/Downloads/logs/Archive/" + msg, 'utf-8').indexOf(search) != -1) {
  	process.send(fs.readFileSync("/Users/tonchen/Downloads/logs/Archive/" + msg));
  }
  process.exit(0);
})
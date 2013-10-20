process.on('message', function(msg) {
  console.log(process.pid + " : " + msg);
  
  process.send('Hello from ' + process.pid)
  process.exit(0);
})
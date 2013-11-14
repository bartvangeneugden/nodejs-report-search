var child_process = require('child_process');
var utils = require('./utils');
var numCPUs = require('os').cpus().length;

module.exports.worker = function() {
    return child_process.fork(__dirname + '/app/util/iohandlerchild.js');
}
module.exports.do = function(activity, workItems, callback) {
    var totalProcesses  = workItems.length > numCPUs ? numCPUs : workItems.length;
    var itemsPerProcess = Math.ceil(workItems / totalProcesses);
    var runningProcesses = 0;
    var results   = [];
    var processes = [];
    for(var i = 0; i < totalProcesses; i++){
        var process = new module.exports.worker;
        process.on('exit', function(){
            runningProcesses--;
            if(runningProcesses == 0){
                callback(results);
            }
        });

	    process.on('message', function(workItem) {
            if(type(workItem) == "array" && type(workItem[0]) == "function"){
                var msg = workItem[0](workItem[1]);
                if(msg != false){
                    results.push(msg);
                }
            }else{
                throw new Error("Please provide a work item as follow: [function, params]");
            }            
	    });
        processes.push(process);
    }
    
    for(var i=0; i < processes.length; i++) {
        runningProcesses++;
        process.send(new Array(activity, workItems.slice(i * itemsPerProcess, (i+1) * itemsPerProcess)));
    }
}
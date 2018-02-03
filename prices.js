//List of the exchanges
var exchanges = ["bithumb", "bittrex", "coinone", "korbit", "poloniex"]
var currentExchange = 0; //Set a veriable holding the current exchange the process is up to.
var bassURL = 'http://lvh.me/api.php?exchange=';
var xhttp = null; //Create a verable to holf the http request object.

function RequestStart(){
	console.log('starting...');

	//Set up the http request object.
	var URL = bassURL + exchanges[currentExchange]; //Set the url we are connecting to.
	xhttp = createCORSRequest('GET', URL); //Create a CORS https request.

	if(!xhttp){
		console.log('CORS is not supported.')
		return; //Cancel out, we don't want to continue.
	}

	//When the http request finishes
	xhttp.onload = function(){
		console.log('onload...');
		
		var respone = xhttp.response;
		var jso = respone.split('{"data"');
		var result = '{"data"'+jso[1];
		console.log(result);
		
		//Update the chart
		updateChart(JSON.parse(result));
			
		currentExchange++;
		if(currentExchange < exchanges.length){
			xhttp.open("GET", "api.php?exchange=" + exchanges[currentExchange], true);
			xhttp.send();
		}
	};

	xhttp.onerror = function(){
		console.log('Woops, there was something wrong making the request!');
	};

	//Send the request for the first time.
	xhttp.send();
};

function updateChart(data){
    
    if(data.exchange != null && exchanges.find(function(exc) {
        return(data.exchange == exc);
    })){
        var ctx = document.getElementById(data.exchange).getContext('2d');
        var labels = [];
        var values = [];
    
        for(var key in data.data){
            labels.push(key);
            values.push(data.data[key])
        }
        console.log(values);
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: values,
                    backgroundColor: 'rgba(54, 162, 235, 0.4)',
                    borderColor: window.chartColors.blue,
                    borderWidth: 3,
                    fill: true
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:false
                        }
                    }]
                }
            }
        });
    }  
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

RequestStart(); //Start the script.
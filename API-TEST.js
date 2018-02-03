
/*
	Bithumb
	Bittrex
	Coinone
	Korbit
	Poloniex
*/
var exchanges = ["BTH", "BRX", "CON", "KRB", "PIX"];
var labs      = ["bithumb", "bittrex", "coinone", "korbit", "poloniex"];
var current_E = 0;
var running = 0;
var type = 1;



//SOURCE: https://www.cryptocompare.com/api/#-api-data-histohour-
//Go here to find information regarding the RESPONSE.
function GetHistoryDay(limit){
	current_E = 0;
	
	if(running == 1)
	{
		return;
	}
	
	running = 1;
	type = 1;
	
	var xhttp = createCORSRequest('GET', 'https://min-api.cryptocompare.com/data/histoday?fsym=BTH&tsym=USD&limit='+ limit +'&aggregate=3&e=CCCAGG');
	if(!xhttp){
		console.log('CORS is not supported.')
		return; //Cancel out, we don't want to continue.
	}
	
	xhttp.onload = function(){
		
		var result = JSON.parse(xhttp.response);
		
		console.log(exchanges[current_E]);
		console.log(result);
		updateChart(result, current_E, type);
		
		current_E++;
		if(current_E < exchanges.length){ //We have more to search through.
			xhttp.open('GET', 'https://min-api.cryptocompare.com/data/histoday?fsym=' + exchanges[current_E] + '&tsym=USD&limit=' + limit + '&aggregate=3&e=CCCAGG');
			xhttp.send();
		}else{
			running = 0;
		}
		
	}
	xhttp.send();
}

function GetHistoryHours(limit){
	current_E = 0;
	
	if(running == 1)
	{
		return;
	}
	
	running = 1;
	type = 0;
	
	var xhttp = createCORSRequest('GET', 'https://min-api.cryptocompare.com/data/histohour?fsym=BTH&tsym=USD&limit='+ limit +'&aggregate=3&e=CCCAGG');
	if(!xhttp){
		console.log('CORS is not supported.')
		return; //Cancel out, we don't want to continue.
	}
	
	xhttp.onload = function(){
		
		var result = JSON.parse(xhttp.response);
		
		console.log(exchanges[current_E]);
		console.log(result);
		updateChart(result, current_E, type);
		
		current_E++;
		if(current_E < exchanges.length){ //We have more to search through.
			xhttp.open('GET', 'https://min-api.cryptocompare.com/data/histoday?fsym=' + exchanges[current_E] + '&tsym=USD&limit=' + limit + '&aggregate=3&e=CCCAGG');
			xhttp.send();
		}else{
			running = 0;
		}
		
	}
	xhttp.send();
}

function updateChart(data, id, type){
    
    if(labs[id] != null){
        var ctx = document.getElementById(labs[id]).getContext('2d');
        var labels = [];
        var values = [];
    
        for(var key in data.Data){
			//console.log(key);
			var utcTime = data.Data[key].time;
			var d = new Date(0);
			d.setUTCSeconds(utcTime);
			
			var time = "";
			
			if(type == 1){
				time = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
			}else{
				time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
			}
            
			labels.push(time);
            values.push(data.Data[key].close);
			//console.log("Key: " + key + " Value: " + data.data[key]);
        }
        console.log(values);
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: exchanges[id] + "/$",
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
    }else{
		alert("A problem");
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

GetHistoryDay(25);
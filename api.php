<?php
//print test;
//header("Content-type: application/json");

/*$return_obj = new \stdClass();

$mysqli = new mysqli("127.0.0.1", "root", "Letmein21", "data");

if($mysqli->connect_errno){
    $return_obj->error = "mysql";
    fail();
}

$startdate;
$enddate;
$timeframe = $_GET["timeframe"];
$table = $_GET["exchange"];

if(is_null($timeframe)){
    $timeframe = "1d"; //one day
}

if(is_null($table)){
	$table = 'bithumb';
    //fail();
}

if($table != "bithumb" && $table != "bittrex" && $table != "coinone" && $table != "korbit" && $table != "poloniex"){
    fail();
}

if(!is_null($_GET["startdate"])){
    $dt = new DateTime;
    $dt->setTimestamp($_GET["startdate"]);
    $startdate = $dt->format("Y-m-d h:i:s");
} else {
    if($timeframe = "1d"){
        $startdate = "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 DAY)";
    } else if($timeframe = "1w"){
        $startdate = "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 WEEK)";
    } else if($timeframe = "1m"){
        $startdate = "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 MONTH)";
    } else if($timeframe = "1y"){
        $startdate = "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 YEAR)";
    } 
}

if(!is_null($_GET["enddate"])){
    $dt = new DateTime;
    $dt->setTimestamp($_GET["enddate"]);
    $enddate = $dt->format("Y-m-d h:i:s");
} else {
    $enddate = "UTC_TIMESTAMP()";
}

//$sql = $mysqli->real_escape_string("SELECT price, date from `$table` WHERE date between $startdate and $enddate");
//$sql = $mysqli->real_escape_string("SELECT price, date FROM bithumb");
//$res = $mysqli->query($sql);

$res = $mysqli->query("SELECT id, price, date FROM bithumb");

if(!$res){
    $return_obj->error = "some weird mysql shit";
    fail();
}

//$res->data_seek(0);
$return_obj->exchange = $table;

$data_array = array();

if ($result->num_rows > 0) {
    // output data of each row
	while($row = $res->fetch_assoc()) {
		$data_array[$row["date"]] = $row["price"];
	}
}

$return_obj->data = $data_array;

echo json_encode($return_obj);

function fail(){
    $return_obj->result = "fail";
    echo json_encode($return_obj);
    exit;
}
*/

	$return_obj = new \stdClass();
	
	$startdate;
	$enddate;
	
	$timeframe = $_GET["timeframe"];
	
	if(is_null($timeframe)){
		$timeframe = "1y"; //one day
	}
	
	if(!is_null($_GET["startdate"])){
		$dt = new DateTime;
		$dt->setTimestamp($_GET["startdate"]);
		$startdate = $dt->format("Y-m-d h:i:s");
	} else {
		if($timeframe == "1d"){
			$startdate == "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 DAY)";
		} else if($timeframe == "1w"){
			$startdate = "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 WEEK)";
		} else if($timeframe == "1m"){
			$startdate = "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 MONTH)";
		} else if($timeframe == "1y"){
			$startdate = "SUBDATE(UTC_TIMESTAMP(), INTERVAL 1 YEAR)";
		} 
	}
	
	if(!is_null($_GET["enddate"])){
		$dt = new DateTime;
		$dt->setTimestamp($_GET["enddate"]);
		$enddate = $dt->format("Y-m-d h:i:s");
	} else {
		$enddate = "UTC_TIMESTAMP()";
	}
	
	
	$mysqli = new mysqli("localhost", "root", "Letmein21", "data");
	$table = $_GET["exchange"];
	
	//$result = $mysqli->query("SELECT id, price, date FROM bithumb WHERE date between " + $startdate + " and " + $enddate);
	$result = $mysqli->query("SELECT id, price, date FROM bithumb WHERE date between $startdate and $enddate");
	$data_array = array();
	if ($result->num_rows > 0) {
    // output data of each row
		while($row = $result->fetch_assoc()) {
			$data_array[$row["date"]] = $row["price"];
		}
	}
	$return_obj->data = $data_array;
	$return_obj->exchange = "bithumb";
	$return_obj->result = "success";
	
	echo json_encode($return_obj);

?>
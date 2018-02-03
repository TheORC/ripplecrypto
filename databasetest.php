<?php
    $mysqli = new mysqli("localhost", "root", "Letmein21", "data");
	
	$result = $mysqli->query("SELECT id, price, date FROM bithumb");
	
	if ($result->num_rows > 0) {
    // output data of each row
		while($row = $result->fetch_assoc()) {
			echo "id: " . $row["id"]. " - Price: " . $row["price"]. " " . $row["date"]. "<br>";
		}
	}
?>
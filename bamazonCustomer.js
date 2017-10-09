var inquirer = require('inquirer');
var mysql = require('mysql');
var ps = '';

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: ps,
	database: 'Bamazon'
});

queryStr = 'SELECT * FROM products';
connection.query(queryStr, function(err, data) {
	if (err) throw err;
	console.log('Store Inventory: ');
	var ItemsCount = 0;
	for (i in data) {
		console.log("-------------------");
		console.log('Item ID: ' + data[i].item_id );
		console.log( 'Item Name: ' + data[i].product_name);
		console.log('Department: ' + data[i].department_name );
		console.log('Price: $' + data[i].price);
		ItemsCount++;
	}
  	console.log("--------------------------------------\n");
  

inquirer.prompt([
		{
			type: 'input',
			name: 'itemId',
			message: "Please enter the ID of the item you like to purchase",
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'Please enter the amount you like to purchase',
			filter: Number
		}
	]).then(function(input) {
		var itemId = input.itemId;
		var quantity = input.quantity;
		if ( 0< itemId &&  itemId <=ItemsCount &&  quantity>0){
			var queryStr = 'SELECT * FROM products WHERE ?';
			checkAmount(itemId).then(function(data){
				var inventoryQuantity = data.stock_quantity
				var itemPrice = data.price
				if(inventoryQuantity>=quantity){
					var total = quantity * itemPrice;
					var newQuantity = inventoryQuantity - quantity;
					PlaceOrder(itemId,newQuantity,total);

				}else{
					console.log('Insufficient quantity!\nwe only have '+ inventoryQuantity +'itme in our inventory')

				}
			})


		}else{
			console.log('please enter validate Item');
		}	
  });

});



function checkAmount(ID) {
	return new Promise(function(resolve, reject){
	var queryStr = "SELECT stock_quantity,price FROM products WHERE item_id = "+ID;
	connection.query(queryStr, function(err, data){
        resolve(data['0']);         	       
    	});
    });
    }

function PlaceOrder(ID,amount,total) {
	return new Promise(function(resolve, reject){
		connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [amount, ID], function(err, data){
		console.log('you total is '+ total +' $' );
		connection.end();
    	});
    });
    }




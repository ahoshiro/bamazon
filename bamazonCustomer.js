// Required packages
var mysql = require('mysql');
var inquirer = require('inquirer');


// Link to mySQL Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "root", //Your password
    database: "bamazon"
});

// Connect to Database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

})

function displayInventory() {
//  console.log("in display inventory");

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
        console.log('--------------------------------------------------------------------------\n');
        console.log('|Item ID | Product Name            | Product Description          | Price | Stock QTY');
        console.log('--------------------------------------------------------------------------\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + ' || ';
			strOut += 'Product Name: ' + data[i].product_name + ' || ';
			strOut += 'Department: ' + data[i].department_name + ' || ';
            strOut += 'Price: $' + data[i].price + '\n';
            strOut += 'Qty: $' + data[i].quantity + '\n';

			console.log(strOut);
		}

	  	console.log("--------------------------------------------------------------------------\n");

	  	promptUserPurchase();
	})
}

function promptUserPurchase() {
	// console.log('___ENTER promptUserPurchase___');

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				displayInventory();

			} else {
				var productData = data[0];

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					// Update the inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}
	displayInventory();



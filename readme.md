# Bamazon

## Description

This NODE application is an Amazon-like storefront using sql (https://www.npmjs.com/package/mysql) and inquirer (https://www.npmjs.com/package/inquirer). 


### MySQL Database Setup

Open MySQL workbench and run the "bamazon.sql" command to populate and generate the sequel table. If you don't have MySQL workbench or equivalent software, you may download it at https://dev.mysql.com/downloads/workbench/. 

[MySQL](images/SQLworkbenchBamazon.png)

### Customer Interface

The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface please follow the steps below:

	git clone git@github.com:ahoshiro/bamazon.git
	cd bamazon
	npm install
	node bamazonCustomer.js

  Ensure that your port number is correct. Currently by default, it is set to 3006. 

### Operation

  If everything runs as expected, you should see an inventory list. 
 [Inventory](images/bamazonpurchase.png)

 Select the ID of the item you would like to purchase and quantity.

 If the item is out of stock or the quantity requested is greater than the quantity in stock, and error will show up and the loop will restart. 
[Understocked](images/bamazonunderstocked.png)

The quantity in the DB is also refleced upon a successful purchase. 

[Understocked](images/SQLworkbenchBamazonUnderstocked)



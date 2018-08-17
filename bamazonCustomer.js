var http = require("http");
var mysql = require("mysql");
var fs = require("fs");
var inquirer = require("inquirer");

var connection = mysql.createConnection (
{
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
}
);

connection.connect (function(err) {
    if (err) throw err;
    console.log("connection with the ID of: " + connection.threadId);
    displayItems();
    connection.end();
});

function displayItems() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        for (i = 0; i < response.length; i++) {
            console.log("\nProduct ID: " + response[i].item_id + "\nProduct Name: " + response[i].product_name + "\nProduct Price: " + response[i].price);
        }
    });
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the Product you'd want to buy?",
            name: "productId"
        },
        {
            type: "input",
            message: "How many units did you want to buy?",
            name: "productUnits"
        },
        {
            type: "confirm",
            message: "Are you finished?",
            name: "confirm",
            default: true
        }
    ]).then(function(inquirerResponse) {
        if (inquirerResponse.confirm) {
            console.log("\nYay! you're ready to go now, thanks for shopping with us!")
        } else {
            console.log("\nThat's too bad, no worries. Let's do it another time!")
        };
    //     if () {
    //         console.log("\nInsufficient quantity!")
    //     }
    })
}
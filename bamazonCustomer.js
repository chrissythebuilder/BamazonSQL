var http = require("http");
var mysql = require("mysql");
var fs = require("fs");
var inquirer = require("inquirer");

var res;
var response;

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
    customerInquiry();
    connection.end();
});

function displayItems() {
    connection.query("SELECT * FROM products", function(err, response) {
        if (err) throw err;
        for (i = 0; i < response.length; i++) {
            var itemId = response[i].item_id;
            var productName = response[i].product_name;
            var departmentName = response[i].department_name;
            var productPrice = response[i].price;
            var stockQuantity = response[i].stock_quantity;

            console.log("\nProduct ID: " + itemId + "\nProduct Name: " + productName + "\nProduct Price: " + productPrice);
        }
        return response;
    })
};

function customerInquiry() {
    inquirer
        .prompt([
    {
        type: "input",
        message: "What is the ID of the Product you'd want to buy?",
        name: "productId",
        default: 1
    },
    {
        type: "input",
        message: "How many units did you want to buy?",
        name: "productUnits",
        default: 0
    },
    {
        type: "confirm",
        message: "Are you finished?",
        name: "confirm",
        default: true
    }
    ])
    .then(function(inquirerResponse) {
        connection.query("SELECT stock_quantity FROM products WHERE ?", {item_id: inquirerResponse.productId}, function(err, res) {
            var res = inquirerResponse;
            if (res.productId > 10) {
                console.log("invalid Product Id, please try again!")
            } else if (res.productId > 0) {
                console.log("You just bought " + res.productUnits + " pieces of Product # " + res.productId);
                console.log("\nhi" + res)
            } else {
                console.log(err);
            }
        })
        return res;
    })
};

// function checkQuantity() {
//     connection.query("SELECT FROM ")
// }


// function checkQuantity() {
//     if (res.productUnits > response.stock_quantity) {
//         console.log("too much!")
//     }
// }

const { response, request } = require('express');
var express= require('express');
var path=require('path');
var fs=require('fs');

var sql=require('./mysqlconnect.js');

var app=express(); 

//Middlware configuration:
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",function(req, res){
    res.sendFile("index.html");
});
 

//crud operation on orderitems
        app.get("/api/orderitems",
         (request,response)=>{
            var selectAllQuery="select * from orderitems ";
                             sql.query(selectAllQuery,function(err, data){
                            if(err){
                                console.log("error : "+err);
                            }
                            else
                            {
                                response.send(data);
                            }
         });
        });
        
        
        app.get("/api/orderitems/:id",(req,res) =>{
            let id=req.params.id;
            let selectByID="SELECT * FROM orderitems where orderitemid=?";
            sql.query(selectByID,id,function(err,data){
                if(err) throw err;
                console.log("  ...");
                res.send(data);
            });
        });
        
        //update
        app.put("/api/orderitemsupdate/:id",(req,res)=>{
            let orderitemid=req.params.id;
            let ordered=req.body.ordered;
            let itemid=req.body.itemid;
            let quantity=req.body.quantity;

            let updatequery= "UPDATE orderitems SET  ordered = ?, itemid = ?,quantity = ? WHERE orderitemid =?";
            let data=[ordered,itemid,quantity,orderitemid];
            sql.query(updatequery,data,function (err,data){
                if (err) throw err;
                res.send(data);
            });
        });


        //remove
        app.delete("/api/orderitemsremove/:id",(req,res)=>{
            let id=req.params.id;
            let deletequery="DELETE FROM orderitems WHERE orderitemid=?";
            sql.query(deletequery,id,function(err,data){
                if (err) throw err;
                console.log("Successfully deleted "+data.affectedRows);
                res.send(data);
            });
        });
        
        
        //crud operation on orderitems
        app.get("/api/orders",
         (request,response)=>{
            var selectAllQuery="select * from orders ";
                             sql.query(selectAllQuery,function(err, data){
                            if(err){
                                console.log("error : "+err);
                            }
                            else
                            {
                                response.send(data);
                            }
         });
        });
        
        
        //selectbyID
        app.get("/api/orders/:id",(req,res) =>{
            let id=req.params.id;
            let selectByID="SELECT * FROM orders where customerid=?";
            sql.query(selectByID,id,function(err,data){
                if(err) throw err;
                console.log("  ...");
                res.send(data);
            });
        });
        
        //update
        app.put("/api/ordersupdate/:id",(req,res)=>{
            let ordered=req.params.ordered;
            let date=req.body.date;
            let amount=req.body.amount;
            let customerid=req.body.customerid;

            let updatequery= "UPDATE orders SET  ordered = ?, date = ?,amount = ? WHERE customerid =?";
            let data=[ordered,date,amount,customerid];
            sql.query(updatequery,data,function (err,data){
                if (err) throw err;
                res.send(data);
            });
        });

        //remove
        app.delete("/api/ordersremove/:id",(req,res)=>{
            let id=req.params.id;
            let deletequery="DELETE FROM orders WHERE customerid=?";
            sql.query(deletequery,id,function(err,data){
                if (err) throw err;
                console.log("Successfully deleted "+data.affectedRows);
                res.send(data);
            });
        });
        



        /*5.Implement REST API for customer
        Get all orders /api/customersorders
        Get all orders for a customer using /api/customerorders/customerid*/ 

        app.get("/api/customerorders",
        (request,response)=>{
            var selectAllQuery="select * from orderitems,orders where orderitems.ordered=orders.ordered";
                             sql.query( selectAllQuery,function(err, data){
                            if(err){
                                console.log("error : "+err);
                            }
                            else
                            {
                                response.send(data);
                            }
         });
        });

        app.get("/api/customerorders/:id",(req,res) =>{
            let id=req.params.id;
            let selectByID="select * from orderitems,orders where orderitems.ordered=orders.ordered and customerid=?";
            sql.query(selectByID,id,function(err,data){
                if(err) throw err;
                console.log("  ...");
                res.send(data);
            });
        });

        
        app.get

        app.listen(9898);
        console.log("Server is listening on port 9898");


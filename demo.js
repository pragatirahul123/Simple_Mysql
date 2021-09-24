const express = require("express")
const mysql = require("mysql")

//create connection

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pragati@12",
    database:"simplesql"


})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("mysql connection")
})

const app = express();

//create Database
app.get("/create",(req,res)=>{
    let sql = "CREATE DATABASE  simplesql";
    db.query(sql,(err)=>{
        if(err){
            throw err;
        }
        res.send("Database Created")
        console.log("database connected")
    })
})

app.get("/createtable",(req,res)=>{
    let sql = "CREATE TABLE employee(id int AUTO_INCREMENT,name VARCHAR(255),designsation VARCHAR(256),PRIMARY KEY(id))"
    db.query(sql,(err)=>{
        if(err){
            throw err;
        }
        res.send("employe Table Created")
        console.log("employee table created!!!!")
    })
})

//INSERT EMPLOYEE

app.get("/employee1",(req,res)=>{
    let post = {name:"pragati",designsation:"I Love my family",name:"priya",designsation:"Missing badly",name:"sona",designsation:"Love my life", name:"durga",designsation:"love navgurukul"}
    let sql = "INSERT INTO employee SET ?"
    let query = db.query(sql,post,err =>{
        if(err){
            throw err;
        }
        res.send("employee added!!")
        console.log("employee addedd")
    })
})

//select
app.get("/select",(req,res) =>{
    let sql = "SELECT * FROM employee"
    let query = db.query(sql,(err,result)=>{
        if(err){
            throw err
        }
        res.send(result)
        console.log(result)
    })
})

//update

app.get("/update/:id",(req,res)=>{
    let newName = "sona"
    let sql = `UPDATE employee SET name = '${newName}' WHERE id =${req.params.id}`
    let query = db.query(sql,err =>{
        if(err){
            throw err
        }
        res.send("employee updated")
        console.log("employee updated!!!")
    })
})

//deleted

app.get("/deleted/:id",(req,res)=>{
    let sql= `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql,err =>{
        if(err){
            throw err
        }
        res.send('employee deleted')
        console.log("employee deleted")
    })
})






app.listen('5000',()=>{
    console.log("server starte on port")
})
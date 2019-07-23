const express = require('express');
const {Client} = require('pg')


    
const  connectionString ={
    user: "fortune",
    password: "password",
    host:"localhost",
    port: 5432,
    database: "meetup"
 }  

 const client = new Client(connectionString);
 client.connect();   




module.exports =  client;
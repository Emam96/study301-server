"use strict";

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { default: axios } = require("axios");

let server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

server.get("/test", (req, res) => {
  res.send("ITS ALIVE!!");
});


server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });



server.get("/all", getData);


// server.get("/favcolors", getFavColors);


server.post("/add", addData);

server.delete("/delete/:id", deleteData);


// server.post("/update", updateData);



  let myFile = new mongoose.Schema({
    name: String,
    age: Number,
  });
  
  
  const myFileModel = mongoose.model("myFile", myFile);

  
  function emam() {
    let user = new myFileModel({
        name: "Emam Shararah",
      age: 24,
    });
    user.save();
  }
//   emam();
  





async function getData(req, res) {
   
    let name = req.query.name;

    myFileModel.find({ name: name }, function (error, data) {
        if (error) {
          res.send("NO DATA :(");
        } else {
          // console.log(books);
          res.send(data);
        }
      });
      
  }

  async function addData(req, res) {
    let { name, age } = req.body;

  await myFileModel.create({ name, age });

  myFileModel.find({ name: name }, function (err, books) {
    if (err) {
      console.log("error in getting the data");
    } else {
      console.log(books);
      res.status(201).send(books);
    }
  });
  }

  async function deleteData(req, res) {
    let name = req.query.name;
  let id = req.params.id;

  myFileModel.remove({ _id: id }, (error, data) => {
    if (error) {
      res.status(403).send("error in deleting the data");
    } else {
      console.log("data deleted", data);
      myFileModel.find({ name: name }, function (err, books) {
        if (err) {
          console.log("error in getting the data");
        } else {
          // console.log(books);
          res.send(books);
        }
      });
    }
  });
  }

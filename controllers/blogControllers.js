const fs = require("fs");
const path = require("path");
const Blog= require("../models/blogSchema");
const uniqid = require("uniqid");
const AppError = require("../helpers/appErr");
const sendErrorMessgae = require("../helpers/sendErr");
const sendResponse = require("../helpers/sendRes");
const multer = require("multer");
const { Query } = require("mongoose");
const { query } = require("express");

const createBlog = (req, res, next) => {

  if (req.body == null) {
    res.send("error");
  }
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  let upload = multer({ storage: storage }).single("imageUrl");
  upload(req, res, (err) => {
    if (err) {
      sendErrorMessgae(
        new AppError(400, "Unsucessful", "Could not multer Image"),
        req,
        res
      );
    }
    if (req.file) {
      req.body.imageUrl = req.file.path;
    }
    console.log(req.body);
    new Blog(req.body)
      .save()
      .then((data) => {
        sendResponse(200, "Sucessfull", "Blog Created", req, res);
      })
      .catch((err) => {
          //console.log(err)

        sendErrorMessgae(
          new AppError(
            400,
            "Unsucessful",
            err.message
          ),
          req,
          res
        );
      });
  });
};

const findUniqueBlog = (req, res, next) => {
  console.log(req.params);
  let params={blogId:req.params._id};
  //req.params
    Blog.find(params).then((data) => {
    if (data.length == 0) {
      sendErrorMessgae(
        new AppError(400, "Unsucessful", "Blog  invalid"),
        req,
        res
      );
    }

    sendResponse(200, "Sucessful", data, req, res);
  });
};
const findBlog = (req, res, next) => {
  
  Blog.find().then((data) => {
    sendResponse(200, "Sucessful", data, req, res);
  });
};

const updateUniqueBlog = (req, res, next) => {
console.log(req.params)
console.log(req.body)
let params={blogId:req.params._id};
  Blog.updateOne(params, req.body).then((data) => {
    if (data.nModified == false) {
      sendErrorMessgae(
        new AppError(404, "no Blog Enter proper keys"),
        req,
        res
      );
    }
    sendResponse(200, "Sucessful", data, req, res);
  });
};



const updateImageById = (req, res) => {
    console.log(req.params)
    let params={blogId:req.params._id};
    console.log(req.body)
  let blog = Blog.find(params)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      sendErrorMessgae(new AppError(404, " no such Blog"), req, res);
    });

  if (blog == null) {
    sendErrorMessgae(new AppError(404, " no such Blog"), req, res);
  }

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  let upload = multer({ storage: storage }).single("imageUrl");
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      sendErrorMessgae(
        new AppError(400, "Something went wrong put key as imageUrl"),
        req,
        res
      );
    } else {
      Blog.updateOne(req.params, { imageUrl: req.file.path })
        .then((data) => {
          if (data.nModified == false) {
            sendErrorMessgae(new AppError(404, "Blog Not Updated"), req, res);
          }
          res.send("Blog Updated");
        })
        .catch((err) => {
          sendErrorMessgae(
            new AppError(404, "There is no such Blog"),
            req,
            res
          );
        });
    }
  });
};
const deleteBlog = (req, res, next) => {

  let params={blogId:req.params._id};
  Blog.deleteOne(params).then((data) => {
    if (data.n == false) {
      sendErrorMessgae(new AppError(404, " no such Blog"), req, res);
    }
    res.send("Deleted");
  });
};

module.exports.createBlog = createBlog;
module.exports.findBlog = findBlog;
module.exports.findUniqueBlog = findUniqueBlog;
module.exports.updateUniqueBlog = updateUniqueBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.updateImageById = updateImageById;

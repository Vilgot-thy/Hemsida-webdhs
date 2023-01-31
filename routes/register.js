//mysql
var con = require('../SQL/cart/config/database.js');
var express = require('express');
var router = express.Router();
var crypto = require('crypto')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: '' });
});


router.post('/', function(req, res, next) {
  var user = req.body.username
  var email = req.body.email
  var password = req.body.password
  var hash = crypto.createHash('SHA256')
  con.query(`CREATE DATABASE IF NOT EXISTS ${user};`, function(err, result){
    if (err){
      throw err
    } else{
      con.query(`CREATE TABLE IF NOT EXISTS ${user}.cart_items SELECT * FROM webdhs.cart_items;`, function(err, result){
        if (err){
          throw err
        } else{
          con.query(`CREATE USER IF NOT EXISTS '${user}'@'%' IDENTIFIED WITH mysql_native_password BY '${password}';`,function(err, result){
            if (err){
              throw err
            } else{
                res.render('Homepage', { title: '' });
            }

          })

        }
      })
    }   
   });
});

module.exports = router;

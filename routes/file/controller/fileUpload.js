/**
 * Created by vuji on 16/4/2.
 */
var express = require('express');
var router = express.Router();

var AjaxResult = require("../../common/ajaxResult");
var ajaxResult = new AjaxResult();
var FileUploadService =require("../service/fileUploadService");

var fileUploadService = new FileUploadService();


router.post('/uploadFile', function(req, res, next) {
    fileUploadService.uploadFile(req,res,next);
});

router.post('/uploadImg', function(req, res, next) {
    fileUploadService.uploadImg(req,res,next);
});


module.exports = router;
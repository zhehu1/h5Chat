/**
 * Created by vuji on 16/4/2.
 */
var express = require('express');
var router = express.Router();

var AjaxResult = require("../../common/ajaxResult");
var ajaxResult = new AjaxResult();
var FileUploadService =require("../service/fileUploadService");

var fileUploadService = new FileUploadService();


router.post('/upload', function(req, res, next) {
    //console.log(req.files);
    fileUploadService.upload(req,res,next);
    //form.parse(req, function(err, fields, files) {
    //    console.log(err,fields,files);
    //    res.writeHead(200, {'content-type': 'text/plain'});
    //    res.write('received upload:\n\n');
    //    res.end(util.inspect({fields: fields, files: files}));
    //});
});

module.exports = router;
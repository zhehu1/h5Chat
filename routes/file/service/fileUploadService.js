/**
 * Created by vuji on 16/4/2.
 */
var multiparty = require('multiparty');
var util = require('util');
var path = require('path');
var fs = require('fs');
var AjaxResilt = require("../../common/ajaxResult");
var encode = require('../../common/encrypt');
var ajaxResult = new AjaxResilt();
var BASE_FILE_PATH = path.resolve("public/files/");
var BASE_USER_IMG_PATH = path.resolve("public/userImg/");
var fileUploadService = function(){};

fileUploadService.prototype.uploadFile = function(req,res,next){
    var form = new multiparty.Form({uploadDir: BASE_FILE_PATH});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);
        console.log("files",files);
        if(err){
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.files;
            //var uploadedPath = inputFile.path;
            //var dstPath = BASE_PATH + inputFile.originalFilename;
            var returnArr = [];
            inputFile.forEach(function(item){
                returnArr.push({
                    //linkPath:item.path.replace(BASE_PATH,""),
                    linkPath:item.path.replace(BASE_FILE_PATH,"/files/"),
                    name:item.originalFilename
                })
            });
            //重命名为真实文件名
            //fs.rename(uploadedPath, dstPath, function(err) {
            //    if(err){
            //        res.send(ajaxResult.returnError('rename error: ' + err))
            //        //console.log('rename error: ' + err);
            //    } else {
            //        console.log(uploadedPath,dstPath);
            //        res.send()
            //    }
            //});
            res.send(ajaxResult.returnSuccess({filePath:returnArr}));
        }
        //res.send({fields: fields, files: filesTmp})
    });
}

/**
 * 图片上传
 * @param req
 * @param res
 * @param next
 */
fileUploadService.prototype.uploadImg = function(req,res,next){
    var form = new multiparty.Form({uploadDir: BASE_USER_IMG_PATH});
    console.log("files",form);
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);

        if(err){
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.files;
            var returnArr = [];
            inputFile.forEach(function(item){
                returnArr.push({
                    linkPath:item.path.replace(BASE_USER_IMG_PATH,"userImg/"),
                    name:item.originalFilename
                })
            });
            res.send(ajaxResult.returnSuccess({filePath:returnArr}));
        }
    });
}


module.exports = fileUploadService;










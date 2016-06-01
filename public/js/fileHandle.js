/**
 * 文件处理
 * Created by vuji on 16/4/4.
 */

var FileHandle = function(){};
FileHandle.prototype = {
    init : function(){
        var msgHandle = new MessageHandle();
        var that = this;
        var imgEle = document.querySelector("#imgFormId");
        imgEle.onchange = function(e){
            if(receiveUserObj.uId == ""){
                imgEle.reset();
                alert("请选择聊天对象!");
                return;
            }
            var files = e.target.files[0];
            if(!/image/.test(files.type)){
                imgEle.reset();
                alert("该文件不是图片!");
                return;
            }
            progress.set(0.4);
            that.uploadImg(imgEle,function(data){
                if(data.resultCode == "0"){
                    msgHandle.addImgToMsgBox(data.resultObj.filePath,false);
                    socketHandle.sendImgMsg(data.resultObj.filePath);
                    imgEle.reset();
                }else{
                    alert(data.message);
                }
            })
        }

        var fileform = document.querySelector("#fileFormId");
        fileform.onchange = function(e){
            if(receiveUserObj.uId == ""){
                alert("请选择聊天对象!");
                fileform.reset();
                return;
            }
            that.fileUpload(fileform,function(data){
                if(data.resultCode == 0){
                    msgHandle.addFileToMsgBox(data.resultObj.filePath,false);
                    socketHandle.sendFileMsg(data.resultObj.filePath);
                    fileform.reset();
                }else{
                    alert(data.message);
                }
            })
        }

        var pictureFile = document.querySelector("#userInfoImg");
        pictureFile.onchange = function(e){
            progress.set(0.2);
            var files = e.target.files[0];
            that.uploadImg(pictureFile,function(data){
                console.log(data);
                if(data.resultCode == "0"){
                    document.querySelector("#userInfo input[name='picture']").value = data.resultObj.filePath[0].linkPath;
                    document.querySelector("#userInfo img").src = data.resultObj.filePath[0].linkPath;
                    pictureFile.reset();
                }else{
                    alert(data.message);
                }
            })
        }

    },

    /**
     * 图片处理
     * @param imgFile
     * @param callback
     */
    imageHandle : function(imgFile,callback){
        var that = this;
        if(!typeof  FileReader){
            alert("对不起,您的浏览器暂不支持发送图片,请更新到最新版浏览器!");
            return;
        }
        if(imgFile.type.indexOf("image") === -1){
            alert("该文件不是图片!");
            return;
        }
        var reader = new FileReader();
        progress.inc();
        reader.onload = function(e){
            callback(e.target.result,callback);
            progress.done(true);
        }
        reader.readAsDataURL(imgFile);
    },

    /**
     * 用户头像上传
     * @param form
     * @param callback
     */
    uploadImg : function(form,callback){
        var formdata = new FormData(form);
        $.ajax({
            url: '/fileUpload/uploadImg',
            type: 'POST',
            data: formdata,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function (data) {
                progress.set(0.4);
            },
            complete: function (data) {
                progress.done(true);
                form.reset();
            },
            success: function (returnData) {
                progress.inc();
                callback(returnData);
                //console.log(returnData);
            },
            error: function (returnData) {
                console.log(returnData);
            }
        });
    },
    /**
     * 文件处理
     * @param form
     * @param callback
     */
    fileUpload : function(form,callback) {
        var formdata = new FormData(form);
        $.ajax({
            url: '/fileUpload/uploadFile',
            type: 'POST',
            data: formdata,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function (data) {
                progress.set(0.4);
            },
            complete: function (data) {
                console.log(data);
                progress.done(true);
                form.reset();
            },
            success: function (returnData) {
                progress.inc();
                callback(returnData);
            },
            error: function (returnData) {
                console.log(returnData);
            }
        });
    }
}

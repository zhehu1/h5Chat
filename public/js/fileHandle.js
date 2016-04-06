/**
 * 文件处理
 * Created by vuji on 16/4/4.
 */

var FileHandle = function(){};
FileHandle.prototype = {
    init : function(){
        var msgHandle = new MessageHandle();
        var that = this;
        var imgEle = document.querySelector(".image");
        imgEle.onchange = function(e){
            if(receiveUserObj.uId == ""){
                alert("请选择聊天对象!");
                return;
            }
            var files = e.target.files;
            that.imageHandle(files[0],function(data){
                msgHandle.addImgToMsgBox(data,false);
                socketHandle.sendImgMsgToPersonal(data);
                imgEle.value = "";
            });
        }

        var fileform = document.querySelector("#fileFormId");
        fileform.onchange = function(e){
            that.fileUpload(fileform,function(data){
                if(data.reusltCode == 1){
                    msgHandle.addFileToMsgBox(data.resultObj.filePath,false);
                    socketHandle.sendFileMsgToPersonal(data.resultObj.filePath);
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
        if(!typeof  FileReader){
            alert("对不起,您的浏览器暂不支持发送图片,请更新到最新版浏览器!");
            return;
        }
        if(imgFile.type.indexOf("image")===-1){
            alert("该文件不是图片!");
            return;
        }
        progress.inc();
        var reader = new FileReader();
        reader.onload = function(e){
            callback(e.target.result);
            progress.done(true);
        }
        reader.readAsDataURL(imgFile);
    },

    /**
     * 文件处理
     * @param form
     * @param callback
     */
    fileUpload : function(form,callback) {
        var formdata = new FormData(form);
        $.ajax({
            url: '/fileUpload/upload',
            type: 'POST',
            data: formdata,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function (data) {
//                    console.log("beforeSend");
                progress.set(0.4);
//                    console.log(data);
            },
            complete: function (data) {
//                    console.log("complete");
                console.log(data);
                progress.done(true);
                form.reset();
            },
            success: function (returndata) {
//                    console.log("success");
                progress.inc();
                callback(returndata);
//                    console.log(returndata);
            },
            error: function (returndata) {
                console.log(returndata);
            }
        });
    }
}

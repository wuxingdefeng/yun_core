<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="yes" name="apple-touch-fullscreen"> 
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="viewport" content="width=375">
    <meta name="viewport" content="width=414">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
    <meta content="telephone=no,email=no" name="format-detection">
    <meta name="App-Config" content="fullscreen=yes,useHistoryState=yes,transition=yes">
       <script src="<%=contextPath%>/static/dropzone/dropzone.min.js"></script>
         <link href="<%=contextPath%>/static/dropzone/dropzone.css" rel="stylesheet" />
 
  </head>
  <body style="margin:0px;padding:0px;">
   <div class="row main" style="min-height:500px">
		<div class="col-md-12">
			  <div class="row" style="margin-top:30px;">
					<div id="mydropzone" class="dropzone"></div>
				</div>
		 </div>
		<!-- <div id="pre" class="dropzone" style="width:100%;min-height:200px;"></div> --> 
  </div>
  <script>
   var myDropzone = new Dropzone("div#mydropzone", { 
		url: "upload",
		paramName: "file",
		maxFilesize: 30, // MB
		maxFiles: 5,
		addRemoveLinks:true,
		//previewsContainer:"#pre",
		acceptedFiles: ".jpg,.png,.gif",
		uploadMultiple:true,
		dictRemoveFile:"删除",
		dictCancelUpload:"取消",
		dictCancelUploadConfirmation:"是否取消上传",
		dictFileTooBig:"文件过大",
		init:function(){
            this.on("addedfile", function(file) { 
                //上传文件时触发的事件
            });
            this.on("queuecomplete",function(file) {
                //上传完成后触发的方法
            });
            this.on("removedfile",function(file){
                //删除文件时触发的方法
                //alert("删除");
             });
            this.on("canceled",function(file){
                this.emit("error", file, "已取消");
            });
        }
   });
</script>
  </body>
</html>

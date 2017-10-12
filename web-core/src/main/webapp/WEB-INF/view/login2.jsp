<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>登录系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="static/login.css">
	<script src="static/cloud.js" type="text/javascript"></script>
	<style type="text/css">
	 body{padding:0px;margin:0px;font-size:14px;height:100%;width:100%;}
div{margin:0 auto;text-align:center;}
	#mainBody {width:100%;height:100%;position:absolute;z-index:-1;}
.cloud {position:absolute;top:0px;left:0px;width:100%;height:100%;background:url(static/sys_images/cloud.png) no-repeat;z-index:1;opacity:0.5;}
#cloud2 {z-index:2;}
.login_Main{
background:url(static/sys_images/loginbg3.png) no-repeat center center; width:100%; height:585px;}
}

	</style>
  </head>
  <body style="background-color:#1c77ac; background-image:url(static/sys_images//light.png); background-repeat:no-repeat; background-position:center top; overflow:hidden;'">
          <div id="mainBody">
		      <div id="cloud1" class="cloud"></div>
		      <div id="cloud2" class="cloud"></div>
		  </div> 
         <div class="login_Main">
              <div class="main">
                    <input type="hidden" name="msg" value="${msg }">
                    <div class="div_name divs" ><font style="display:none;">用户名：</font><input  name="name" id="Name" value=""  class="inp"/></div>
                    <div class="div_pwd divs" ><font style="display:none;">密   码：</font><input name="password"  value="" id="Password"  type="password" class="inp" autocomplete="off"/></div>
                    <div class="code" ><font style="display:none;">验证码：</font><img src="code" id="code"><input name="code"  value="" id="Code"  type="text" maxlength="4" class="inp codeinp"/></div>
                    <div class="btn" ><div class="btn_div login_btn">登 录</div><div class="btn_div clearbtn" >清 空</div></div>
              </div>
         </div>
  </body>
  <script type="text/javascript">
			  String.prototype.NoSpace = function(){ 
				return this.replace(/\s+/g, ""); 
			};
			String.prototype.trim = function() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); }; 
           $(document).ready(function(){
               <%--var msg=$("input[name='msg']").val(); 
                if(msg!=null&&msg!=""){
                        var msg=$("input[name='msg']").val(); 
						  layer.alert('"+msg+"', {
						    skin: 'layui-layer-red'
						    ,closeBtn: 0
						    ,shift: 1 //动画类型
						});
               }
               --%> 
               $("#Name").click(function(){
                   layer.tips('这里填写用户名！', '#Name',{
	                  tips: [2, '#cccccc']
	               });
               });
                 $("#Password").click(function(){
                   layer.tips('这里填写密码哦！', '#Password',{
	                  tips: [2, '#cccccc']
	               });
               });
                $("#Code").click(function(){
                   layer.tips('填写验证码哦！', '#Code',{
	                  tips: [2, '#cccccc']
	               });
               });
               $("#code").click(function(){
                     $(this).attr("src","code?date="+new Date());
               });
               $(".clearbtn").click(function(){
                    $("input").val("");
               });
               //登录操作
               $(".login_btn").click(function(){
                       var vals=true; 
                       $(".inp").each(function(){
					       var vl=$(this).val();
					       var names=($(this).closest("div").find("font").html().split("：")[0]).trim();
					       names=names.NoSpace();
					       if(vl==null||vl==""||typeof(vl)=="undefined"){
					               var id=this.id;
				                   layer.tips(names+'不能为空哦!！', '#'+id,{
					                  tips: [2, 'red']
					               });
					             vals=false;
					             return false;
					       }
					   });
					   if(vals){//登录中
					       $.post("login",{"name":$("#Name").val(),"pwd":$("#Password").val(),"code":$("#Code").val()},function(result){
					              if(result.code!="0"){
					                  $("#code").attr("src","code?date="+new Date());
					                  var msg=(result.msg);
								      layer.alert(''+msg, {
									    skin: 'layui-layer-red'
									    ,closeBtn: 0
									    ,shift: 5 //动画类型
									 });
					              }else{
					                   window.location.href="sys/main";
					              }
						   });
					   }
               });
           });
          
  </script>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
    <meta name="renderer" content="webkit">
    <title>国医大师程莘农院士智能经络辅助诊疗系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="static/login.css">
	<script src="static/cloud.js" type="text/javascript"></script>
  </head>
  <body style="background-color:#1c77ac; background-image:url(static/sys_images//light.png); background-repeat:no-repeat; background-position:center top; overflow:hidden;'">
          <div class="logintop">    
			    <span>欢迎登录国医大师程莘农院士智能经络辅助诊疗系统</span>    
			    <ul>
			    <%--<li><a href="#">回首页</a></li>
			    <li><a href="#">帮助</a></li>
			    <li><a href="#">关于</a></li>
			    --%></ul>    
			</div>
          <div id="mainBody">
		      <div id="cloud1" class="cloud"></div>
		      <div id="cloud2" class="cloud"></div>
		  </div> 
         <div class="login_Main">
	              <div class="main">
	                    <input type="hidden" name="msg" value="${msg }">
	                    <div class="div_name divs" ><font style="display:none;">用户名：</font><input autocomplete="off"  name="name" placeholder="管理员账号" id="Name" value=""  class="inp"/></div>
	                    <div class="div_pwd divs" ><font style="display:none;">密   码：</font><input    name="password" placeholder="管理员密码"   value="" id="Password"  type="text" class="inp" autocomplete="off"/></div>
	                    <div class="code" ><font style="display:none;">验证码：</font><img src="code" id="code" style="border:1px solid #e0e0e0;border-radius:2px;"><input name="code" placeholder="输入验证码"   value="" id="Code"  type="text" maxlength="4" class="inp codeinp"/></div>
	                    <div class="btn" ><div class="btn_div login_btn">登 录</div><div class="btn_div clearbtn" >清 空</div></div>
	              </div>
         </div>
          <div class="loginbm"><%--版权所有  2017  <a href="http://www.mengdushe.com">mengdushe.com</a>  版权归属梦都社所有，切勿盗版（QB）--%></div>
  </body>
  <script type="text/javascript" src="<%=basePath%>/static/login.js"></script>
</html>

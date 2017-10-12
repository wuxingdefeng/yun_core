<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <script src="<%=contextPath%>/static/blUeditor/EMR/ueditor.EMR.js"></script>
         <link href="<%=contextPath%>/static/blUeditor/EMR/css/icon.css" rel="stylesheet" />
         <link href="<%=contextPath%>/static/blUeditor/EMR/css/design.css" rel="stylesheet" />
	     <link href="<%=contextPath%>/static/blUeditor/themes/iframe.css" rel="stylesheet" />
  </head>
  <body style="margin:0px;padding:0px;">
   <div style="width:80%;height:auto;margin:0 auto;" id="main">
		${html }
   </div>
   <a onclick="alert('待加入');">获取控件</a>
  </body>
</html>

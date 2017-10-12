<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=mode">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<title>测试医生</title>
		<link rel="stylesheet" href="<%=basePath%>/static/extends_layer/layer_.css" type="text/css">
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/static/santiIM/im.css">
        <script type="text/javascript" src="<%=basePath%>/static/layer/layer.js"></script>
		<style>
		     body{width:100%;height:100%;margin:0px;padding:0px;}
		     .doctor{cursor:pointer;width:110px;height:35px;line-height:35px;border:1px solid  red;text-align:center;border-radius:3px;margin-top:12px;margin-left:12px;}
		</style>
	</head>
	<body >
	
	 <input type="hidden" id="loginID" value="1234567"/>
	 <input type="hidden" id="loginName" value="xiaoming"/>
     <div class="doctor" data-id="123456" data-name="admin">admin</div>
     <script type="text/javascript" src="<%=basePath%>/static/js/home/doctorMin.js"></script>
	</body>
</html>
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
        <script type="text/javascript" src="<%=basePath%>/static/layer/layer.js"></script>
		<style>
		     body{width:100%;height:100%;margin:0px;padding:0px;}
		     .btns{border-radius:4px;width:130px;padding:14px 23px;background-color:blue;text-align:center;color:#fff;font-size:15px;margin:0 auto;margin-top:30px;cursor:pointer;}
		</style>
	</head>
	<body >
	    <div class="btns">远程名医会诊</div>
	    <script type="text/javascript">
	         $(function(){
	             $(".btns").click(function(){
	                    layer.open({
		        			      	  type: 2,
		        			      	  title:"排班医生列表",
		        			      	  shade:0.9,
		        			      	  shadeClose:false,
		        			      	  scrollbar: false,
		        			      	  move:false,
		        			      	  area:['738px','650px'],
		        			      	  content:"../test/toDoctorList",
		        			      	  btn: ['刷新', '关闭']
		        			      	  ,yes: function(index, layero){
		        			      		  var htmlStr="";
		        			      	  },btn2: function(index, layero){
		        			      		 
		        			      	  }
	        		  });
	             });
	         });
	    </script>
	</body>
</html>
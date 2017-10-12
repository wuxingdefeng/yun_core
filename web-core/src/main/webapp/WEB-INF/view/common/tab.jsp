<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">

	<head>
	<base href="<%=basePath%>">
	
	<script type="text/javascript" src="static/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="static/my/tab/js/framework.js"></script>
	<link href="static/my/tab/css/import_basic.css" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" charset="utf-8" src="static/my/tab/js/tab.js"></script>
	</head>
	
<body>
<div id="tab_menu" style="height:30px;"></div>
<div style="width:100%;">
	<div id="page" style="width:100%;height:100%;"></div>
</div>		
</body>
<script type="text/javascript">
function tabAddHandler(mid,mtitle,murl){
	tab.update({
		id :mid,
		title :mtitle,
		url :murl,
		isClosed :true
	});
	tab.add({
		id :mid,
		title :mtitle,
		url :murl,
		isClosed :true
	});
	tab.activate(mid);
}
 var tab;	
$( function() {
	 tab = new TabView( {
		containerId :'tab_menu',
		pageid :'page',
		cid :'tab1',
		position :"top"
	});
	 tab.add( {
		id :'tab1_index1',
		title :"主页",
		url :"<%=basePath%>login_default.do",
		isClosed :false
	}); 
});
</script>
</html>


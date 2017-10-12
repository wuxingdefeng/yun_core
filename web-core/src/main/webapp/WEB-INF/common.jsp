<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%String path = request.getContextPath();%>
<%String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()+"//";%>
<%String contextPath = request.getContextPath();%>
<%String version = "20160828";%>
<!DOCTYPE html>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<%-- 公用CSS--%>
<link rel="stylesheet" href="<%=basePath%>/static/layer/skin/layer.css" type="text/css">
<link rel="stylesheet" href="<%=basePath%>/static/common/common.css" type="text/css">
<link rel="stylesheet" href="<%=basePath%>/static/extends_layer/layer_.css" type="text/css">
<%-- 公用JS--%>
<script type="text/javascript" src="<%=basePath%>/static/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/layer/layer.js"></script>
<script type="text/javascript" src="<%=basePath%>/static/common/common.js"></script>

 

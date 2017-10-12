<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=basePath%>/static/my/system/tuserbasic.css" type="text/css">
<style type="text/css">
     .a_btn{display:inline-block;margin-right:6px;background-color:#e0ecff;margin-left:6px;padding:3px 7px;border:1px solid #ccc;text-align:center;border-radius:3px;margin-top:5px;margin-bottom:5px;}
</style>
<script type="text/javascript" src="<%=basePath%>/static/my/system/tuserbasic.js"></script>
</head>
<body>
	<div id="tb" style="padding:5px;height:auto">
		<div style="margin-bottom:5px" class="z-toolbar">
			<a href="#" class="easyui-linkbutton" iconCls="icon-reload" plain="true" onclick="refresh()">刷新</a>
			<c:forEach items="${funBtns }" var="menu">
			      <a href="javascript:void(0);" class="easyui-linkbutton"  iconCls="${menu.MENU_PNG }"  id="btn_edit" plain="true" onclick="${ fn:split(menu.MENU_URL, '/')[2]}()">${menu.MENU_NAME }</a> 
			</c:forEach>
		</div>
		<div>
			<form id="searchForm" method="post" name="serchForm">
				<table class="search">
					<tr>
						<td>搜索:</td>
						<td><input type="text" id="SEACH" name="SEACH"  style="width:100px;"/></td>
						<td>
						      <a href="#" class="easyui-linkbutton"onclick="searchs();" iconCls="icon-search">查询</a>
						      <a href="#"class="easyui-linkbutton" onclick="resetSearch();"iconCls="icon-undo">清空</a>
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>

	<table id="dg" class="easyui-datagrid"  url="<%=contextPath%>/sys/tuserbasic/list"
		data-options="fitColumns:false,rownumbers:true,singleSelect:true,autoRowHeight:true,fit:true,pagination:true,method:'get',toolbar:'#tb'">
		<thead>
			<tr>
				<th data-options="field:'user_id',align:'center',hidden:true">user_id</th>
				<th data-options="field:'user_name',align:'center',width:100">用户名</th>
				<th data-options="field:'user_sex',align:'center',width:100,formatter:sexFormatter">性别</th>
				<%--<th data-options="field:'user_age',align:'center',width:100">年龄</th>--%>
				<th data-options="field:'user_birthday',align:'center',width:100">出生日期</th>
				<th data-options="field:'user_phone',align:'center',width:100">手机号码</th>
				<th data-options="field:'user_marrige',align:'center',width:100,formatter:marrigeFormatter">婚否</th>
				<th data-options="field:'user_job',align:'center',width:100">职业</th>
				<th data-options="field:'user_long_address',align:'center',width:100">长期居住地址</th>
				<th data-options="field:'user_communication_address',align:'center',width:100">通讯地址</th>
			</tr>
		</thead>
	</table>
</body>
</html>

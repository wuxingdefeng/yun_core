<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=basePath%>/static/my/system/testtemplate.css" type="text/css">
<style type="text/css">
     .a_btn{display:inline-block;margin-right:6px;background-color:#e0ecff;margin-left:6px;padding:3px 7px;border:1px solid #ccc;text-align:center;border-radius:3px;margin-top:5px;margin-bottom:5px;}
</style>
<script type="text/javascript" src="<%=basePath%>/static/my/system/testtemplate.js"></script>
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

	<table id="dg" class="easyui-datagrid"  url="<%=contextPath%>/sys/testtemplate/list"
		data-options="fitColumns:false,rownumbers:true,singleSelect:true,autoRowHeight:true,fit:true,pagination:true,method:'get',toolbar:'#tb'">
		<thead>
			<tr>
				<th data-options="field:'template_id',align:'center',hidden:true">template_id</th>
				<th data-options="field:'template_name',align:'center',width:180">模板名称</th>
				<!-- <th data-options="field:'template',align:'center',width:100">template</th> -->
				<th data-options="field:'create_date',align:'center',width:100">创建时间</th>
				<!-- <th data-options="field:'is_del',align:'center',width:100">is_del</th> -->
				<!-- <th data-options="field:'del_date',align:'center',width:100">del_date</th> -->
				<!-- <th data-options="field:'status',align:'center',width:100">status</th> -->
			</tr>
		</thead>
	</table>
</body>
</html>

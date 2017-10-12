<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
     .a_btn{display:inline-block;margin-right:6px;background-color:#e0ecff;margin-left:6px;padding:3px 7px;border:1px solid #ccc;text-align:center;border-radius:3px;margin-top:5px;margin-bottom:5px;}
</style>
<script type="text/javascript" src="<%=basePath%>/static/my/menu.js"></script>
</head>
<body>
	<div id="tb" style="padding:5px;height:auto">
		<div style="margin-bottom:5px" class="z-toolbar">
			<a href="#" class="easyui-linkbutton" iconCls="icon-reload"plain="true" onclick="refresh()">刷新</a>
			<c:forEach items="${funBtns }" var="menu">
			      <a href="javascript:void(0);" class="easyui-linkbutton"  iconCls="${menu.MENU_PNG }"  id="btn_edit" plain="true" onclick="${ fn:split(menu.MENU_URL, '/')[2]}()">${menu.MENU_NAME }</a> 
			</c:forEach>
			<!-- <a id="btnSave"href="javascript:void(0)" class="easyui-linkbutton"data-options="iconCls:'icon-add',plain:'true'" onclick="goAddPage()">新增</a>
			<a href="#" class="easyui-linkbutton" iconCls="icon-edit" id="btn_edit" plain="true" onclick="goEditPage()">编辑</a> 
			<a href="#"class="easyui-linkbutton" iconCls="icon-remove" id="btn_remove"plain="true" onclick="del()">删除</a> -->
		</div>
		<div>
			<form id="searchForm" method="post" name="serchForm">
				<table class="search">
					<tr>
						<td>菜单名称:</td>
						<td><input type="text" id="MENU_NAME" name="MENU_NAME"  style="width:100px;"/><input type="hidden" name="PARENT_MENUID" value="0" ></td>
						<td>
						      <a href="#" class="easyui-linkbutton"onclick="searchs();" iconCls="icon-search">查询</a>
						      <a href="#"class="easyui-linkbutton" onclick="resetSearch();"iconCls="icon-undo">清空</a>
						     <!--   <a href="javascript:void(0);" class="easyui-linkbutton" onclick="excelParams(this,'excel4');">导出excel</a> -->
						</td>
					</tr>
				</table>
			</form>
		</div>
	</div>

	<table id="dg" class="easyui-datagrid"  url="<%=contextPath%>/sys/menu/list"
		data-options="fitColumns:false,rownumbers:true,singleSelect:true,autoRowHeight:true,fit:true,pagination:true,method:'get',toolbar:'#tb'">
		<thead>
			<tr>
				<th data-options="field:'MENU_ID',align:'center',hidden:true">MENU_ID</th>
				<th data-options="field:'MENU_NO',align:'center',width:100">排序编号</th>
				<th data-options="field:'MENU_NAME',align:'center',width:150">菜单名称</th>
				<th data-options="field:'MENU_URL',align:'center',width:200">菜单路径</th>
				<th data-options="field:'MENU_STATUS',align:'center',width:100,formatter:statusFormatter">状态</th>
				<th data-options="field:'admin_name',align:'center',width:80">管理员</th>
				<th data-options="field:'CREATE_DATE',align:'center',width:200,formatter:dateFormatter">创建时间</th>
				<th data-options="field:'PARENT_MENUID',align:'center',width:158,formatter:caozuoFormatter">操作</th>
			</tr>
		</thead>
	</table>
</body>
</html>

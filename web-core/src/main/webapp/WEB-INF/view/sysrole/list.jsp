<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=basePath%>/static/my/system/sysrole.css" type="text/css">
<style type="text/css">
     .a_btn{display:inline-block;margin-right:6px;background-color:#e0ecff;margin-left:6px;padding:3px 7px;border:1px solid #ccc;text-align:center;border-radius:3px;margin-top:5px;margin-bottom:5px;}
</style>
<script type="text/javascript" src="<%=basePath%>/static/my/system/sysrole.js"></script>
</head>
<body>
     <div id="cc" class="easyui-layout" data-options="fit:true">   
		    
		    <div data-options="region:'east',title:'权限管理',border:false" style="width:350px;background-color:#eee;border-bottom:1px solid #95b8e7;">
		    	<div style="margin:5px" class="z-toolbar">
						<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="setJurs()">设置权限</a>
				</div>
		         <ul id="tt" class="easyui-tree" data-options="url:'<%=contextPath%>/sys/public/getMenulist',method:'get',animate:true,checkbox:true"></ul>
		    </div>   
		    
		    
		    <div data-options="region:'center',title:'角色列表',border:false" style="background:#eee;">
		          <div id="tb" style="padding:5px;height:auto">
					<div style="margin-bottom:5px" class="z-toolbar">
						<a href="#" class="easyui-linkbutton" iconCls="icon-reload" plain="true" onclick="refresh()">刷新</a>
						<c:forEach items="${funBtns }" var="menu">
						      <a href="javascript:void(0);" class="easyui-linkbutton"  iconCls="${menu.MENU_PNG}"   plain="true" onclick="${ fn:split(menu.MENU_URL, '/')[2]}()">${menu.MENU_NAME }</a> 
						</c:forEach>
					</div>
					<div>
						<form id="searchForm" method="post" name="serchForm">
							<table class="search">
								<tr>
									<td>角色名称:</td>
									<td><input type="text" id="ROLE_NAME" name="ROLE_NAME"  style="width:100px;"/></td>
									<td>
									      <a href="#" class="easyui-linkbutton"onclick="searchs();" iconCls="icon-search">查询</a>
									      <a href="#"class="easyui-linkbutton" onclick="resetSearch();"iconCls="icon-undo">清空</a>
									</td>
								</tr>
							</table>
						</form>
					</div>
				</div>
		          <table id="dg" class="easyui-datagrid"  url="<%=contextPath%>/sys/sysrole/list"
						data-options="fitColumns:false,rownumbers:true,singleSelect:true,autoRowHeight:true,fit:true,pagination:true,method:'get',toolbar:'#tb',onClickRow:selectedHR" >
						<thead>
							<tr>
								<th data-options="field:'ROLE_ID',align:'center',hidden:true">ROLE_ID</th>
								<th data-options="field:'ROLE_NAME',align:'center',width:100">角色名称</th>
								<th data-options="field:'ROLE_DESCR',align:'center',width:350">角色描述</th>
								<th data-options="field:'CREATE_DATE',align:'center',width:130,formatter:dateFormatter">创建时间</th>
								<th data-options="field:'admin_name',align:'center',width:100">创建者</th>
								<!--  <th data-options="field:'ROLE_STATUS',align:'center',width:100">ROLE_STATUS</th>-->
							</tr>
						</thead>
					</table>
		    
		    </div>   
 </div> 
	
</body>
</html>

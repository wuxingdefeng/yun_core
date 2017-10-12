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
		<title >按钮样式</title>
	</head>
	<body class="easyui-layout">
	<div id="tb" style="padding:5px;height:auto">
		<div style="margin-bottom:5px" class="z-toolbar">
			<a href="#" class="easyui-linkbutton" iconCls="new-icon-add"plain="true" onclick="refresh()">刷新</a>
			<a id="a">查看</a>
		</div>
		<div>
			<form id="searchForm" method="post" name="serchForm">
				<table class="search">
					<tr>
						<td>搜索:</td>
						<td><input type="text" id="search" name="search"  style="width:100px;"/></td>
						<td>认证情况</td>
						<td>
						<select name="status" id="status" style="width:120px;">
						                <option selected="selected" value="1">未认证</option>
						                <option value="2">已通过</option>
						                <option value="3">未通过</option>
						                <option value="0">全部</option>
						        </select>
						</td>
					<td>认证时段:</td>
					<td><input type="text" name="auth_date_start" id="auth_date_start" class="easyui-datebox">——<input type="text" name="auth_date_end" id="auth_date_end" class="easyui-datebox"></td>
					<td>
						  <a href="#" class="easyui-linkbutton"onclick="searchs();" iconCls="icon-search">查询</a>
						  <a href="#"class="easyui-linkbutton" onclick="resetSearch();"iconCls="icon-undo">清空</a>
					</td>
					</tr>
				</table>
			</form>
		</div>
		<style>
#a{ width:70px; height:30px; 
border-radius:5px 5px 5px 5px;
border: 1px outset rgb(0,102,255);
background:-webkit-linear-gradient(rgb(0,102,255),rgb(0,0,255),rgb(0,0,255),rgb(0,0,255),rgb(0,0,255));}
/*border-radius设置圆角为5px   border：边框5px 3D突出边框 边框颜色  background:-webkit-linear-gradient默认从上到下渐变这个上图貌似是图片*/
#a:hover{ width:70px; height:30px; border-radius:5px 5px 5px 5px;border: 1px inset rgb(0,0,255);
background:-webkit-linear-gradient(rgb(0,102,255),rgb(0,51,255),rgb(0,0,255),rgb(0,0,255),rgb(0,0,255));}
/*鼠标悬浮后  border: 边框5px 3D下陷边框 边框颜色 */
</style>
<div id="a">查看</div>
	</div>
	</body>
</html>
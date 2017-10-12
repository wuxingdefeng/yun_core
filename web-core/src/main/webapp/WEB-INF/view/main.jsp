<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="common/taglibs.jsp"%>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=mode">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<title >程凯电子病历</title>
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/css/index.css">
		<script type="text/javascript" src="<%=basePath%>/js/index.js">
</script>
<script type="text/javascript" >

$(function(){
	$("#leftAccordion").accordion({ //初始化accordion
		fillSpace:true,
		fit:true,
		border:false,
		animate:false
	});
	var url = '<%=contextPath%>/menu/getTreeByEasyui';
	//菜单树形加载
	$.post(url, { "id": "0" }, //获取第一层目录
	function (data) {
		if (data == "0") {
		//window.location = "/Account";
		}
		$.each(data, function (i, e) {//循环创建手风琴的项
			var id = e.id;
			$('#leftAccordion').accordion('add', {
				title: e.text,
				content: '<ul id="tree'+id+ '" style="margin-top: 5px;"></ul>',
				selected: true,
				iconCls:e.iconCls//e.Icon
			});
			//$.parser.parse();
			//$("#tree" + id).tree({url:url+"?id="+id});
			$.get(url+"?id="+id, function(data) {//循环创建树的项
				$("#tree" + id).tree({
				data: data,
				onClick : function(node){
						var tabTitle = node.text;
					    var url = "<%=contextPath%>/"+node.attributes;
						var icon = node.iconCls;
						addTab(tabTitle, url);
				}
				});
			}, 'json'); 
		}); 
}, "json");
});
</script>
	</head>
	<body class="easyui-layout">
	    <div data-options="region:'north',border:false" >
	        <div id="header" class="head-north">
	    	   <span class="head head-right"><a href="javascript:void(0)"
					class="header-link" data-options="iconCls:'icon-user'"> </a> <a
					href="javascript:void(0)" class="header-link"
					data-options="iconCls:'icon-user'">welcome:${user.ADMIN_NAME }</a>
					<a href="javascript:void(0)" class="changepwd header-link"
					data-options="iconCls:'icon-edit'" id="editPassword">修改密码</a>
					 <a
					href="javascript:void(0)" class="loginOut header-link"
					data-options="iconCls:'icon-user_go'" id="loginOut">安全退出</a> </span>
				<span class="head-left"> 程凯电子病历</span>
			</div>
	    </div>
	    <!-- 菜单加载 -->
		<div data-options="region:'west',split:true,title:'主菜单',border:false" style="width:185px;">
			 <div id="leftAccordion" class="easyui-accordion" data-options="fit:true,width:185"> </div>
		</div>
		<!-- 首页放置 -->
		<div data-options="region:'center'" >
			<div id="tabs" class="easyui-tabs" border="false" fit="true" style="height: 26px;">
					<div id="home" style="overflow: hidden;" title="首页">
					水电费
					</div>
			</div>
		</div>
		<div data-options="region:'south',border:false" style="height: 30px; padding-top: 5px;background: #D2E0F2;" >
			<div class="footer">
				</div>
		</div>
		
		<!-- tabs鼠标右键实践 -->
		<div id="mm" class="easyui-menu cs-tab-menu">
				<div id="mm-tabupdate">
					刷新
				</div>
				<div class="menu-sep"></div>
				<div id="mm-tabclose">
					关闭
				</div>
				<div id="mm-tabcloseother">
					关闭其他
				</div>
				<div id="mm-tabcloseall">
					关闭全部
				</div>
			</div>

<div id="dlg" class="easyui-dialog" title="修改密码"
				style="padding: 10px 20px; width: 400px"
				data-options="buttons: '#dlg-buttons',closed:'true',modal:true,onBeforeClose:function(){$('#fm').form('clear')}">
				<form id="fm" method="post" novalidate>
					<table border="0" cellpadding="2" cellspacing="1" class="search">
						<tr>
							<td>
								用户名:
							</td>
							<td >
								清兵
							</td>
						</tr>
						<tr>
							<td >
								原始密码:
							</td>
							<td >
								<input id="oldPassword" name='oldPassword' type="password" 
									 value="" class="easyui-validatebox" data-options="required:true"/>
								<span style="color: red">*</span>
							</td>
						</tr>
						<tr>
							<td >
								新密码:
							</td>
							<td >
								<input id="newPassword" name='newPassword' type="password" 
									 value="" class="easyui-validatebox" data-options="required:true"/>
								<span style="color: red">*</span>
							</td>
						</tr>
						<tr>
							<td >
								确认密码:
							</td>
							<td >
								<input id="comfirmPassword" name='comfirmPassword' type="password" 
									 value="" class="easyui-validatebox" data-options="required:true"/>
								<span style="color: red">*</span>
							</td>
						</tr>
						<tr>
							<div id="pwderrorMsg" style="text-align: center; color: red;"></div>
						</tr>
					</table>
				</form>
			</div>
			<div id="dlg-buttons">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-ok" id="dlg-save">保存</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconCls="icon-cancel"
					onclick="javascript:$('#dlg').dialog('close')">取消</a>
			</div>
	</body>
</html>
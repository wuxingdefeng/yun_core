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
		
		<title >国医大师程莘农院士智能经络辅助诊疗系统</title>
		<link rel="stylesheet" href="<%=basePath%>/static/extends_layer/layer_.css" type="text/css">
        <script type="text/javascript" src="<%=basePath%>/static/layer/layer.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=basePath%>/static/easyui_lib/home/index.css">
<%--		<link rel="stylesheet" type="text/css" href="<%=basePath%>/static/santiIM/im.css">--%>
		<script type="text/javascript" src="<%=basePath%>/static/js/home/index.js"></script>
		
<style type="text/css"> 
	<!-- 	/** 手风琴样式 **/ -->
	
 .accordion{
background:#fff;
overflow:hidden;
border: 0px;
} 

.accordion .accordion-header{
background:#ffffff;
border-top-width:0;
cursor:pointer;
height: 21px;
border-bottom: 1px solid #CCC;
} 
 .accordion .accordion-header .panel-title{
font-weight:normal;
} 
 .accordion .accordion-header-selected .panel-title{
font-weight:bold;
color:#b63b4d;
font-size: 14px;

cursor: pointer;
display: block;
font-size: 14px;
font-weight: 700;
position: relative;
-webkit-transition: all 0.4s ease;
-o-transition: all 0.4s ease;
transition: all 0.4s ease;
} 
 .accordion-noborder .accordion-header{
border-width:0 0 1px;
}
.accordion-noborder .accordion-body{
border-width:0px;
}
<!-- /** 菜单easyui-tree样式修改 **/ -->
.easyui-tree-add .tree-node .tree-indent{
	margin-left: -8px;
}
.easyui-tree-add .tree-node{
	height: 30px;
}
.easyui-tree-add li .tree-node .tree-title{
	line-height: 30px
}
.easyui-tree-add li .tree-node-selected{
	font-size: 15px;
}
.easyui-tree-add .tree-node .tree-file{
	height: 0px;
	width: 0px;
}
.tree-node{border-bottom:1px dashed #bababa;}
.easyui-tree-add li{
 	background: #fff;
 	font-size: 14px;
}
.panel .accordion-body{
	height: 100%;
} 
/**** pen***/
.panel .panel-header-noborder{
	height:18px;
}
.panel-title{height:19px;line-height:22px;}
.head-right{line-height:54px;}
#dlg tr td{padding:5px 5px;}
#msgg{background-color:#d2e0f2 ;border-radius:24px;font-size:12px;
display:inline-block;text-align:center;height:24px;width:24px;
line-height:24px;color:red;position:absolute;margin-top:25px;margin-left:31px;}


* { 
outline:0 none !important; blr:expression(this.onFocus=this.blur()); 
} 


/* .head-north{background:#fff;color:#808080;}
.head-right a{color:#808080;}
.head-right{line-height:48px;}
.tabs-header, .tabs-tool{background-color:#35404d;}
.panel-header{background:-webkit-linear-gradient(top,#35404d 0,#35404d 100%);color:#fff;}
.panel-title{color:#fff;} */

</style> 

<script type="text/javascript" >
$(function(){
	$("#leftAccordion").accordion({ //初始化accordion
		fillSpace:true,
		fit:true,
		border:false,
		animate:false
	}); 
	var url = '<%=contextPath%>/menu/getMenus';
	var url2='<%=contextPath%>/menu/getMenus2';
	console.log('<%=contextPath%>/menu/getMenus');
	//菜单树形加载
    $.post(url,function (data) {
		console.log(data);
		$.each(data, function (i, e) {//循环创建手风琴的项
			var id = e.id;
			$('#leftAccordion1').accordion('add', {
				title: e.text,
				content: '<ul id="tree'+id+'"  class="easyui-tree-add"></ul>',
				selected: true,
				iconCls:e.iconCls//e.Icon
			});
			$.parser.parse($("#leftAccordion1").parent()); 
			$.parser.parse();
			$.get(url2+"?ID="+id, function(data) {//循环创建树的项
				$("#tree" + id).tree({
						data: data,
						onClick : function(node){
								var tabTitle = node.text;
								var sysUrl=node.attributes.url;
								var url=sysUrl;
								if(sysUrl.indexOf("http")<0){
								   url = <%=contextPath%>/+sysUrl;
								}
								var icon = node.iconCls;
								addTab(tabTitle, url);
						}
				});
			}, 'json'); 
		}); 
}, "json"); 
// 测试打开tab页面
});
</script>
	</head>
	<body class="easyui-layout">
	    <div data-options="region:'north',border:false" >
	        <div id="header" class="head-north">
	    	   <span class="head head-right">
	    	        <a href="javascript:void(0)" class="header-link"  style="position:relative;"data-options="iconCls:'icon-user'">
	    	             <font id="msgg">99</font>
	    	             <c:choose>
						          <c:when test="${user.ADMIN_HEAND==null || user.ADMIN_HEAND==''}">
						               <img src="<%=basePath%>/static/sys_images/adminHend.jpg" style="width:43px;height:43px;margin-right:13px;border-radius:43px;" id="adminHeand">
						          </c:when>
						          <c:otherwise>
						               <img src="${user.ADMIN_HEAND }" style="width:43px;height:43px;margin-right:13px;border-radius:43px;" id="adminHeand">
						          </c:otherwise>
						    </c:choose>
	    	       </a> 
	    	       <input type="hidden" name="loginID" value="${user.ADMIN_ID}">
	    	        <input type="hidden" name="loginName" value="${user.ADMIN_NAME}">
					<a 	href="javascript:void(0)" class="header-link" data-options="iconCls:'icon-user'">欢迎:${user.ADMIN_NAME }</a>
					<a   href="javascript:void(0)" class="changepwd header-link"	data-options="iconCls:'icon-edit'" id="editPassword">修改密码</a>
					<a	href="javascript:void(0)" class="loginOut header-link" data-options="iconCls:'icon-user_go'" id="loginOut">安全退出</a> 
					</span>
				<span class="head-left"> ${SYSNAME}</span>
			</div>
	    </div>
	    <!-- 菜单加载 -->
		<div data-options="region:'west',split:true,title:'主菜单',border:false" style="width:185px;">
			 <div id="leftAccordion1" class="easyui-accordion" data-options="fit:true,width:185"></div>
		</div>
		<!-- 首页放置 -->
		<div data-options="region:'center'" >
			<div id="tabs" class="easyui-tabs" border="false" fit="true" style="height: 26px;">
					<div id="home" style="overflow: hidden;" title="首页">
						<%--<c:if test="${empty  user.ROLE_SRC }">暂未设置首页</c:if>
						<c:if test="${!empty  user.ROLE_SRC }">
						     <iframe src="<%=contextPath%>/${ user.ROLE_SRC}"  style="width:100%;height:100%;" frameborder="no" border="0" marginwidth="0" marginheight="0" ></iframe>
						</c:if>
						<div style="widht:100%;height: 100%;background-image: url('<%=basePath%>/static/ck_images/timg.jpg');">
						
						</div>--%>
					</div>
			</div>
		</div>
		<div data-options="region:'south',border:false" style="height: 25px; padding-top: 5px;background: #D2E0F2;" >
			<div class="footer" id="bottom_"></div>
		</div>
		<!-- 测试视频聊天开始 -->
					<%--<div id="IMparent_bg">
					</div>
					<div id="IMpanent">
					        <div id="container_" style="width:600px;height:500px;border-right:2px solid #808080;float:left;">
					           <!-- 隐藏数据开始 -->
					            <input type="hidden" class="accesscToken">
					            <input type="hidden" class="roomID">
					            <input type="hidden" class="serviceURL">
					           <!-- 隐藏数据结束 --> 
								<div id="videos"  >
							     	<!-- <video id="localVideo" muted autoplay  width="600" height="500" controls='controls'></video> -->
							     	<video id="localVideo" muted autoplay  width="600" height="500"  flog="1"></video>
							     	<!-- <audio id="localAudio" muted autoplay></audio> -->
							     	<div class="locaName">自己</div>
							     	<div class="addUser" onclick="addUsers();">添加成员</div>
								</div>
								<div class="remo_">
								     <div id='remoteVideo'></div>
			                         <div id='remoteAudio'></div>
								</div>
							</div>
							<div id="msgss" style="float:left;width:298px;height:500px;background-color:#d0d0d0;">
							     <!-- 显示设备区开始 -->
							     <div class="sb_lis">
									     <div class="seb"><label for='videoCodingSelect'>视频格式: </label><select id="videoCodingSelect"></select></div>
									     <div class="seb" style="display:none;"><label for='initAudioSource'>麦克风设备: </label><select id="initAudioSource"></select></div>
									     <div class="seb" style="display:none;"><label for='initVideoSource'>摄像头设备: </label><select id="initVideoSource" onchange="getResolutionAndFrameRate(this.value)"></select></div>
									     <div class="seb"><label for='resolutionSelect'>分辨率: </label><select id="resolutionSelect"></select></div>
									     <div class="seb"><label for='frameRateSelect'>帧率: </label><select id="frameRateSelect"><option value=1>1</option><option value=3>3</option><option value=5>5</option><option value=8>8</option><option value=10>10</option><option value=12>12</option><option value=15 selected>15</option><option value=18>18</option><option value=20>20</option><option value=25>25</option><option value=30>30</option></select>
									     </div>
								   </div> 
								  <!-- 显示设备区结束 -->
								   <!-- 聊天消息区开始 -->
								   <div id="messagess_">
								           <!-- 消息展示区开始 -->
								           <div id="centent_im">
								                   
								           </div>
								           <!-- 消息展示区结束 -->
								           <!-- 消息发送区开始 -->
								           <div id="send_im">
								                 <input name="centent_" class="message_im" placeholder="输入消息后点击发送"/><span class="message_send" onclick="messageSend();">发送</span>
								           </div>
								           <!-- 消息发送区开始 -->
								   </div>
								   <!-- 聊天消息区结束 -->
							</div>
					 </div> --%>
			       <!-- 测试视频聊天结束 -->
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

           <div id="dlg" class="easyui-dialog" title="修改密码" style="padding: 10px 20px; width: 430px;" data-options="buttons: '#dlg-buttons',closed:'true',modal:true">
				<form id="fm" method="post" novalidate>
					<table border="0" cellpadding="2" cellspacing="1" class="search">
						<tr>
							<td>
								用户名:
							</td>
							<td >
								${user.ADMIN_NAME }
							</td>
						</tr>
						<tr>
							<td >
								原始密码:
							</td>
							<td >
								<input id="oldPassword" name='oldPwd' type="password"  value="" class="easyui-validatebox" data-options="required:true"/>
								<span style="color: red">*</span>
							</td>
						</tr>
						<tr>
							<td >
								新密码:
							</td>
							<td >
								<input id="newPassword" name='newPwd' type="password"  value="" class="easyui-validatebox" data-options="required:true"/>
								<span style="color: red">*</span>
							</td>
						</tr>
						<tr>
							<td >
								确认密码:
							</td>
							<td >
								<input id="comfirmPassword" name='pwdConfrim' type="password"  value="" class="easyui-validatebox" data-options="required:true"/>
								<span style="color: red">*</span>
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div id="dlg-buttons">
				<a href="javascript:void(0)" class="easyui-linkbutton"	iconCls="icon-ok"  id="dlg-save">保存</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"	iconCls="icon-cancel"	onclick="javascript:$('#dlg').window('close')">取消</a>
			</div>
		    <div id="pla" style="display:none">
		           <canvas id="canvas" width="600" height="436"></canvas>
		    </div>
	</body>
  <!-- 自定义1对1视频聊天JS -->
  <%-- <script type="text/javascript" src="<%=basePath%>/static/js/home/myIM3.js"></script> --%>
  <%--<script type="text/javascript" src="<%=basePath%>/static/js/home/santiIM.js"></script>--%>
  <!-- 叁体视频会议默认关闭 --> 
  <%--  <script type="text/javascript" src="<%=basePath%>/static/santiIM/im.js?20170330365622"></script>
   <script type="text/javascript" src="<%=basePath%>/static/js/home/homeIM.js"></script>  --%>
</html>

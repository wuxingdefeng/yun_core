<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/sysadmin.css" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/my/system/sysadmin.js"></script>
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='ADMIN_ID']").val();
		        var url='<%=contextPath %>/sys/sysadmin/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/sysadmin/insert';
		        }
				$('#form').form('submit',{
						url:url,
						onSubmit:function(param){
							var result=$(this).form('validate');
							if(!result){
								parent.$.messager.show({
								title:'提示消息',
								msg:'请填写完整的信息',
								timeout:2000,
								showType:'slide'
								});
							}
							return result;
						},
						success:function(data){
							var result=eval('('+data+')');
							if(result.success==true){
								parent.$.messager.show({
								title:'提示消息',
								msg:result.errorMsg,
								timeout:2000,
								showType:'slide'
								});
								$dialog.dialog('destroy');
								$grid.datagrid('load',{});
							}else{
								parent.$.messager.show({
								title:'提示消息',
								msg:result.errorMsg,
								timeout:2000,
								showType:'slide'
								});
							}
						}
					});
				};
	</script>
  </head>
  <body>
  <form method="post" class="form" id="form">
        <c:if test="${sysadmin.ADMIN_ID!=null and sysadmin.ADMIN_ID!=''}">
              <input type="hidden" name="ADMIN_ID"  value="${sysadmin.ADMIN_ID}">
        </c:if>
        <input type="hidden" name="token" value="${token }">
		<fieldset>
			<table class="table" style="width: 97%;">
			       <tr ><th>头像:</th>
						<td>
						
						    <c:choose>
						          <c:when test="${sysadmin.ADMIN_HEAND==null || sysadmin.ADMIN_HEAND==''}">
						               <img src="<%=basePath%>/static/sys_images/adminHend.jpg" style="width:50px;height:50px;margin-right:13px;" id="adminHeand">
						          </c:when>
						          <c:otherwise>
						               <img src="${sysadmin.ADMIN_HEAND }" style="width:50px;height:50px;margin-right:13px;" id="adminHeand">
						          </c:otherwise>
						    </c:choose>
						     
						     <input type="file" name="file1" lay-title="上传头像" lay-type="file"  lay-ext="jpg|png|gif" class="layui-upload-file">
						     <input type="hidden" name="ADMIN_HEAND" value='${sysadmin.ADMIN_HEAND}' class="easyui-validatebox" data-options="required:true" >
						 </td>
					</tr>
					<tr ><th>名称:</th>
						<td><input type="text" name="ADMIN_NAME" value='${sysadmin.ADMIN_NAME}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
				    <tr ><th>角色:</th>
						<td>
						      <input id="roleID" class="easyui-combobox"  name="roleID" value='${sysadmin.ROLE_ID}'   data-options="editable:false,required:true,panelHeight:'auto',valueField:'ROLE_ID',textField:'ROLE_NAME',url:'../public/getRoles'" />  
						</td>
					</tr>
					<c:if test="${sysadmin.ADMIN_ID==null || sysadmin.ADMIN_ID==''}">
							<tr ><th>密码:</th>
								<td><input type="text"   name="ADMIN_PWD" value='123456' class="easyui-validatebox" data-options="required:true" ></td>
							</tr>
					</c:if>
					<tr ><th>性别:</th>
						<td>
						<select class="easyui-combobox" name="ADMIN_SEX"   style="width:120px;" data-options="required:true,panelHeight:'auto'" >
						
							<option value="0"  <c:if test="${sysadmin.ADMIN_SEX==0 }"> selected</c:if>>未知</option>
							<option value="1" <c:if test="${sysadmin.ADMIN_SEX==1 }"> selected</c:if>>男</option>
							<option value="2" <c:if test="${sysadmin.ADMIN_SEX==2 }"> selected</c:if>>女</option>
						</select>
						
						<!--  <input type="text" name="ADMIN_SEX" value='${sysadmin.ADMIN_SEX}' class="easyui-validatebox" data-options="required:true" > -->   
						</td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
  <script>
		layui.use('upload', function(){
			  layui.upload({
			    url: '<%=basePath%>sys/upload?destPath=userHeand',
			    success: function(src){
			       $("#adminHeand").attr("src",src.filePaths);
			       $("input[name='ADMIN_HEAND']").val(src.filePaths);
			    }
		 });
});
</script>
</html>

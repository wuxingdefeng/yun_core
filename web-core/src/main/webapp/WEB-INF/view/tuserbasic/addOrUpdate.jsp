<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/tuserbasic.css" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/my/system/tuserbasic.js"></script>
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='user_id']").val();
		        var url='<%=contextPath %>/sys/tuserbasic/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/tuserbasic/insert';
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
        <c:if test="${tuserbasic.user_id!=null and tuserbasic.user_id!=''}">
              <input type="hidden" name="user_id"  value="${tuserbasic.user_id}">
        </c:if>
          <input type="hidden" name="token" value="${token }">
		<fieldset>
			<table class="table" style="width: 97%;">
			       
					<tr ><th>用户名:</th>
						<td><input type="text" name="user_name" value='${tuserbasic.user_name}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>性别:</th>
						<td>
						<select class="easyui-combobox" name="user_sex"   style="width:120px;" data-options="required:true,panelHeight:'auto'" >
							<option value="1" <c:if test="${tuserbasic.user_sex==1 }"> selected</c:if>>男</option>
							<option value="2" <c:if test="${tuserbasic.user_sex==2 }"> selected</c:if>>女</option>
						</select>
						</td>
					</tr>
					<tr ><th>出生日期:</th>
						<td>
						<input class="easyui-datebox" type="text" value='${tuserbasic.user_birthday_Str}'  name="user_birthday_Str" data-options="required:true"/>  
						</td>
					</tr>
					<%--<tr ><th>年龄:</th>
						<td><input type="text" name="user_age" value='${tuserbasic.user_age}' class="easyui-numberbox" data-options="required:true" ></td>
					</tr>--%>
					<tr ><th>婚否:</th>
						<td>
						<select class="easyui-combobox" name="user_marrige"   style="width:120px;" data-options="required:true,panelHeight:'auto'" >
							<option value="1" <c:if test="${tuserbasic.user_marrige==1 }"> selected</c:if>>已婚</option>
							<option value="2" <c:if test="${tuserbasic.user_marrige==2 }"> selected</c:if>>未婚</option>
						</select>
						</td>
					</tr>
					<tr ><th>职业:</th>
						<td><input type="text" name="user_job" value='${tuserbasic.user_job}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>手机号码:</th>
						<td><input type="text" name="user_phone" value='${tuserbasic.user_phone}' class="easyui-numberbox" data-options="required:true" ></td>
					</tr>
					<tr ><th>长期居住地址:</th>
						<td><input type="text" name="user_long_address" value='${tuserbasic.user_long_address}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>通讯地址:</th>
						<td><input type="text" name="user_communication_address" value='${tuserbasic.user_communication_address}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

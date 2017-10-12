<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/electronicrecordbasic.css" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/my/system/electronicrecordbasic.js"></script>
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='record_id']").val();
		        var url='<%=contextPath %>/sys/electronicrecordbasic/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/electronicrecordbasic/insert';
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
        <c:if test="${electronicrecordbasic.record_id!=null and electronicrecordbasic.record_id!=''}">
              <input type="hidden" name="record_id"  value="${electronicrecordbasic.record_id}">
        </c:if>
          <input type="hidden" name="token" value="${token }">
		<fieldset>
			<table class="table" style="width: 97%;">
			       
					<tr ><th>user_name:</th>
						<td><input type="text" name="user_name" value='${electronicrecordbasic.user_name}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_sex:</th>
						<td><input type="text" name="user_sex" value='${electronicrecordbasic.user_sex}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_age:</th>
						<td><input type="text" name="user_age" value='${electronicrecordbasic.user_age}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_birthday:</th>
						<td><input type="text" name="user_birthday" value='${electronicrecordbasic.user_birthday}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_rmarrige:</th>
						<td><input type="text" name="user_rmarrige" value='${electronicrecordbasic.user_rmarrige}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_job:</th>
						<td><input type="text" name="user_job" value='${electronicrecordbasic.user_job}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_phone:</th>
						<td><input type="text" name="user_phone" value='${electronicrecordbasic.user_phone}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_long_address:</th>
						<td><input type="text" name="user_long_address" value='${electronicrecordbasic.user_long_address}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>user_postal_address:</th>
						<td><input type="text" name="user_postal_address" value='${electronicrecordbasic.user_postal_address}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>uncomfortable_place:</th>
						<td><input type="text" name="uncomfortable_place" value='${electronicrecordbasic.uncomfortable_place}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>write_date:</th>
						<td><input type="text" name="write_date" value='${electronicrecordbasic.write_date}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>create_date:</th>
						<td><input type="text" name="create_date" value='${electronicrecordbasic.create_date}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>create_by:</th>
						<td><input type="text" name="create_by" value='${electronicrecordbasic.create_by}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>del_date:</th>
						<td><input type="text" name="del_date" value='${electronicrecordbasic.del_date}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>is_del:</th>
						<td><input type="text" name="is_del" value='${electronicrecordbasic.is_del}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>del_by:</th>
						<td><input type="text" name="del_by" value='${electronicrecordbasic.del_by}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>record_num:</th>
						<td><input type="text" name="record_num" value='${electronicrecordbasic.record_num}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>remarks:</th>
						<td><input type="text" name="remarks" value='${electronicrecordbasic.remarks}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

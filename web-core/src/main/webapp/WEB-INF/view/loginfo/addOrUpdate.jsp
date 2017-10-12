<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/loginfo.css" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/my/system/loginfo.js"></script>
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='id']").val();
		        var url='<%=contextPath %>/sys/loginfo/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/loginfo/insert';
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
        <c:if test="${loginfo.id!=null and loginfo.id!=''}">
              <input type="hidden" name="id"  value="${loginfo.id}">
        </c:if>
          <input type="hidden" name="token" value="${token }">
		<fieldset>
			<table class="table" style="width: 97%;">
			       
					<tr ><th>ID:</th>
						<td><input type="text" name="ID" value='${loginfo.ID}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>CLIENT_IP:</th>
						<td><input type="text" name="CLIENT_IP" value='${loginfo.CLIENT_IP}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>METHOD_DESC:</th>
						<td><input type="text" name="METHOD_DESC" value='${loginfo.METHOD_DESC}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>CLASS_METHOD:</th>
						<td><input type="text" name="CLASS_METHOD" value='${loginfo.CLASS_METHOD}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>PARAMS:</th>
						<td><input type="text" name="PARAMS" value='${loginfo.PARAMS}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>ADMIN_NAME:</th>
						<td><input type="text" name="ADMIN_NAME" value='${loginfo.ADMIN_NAME}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>ADMIN_ID:</th>
						<td><input type="text" name="ADMIN_ID" value='${loginfo.ADMIN_ID}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

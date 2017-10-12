<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/sysrole.css" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/my/system/sysrole.js"></script>
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='ROLE_ID']").val();
		        var url='<%=contextPath %>/sys/sysrole/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/sysrole/insert';
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
        <c:if test="${sysrole.ROLE_ID!=null and sysrole.ROLE_ID!=''}">
              <input type="hidden" name="ROLE_ID"  value="${sysrole.ROLE_ID}">
        </c:if>
          <input type="hidden" name="token" value="${token }">
		<fieldset>
			<table class="table" style="width: 97%;">
					<tr ><th>角色名称:</th>
						<td><input type="text" name="ROLE_NAME" value='${sysrole.ROLE_NAME}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>首页路径:</th>
						<td><input type="text" name="ROLE_SRC" value='${sysrole.ROLE_SRC}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>角色描述:</th>
						<td><input type="text" name="ROLE_DESCR" value='${sysrole.ROLE_DESCR}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

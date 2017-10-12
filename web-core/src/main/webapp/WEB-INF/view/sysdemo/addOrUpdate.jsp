<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/sysdemo.css" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/my/system/sysdemo.js"></script>
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='demo_id']").val();
		        var url='<%=contextPath %>/sys/sysdemo/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/sysdemo/insert';
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
        <c:if test="${sysdemo.demo_id!=null and sysdemo.demo_id!=''}">
              <input type="hidden" name="demo_id"  value="${sysdemo.demo_id}">
        </c:if>
        <input type="hidden" name="token" value="${token }">
		<fieldset>
			<table class="table" style="width: 97%;">
			       
					<tr ><th>demo_name:</th>
						<td><input type="text" name="demo_name" value='${sysdemo.demo_name}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>demo_title:</th>
						<td><input type="text" name="demo_title" value='${sysdemo.demo_title}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					
					<tr ><th>money:</th>
						<td><input type="text" name="money" value='${sysdemo.money}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

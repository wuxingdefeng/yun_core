<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/electronicrecordbasicdetail.css" type="text/css">
	<script type="text/javascript" src="<%=basePath%>/static/my/system/electronicrecordbasicdetail.js"></script>
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='detail_id']").val();
		        var url='<%=contextPath %>/sys/electronicrecordbasicdetail/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/electronicrecordbasicdetail/insert';
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
        <c:if test="${electronicrecordbasicdetail.detail_id!=null and electronicrecordbasicdetail.detail_id!=''}">
              <input type="hidden" name="detail_id"  value="${electronicrecordbasicdetail.detail_id}">
        </c:if>
          <input type="hidden" name="token" value="${token }">
		<fieldset>
			<table class="table" style="width: 97%;">
			       
					<tr ><th>record_id:</th>
						<td><input type="text" name="record_id" value='${electronicrecordbasicdetail.record_id}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>jsondata:</th>
						<td><input type="text" name="jsondata" value='${electronicrecordbasicdetail.jsondata}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>htmldata:</th>
						<td><input type="text" name="htmldata" value='${electronicrecordbasicdetail.htmldata}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>create_date:</th>
						<td><input type="text" name="create_date" value='${electronicrecordbasicdetail.create_date}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>create_by:</th>
						<td><input type="text" name="create_by" value='${electronicrecordbasicdetail.create_by}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>del_date:</th>
						<td><input type="text" name="del_date" value='${electronicrecordbasicdetail.del_date}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>is_del:</th>
						<td><input type="text" name="is_del" value='${electronicrecordbasicdetail.is_del}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>del_by:</th>
						<td><input type="text" name="del_by" value='${electronicrecordbasicdetail.del_by}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>remarks:</th>
						<td><input type="text" name="remarks" value='${electronicrecordbasicdetail.remarks}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

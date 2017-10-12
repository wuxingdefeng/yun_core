<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<script type="text/javascript">
		   var submitForm = function($dialog, $grid, $pjq) {
		        var ID=$("input[name='MENU_ID']").val();
		        var url='<%=contextPath %>/sys/menu/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/menu/insert';
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
        <c:if test="${sysMenu.MENU_ID!=null and sysMenu.MENU_ID!=''}">
              <input type="hidden" name="MENU_ID"  value="${sysMenu.MENU_ID}">
        </c:if>
        <input type="hidden" name="PARENT_MENUID" value="${parentID}">
		<fieldset>
			<table class="table" style="width: 97%;">
			        <tr ><th>菜单序号:</th>
		                   <td><input type="text" name="MENU_NO" value='${sysMenu.MENU_NO}' class="easyui-validatebox" data-options="required:true" ></td>
				    </tr>
			        <tr ><th>菜单名称:</th>
		                   <td><input type="text" name="MENU_NAME" value='${sysMenu.MENU_NAME}' class="easyui-validatebox" data-options="required:true" ></td>
				    </tr>
				    <tr ><th>菜单路径:</th>
		                   <td><input type="text" name="MENU_URL" value='${sysMenu.MENU_URL}' class="easyui-validatebox" data-options="required:true" ></td>
				    </tr>
				    <tr ><th>菜单图标(功能按钮需要):</th>
		                   <td><input type="text" name="MENU_PNG" value='${sysMenu.MENU_PNG}' class="easyui-validatebox" data-options="required:true" ></td>
				    </tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

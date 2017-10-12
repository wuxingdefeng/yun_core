<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=contextPath%>/static/kindeditor/themes/default/default.css" />
	<link rel="stylesheet" href="<%=contextPath%>/static/kindeditor/plugins/code/prettify.css" />
	<script charset="utf-8" src="<%=contextPath%>/static/kindeditor/kindeditor.js"></script>
	<script charset="utf-8" src="<%=contextPath%>/static/kindeditor/kindeditor-all.js"></script>
	<script charset="utf-8" src="<%=contextPath%>/static/kindeditor/lang/zh_CN.js"></script>
	<script charset="utf-8" src="<%=contextPath%>/static/kindeditor/plugins/code/prettify.js"></script>
	<script>
		KindEditor.ready(function(K) {
			var editor1 = K.create('textarea[name="content1"]', {
				cssPath : '<%=contextPath%>/static/kindeditor/plugins/code/prettify.css',
				uploadJson : '/yun_core/fileUpload',
				fileManagerJson : '/yun_core/fileManager',
				allowFileManager : true,
				afterCreate : function() {
					var self = this;
					K.ctrl(document, 13, function() {
						self.sync();
						document.forms['example'].submit();
					});
					K.ctrl(self.edit.doc, 13, function() {
						self.sync();
						document.forms['example'].submit();
					});
				}
			});
			prettyPrint();
		});
	</script>
  </head>
  <body>
  <form method="post" class="form" id="form">
		<fieldset>
			<table class="table" style="width: 97%;">
			        <tr ><th>测试1:</th>
		                   <td><input type="text" name="MENU_NO" value='' class="easyui-validatebox" data-options="required:true" ></td>
				    </tr>
			        <tr >
			               <th>富文本:</th>
		                   <td>
		                        <textarea name="content1" cols="100" rows="8" style="width:700px;height:450px;visibility:hidden;"></textarea>
		                   </td>
				    </tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

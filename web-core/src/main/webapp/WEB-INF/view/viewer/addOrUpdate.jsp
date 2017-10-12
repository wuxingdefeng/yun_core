<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=contextPath%>/static/viewer/css/viewer.min.css">
	<script src="<%=contextPath%>/static/viewer/js/jquery.min.js"></script>
     <script src="<%=contextPath%>/static/viewer/js/viewer-jquery.min.js"></script>
	<script>
	    $(function() {
				$('body').viewer({
					url: 'data-original',
				});
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
			        <tr>
			                <th>图片查看</th>
			                <td><img style="width:120px;" data-original="<%=contextPath%>/static/viewer/img/tibet-1.jpg" src="<%=contextPath%>/static/viewer/img/thumbnails/tibet-1.jpg" alt="图片1"></td>
			        </tr>
			         <tr>
			                <th>图片查看2</th>
			                <td><img style="width:120px;" data-original="<%=contextPath%>/static/viewer/img/tibet-2.jpg" src="<%=contextPath%>/static/viewer/img/thumbnails/tibet-2.jpg" alt="图片2"></td>
			        </tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

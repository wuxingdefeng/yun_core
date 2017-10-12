<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
     <script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/blUeditor/ueditor.config.js?id=adsf"></script>
     <script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/blUeditor/editor_api.js"></script>
     <link href="<%=contextPath%>/static/blUeditor/EMR/css/icon.css" rel="stylesheet" />
     <link href="<%=contextPath%>/static/blUeditor/EMR/css/design.css" rel="stylesheet" />
	<script>
	
	</script>
  </head>
  <body>
  
  <form method="post" class="form" id="form" action="ueditorPost">
		<fieldset>
			<table class="table" style="width: 97%;">
			        <tr ><th>模板名称:</th>
		                   <td><input type="text" tl-model="{"ID":"jobName","TYPE":"select"}" name="name" value='' class="easyui-validatebox" data-options="required:true" ></td>
				    </tr>
			        <tr >
			               <th>富文本:</th>
		                   <td>
		                        <textarea  id="myEditor"  name="editor" style="width:680px;height:390px;">${html }</textarea>
		                        <script src="<%=contextPath%>/static/blUeditor/EMR/EMR.toolbar.js"></script>
							    <script src="<%=contextPath%>/static/blUeditor/EMR/EMR.PageInit.js"></script>
							    
							    <script type="text/javascript">
							        EMR.Init({
							            id: 'myEditor',
							            title: '电子病历编辑器',
							            isdesign:true,
							            editor: {
							                toolbars: [['fullscreen',
										     'source',
										     'comery',//病例模板
										     'undo', 
										     'redo',
										     'bold',
										     'simpleupload', 
										     'justifyleft',
								             'justifyright',
								             'justifycenter',
								             'justifyjustify',
								             'horizontal',
								             'insertrow', 'insertcol','mergeright', 'mergedown','deleterow','deletecol','splittorows','splittocols','splittocells','deletecaption','inserttitle','inserttable'
								              ]],
							                wordCount: false,//关闭字数统计
							                allowDivTransToP: false,
							                elementPathEnabled: false,//关闭elementPath
							                autoClearinitialContent: false,
							                autoFloatEnabled: false
							            }
							        });
							        
							    </script>
		                   </td>
				    </tr>
				     <tr >
			               <th>操作:</th>
		                   <td><button type="submit" style="width:90px;height:30px;display:inline-block;text-align:center;">提交</button></td>
				    </tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=basePath%>/static/my/system/testtemplate.css" type="text/css">
	<script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/blUeditor/ueditor.config.js?id=adsf"></script>
    <script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/blUeditor/editor_api.js"></script>
    <link href="<%=contextPath%>/static/blUeditor/EMR/css/icon.css" rel="stylesheet" />
    <link href="<%=contextPath%>/static/blUeditor/EMR/css/design.css" rel="stylesheet" />
	<script type="text/javascript" src="<%=basePath%>/static/my/system/testtemplate.js"></script>
	<script type="text/javascript">
		 function saveOrUpdate(){
		        var ID=$("input[name='template_id']").val();
		        var url='<%=contextPath %>/sys/testtemplate/update';
		        if(typeof("undefined")==ID||ID==null){
		           url='<%=contextPath %>/sys/testtemplate/insert';
		        }
				$('#form').form('submit',{
						url:url,
						onSubmit:function(param){
							var result=$(this).form('validate');
							
							$("#tem").html(UE.getEditor("myEditor").getContent());
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
				function cancelPage(str){
				   closeTab("病例模板["+str+"]");
				}
	</script>
  </head>
  <body>
  <div id="tb" style="padding:5px;height:auto">
		<div style="margin-bottom:5px" class="z-toolbar">
			<a id="btnSave"href="javascript:void(0)" class="easyui-linkbutton"data-options="iconCls:'icon-add',plain:'true'" onclick="saveOrUpdate()">确定</a>
			<c:choose>
			     <c:when test="${testtemplate.template_id!=null and testtemplate.template_id!=''}"><c:set var="flogstr"  value="编辑"/></c:when>
			     <c:otherwise><c:set var="flogstr"  value="新增"/></c:otherwise>
			</c:choose>
			<a href="#" class="easyui-linkbutton" iconCls="icon-edit"id="btn_edit" plain="true" onclick="cancelPage('<c:out value="${flogstr}"/>')">取消</a> 
		</div>
	</div>
  <form method="post" class="form" id="form">
        <c:if test="${testtemplate.template_id!=null and testtemplate.template_id!=''}">
              <input type="hidden" name="template_id"  value="${testtemplate.template_id}">
        </c:if>
        <input type="hidden" name="token" value="${token }">
        <textarea style="display:none;" id="tem" name="tem" >${testtemplate.template}</textarea>
		<fieldset>
			<table class="table" style="width: 97%;">
			       
					<tr ><th>病例名称:</th>
						<td><input type="text" name="template_name" value='${testtemplate.template_name}' class="easyui-validatebox" data-options="required:true" ></td>
					</tr>
					<tr ><th>病例模板:</th>
						<td><textarea  id="myEditor"  name="myEditor" style="width:680px;height:390px;" >${testtemplate.template}</textarea>
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
								             'insertrow', 'insertcol','mergeright', 'mergedown','deleterow','deletecol','splittorows','splittocols','splittocells','deletecaption','inserttitle','inserttable',
								             'preview',//预览
								             'imagecenter', //居中
								             'autotypeset', //自动排版
								             'edittable', //表格属性
								              'edittd', //单元格属性
								              ]],
							                wordCount: false,//关闭字数统计
							                allowDivTransToP: false,
							                elementPathEnabled: false,//关闭elementPath
							                autoClearinitialContent: false,
							                autoFloatEnabled: false
							            }
							        });
							        
							    </script></td>
					</tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

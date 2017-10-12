<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/ueditor/ueditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/ueditor/ueditor.all.min.js"> </script>
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/ueditor/lang/zh-cn/zh-cn.js"></script>
    
    <script type="text/javascript" charset="utf-8" src="<%=contextPath%>/static/addCustomizeButton.js"></script>
	<script>
	var domUtils = UE.dom.domUtils;
	 var ue = UE.getEditor('editor',{
	 autoFloatEnabled: false,
	 wordCount: false,//关闭字数统计
	 toolbars: [
		    ['fullscreen',
		     'source',
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
              ]]
	 });
    ue.addListener("keydown",function(type,event){
             if(event.keyCode==8){
                 
             }
    });
	 ue.addListener("mouseover",function(type,evt){
	           evt = evt || window.event;
               var el = evt.target || evt.srcElement;
                if (el.tagName == 'BODY' || el.tagName == 'HTML') {
                    return;
                }
                //alert(el);
    });
	</script>
  </head>
  <body>
  <form method="post" class="form" id="form" action="ueditorPost">
		<fieldset>
			<table class="table" style="width: 97%;">
			        <tr ><th>测试1:</th>
		                   <td><input type="text" name="name" value='' class="easyui-validatebox" data-options="required:true" ></td>
				    </tr>
			        <tr >
			               <th>富文本:</th>
		                   <td>
		                        <textarea name="editor"  id="editor" cols="100" rows="8" style="width:700px;height:450px;"></textarea>
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

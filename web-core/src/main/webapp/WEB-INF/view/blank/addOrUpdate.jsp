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
				$("#blankNo").keydown(function(){
				     var no=$(this).val();
				     if(no!=null&&typeof(no)!="undefined"&&no.trim()!=""){
				         if(no.length>=6){
				              var blankName=$("#blankName").html();
				              if(blankName==null||blankName.trim()==""){
				                 $.getJSON("<%=contextPath%>/static/json/blank.json",function(result){
									    $.each(result, function(i, item){
									        if(no==item.bin){
									           $("#blankName").html(item.bankName);
									        }
									    }); 
							      });
				              }
				         }else{
				               $("#blankName").html("");
				         }
				     }
				});
		});
	</script>
  </head>
  <body>
  <form method="post" class="form" id="form">
		<fieldset>
			<table class="table" style="width: 97%;">
			        <tr>
			                <th>银行卡号</th>
			                <td><input id="blankNo" style="width:285px;height:34px;line-height:34px;border:1px solid #e0e0e0;border-radius:3px;">
			                         <font style="color:red;display:inline-block;font-size:15px;margin-left:10px;" id="blankName"></font>
			                 </td>
			        </tr>
			</table>
		</fieldset>
	</form>
  </body>
</html>

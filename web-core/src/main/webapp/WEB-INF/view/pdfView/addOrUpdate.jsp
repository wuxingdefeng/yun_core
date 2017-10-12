<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	 <script src="<%=contextPath%>/static/pdf.min.js"></script>
<script>
  window.onload = function (){
    var myPDF = new PDFObject({ url: "http://demo.lanrenzhijia.com/2014/pdf1023/sample.pdf" }).embed();
  };
</script>
  </head>
  <body>
  </body>
</html>

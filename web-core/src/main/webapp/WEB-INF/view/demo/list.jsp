<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../../common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>demo列表</title>
	<link rel="stylesheet" href="<%=basePath%>static/my/common.css" type="text/css">
	 <script type="text/javascript" src="<%=basePath%>/static/my/util.js"></script>
  </head>
  <body>
      <!-- 可操作菜单区域 -->
      <div class="menus">
             <div class="menus_as">
	             <a href="javascript:void(0);" class="menus_a menus_reach_btn" onclick="reach(this);">刷新</a>
	             <a href="javascript:void(0);" class="menus_a menus_add_btn">新增</a>
	             <a href="javascript:void(0);" class="menus_a menus_upd_btn">编辑</a>
	             <a href="javascript:void(0);" class="menus_a menus_del_btn">删除</a>
	             <a href="javascript:void(0);" class="menus_a menus_deail_btn">详情</a>
             </div>
             <div class="seachs">
                  <div class="whe"><input type="text"  name="seach1" placeholder="搜索"></div>
                  <div class="whe"><select name="seach2">
                                                           <option value="">-- 请选择 --</option>
                                                           <option value="1">示例1</option>
                                                           <option value="2">示例2</option>
                                                    </select>
                  </div>
                  <div class="whe">
                          <a class="whe_a_btn">搜索</a>
                          <a class="whe_a_btn">清除</a>
                          <a class="whe_a_btn">导出excel</a>
                  </div>
             </div>
      </div>
      <div class="tables_main" >
               <table class="tables_"  cellspacing="1" cellpadding="5" >
                    <tbody>
                          <tr class="titles_tbl">
                          
                              <td><div style="width:105px">名称</div></td>
	                          <td><div style="width:105px">价格</div></td>
	                          <td><div style="width:105px">日期</div></td>
	                          <td><div style="width:105px">数量</div></td>
	                       
                        </tr>
                    </tbody>
                      <tr>
                              <td>名称1</td>
	                          <td>价格1</td>
	                          <td>日期1</td>
	                          <td>数量1</td>
                      </tr>
                   <tr>
                              <td>名称2</td>
	                          <td>价格2</td>
	                          <td>日期2</td>
	                          <td>数量2</td>
                      </tr>
               </table>
      </div>
      <div class="pages_div" id="pages_div"></div>
  </body>
  <script type="text/javascript" src="<%=basePath%>/static/my/common.js"></script>
</html>

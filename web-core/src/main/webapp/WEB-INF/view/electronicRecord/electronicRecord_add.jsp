<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta HTTP-EQUIV="pragma" CONTENT="no-cache">
	<meta HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate">
	<meta HTTP-EQUIV="expires" CONTENT="0">
	<link rel="stylesheet" href="<%=contextPath %>/static/layui-master/src/css/layui.css">
	<!-- 自定义工具css -->
	<link rel="stylesheet" href="<%=contextPath %>/static/my/eletronicRecord/common.css">
	  <!-- 图片编辑js（标注图标） -->
<script src="<%=contextPath %>/static/my/eletronicRecord/photo_.js"></script>
<!--layui.js  -->
<%--<script type="text/javascript" src="<%=contextPath %>/static/layer/layui.js"></script>--%>
<script type="text/javascript" src="<%=contextPath %>/static/layui-master/src/layui.js"></script>
<!-- 数据录入js -->
<script src="<%=contextPath %>/static/my/eletronicRecord/edit.js"></script>
<!-- 弹出层js -->
<script src="<%=contextPath %>/static/my/eletronicRecord/jquery.rotate.min.js"></script>
<script src="<%=contextPath %>/static/my/eletronicRecord/chuangti.js"></script>
<script src="<%=contextPath %>/static/common/encode64.js"></script>
<script src="<%=contextPath %>/static/my/eletronicRecord/clien_befer.js"></script>
	<style type="text/css">
		.box{width:500px;height:535px;position:relative;border:1px solid #e0e0e0;margin-top:6px;margin-left:30px;overflow:hidden;}
		.content_{width:449px;height:425px;position:absolute;top:0px;left:0px;border-right:1px solid #e0e0e0;border-bottom:1px solid #e0e0e0;
	}

		.right_menu{height:100%;width:50px;position:absolute;right:0px;bottom:0px;background:#fff;}

		.bottom_menu{width:100%;height:50px;position:absolute;left:0px;bottom:60px;background:#fff;}

		.img_g{width:35px;margin-left: 8px;margin-top: 3px;cursor:pointer;}

		.move_img{position: absolute;top: 0px;left: 0px;background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;}
	.btn_l{
	width: 45px;
	height: 25px;
	line-height: 25px;
    margin-top: 5px;
    text-align: center;
    background-color: #e0e0e0;
    font-size: 12px;
    cursor: pointer;
    float: left;
    margin-left: 9px;}
	     
		 .selected{background:#808080;}

		 .flog_text{font-family:微软雅黑;}
	.back_com{
		width:100%;
		height:100%;
	}
	.back_1{
		background-image: url(<%=contextPath %>/static/ck_images/az.jpg);
		background-size: 325px;background-position:73px -13px;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_2{
		background-image: url(<%=contextPath %>/static/ck_images/ac.jpg);
		background-size: 325px;background-position:73px -13px;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_3{
		background-image: url(<%=contextPath %>/static/ck_images/ab.jpg);
		background-size: 325px;background-position:73px -13px;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_4{
		background-image: url(<%=contextPath %>/static/ck_images/shetou.png);
		background-size: 449px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_5{
		background-image: url(<%=contextPath %>/static/ck_images/yanjing.png);
		background-size: 413px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_6{
		background-image: url(<%=contextPath %>/static/ck_images/erduo.png);
		background-size: 525px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_7{
		background-image: url(<%=contextPath %>/static/ck_images/erduo.png);
		background-size: 525px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_8{
		background-image: url(<%=contextPath %>/static/ck_images/shexiang.png);
		background-size: 525px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_9{
		background-image: url(<%=contextPath %>/static/ck_images/touzheng.png);
		background-size: 370px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_10{
		background-image: url(<%=contextPath %>/static/ck_images/touzuoce.png);
		background-size: 370px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_11{
		background-image: url(<%=contextPath %>/static/ck_images/touyouce.png);
		background-size: 370px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_12{
		background-image: url(<%=contextPath %>/static/ck_images/toubeimian.png);
		background-size:370px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_13{
		background-image: url(<%=contextPath %>/static/ck_images/fubutu.png);
		background-size:357px;background-position: center;cursor:pointer;
		background-repeat: no-repeat;
	}
	.back_noshow{
		display:none;
	}
	.redBorder{
		border:2px dotted red;
	}
	.jiantou_img_g{width:16px;height:16px;margin-left: 4px;margin-top: 3px;cursor:pointer;}
	.eleType{
		width: 100%;
		height: 25px;
		background-color: #1296db;
		font-size: 11px;
		line-height: 25px;
		text-align: center;
		margin-top: 5px;
	}
	.eleType_show{
		display:inline-block;
	}
	.eleType_show_wen{
		background-color:#d81e06;
	}
	.eleType_show_wang{
		background-color:#f4ea2a;
	}
	.eleType_show_qie{
		background-color:#5da008;
	}

	.eleType_show_title{
		border:1px dotted #d4237a;
		background-color:#8D8D8D;

	}
	.all_eleType_image{
		display: none;
	}
	.eleType_qie,.eleType_wang,.eleType_TMT{
		display: none;
	}
	.submitbtn{
	width: 157px;
    text-align: left;
    padding-left: 12px;
    height: 43px;
    line-height: 43px;
    cursor: pointer;
    border: 1px dashed #ccc;
    border-left: none;
    /* border-bottom: none; */
    border-top: none;
    /* padding-left: 46px; */
    text-align: center;
	}
	.require_style{
		color: red;
	}
	</style>
	<script type="text/javascript">
	$(function(){
		$("body").on("click",function(){
			$("#jiuwujib").remove();
		});
	})
	</script>
  </head>
  <body>

   <!-- 总页面外层Start -->
   <div  class="content">
       
	   <!-- 标题 -->
       <!-- <div class="title">个人资料(录入)</div> --> 
	   <!-- 分割线-->
       <!-- <div class="line"></div> -->
	   <!--表单开始-->
	   <form class="layui-form layui-form-pane1" action="">

	      <!-- 目录检查项目开始 -->
          <div class="catalog">
		       
			   <div data="a" class="catalog_g catalog_g_sel catalog_fast">基本信息</div>

			   <div data="b" class="catalog_g">一般情况</div>

			   <div data="c" class="catalog_g">望，切诊</div>

			   <div data="d" class="catalog_g">眼睛</div>

			   <div data="e" class="catalog_g">耳朵</div>

			   <div data="f" class="catalog_g">口咽,甲状腺,胸部</div>

			   <div data="g" class="catalog_g">腹部</div>

			   <div data="h" class="catalog_g">四肢</div>

			   <div data="i" class="catalog_g">项背腰部</div>

			   <div data="j" class="catalog_g">神经系统</div>

			   <div data="k" class="catalog_g catalog_last" style="border-bottom: 1px dashed #ccc;">神经反射</div>
			   <div data="m" class="submitbtn" id="submitBtnId">
			    <div  class="layui-btn layui-btn-normal"  onclick="getJSON(this);" 
			    style="height:33px;line-height: 33px;">提交</div>
			   </div>
			   
			   <div data="n" class="submitbtn" id="submitBtnId">
			     <div class="layui-btn layui-btn-normal"  onclick="openClient();"  style="height:33px;line-height: 33px;">打开客户端</div>
			   </div>

		  </div>
		   <!-- 目录检查项目结束 -->

		   <div class="context_main">
		     <input value="${token }" type="hidden" name="pageToken">
                <!--基本信息开始-->
                <div class="a">
				     <div class="a_lan"><font>基本信息</font></div>
                     <!-- 第一行 -->
				     <div class="a_1 a_g">
						 <font class="a_title" style="margin-left:12px;">姓名<span class="require_style">*</span>：
						 <input required="true" type="text" class="layui-input name" name="name" id="user_name"/>
						 <input name="user_id" type="hidden">
						 </font>

						 <font class="a_title xm">性别<span class="require_style">*</span>：
						    <input name="sex" lay-skin="primary" value="男" type2="radio" title="男" checked="" type="checkbox"/>
							<input name="sex" lay-skin="primary" value="女" type2="radio" title="女"  type="checkbox"/>
						 </font>

                         <font class="a_title">出生日期<span class="require_style">*</span>：
						    <input name="birthday" required="true" id="date" lay-verify="date" placeholder="yyyy-mm-dd" style="display:inline-block;width:auto;width:117px;" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this,start:'1940-01-01'})" type="text"/>
						 </font>

						 <font class="a_title">年龄<span class="require_style">*</span>：
						    <input name="age" required="true" type="text" class="layui-input age"  style="display:inline-block;width:80px;"/>
						 </font>
					 
					 </div>
                     <!-- 第二行 -->
					 <div class="a_2 a_g">
                          <font class="a_title xm" style="margin-left:12px;">婚姻：
						    <input name="marriage" lay-skin="primary" value="未婚" title="未婚" type2="radio" checked type="checkbox"/>
							<input name="marriage" lay-skin="primary" value="已婚" title="已婚" type2="tadio"  type="checkbox"/>
						  </font>

						  <font class="a_title">职业<span class="require_style">*</span>：<input type="text" required="true" class="layui-input input_s" name="pation"/></font>

						  <font class="a_title" style="width:300px;">联系方式<span class="require_style">*</span>：
						    <input type="text" required="true" class="layui-input input_s" name="phone" style="width:160px;margin-left:0px;"/>
						  </font>

					 </div>
                     <!-- 第三行 -->
					 <div class="a_3 a_g">

                          <font class="a_title" style="margin-left:12px;width:406px;">长期居住地：
						    <input type="text" class="layui-input input_s" name="change_address" style="width:260px;margin-left:0px;"/>
						  </font>

						  <font class="a_title" style="margin-left:12px;width:400px;">通讯地址/所属医生：
						    <input type="text" class="layui-input input_s" name="phone_address" style="width:260px;margin-left:0px;"/>
						  </font>

					 </div>
                     <!-- 第四行 -->
					 <div class="a_4 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:406px;">最不舒服的地方</font>
                          <div style="width:600px;padding:12px;">

						       <input name="bing" type2="radio" lay-skin="primary" value="头痛" title="头痛"  type="checkbox"/>
						       
                               <input name="bing" type2="radio" lay-skin="primary" value="颈肩腰腿疼" title="颈肩腰腿疼"  type="checkbox"/>

							   <input name="bing" type2="radio" lay-skin="primary" value="三叉神经痛" title="三叉神经痛"  type="checkbox"/>

							   <input name="bing" type2="radio" lay-skin="primary" value="目痛"  title="目痛"  type="checkbox"/>

							   <input name="bing" type2="radio" lay-skin="primary" value="耳痛" title="耳痛"  type="checkbox"/>
						  </div>
						  <div style="width:600px;padding-left:12px;">
						       <input name="bing" type2="radio" lay-skin="primary" value="失眠"  title="失眠"  type="checkbox"/>
						       
                               <input name="bing" type2="radio" lay-skin="primary" value="痛经" title="痛经"  type="checkbox"/>

							   <input name="bing" type2="radio" lay-skin="primary" value="近视弱视"  title="近视弱视"  type="checkbox"/>

							   <input name="bing" type2="radio" lay-skin="primary" value="面瘫" title="面瘫"  type="checkbox"/>

							   <input name="bing" type2="radio" lay-skin="primary" value="便秘" title="便秘"  type="checkbox"/>
						  </div>

					 </div>
                     <!-- 第五行 -->
					 <div class="a_5 a_g">

                          <font class="a_title" style="margin-left:12px;width:406px;">满分是9分，您觉得您的症状程度有
						    <input type="text" class="layui-input input_s" name="inter" style="width:50px;margin-left:0px;margin-right:8px;"/>分
						  </font>

					 </div>
				     
					 <!-- 女性补充资料开始 -->
                     <div class="a_6 a_g" style="display:none;">
					      
						  <div class="a_lan"><font>女性补充资料</font></div>

                          <font class="a_title" style="margin-left:25px;width:120px;">孕
						       <input name="yun" type="text" class="layui-input input_s"  style="width:90px;margin-left:0px;"/>
						  </font>

						  <font class="a_title" style="width:120px;">生
						       <input name="sheng" type="text" class="layui-input input_s"  style="width:90px;margin-left:0px;"/>
						  </font>

						  <font class="a_title" style="width:160px;">流产
						       <input name="liuchan" type="text" class="layui-input input_s"  style="width:90px;margin-left:0px;"/>
						  </font>

                          <div style="width:600px;padding:12px;">
								   <font class="xm" style="display:inline-block;margin-right:15px;margin-left:12px;"><font class="nv_a">是否顺产:</font>

									   <input name="shunchan" type2="radio"  lay-skin="primary" value="是" title="是"   type="checkbox"/>
									   <input name="shunchan" type2="radio" lay-skin="primary" value="否" title="否"  checked type="checkbox"/>

								   </font>
								   <font class="xm" style="display:inline-block;margin-right:15px;"><font class="nv_a">是否剖宫产:</font>

									   <input name="paogongchan" type2="radio"  lay-skin="primary" value="是"  title="是"   type="checkbox"/>
									   <input name="paogongchan" type2="radio" lay-skin="primary" value="否" title="否" checked  type="checkbox"/>

								   </font>
						  </div>

						  <div style="width:600px;padding-left:25px;">
                               <font class="xm" style="display:inline-block;margin-right:15px;"><font class="nv_a">是否早产:</font>
								   <input name="zaochan" type2="radio"  lay-skin="primary"  value="是" title="是"   type="checkbox"/>
								   <input name="zaochan" type2="radio" lay-skin="primary"  value="否" title="否" checked  type="checkbox"/>
							   </font>

							   <font class="xm" style="display:inline-block;margin-right:15px;"><font class="nv_a">是否难产:</font>
								   <input name="nanchan" type2="radio"  lay-skin="primary" value="是" title="是"   type="checkbox"/>
								   <input name="nanchan" type2="radio" lay-skin="primary" value="否" title="否"  checked type="checkbox"/>
							   </font>
						  </div>

						 


					 </div>

					 <div class="a_6 a_g yj" style="display:none;">

					    <font class="a_title" style="margin-left:12px;width:406px;">月经史</font>
                        <div class="xm yjgl" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(1)月经规律性：</font>

                            <input name="yjgl" type2="radio"  lay-skin="primary" value="正常"  title="正常" checked type="checkbox"/>

							<input name="yjgl" type2="radio"  lay-skin="primary" value="前后不定期" title="前后不定期"  type="checkbox"/>

							<input name="yjgl" type2="radio"  lay-skin="primary" value="推后" title="推后"  type="checkbox"/>
							<input type="text" class="layui-input input_s" name="yjgl_h" style="width:50px;margin-left:-15px;margin-right:8px;"/>天
                             
                            <font class="gj"></font>

							<input name="yjgl" type2="radio"  lay-skin="primary" value="提前" title="提前"  type="checkbox"/>
							<input type="text" class="layui-input input_s" name="yjgl_q" style="width:50px;margin-left:-15px;margin-right:8px;"/>天
							
						</div>
						<div class="xm" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(2)月经周期：</font>
                            
							<font>两次月经头天间隔
							   <input type="text" class="layui-input input_s" name="jgt" style="width:50px;margin-left:5px;margin-right:8px;"/>天
							</font>
							<font class="gj" style="margin-left:2px;"></font>
							<font>行径
							   <input type="text" class="layui-input input_s" name="xjt" style="width:50px;margin-left:5px;margin-right:8px;"/>天
							</font>

						</div>

						<div class="xm yjl" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(3)月经量：</font>
                            
							<div style="display:inline-block;">
						       <input name="yjl" type2="radio" lay-skin="primary" value="正常" title="正常 （30~50ml,每天换3～5次卫生巾,行经5-7天）" checked type="checkbox"/>
							</div>

							<div style="margin-left:124px;margin-top:12px;">
						       <input name="yjl" type2="radio" lay-skin="primary" value="量多" title="量多 （>80ml,每天换5次卫生巾以上，行经5天以上）"  type="checkbox"/>
							</div>

							<div style="margin-left:124px;margin-top:12px;">
						       <input name="yjl" type2="radio" lay-skin="primary" value="量少" title="量少 （<30ml,每天换3次卫生巾以下，行经5天以下）"  type="checkbox"/>
							</div>

						</div>
						
						<div class="xm" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(4)月经颜色：</font>
                            
							<div style="display:inline-block;">

						       <input name="yjys" type2="radio" lay-skin="primary" value="正常" title="正常" checked type="checkbox"/>
							   <input name="yjys" type2="radio" lay-skin="primary" value="暗红" title="暗红"  type="checkbox"/>
							   <input name="yjys" type2="radio" lay-skin="primary" value="鲜红" title="鲜红"  type="checkbox"/>
							   <input name="yjys" type2="radio" lay-skin="primary" value="浅红" title="淡红"  type="checkbox"/>

							</div>

						</div>

						<div class="xm" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(5)月经质量：</font>
                            
							<div class="yjzl" style="display:inline-block;">

						       <input name="yjzl" type2="radio" lay-skin="primary" value="正常" title="正常" checked type="checkbox"/>
							   <input name="yjzl" type2="radio" lay-skin="primary" value="黏稠" title="黏稠"  type="checkbox"/>
							   <input name="yjzl" type2="radio" lay-skin="primary" value="有血块" title="有血块"  type="checkbox"/>
							   <input name="yjzl" type2="radio" lay-skin="primary" value="稀薄" title="稀薄"  type="checkbox"/>

							</div>

						</div>

						<div class="xm" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(6)是否痛经：</font>
                            
							<div style="display:inline-block;">

						       <input name="sftj" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
							   <input name="sftj" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>

							</div>

						</div>

						<div class="xm" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(7)上次月经时间：</font>
                            
							<div style="display:inline-block;">
                                 <input name="yjdate" id="yjdate" lay-verify="date" placeholder="yyyy-mm-dd" style="display:inline-block;width:auto;width:117px;" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})" type="text"/>
							</div>

						</div>

						<div class="xm" style="margin-left:25px;margin-top:12px;">
                            <font class="a_title" style="width:120px;">(8)是否绝经：</font>
                            
							<div style="display:inline-block;">

						       <input name="sfjj" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
							   <input name="sfjj" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>

							</div>

						</div>
						
					 </div>


					 <div class="a_6 a_g bd xm" style="display:none;">

					    <font class="a_title" style="margin-left:12px;width:406px;">白带情况</font>


						<div style="padding:12px;margin-left:13px;">

						       <input name="bd" type2="radio" lay-skin="primary" value="正常" title="正常" checked type="checkbox"/>
						       
                               <input name="bd" type2="radio" lay-skin="primary" value="稀薄、清白" title="稀薄、清白"   type="checkbox"/>

							   <input name="bd" type2="radio" lay-skin="primary" value="黄带" title="黄带"  type="checkbox"/>

							   <input name="bd" type2="radio" lay-skin="primary" value="赤带"  title="赤带"  type="checkbox"/>

							   <input name="bd" type2="radio" lay-skin="primary" value="豆腐渣样白带" title="豆腐渣样白带"  type="checkbox"/>
						  </div>
						  <div style="margin-left:25px;">
						       <input name="bd" type2="radio" lay-skin="primary" value="有异味"  title="有异味"  type="checkbox"/>
						       
                               <input name="bd" type2="radio" lay-skin="primary" value="量多" title="量多"  type="checkbox"/>

							   <input name="bd" type2="radio" lay-skin="primary" value="量少"  title="量少"  type="checkbox"/>
						  </div>
					 </div>
					 <!-- 女性补充资料结束 -->

					 <!-- 颈肩腰腿疼(疼痛问卷)开始 -->

					 <div class="bing2" style="display:none">

					     <div class="a_lan"><font>疼痛问卷</font></div>

                         <div class="bing2_1 a_g" >

						    <font class="a_title" style="margin-left:12px;width:auto;"><font class="bing_lie1">此症状发生有多久了？</font>
							  <input type="text" class="layui-input" name="bing21_rj" style="width:80px;display:inline-block;"/>
							</font>

						 </div>

						 <div class="bing2_2 a_g" >

						    <font class="a_title" style="margin-left:12px;width:auto;"><font class="bing_lie1">最近加重多久了？</font>
							   <input type="text" class="layui-input" name="bing22_jiazhong" style="width:80px;display:inline-block;" value="无"/>
							</font>

						 </div>

						 <div class="bing2_3 a_g xm">

							  <font class="a_title" style="margin-left:12px;width:406px;">1：疼痛的部位</font>

							  <div style="width:auto;padding:12px;">

								   <input name="bing23_buwei"  lay-skin="primary" value="头部" title="头部"  type="checkbox"/>
								   
								   <input name="bing23_buwei"  lay-skin="primary" value="颈部" title="颈部"  type="checkbox"/>

								   <input name="bing23_buwei"  lay-skin="primary" value="面部" title="面部"  type="checkbox"/>

								   <input name="bing23_buwei"  lay-skin="primary" value="腰背部"  title="腰背部"  type="checkbox"/>

								   <input name="bing23_buwei"  lay-skin="primary" value="胸腹部" title="胸腹部"  type="checkbox"/>
							  </div>
						      <div style="width:auto;padding-left:12px;">
								   <input name="bing23_buwei"  lay-skin="primary" value="大腿部"  title="大腿部"  type="checkbox"/>
								   
								   <input name="bing23_buwei"  lay-skin="primary" value="小腿部" title="小腿部"  type="checkbox"/>

								   <input name="bing23_buwei"  lay-skin="primary" value="手"  title="手"  type="checkbox"/>

								   <input name="bing23_buwei"  lay-skin="primary" value="脚" title="脚"  type="checkbox"/>
						      </div>

					     </div>

						 <div class="e_1 a_g">
								 <font class="a_title" style="margin-left:12px;color:red;width:auto;">*标注您的疼痛具体位置</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q1');">前往标注</div>
								 </div>
				         </div>


						 <div class="bing2_4 a_g xm">

							  <font class="a_title" style="margin-left:12px;width:406px;">2：感觉疼痛的位置在哪一层</font>

							  <div style="width:auto;padding:12px;">

								   <input name="bing24_buwei"  lay-skin="primary" value="皮肤" title="皮肤"  type="checkbox"/>
								   
								   <input name="bing24_buwei"  lay-skin="primary" value="肌肉" title="肌肉"  type="checkbox"/>

								   <input name="bing24_buwei"  lay-skin="primary" value="骨" title="骨"  type="checkbox"/>

								   <input name="bing24_buwei"  lay-skin="primary" value="内脏"  title="内脏"  type="checkbox"/>

								   <input name="bing24_buwei"  lay-skin="primary" value="颅内" title="颅内"  type="checkbox"/>
							  </div>
						      <div style="width:auto;padding-left:12px;">
								   <input name="bing24_buwei"  lay-skin="primary" value="说不清楚"  title="说不清楚"  type="checkbox"/>
								   
								   <input name="bing24_buwei"  lay-skin="primary" value="以上都有" title="以上都有"  type="checkbox"/>
								   
						      </div>

					     </div>

						 <div class="bing2_5 a_g xm">
							  <font class="a_title" style="margin-left:12px;width:406px;">3：疼痛的性质 (有疼痛的部位填写,可多选)</font>
						 </div>

						  <div class="bing2_51 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">头部?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing251_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing251_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing251_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing251_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing251_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing251_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing251_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing251_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing251_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing251_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing251_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing251_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>


						 <div class="bing2_52 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">颈部?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing252_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing252_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing252_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing252_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing252_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing252_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing252_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing252_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing252_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing252_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing252_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing252_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>

						 <div class="bing2_53 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">腰背部?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing253_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing253_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing253_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing253_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing253_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing253_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing253_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing253_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing253_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing253_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing253_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing253_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>

						 <div class="bing2_54 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">胸腹部?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing254_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing254_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing254_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing254_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing254_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing254_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing254_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing254_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing254_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing254_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing254_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing254_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>

						 <div class="bing2_55 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">大腿部?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing255_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing255_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing255_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing255_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing255_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing255_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing255_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing255_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing255_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing255_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing255_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing255_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>


						 <div class="bing2_56 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">小腿部?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing256_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing256_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing256_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing256_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing256_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing256_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing256_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing256_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing256_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing256_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing256_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing256_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>


						 <div class="bing2_57 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">手?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing257_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing257_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing257_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing257_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing257_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing257_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing257_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing257_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing257_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing257_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing257_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing257_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>

						  <div class="bing2_58 a_g xm" style="margin-left:20px;">
							  <font class="a_title" style="margin-left:12px;width:406px;">脚?</font>

							   <div class="bing_all" style="width:auto;padding:12px;">

								   <input name="bing258_buwei"  lay-skin="primary" value="喜按" title="喜按"  type="checkbox"/>
								   
								   <input name="bing258_buwei"  lay-skin="primary" value="拒按" title="拒按"  type="checkbox"/>

								   <input name="bing258_buwei"  lay-skin="primary" value="冷痛" title="冷痛"  type="checkbox"/>

								   <input name="bing258_buwei"  lay-skin="primary" value="胀痛"  title="胀痛"  type="checkbox"/>

								   <input name="bing258_buwei"  lay-skin="primary" value="刺痛" title="刺痛"  type="checkbox"/>
							  </div>
						      <div class="bing_all" style="width:auto;padding-left:12px;">
								   <input name="bing258_buwei"  lay-skin="primary" value="隐隐作痛"  title="隐隐作痛"  type="checkbox"/>
								   
								   <input name="bing258_buwei"  lay-skin="primary" value="热痛" title="热痛"  type="checkbox"/>

								   <input name="bing258_buwei"  lay-skin="primary" value="发紧" title="发紧"  type="checkbox"/>

								   <input name="bing258_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								   <input name="bing258_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

						      </div>

							  <div class="bing_all" style="width:auto;padding-left:12px;margin-top:12px;">

								  <input name="bing258_buwei"  lay-skin="primary" value="点击样疼痛" title="点击样疼痛"  type="checkbox"/>

								  <input name="bing258_buwei"  lay-skin="primary" value="火烧样疼痛" title="火烧样疼痛"  type="checkbox"/>

							  </div>

						 </div>


						  <div class="bing2_6 a_g xm">

							  <font class="a_title" style="margin-left:12px;width:406px;">4：疼痛时间规律</font>

							  <div style="width:auto;padding:12px;">

								   <input name="bing26_tengtongTime" type2="radio"  lay-skin="primary" value="冬天易犯" title="冬天易犯"  type="checkbox"/>
								   
								   <input name="bing26_tengtongTime" type2="radio"  lay-skin="primary" value="春天易犯" title="春天易犯"  type="checkbox"/>

								   <input name="bing26_tengtongTime" type2="radio"  lay-skin="primary" value="夏天易犯" title="夏天易犯"  type="checkbox"/>

								   <input name="bing26_tengtongTime" type2="radio"  lay-skin="primary" value="秋天易犯"  title="秋天易犯"  type="checkbox"/>

								   <input name="bing26_tengtongTime" type2="radio"  lay-skin="primary" value="晚上易犯" title="晚上易犯"  type="checkbox"/>
							  </div>
						      <div style="width:auto;padding-left:12px;">
								   <input name="bing26_tengtongTime" type2="radio"  lay-skin="primary" value="白天易犯"  title="白天易犯"  type="checkbox"/>
								   
								   <input name="bing26_tengtongTime" type2="radio"  lay-skin="primary" value="无明显时间" title="无明显时间"  type="checkbox"/>
								   
								   <font class="a_title" style="margin-left:12px;width:600px;">一天之中疼痛时间特点：
									 <input type="text" class="layui-input input_s" name="bing26_tengtongTime_txt" style="width:60px;margin-left:0px;margin-right:8px;"/>
								   </font>
						      </div>

					     </div>

						 <div class="bing2_7 a_g xm">

							  <font class="a_title" style="margin-left:12px;width:406px;">5：您的疼痛和以下那种因素有关</font>

							  <div style="width:auto;padding:12px;">

								   <input name="bing27_tengtongyinsu" type2="radio"  lay-skin="primary" value="受寒" title="受寒"  type="checkbox"/>
								   
								   <input name="bing27_tengtongyisu" type2="radio"  lay-skin="primary" value="劳累" title="劳累"  type="checkbox"/>

								   <input name="bing27_tengtongyisu" type2="radio"  lay-skin="primary" value="月经" title="月经"  type="checkbox"/>

								   <input name="bing27_tengtongyisu" type2="radio"  lay-skin="primary" value="一直都痛"  title="一直都痛"  type="checkbox"/>

								   <input name="bing27_tengtongyisu" type2="radio"  lay-skin="primary" value="吃某些食物" title="吃某些食物"  type="checkbox"/>
							  </div>
						      <div style="width:auto;padding-left:12px;">
								   <input name="bing27_tengtongyisu" type2="radio"  lay-skin="primary" value="无明显诱因"  title="无明显诱因"  type="checkbox"/>
								   
								   <font class="a_title" style="margin-left:12px;width:600px;">做某些事情：
									 <input type="text" class="layui-input input_s" name="bing27_tengtongyinsu_txt" style="width:90px;margin-left:0px;margin-right:8px;"/>
								   </font>
						      </div>

					     </div>

						 <div class="bing2_8 a_g xm">

							  <font class="a_title" style="margin-left:12px;width:406px;">6：您还有以下哪种情况？</font>

							  <div style="width:auto;padding:12px;">

								   <input name="bing28_qingkuang" type2="radio"  lay-skin="primary" value="手麻或头晕" title="手麻或头晕"  type="checkbox"/>
								   
								   <input name="bing28_qingkuang" type2="radio"  lay-skin="primary" value="耳鸣" title="耳鸣"  type="checkbox"/>

								   <input name="bing28_qingkuang" type2="radio"  lay-skin="primary" value="视物模糊" title="视物模糊"  type="checkbox"/>

								   <input name="bing28_qingkuang" type2="radio"  lay-skin="primary" value="心慌"  title="心慌"  type="checkbox"/>

								   <input name="bing28_qingkuang" type2="radio"  lay-skin="primary" value="呕吐" title="呕吐"  type="checkbox"/>
							  </div>
						      <div style="width:auto;padding-left:12px;">
								   <font class="a_title" style="width:auto;">胆囊问题：
									 <input type="text" class="layui-input input_s" name="bing28_qingkuang_danlan" style="width:90px;margin-left:0px;margin-right:8px;"/>
								   </font>

								   <font class="a_title" style="margin-left:12px;width:auto;">乳腺问题：
									 <input type="text" class="layui-input input_s" name="bing28_qingkuang_ruxian" style="width:90px;margin-left:0px;margin-right:8px;"/>
								   </font>

								   <font class="a_title" style="margin-left:12px;width:auto;">脾胃不适：
									 <input type="text" class="layui-input input_s" name="bing28_qingkuang_piwei" style="width:90px;margin-left:0px;margin-right:8px;"/>
								   </font>
 
								   
						      </div>

					     </div>

                         <div class="bing2_9 a_g xm">

							  <font class="a_title" style="margin-left:12px;width:406px;">7：疼痛附近有外伤史？</font>

							  <div style="width:auto;padding:12px;padding-bottom:0px;">

								   <input name="bing29_waishang" type2="radio"  lay-skin="primary" value="是" title="是"  type="checkbox"/>
								   
								   <input name="bing29_waishang" type2="radio"  lay-skin="primary" checked value="否" title="否"  type="checkbox"/>
							  </div>

						 </div>

						 <div class="e_1 a_g">
								 <font class="a_title" style="margin-left:12px;color:red;width:auto;">*可在附图上标注您的外伤具体位置，并标注受伤时间</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q2');">前往标注</div>
								 </div>
				         </div>


						 <div class="bing2_a a_g xm">

							  <font class="a_title" style="margin-left:12px;width:406px;">8：做过核磁共振、CT、肌电图、血管、B超等检查?</font>

							  <div style="width:auto;padding:12px;padding-bottom:0px;">
							         结果：
								    <input type="text" class="layui-input input_s" name="bing2a_jianchaqingkuang" style="width:457px;margin-left:0px;margin-right:8px;"/>
							  </div>

						 </div>




                          
					 </div>

					 <!-- 颈肩腰腿疼(疼痛问卷)结束 -->


					  <div class="a_7 a_g" >
                          <font class="a_title" style="margin-left:12px;width:600px;">您曾患有何种疾病：
                            <input type="text" class="layui-input input_s" name="jibing" style="width:373px;margin-left:0px;margin-right:8px;"/>
						  </font>
					 </div>

					  <div class="a_8 a_g" >
                          <font class="a_title xm" style="margin-left:12px;width:600px;">您是否有手术史：
						      <font style="display:inline-block;width:10px;"></font>
                              <input name="shoushushi" type2="radio"  lay-skin="primary" value="是" title="是"  type="checkbox"/>

							  <input name="shoushushi" type2="radio" checked  lay-skin="primary" value="否" title="否"  type="checkbox"/>

							  <input type="text" class="layui-input input_s" name="shoushushi_text" style="width:250px;margin-left:0px;margin-right:8px;"/>
						  </font>
					 </div>

					 <div class="a_9 a_g" >
                          <font class="a_title xm" style="margin-left:12px;width:600px;">您是否有家族史：
						      <font style="display:inline-block;width:10px;"></font>
                              <input name="jiazushi" type2="radio"   lay-skin="primary" title="是" value="是"  type="checkbox"/>

							  <input name="jiazushi" type2="radio" checked lay-skin="primary" value="否" title="否"  type="checkbox"/>

							  <input type="text" class="layui-input input_s" name="jiazushi_text" style="width:250px;margin-left:0px;margin-right:8px;"/>
						  </font>
					 </div>

					 <div class="a_a a_g" >
                          <font class="a_title xm" style="margin-left:12px;width:600px;">您是否有过敏史：
						      <font style="display:inline-block;width:10px;"></font>
                              <input name="guominshi" type2="radio"   lay-skin="primary" value="是" title="是"  type="checkbox"/>

							  <input name="guominshi" type2="radio" checked  lay-skin="primary" value="否" title="否"  type="checkbox"/>

							  <input type="text" class="layui-input input_s" name="guominshi_text" style="width:250px;margin-left:0px;margin-right:8px;"/>
						  </font>
					 </div>

					 <div class="a_b a_g">

                          <font class="a_title" style="margin-left:12px;width:406px;">您是否有以下病史</font>
						  <div class="xm" style="width:600px;padding:12px;">

						       <input name="bingshi"  lay-skin="primary" value="乙肝" title="乙肝"  type="checkbox"/>
						       
                               <input name="bingshi"  lay-skin="primary" value="甲肝" title="甲肝"  type="checkbox"/>

							   <input name="bingshi"  lay-skin="primary" value="丙肝" title="丙肝"  type="checkbox"/>

							   <input name="bingshi"  lay-skin="primary" value="HIV" title="HIV"  type="checkbox"/>

							   <input name="bingshi"  lay-skin="primary" value="肺结核" title="肺结核"  type="checkbox"/>

							   <input name="bingshi"  lay-skin="primary" value="梅毒" title="梅毒"  type="checkbox"/>
						  </div>

					  </div>

					  <div class="a_c a_g">

                          <font class="a_title" style="margin-left:12px;width:51px;">舌象:</font>
						  
                            <font>舌体
							   <input type="text" class="layui-input input_s" name="st" style="width:90px;margin-left:5px;margin-right:8px;"/>
							</font>
							<font class="gj" style="margin-left:2px;"></font>
							<font>舌质
							   <input type="text" class="layui-input input_s" name="sz" style="width:90px;margin-left:5px;margin-right:8px;"/>
							</font>
                            <font class="gj" style="margin-left:2px;"></font>
							<font>苔质
							   <input type="text" class="layui-input input_s" name="tz" style="width:90px;margin-left:5px;margin-right:8px;"/>
							</font>

					  </div>

					   <div class="a_d a_g">

                          <font class="a_title" style="margin-left:12px;color:red;width:auto;">*请在图中标注观察到的 瘀斑、红点、疱疹、色暗、厚腻苔等异常情况的位置及异常情况</font>
                          
						  <div class="xm" style="width:600px;padding:12px;">
						     <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q3');">标注舌像</div>
						  </div>

					  </div>

                     <div class="a_e a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;">舌下脉络</font>

                          <input name="sxml"  lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="sxml"  lay-skin="primary" value="青紫" title="青紫"  type="checkbox"/>
						  <input name="sxml"  lay-skin="primary" value="粗细" title="粗细"  type="checkbox"/>
						  <input name="sxml"  lay-skin="primary" value="怒张" title="怒张"  type="checkbox"/>

					  </div>

					  <div class="a_f a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;">脉象</font>

						  <div class="xm" style="width:autopx;padding:12px;">
                            <font>左：整体
							   <input type="text" class="layui-input input_s" name="left_zhengti" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>
							<font>寸
							   <input type="text" class="layui-input input_s" name="left_cun" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>
							<font>关
							   <input type="text" class="layui-input input_s" name="left_guan" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>
							<font>尺
							   <input type="text" class="layui-input input_s" name="left_chi" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>

							<font class="gj" style="margin-left:2px;"></font>
                           </div>
						   <div class="xm" style="width:autopx;padding-left:12px;">
                            <font>右：整体
							   <input type="text" class="layui-input input_s" name="right_zhengti" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>
							<font>寸
							   <input type="text" class="layui-input input_s" name="right_cun" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>
							<font>关
							   <input type="text" class="layui-input input_s" name="right_guan" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>
							<font>尺
							   <input type="text" class="layui-input input_s" name="right_chi" style="width:70px;margin-left:5px;margin-right:8px;"/>
							</font>
						       
						  </div>

					  </div>

				</div>
				<!-- 基本信息结束 -->

                <!-- 一般情况开始 -->
				<div class="b">
				     <div class="a_lan"><font>一般情况</font></div>

                     <div class="b_1 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;">体型</font>

                          <input name="tixing" type2="radio"  lay-skin="primary" value="匀称" title="匀称" checked  type="checkbox"/>
						  <input name="tixing" type2="radio" lay-skin="primary" value="偏胖" title="偏胖"  type="checkbox"/>
						  <input name="tixing" type2="radio" lay-skin="primary" value="肥胖" title="肥胖"  type="checkbox"/>
						  <input name="tixing" type2="radio" lay-skin="primary" value="偏瘦" title="偏瘦"  type="checkbox"/>
						  <input name="tixing" type2="radio" lay-skin="primary" value="消瘦" title="消瘦"  type="checkbox"/>

					  </div>

                      <div class="b_2 a_g">

                          <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若局部肥胖，请在附图中标注肥胖片区</font>
                          
						  <div class="xm" style="width:600px;padding:12px;">
						     <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q4');">标注肥胖</div>
						  </div>

					  </div>

					  <div class="b_3 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">睡眠</font>

                          <input name="shuimin" type2="radio" lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="shuimin" type2="radio" lay-skin="primary" value="偶有失眠" title="偶有失眠"  type="checkbox"/>
						  <input name="shuimin" type2="radio" lay-skin="primary" value="严重失眠" title="严重失眠"  type="checkbox"/>
						  <input name="shuimin" type2="radio" lay-skin="primary" value="经常嗜睡" title="经常嗜睡"  type="checkbox"/>
						 
					  </div>

					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">饮食</font>

                          <input name="yinshi" type2="radio" lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="yinshi" type2="radio" lay-skin="primary" value="饥而不欲食" title="饥而不欲食"  type="checkbox"/>
						  <input name="yinshi" type2="radio" lay-skin="primary" value="能吃容易饿" title="能吃容易饿"  type="checkbox"/>
						  <input name="yinshi" type2="radio" lay-skin="primary" value="不饿也没什么胃口" title="不饿也没什么胃口"  type="checkbox"/>
						 
					  </div>

					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">饮水</font>

                          <input name="yinshui" type2="radio" lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="yinshui" type2="radio" lay-skin="primary" value="不渴" title="不渴"  type="checkbox"/>
						  <input name="yinshui" type2="radio" lay-skin="primary" value="渴而多饮" title="渴而多饮"  type="checkbox"/>
						  <input name="yinshui" type2="radio" lay-skin="primary" value="渴不多饮" title="渴不多饮"  type="checkbox"/>
						  <input name="yinshui" type2="radio" lay-skin="primary" value="其它" title="其它"  type="checkbox"/>
						 
					  </div>

					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">口中</font>

                          <input name="kouzhong" type2="radio" lay-skin="primary" value="有" title="有"   type="checkbox"/>
						  <input name="kouzhong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						  <input name="kouzhong" type2="radio" lay-skin="primary" value="粘腻感" title="粘腻感"  type="checkbox"/>
						  <input name="kouzhong" type2="radio" lay-skin="primary" value="甜" title="甜"  type="checkbox"/>
						  <input name="kouzhong" type2="radio" lay-skin="primary" value="苦" title="苦"  type="checkbox"/>
						  <input name="kouzhong" type2="radio" lay-skin="primary" value="金属" title="金属"  type="checkbox"/>
						  <input name="kouzhong" type2="radio" lay-skin="primary" value="酸" title="酸"  type="checkbox"/>
						 
					  </div>

					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">大便</font>

                          <input name="dabian" type2="radio" lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="dabian" type2="radio" lay-skin="primary" value="便秘比较多" title="便秘比较多"  type="checkbox"/>
						  <input name="dabian" type2="radio" lay-skin="primary" value="大便粘稀薄比较多" title="大便粘稀薄比较多"  type="checkbox"/>
						  <input name="dabian" type2="radio" lay-skin="primary" value="时干时稀" title="时干时稀"  type="checkbox"/>
						 
					  </div>

					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">小便</font>

                          <input name="xiaobian" type2="radio" lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="xiaobian" type2="radio" lay-skin="primary" value="偏黄" title="偏黄"  type="checkbox"/>
						  <input name="xiaobian" type2="radio" lay-skin="primary" value="清长" title="清长"  type="checkbox"/>
						  <input name="xiaobian" type2="radio" lay-skin="primary" value="小便不利" title="小便不利"  type="checkbox"/>
						  <input name="xiaobian" type2="radio" lay-skin="primary" value="夜尿多" title="夜尿多"  type="checkbox"/>
						  <input name="xiaobian" type2="radio" lay-skin="primary" value="小便急" title="小便急"  type="checkbox"/>
						 
					  </div>

					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">寒热</font>

                          <input name="hanre" type2="radio" lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="hanre" type2="radio" lay-skin="primary" value="怕热" title="怕热"  type="checkbox"/>
						  <input name="hanre" type2="radio" lay-skin="primary" value="怕冷" title="怕冷"  type="checkbox"/>
						  <input name="hanre" type2="radio" lay-skin="primary" value="忽冷忽热" title="忽冷忽热"  type="checkbox"/>
						  <input name="hanre" type2="radio" lay-skin="primary" value="都怕" title="都怕"  type="checkbox"/>
						 
					  </div>

					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">寒热是否局部</font>

                          <input name="hanre_status" type2="radio" lay-skin="primary" value="是" title="是"   type="checkbox"/>
						  <input name="hanre_status" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          
						  <div class="xm" style="width:600px;margin-top:6px;">
						     <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若为局部，请在附图中标注片区</font>
						     <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
						        <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q5');">标注寒热</div>
						     </div>
						  </div>
					  </div>

					<div class="b_4 a_g xm yiban">
                          <font class="a_title" style="margin-left:12px;width:88px;">出汗</font>
                          <input name="chuhanSelect" type2="radio" lay-skin="primary" value="正常 " title="正常 " checked type="checkbox"/>
                          <input name="chuhanSelect" type2="radio" lay-skin="primary" value="全身出汗" title="全身出汗"   type="checkbox"/>
						  <input name="chuhanSelect" type2="radio" lay-skin="primary" value="半身出汗" title="半身出汗"  type="checkbox"/>
						  <input name="chuhanSelect" type2="radio" lay-skin="primary" value="手脚心出汗" title="手脚心出汗"  type="checkbox"/>
						  <input name="chuhanSelect" type2="radio" lay-skin="primary" value="睡觉出汗" title="睡觉出汗"  type="checkbox"/>
						  <input name="chuhanSelect" type2="radio" lay-skin="primary" value="活动后出汗 " title="活动后出汗 "  type="checkbox"/>
						  <input name="chuhanSelect" type2="radio" lay-skin="primary" value="一直出汗 " title="一直出汗"  type="checkbox"/>
						  <input name="chuhanSelect" type2="radio" lay-skin="primary" value="局部出汗 " title="局部出汗 "  type="checkbox"/>
					  </div>

					<div class="b_4 a_g xm yiban">
						  <div class="xm" style="width:600px;margin-top:6px;">
						     <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若为局部出汗，请在附图中标注片区</font>
						     <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
						        <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q16');">标注出汗</div>
						     </div>
						  </div>
					  </div>
					  
					  <div class="b_4 a_g xm yiban">

                          <font class="a_title" style="margin-left:12px;width:88px;">情志</font>

                          <input name="qingzhi" type2="radio" lay-skin="primary" value="正常" title="正常" checked  type="checkbox"/>
						  <input name="qingzhi" type2="radio" lay-skin="primary" value="烦躁着急" title="烦躁着急"  type="checkbox"/>
						  <input name="qingzhi" type2="radio" lay-skin="primary" value="思虑多" title="思虑多"  type="checkbox"/>
						  <input name="qingzhi" type2="radio" lay-skin="primary" value="多愁善感" title="多愁善感"  type="checkbox"/>
						  <input name="qingzhi" type2="radio" lay-skin="primary" value="易受惊吓" title="易受惊吓"  type="checkbox"/>
						  <input name="qingzhi" type2="radio" lay-skin="primary" value="比较兴奋" title="比较兴奋"  type="checkbox"/>
						 
					  </div>



			    </div>
				<!-- 一般情况结束 -->
                
				<!-- 望切诊开始 -->
				<div class="c">
				     <div class="a_lan"><font>望，切诊</font></div>

					 <div class="c_1 a_g xm" style="margin-top:15px;">

                          <font class="a_title" style="margin-left:12px;width:88px;">头面部</font>

                          <input name="toumianbu"  lay-skin="primary" value="肿物" title="肿物"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="压痛" title="压痛"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="肿块" title="肿块"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="结节" title="结节"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="色斑" title="色斑"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="丘疹" title="丘疹"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="皮损" title="皮损"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="疤痕" title="疤痕"  type="checkbox"/>
						  <input name="toumianbu"  lay-skin="primary" value="痦点" title="痦点"  type="checkbox"/>

						  <div class="xm" style="width:600px;margin-top:6px;">
						     <font class="a_title" style="margin-left:12px; margin-top:13px;color:red;width:auto;">*详细请在附图中标注片区</font>
						     <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
						        <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q6');">标注头面部</div>
						     </div>
						  </div>
						 
					  </div>

			    </div>
                <!-- 望切诊结束 -->

                <!-- 眼睛开始 -->
				<div class="d">
				     <div class="a_lan"><font>眼睛</font></div>

					 <div class="d_1 a_g xm" style="margin-top:15px;">
					    <font class="a_title" style="margin-left:12px;width:88px;">
						    <input name="toumianbu_yan"  lay-skin="primary" value="全正常" title="全正常" type="checkbox" lay-filter="toumianbu_yan"/>
						</font>
					 </div>

					 <div class="d_2 a_g xm toumianbu_yan_class" style="margin-top:15px;">
					    
                          <font class="a_title" style="margin-left:12px;width:124px;">眼睑（胞睑/肉轮）:</font>
 
                          <font class="gj xm" style="margin-left:30px;width:auto;">是否有水肿
						     <input name="shuizhong" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="shuizhong" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

						  <font class="gj xm" style="margin-left:2px;width:auto;">是否有下垂
						     <input name="xiachui" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="xiachui" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

						 <div class="xm" style="width:auto;margin-top:12px;">
                              <font class="gj xm" style="margin-left:171px;width:auto;">是否有充血
								 <input name="chongxue" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								 <input name="chongxue" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
							  </font>

							  <font class="gj xm" style="margin-left:2px;width:auto;">是否有滤泡
								 <input name="lvpao" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								 <input name="lvpao" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
							  </font>

							  <font class="gj xm" style="margin-left:2px;width:auto;">是否关闭不全
								 <input name="guanbibuquan" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								 <input name="guanbibuquan" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
							  </font>

						 </div>
						  

					 </div>

                     <div class="d_2 a_g xm toumianbu_yan_class">
					    
                          <font class="a_title" style="margin-left:12px;width:124px;">眼角（两眦/血轮）:</font>
                          
						  <font class="gj xm" style="margin-left:18px;width:auto;">是否有分泌物
								<input name="fenmiwu" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								<input name="fenmiwu" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
						  </font>

						  <font class="gj xm" style="margin-left:2px;width:auto;">是否有疼痛
								<input name="tentong_status" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								<input name="tentong_status" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
						  </font>

						  <font class="gj xm" style="margin-left:2px;width:auto;">是否有脓肿
								<input name="nongzhong" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								<input name="nongzhong" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
						  </font>

						  <div class="xm" style="width:600px;margin-top:6px;">
						     <font class="a_title" style="margin-left:12px; margin-top:13px;color:red;width:auto;">*详细请在附图中标注片区</font>
						     <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
						        <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q7');">前往标注</div>
						     </div>
						  </div>

					 </div>


					 <div class="d_3 a_g xm toumianbu_yan_class">
					    
                          <font class="a_title" style="margin-left:12px;width:155px;">结/巩膜（白睛/气轮）：</font>
                          
						   <font class="gj xm" style="margin-left:4px;width:auto;">是否有充血
						     <input name="d3_chongxue" type2="radio" lay-skin="primary" value="是" title="是" checked type="checkbox"/>
						     <input name="d3_chongxue" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

						  <font class="gj xm" style="margin-left:2px;width:auto;">是否有出血
						     <input name="d3_chuxue" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="d3_chuxue" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

						 <div class="xm" style="width:auto;margin-top:12px;">

							  <font class="gj xm" style="margin-left:175px;width:auto;">是否有滤泡
								 <input name="d3_lvpao" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								 <input name="d3_lvpao" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
							  </font>

							  <font class="gj xm" style="margin-left:2px;width:auto;">是否有黄染
								 <input name="d3_huangran" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								 <input name="d3_huangran" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
							  </font>

						 </div>

						  <div class="xm" style="width:600px;margin-top:6px;">
						     <font class="a_title" style="margin-left:12px; margin-top:13px;color:red;width:auto;">*详细请在附图中标注片区</font>
						     <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
						        <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q8');">前往标注</div>
						     </div>
						  </div>

					 </div>


					 <div class="d_4 a_g xm toumianbu_yan_class">
					    
                          <font class="a_title" style="margin-left:12px;width:155px;">角膜（黑睛/风轮）：</font>

						  <font class="gj xm" style="margin-left:4px;width:auto;">是否有浑浊
						     <input name="d4_hunzhuo" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="d4_hunzhuo" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

                          <font class="gj xm" style="margin-left:4px;width:auto;">是否有异变
						     <input name="d4_yibian" type2="radio" lay-skin="primary" value="是" title="是" checked type="checkbox"/>
						     <input name="d4_yibian" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

					 </div>


					 <div class="d_5 a_g xm toumianbu_yan_class">
					    
                          <font class="a_title" style="margin-left:12px;width:155px;">瞳孔（瞳神/水轮）：</font>

						  <font class="gj xm" style="margin-left:4px;width:auto;">是否对光反应灵敏
						     <input name="d5_lingmian" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="d5_lingmian" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

                          <font class="gj xm" style="margin-left:4px;width:auto;">是否两侧等大等圆
						     <input name="d5_dengyuan" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="d5_dengyuan" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

					 </div>

					 <div class="d_6 a_g xm toumianbu_yan_class">
					    
                          <font class="a_title" style="margin-left:12px;width:44px;">眼球：</font>

						  <font class="gj xm" style="margin-left:4px;width:auto;">是否活动正常
						     <input name="d6_active" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="d6_active" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>

                          <font class="gj xm" style="margin-left:4px;width:auto;">是否有震颤
						     <input name="d6_zhenchan" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
						     <input name="d6_zhenchan" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
                          </font>
                          <div class="xm" style="width:auto;margin-top:12px;">
							  <font class="gj xm" style="margin-left:78px;width:auto;">是否有斜视
								 <input name="d6_xieshi" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								 <input name="d6_xieshi" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
							  </font>

							   <font class="gj xm" style="margin-left:4px;width:auto;">是否有充血
								 <input name="d6_chongxue" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
								 <input name="d6_chongxue" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
							  </font>
						  </div>

					 </div>
 


			    </div>

				<!-- 眼睛结束 -->
                
				<!-- 耳朵开始 -->
				<div class="e">
				     <div class="a_lan"><font>耳朵</font></div>

                     <div class="e_1 a_g">
						 <font class="a_title" style="margin-left:12px;margin-top:8px;width:auto;">左耳耳廊描述：
						    <input type="text" class="layui-input name" name="e1_lefter_text" style="width:350px;margin-left:45px;"/>
						 </font>
						 <div class="xm" style="width:auto;margin-top:12px;">
							  <font class="gj xm" style="margin-left:14px;width:auto;">耳穴探测结果(阳性点)
								 <input type="text" class="layui-input name" name="e1_lefter_yangxing" style="width:350px;margin-left:6px;"/>
							  </font>
						 </div>
					 </div>
                     
					 <div class="e_1 a_g">
						 <font class="a_title" style="margin-left:12px;margin-top:8px;width:auto;">右耳耳廊描述：
						    <input type="text" class="layui-input name" name="e1_righter_text" style="width:350px;margin-left:45px;"/>
						 </font>
						 <div class="xm" style="width:auto;margin-top:12px;">
							  <font class="gj xm" style="margin-left:14px;width:auto;">耳穴探测结果(阳性点)
								 <input type="text" class="layui-input name" name="e1_righter_yangxing" style="width:350px;margin-left:6px;"/>
							  </font>
						 </div>
					 </div>

					 <div class="e_1 a_g">
						 <font class="a_title" style="margin-left:12px; margin-top:13px;color:red;width:auto;">*详细请在图中标出观察到的阳性反应点，如：局部皮肤有无红、肿、变色、皮疹、脱屑、血管充盈、隆起等及其描述部位</font>
						     <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
						        <div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q9');">前往标注</div>
						 </div>
					 </div>



			    </div>
				<!-- 耳朵结束 -->
               
                
				<!-- 口咽,甲状腺,胸部开始 -->
				<div class="f">
				     <div class="a_lan"><font>口咽,甲状腺,胸部</font></div>

					 <div class="f_1 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">口咽</font>

                          <input name="f1_status"   lay-skin="primary" value="全正常" title="全正常" lay-filter="f1_status_checked"  type="checkbox"/>
						  
					 </div>

					 <div class="f_2 a_g xm f1_status_class">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">扁桃体</font>
 
                           <font class="gj xm" style="width:auto;">有无肿大：
								 <input name="f2_zhongda" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f2_zhongda" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;">有无充血：
								 <input name="f2_chongxue" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f2_chongxue" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;">有无异常分泌物：
								 <input name="f2_fenmiwu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f2_fenmiwu" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>
						  
					 </div>

					 <div class="f_3 a_g xm f1_status_class">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">咽</font>

						   <font class="gj xm" style="width:auto;">有无充血：
								 <input name="f3_chongxue" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f3_chongxue" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;">有无滤泡：
								 <input name="f3_lvpao" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f3_lvpao" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>
						  
					 </div>

					 <div class="f_4 a_g xm">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">甲状腺</font>

						   <font class="gj xm" style="width:auto;">有无肿大：
								 <input name="f4_zhongda" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f4_zhongda" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;">有无结节：
								 <input name="f4_jiejie" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f4_jiejie" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;">有无肿块：
								 <input name="f4_zhognkuai" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f4_zhongkuai" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>
						  
						   <font class="gj xm" style="width:auto;">若有大小：
                                <input type="text" class="layui-input name" name="f4_a" style="width:40px;"/>*
                                <input type="text" class="layui-input name" name="f4_b" style="width:40px;"/>
						   </font>

					 </div>

					 <div class="f_5 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">胸部</font>

                          <input name="f5_xiongbu"   lay-skin="primary" value="全正常" title="全正常" lay-filter="f5_xiongbu_checked" type="checkbox"/>

						  <div style="width:auto;padding:12px;margin-left:90px;" class="f5_xiongbu_class">

						       <font class="gj xm" style="width:auto;">有无压痛：
								 <input name="f5_yatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f5_yatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						       </font>
						       <font class="gj xm" style="width:auto;">有无肿块：
								 <input name="f5_zhongkuaih" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f5_zhongkuaih" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						       </font>
						       <font class="gj xm" style="width:auto;">有无结节：
								 <input name="f5_jiejieh" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f5_jiejieh" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						       </font>
							 <!--   <font class="gj xm" style="width:auto;">
								 <input name="f5_zhongkuai" lay-skin="primary" value="肿块" title="肿块"  type="checkbox"/>
								 <input name="f5_jiejie"  lay-skin="primary" value="结节" title="结节"  type="checkbox"/>
						       </font> -->

						  </div>
						  
					 </div>

					 <div class="f_6 a_g xm f5_xiongbu_class">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">乳房</font>
 
                           <font class="gj xm" style="width:auto;">有无桔皮样外观：
								 <input name="f6_jiepiwaiguan" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f6_jiepiwaiguan" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;">有无干湿性罗音、哮鸣音：
								 <input name="f6_xiaoming" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="f6_xiaoming" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>
						   
						  
					 </div>



			    </div>
				<!-- 口咽,甲状腺,胸部结束 -->
                
				<!-- 腹部开始 -->
				<div class="g">
				     <div class="a_lan"><font>腹部</font></div>

					 <div class="g_1 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">腹部</font>

                          <input name="g1_status"   lay-skin="primary" value="全正常" title="全正常" lay-filter="g1_status_checked" type="checkbox"/>
						  
					 </div>

					 <div class="g_2 a_g xm g1_status_class">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">望诊</font>

						   <font class="gj xm" style="width:auto;"><font class="lie_2">有无皮疹、片区色素带：</font>
								 <input name="g2_pizhen" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g2_pizhen" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;"><font class="lie_2">有无疤痕：</font>
								 <input name="g2_baheng" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g2_baheng" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						  
						   <div style="width:auto;padding:12px;margin-left:93px;">
                               <font class="gj xm" style="width:auto;"><font class="lie_2">有无肿块：</font>
								  <input name="g2_zhognkuai" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								  <input name="g2_zhongkuai" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						       </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_2">有无颈静脉曲张：</font>
								 <input name="g2_jinmaiqu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g2_jinmaiqu" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>
						   </div>


					 </div>

					 <div class="e_1 a_g g1_status_class">
								 <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若有以上情况请在附图中标注</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q10');">前往标注</div>
								 </div>
				     </div>


					 <div class="g_3 a_g xm g1_status_class">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">触诊</font>

						   <font class="gj xm" style="width:auto;">有无异常温度处（手触局部有过热或者过凉）：
								 <input name="g3_wenduyichang" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g3_wenduyichang" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <div style="width:auto;padding:12px;margin-left:93px;">
							   <font class="gj xm" style="width:auto;"><font class="lie_2">有无肿块、结节、条索：</font>
								 <input name="g3_zhongkuai_jiejie" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g3_zhongkuai_jiejie" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_2">有无异常高张力点：</font>
								 <input name="g3_zhanglidian" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g3_zhanglidian" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   
						   </div>

						   <div style="width:auto;padding:12px;margin-left:93px;padding-top:0px;">

                               <font class="gj xm" style="width:auto;"><font class="lie_2">有无压痛、反跳痛：</font>
								 <input name="g3_yatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g3_yatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_2">有无肝脏压痛 、囊肿：</font>
								 <input name="g3_ganzhangyatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g3_ganzhangyatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

						   <div style="width:auto;padding:12px;margin-left:93px;padding-top:0px;">

                               <font class="gj xm" style="width:auto;"><font class="lie_2">胆囊压痛：</font>
								 <input name="g3_danlang" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g3_danlang" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_2">有无输尿管压痛点：</font>
								 <input name="g3_shuniaoyatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="g3_shuniaoyatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

					 </div>

					 <div class="e_1 a_g g1_status_class">
								 <font class="a_title" style="margin-left:12px; color:red;width:auto;">*若有以上情况请在附图中标注</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q11');">前往标注</div>
								 </div>
					 </div>


			    </div>

				<!-- 腹部结束 -->
                
				<!-- 四肢开始 -->
				<div class="h">
				     <div class="a_lan"><font>四肢</font></div>

                     <div class="h_1 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">四肢</font>

                          <input name="h1_status"   lay-skin="primary" value="全正常" title="全正常" lay-filter="h1_status_checked" type="checkbox"/>
						  
					 </div>

					 <div class="h_2 a_g xm h1_status_class">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">望诊</font>

						   <font class="gj xm" style="width:auto;">有无皮疹、片区色素带:
								 <input name="h2_pizhen" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_pizhen" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;"><font class="lie_3">有无疤痕：</font>
								 <input name="h2_baheng" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_baheng" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;"><font class="lie_3">有无肿块：</font>
								 <input name="h2_zhognkuai" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_zhongkuai" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>
						   <div style="width:auto;padding:12px;margin-left:93px;">
							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无颈静脉曲张：</font>
								 <input name="h2_jinmaiqu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_jinmaiqu" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无骨折：</font>
								 <input name="h2_guzhe" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_guzhe" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无水肿：</font>
								 <input name="h2_shuizhong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_shuizhong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

						   <div style="width:auto;padding:12px;margin-left:93px;padding-top:0px;">
							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无畸形：</font>
								 <input name="h2_jixing" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_jixing" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无外伤：</font>
								 <input name="h2_waishang" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_waishang" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无活动异常：</font>
								 <input name="h2_acitve" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h2_active" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

					 </div>

					 <div class="e_1 a_g h1_status_class">
								 <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若有以上情况请在附图中标注</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q12');">前往标注</div>
								 </div>
				     </div>

					 <div class="h_3 a_g xm h1_status_class">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">触诊</font>

						   <font class="gj xm" style="width:auto;">有无异常温度处（手触局部有过热或者过凉）
								 <input name="h3_wendu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h3_wendu" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <div style="width:auto;padding:12px;margin-left:93px;">
							   <font class="gj xm" style="width:auto;">有无肿块、结节、条索：
								 <input name="h3_zhongkuai" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h3_zhongkuai" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;">有无异常高张力点：
								 <input name="h3_yichangli" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h3_yichangli" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;">有无压痛：
								 <input name="h3_yatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="h3_yatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

					 </div>

			    </div>
				<!-- 四肢结束 -->

				<!-- 项背腰部开始 -->
				<div class="i">
				     <div class="a_lan"><font>项背腰部</font></div>

					 <div class="i_1 a_g xm">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">望诊</font>

						   <font class="gj xm" style="width:auto;"><font class="lie_3">皮疹/片区色素带：</font>
								 <input name="i1_pizhen" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i1_pizhen" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;"><font class="lie_3">有无疤痕：</font>
								 <input name="i1_baheng" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i1_baheng" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <font class="gj xm" style="width:auto;"><font class="lie_3">有无肿块：</font>
								 <input name="i1_zhognkuai" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i1_zhongkuai" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>
						   <div style="width:auto;padding:12px;margin-left:93px;">
							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无颈静脉怒张：</font>
								 <input name="i1_jinmainu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i1_jinmainu" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   
							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无水肿：</font>
								 <input name="i1_shuizhong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i1_shuizhong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无外伤：</font>
								 <input name="i1_waishang" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i1_waishang" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

						   <div style="width:auto;padding:12px;margin-left:93px;padding-top:0px;">

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无活动受限：</font>
								 <input name="i1_acitve" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i1_active" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

					 </div>

					 <div class="e_1 a_g">
								 <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若有以上情况请在附图中标注</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q13');">前往标注</div>
								 </div>
				     </div>


					 <div class="i_2 a_g xm">

                           <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">触诊</font>

						   <font class="gj xm" style="width:auto;">有无异常温度处（手触局部有过热或者过凉）
								 <input name="i2_wendu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i2_wendu" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
						   </font>

						   <div style="width:auto;padding:12px;margin-left:93px;">
							   <font class="gj xm" style="width:auto;"><font class="lie_3">肿块/结节/条索：</font>
								 <input name="i2_zhongkuai" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i2_zhongkuai" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">异常高张力点：</font>
								 <input name="i2_yichangli" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i2_yichangli" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无压痛：</font>
								 <input name="i2_yatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i2_yatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

						   <div style="width:auto;padding:12px;margin-left:93px;padding-top:0px;">
							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无肾压痛：</font>
								 <input name="i2_shengyatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i2_shengyatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

							   <font class="gj xm" style="width:auto;"><font class="lie_3">有无叩击痛：</font>
								 <input name="i2_koujitong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
								 <input name="i2_koujitong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							   </font>

						   </div>

					 </div>

					 <div class="e_1 a_g">
								 <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若有以上情况请在附图中标注</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q14');">前往标注</div>
								 </div>
				     </div>



			    </div>
				<!-- 项背腰部结束 -->

				<!-- 神经系统开始 -->
				<div class="j">
				     <div class="a_lan"><font>神经系统</font></div>

					 <div class="j_1 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">神经系统</font>

                          <input name="j1_status"   lay-skin="primary" value="全正常" title="全正常" lay-filter="j1_status_checked" type="checkbox"/>
						  
					 </div>
                     <div class="j_2 a_g xm j1_status_class">
						 <div style="width:auto;padding:12px;margin-left:93px;padding-top:0px;">

								   <font class="gj xm" style="width:auto;"><font class="lie_1">是否有痛觉、温度觉、 触觉 异常</font>
									 <input name="j2_tongjue" type2="radio" lay-skin="primary" value="是" title="是"  type="checkbox"/>
									 <input name="j2_tongjue" type2="radio" lay-skin="primary" value="否" title="否" checked type="checkbox"/>
								   </font>
								  
								   <input name="j2_miangan"  lay-skin="primary" value="敏感" title="敏感"  type="checkbox"/>
								   <input name="j2_queshi"  lay-skin="primary" value="缺失" title="缺失"  type="checkbox"/>

						 </div>
                         
						 <div style="width:auto;padding:12px;margin-left:93px;padding-top:0px;padding-bottom:0px">

								   <font class="gj xm" style="width:auto;"><font class="lie_1">肌肉有无紧张及萎缩、瘫痪</font>
									 <input name="j2_jirou" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
									 <input name="j2_jirou" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
								   </font>
								  
								   <input name="j2_chihuan"  lay-skin="primary" value="弛缓性" title="弛缓性"  type="checkbox"/>
								   <input name="j2_jingluan"  lay-skin="primary" value="痉挛性" title="痉挛性"  type="checkbox"/>

						 </div>

                         <div style="width:auto;padding:12px;margin-left:93px;padding-bottom:0px">

								   <font class="gj xm" style="width:auto;"><font class="lie_1">共无济运动异常</font>
									 <input name="j2_yundong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
									 <input name="j2_yundong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
								   </font>
								  
								   <input name="j2_zhibishiyan"  lay-skin="primary" value="指鼻试验" title="指鼻试验"  type="checkbox"/>
								   <input name="j2_duizhishiyan"  lay-skin="primary" value="对指试验" title="对指试验"  type="checkbox"/>
								   <input name="j2_luntidongzuo"  lay-skin="primary" value="轮替动作" title="轮替动作"  type="checkbox"/>

						 </div>

					  </div>


			    </div>
				<!-- 神经系统结束 -->

				<!-- 神经反射开始 -->
				<div class="k">
				     <div class="a_lan"><font>神经反射</font></div>

					 <div class="k_1 a_g xm">

                          <font class="a_title" style="margin-left:12px;width:88px;margin-top:12px;">神经反射</font>

                          <input name="k1_status"   lay-skin="primary" value="全正常" title="全正常" lay-filter="k1_status_checked"  type="checkbox"/>
						  
					 </div>

					 <div class="k_2 a_g xm k1_status_class" style="margin-left:12px;">

					    <font class="gj2 xm" style="width:auto;">
					       <input name="k2_status" type2="radio"   lay-skin="primary" value="是" title="是"   type="checkbox"/>
						   <input name="k2_status" type2="radio"   lay-skin="primary" value="否" title="否"  checked type="checkbox"/>
						</font>

						<font class="gj2 xm" style="width:auto;">

                           <input name="k2_weizhi"  type2="radio"   lay-skin="primary" value="上" title="上"   type="checkbox"/>
						   <input name="k2_weizhi"  type2="radio"  lay-skin="primary" value="中" title="中"   type="checkbox"/>
						   <input name="k2_weizhi"  type2="radio" lay-skin="primary" value="下" title="下"   type="checkbox"/>
                             
						</font>存在 腹壁反射

					 </div>

					 <div class="k_3 a_g xm k1_status_class" style="margin-left:12px;">

                          <input name="k3_Hoffmonn"    lay-skin="primary" value="Hoffmonn氏征" title="Hoffmonn氏征"   type="checkbox"/>
						  <input name="k3_Babinski"    lay-skin="primary" value="Babinski氏征" title="Babinski氏征"   type="checkbox"/>
                          <input name="k3_Gordon"    lay-skin="primary" value="Gordon氏征" title="Gordon氏征"   type="checkbox"/>
						  <input name="k3_Chaddock"    lay-skin="primary" value="Chaddock氏征" title="Chaddock氏征"   type="checkbox"/>
						  <input name="k3_Kemig"    lay-skin="primary" value="脑膜刺激征（Kemig氏征）" title="脑膜刺激征（Kemig氏征）"   type="checkbox"/>
                           
					 </div>

					 <div class="k_4 a_g xm k1_status_class">

                          <font class="a_title" style="margin-left:12px;width:88px;">脊柱</font>

                          <input name="k4_jizhu"   lay-skin="primary" value="全正常" title="全正常" checked  type="checkbox"/>

						  
					 </div>

					 <div class="k_5 a_g xm k1_status_class" >

                         <div style="width:auto;margin-left:40px;padding-bottom:0px">

							 <font class="gj xm" style="width:auto;"><font class="lie_3">有无畸形</font>
										 <input name="k5_jixing" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
										 <input name="k5_jixing" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							 </font>
							 
							 <font class="gj xm" style="width:auto;"><font class="lie_3">有无侧弯</font>
										 <input name="k5_cewan" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
										 <input name="k5_cewan" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							 </font>

							 <font class="gj xm" style="width:auto;"><font class="lie_3">有无前突</font>
										 <input name="k5_qiantu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
										 <input name="k5_qiantu" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							 </font>

							


						 </div>

						 <div style="width:auto;margin-left:40px;padding-bottom:0px;margin-top:12px;">

						      <font class="gj xm" style="width:auto;"><font class="lie_3">有无后突</font>
										 <input name="k5_houtu" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
										 <input name="k5_houtu" type2="radio" lay-skin="primary" value="无" title="无" checked  type="checkbox"/>
							 </font>

							 <font class="gj xm" style="width:auto;"><font class="lie_3">有无叩击痛</font>
										 <input name="k5_jitong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
										 <input name="k5_jitong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							 </font>

                             <font class="gj xm" style="width:auto;"><font class="lie_3">有无压痛</font>
										 <input name="k5_yatong" type2="radio" lay-skin="primary" value="有" title="有"  type="checkbox"/>
										 <input name="k5_yatong" type2="radio" lay-skin="primary" value="无" title="无" checked type="checkbox"/>
							 </font>

						 </div>
                           
					 </div>

					 <div class="e_1 a_g k1_status_class">
								 <font class="a_title" style="margin-left:12px;color:red;width:auto;">*若有叩击痛或者压痛请在附图中标注</font>
									 <div class="xm" style="width:600px;padding-left:12px;margin-top:8px">
										<div class="layui-btn layui-btn-normal" onclick="openTC2(this,'q15');">前往标注</div>
								 </div>
				     </div>


				</div>
				<!-- 神经反射结束 --><%--
                <div id="submitBtn" class="layui-btn layui-btn-normal"  onclick="getJSON(this);">提交</div>
		   --%></div>

		   <div class="clear" style="clear:both;"></div> 

	   </form>
	
       <!--表单结束-->
   </div>   
  <!-- 总页面外层End -->
  <!-- 下面是隐藏的弹出页面 -->
  <div id="tc" style="display: none;">
<div class="box">
       <div class="content_" oncontextmenu="return false;">
	      <div class="back_com back_1" oncontextmenu="return false;">
			<!--  <canvas id="canvasId" width="500" height="500"></canvas>-->
		  </div>
		   <div class="back_com back_2 back_noshow" oncontextmenu="return false;"> </div>
		   <div class="back_com back_3 back_noshow" oncontextmenu="return false;"> </div>
		   <div class="back_com back_4 back_noshow" oncontextmenu="return false;" style=""> </div>
		   <div class="back_com back_5 back_noshow" oncontextmenu="return false;" style=""> </div>
		   <div class="back_com back_6 back_noshow" oncontextmenu="return false;" style=""></div>
		   <div class="back_com back_7 back_noshow" oncontextmenu="return false;"> </div> 
		   <div class="back_com back_8 back_noshow" oncontextmenu="return false;"> </div>
		   <div class="back_com back_9 back_noshow" oncontextmenu="return false;"> </div>
		   <div class="back_com back_10 back_noshow" oncontextmenu="return false;"> </div>
		   <div class="back_com back_11 back_noshow" oncontextmenu="return false;"> </div>
		   <div class="back_com back_12 back_noshow" oncontextmenu="return false;"> </div>
		   <div class="back_com back_13 back_noshow" oncontextmenu="return false;"> </div>
	   </div>
       <div class="right_menu"><u></u>
		   <!--<img onclick="flog_('b');" src="<%=contextPath %>/static/ck_images/b2.svg" style="width: 28px;margin-left: 11px;" data="b" class="img_g eleType_show"/>--> <!-- 闪光点 -->
		   <img onclick="flog_('yuanxingkong_wen');" src="<%=contextPath %>/static/ck_images/yuanxingkong_wen.svg" data="b" class="img_g  eleType_wen "/><!-- 空心圆-问 -->
		   <img onclick="flog_('yuanxingshi_wen');" src="<%=contextPath %>/static/ck_images/yuanxingshi_wen.svg" data="b" class="img_g  eleType_wen "/><!-- 实心圆-问 -->
		   <img onclick="flog_('fangxingkong_wen');" src="<%=contextPath %>/static/ck_images/fangxingkong_wen.svg" data="b" class="img_g  eleType_wen "/><!-- 矩形空心-问 -->
		   <img onclick="flog_('fangxingshi_wen');" src="<%=contextPath %>/static/ck_images/fangxingshi_wen.svg" data="b" class="img_g  eleType_wen "/><!-- 矩形实心-问 -->
		   <img onclick="flog_('zhixian_wen');" src="<%=contextPath %>/static/ck_images/zhixian_wen.svg" data="b" class="img_g  eleType_wen "/><!-- 直线-问 -->

		   <img onclick="flog_('yuanxingkong_wang');" src="<%=contextPath %>/static/ck_images/yuanxingkong_wang.svg" data="b" class=" img_g eleType_wang"/><!-- 空心圆-望 -->
		   <img onclick="flog_('yuanxingshi_wang');" src="<%=contextPath %>/static/ck_images/yuanxingshi_wang.svg" data="b" class=" img_g eleType_wang"/><!-- 实心圆-望 -->
		   <img onclick="flog_('fangxingkong_wang');" src="<%=contextPath %>/static/ck_images/fangxingkong_wang.svg" data="b" class=" img_g eleType_wang"/><!-- 矩形空心-望 -->
		   <img onclick="flog_('fangxingshi_wang');" src="<%=contextPath %>/static/ck_images/fangxingshi_wang.svg" data="b" class=" img_g eleType_wang"/><!-- 矩形实心-望 -->
		   <img onclick="flog_('zhixian_wang');" src="<%=contextPath %>/static/ck_images/zhixian_wang.svg" data="b" class=" img_g eleType_wang"/><!-- 直线-望 -->

		   <img onclick="flog_('yuanxingkong_qie');" src="<%=contextPath %>/static/ck_images/yuanxingkong_qie.svg" data="b" class="img_g  eleType_qie"/><!-- 空心圆-切 -->
		   <img onclick="flog_('yuanxingshi_qie');" src="<%=contextPath %>/static/ck_images/yuanxingshi_qie.svg" data="b" class="img_g  eleType_qie"/><!-- 实心圆-切 -->
		   <img onclick="flog_('fangxingkong_qie');" src="<%=contextPath %>/static/ck_images/fangxingkong_qie.svg" data="b" class="img_g  eleType_qie"/><!-- 矩形空心-切 -->
		   <img onclick="flog_('fangxingshi_qie');" src="<%=contextPath %>/static/ck_images/fangxingshi_qie.svg" data="b" class="img_g  eleType_qie"/><!-- 矩形实心-切 -->
		   <img onclick="flog_('zhixian_qie');" src="<%=contextPath %>/static/ck_images/zhixian_qie.svg" data="b" class="img_g  eleType_qie"/><!-- 直线-切 -->

		   <img onclick="flog_('bsvg');" src="<%=contextPath %>/static/ck_images/b.svg" data="b" class="img_g  eleType_TMT"/><!-- 空心圆-tmt -->
		   <img onclick="flog_('yuanshixinsvg');" src="<%=contextPath %>/static/ck_images/yuanshixin.svg" data="b" class="img_g  eleType_TMT"/><!-- 实心圆-tmt -->
		   <img onclick="flog_('juxingKongsvg');" src="<%=contextPath %>/static/ck_images/juxingKong.svg" data="b" class="img_g  eleType_TMT"/><!-- 矩形空心-tmt -->
		   <img onclick="flog_('juxingShi1svg');" src="<%=contextPath %>/static/ck_images/juxingShi1.svg" data="b" class="img_g  eleType_TMT"/><!-- 矩形实心-tmt -->
		   <img onclick="flog_('zhiXian1svg');" src="<%=contextPath %>/static/ck_images/zhiXian1.svg" data="b" class="img_g  eleType_TMT"/><!-- 直线-tmt -->
		   <div>
			   <img class="jiantou_img_g" src="<%=contextPath %>/static/ck_images/zuojiantou.svg"  onMouseDown="zhixianZuoDown(this,1);" onmouseup="zhixianmoveup();" onmouseout="zhixianmoveout();">
			   <img class="jiantou_img_g" src="<%=contextPath %>/static/ck_images/youjiantou.svg"  onMouseDown="zhixianZuoDown(this,2);" onmouseup="zhixianmoveup();" onmouseout="zhixianmoveout();">
		   </div>
		   <div class="eleType eleType_show_wen eleType_show_title" style="margin-top:30px;cursor: pointer;" onclick="changEleType(this,'wen');">问诊</div>
		   <div class="eleType eleType_show_wang" style="cursor: pointer;" onclick="changEleType(this,'wang');">望诊</div>
		   <div class="eleType eleType_show_qie" style="cursor: pointer;" onclick="changEleType(this,'qie');">切诊</div>
		   <div class="eleType" style="cursor: pointer;" onclick="changEleType(this,'TMT');">TMT检查</div>
	   </div>
	   <div class="bottom_menu">
	       <div class="btn_l back_title_1 selected" onclick="changeBackground(this,1);">正面</div>
		   <div class="btn_l back_title_2" onclick="changeBackground(this,2);">侧面</div>
		   <div class="btn_l back_title_3" onclick="changeBackground(this,3);">背面</div>
		   <div class="btn_l back_title_4" onclick="changeBackground(this,4);">舌下</div>
		   <div class="btn_l back_title_5" onclick="changeBackground(this,5);">眼睛</div>
		   <div class="btn_l back_title_6" onclick="changeBackground(this,6);">左耳朵</div>
		   <div class="btn_l back_title_7" onclick="changeBackground(this,7);">右耳朵</div>
		   <div class="btn_l back_title_8" onclick="changeBackground(this,8);">舌象</div>
		   <div class="btn_l back_title_9" onclick="changeBackground(this,9);">头正面</div>
		   <div class="btn_l back_title_10" onclick="changeBackground(this,10);">头左面</div>
		   <div class="btn_l back_title_11" onclick="changeBackground(this,11);">头右面</div>
		   <div class="btn_l back_title_12" onclick="changeBackground(this,12);">头背面</div>
		   <div class="btn_l back_title_13" onclick="changeBackground(this,13);">腹部</div>
	   </div>
	<div class="btn_submit" style="position: absolute; bottom: 18px;left: 190px;">
		<div class="layui-btn" lay-submit lay-filter="formDemo" onclick="closeTC(this);"
			 style="width:80px;font-size:16px;letter-spacing:1px;height: 30px;line-height: 30px;border-radius:5px;background-color: #00c8c8;" >返回</div>
	</div>
</div>
</div>
<!-- 隐藏的弹窗界面end -->
  </body>

<script type="text/javascript">
function flog_(obj){
    var flogName="";
    var morenStyle="width:35px;height:35px;";
    var htmlImg;
    if(obj=="b"){
        flogName="b.gif";
    }else if(obj=="bsvg"){
        flogName="b.svg";
    }else if(obj=="yuanshixinsvg"){
        flogName="yuanshixin.svg";
    }else if(obj=="tuoYuanKongsvg"){
        flogName="tuoYuanKong.svg";
    }else if(obj=="tuoYuanShisvg"){
        flogName="tuoYuanShi.svg";
    }else if(obj=="juxingKongsvg"){
        flogName="juxingKong.svg";
    }else if(obj=="juxingShi1svg"){
        flogName="juxingShi1.svg";
      //  morenStyle ="width:35px;height:23px;"
    }else if(obj=="zhiXian1svg"){
        flogName="zhiXian1.svg";
      //  htmlImg ='<div style="width:10px;height:10px;position: absolute;left:50%;top:0px;font-size:8px;z-index: 100;" onclick="alert(1);">左</div>';
    }else{
        flogName=obj+".svg";
    }
    console.log(flogName);
    //增加新的标注 background-image:url(/static/ck_images/'+flogName+'); 
    htmlImg='<div ondblclick="clickU(this);" oncontextmenu="return false;" onMousewheel="mowheel(this);" onMouseOver="momover();" onMouseOut="moveup();" onMouseUp="moveup2();" onMouseDown="movedown_(this);" onMouseMove="movemove(this);"    style="background-image:url(<%=contextPath %>/static/ck_images/'+flogName+');'+morenStyle+'" data="'+obj+'" class="img_g move_img question '+remQuestionNum+'"></div>';
    if(obj=="zhiXian1svg" || obj=="zhixian_wen" || obj=="zhixian_wang" || obj=="zhixian_qie"){
        morenStyle ="width:32px;height:32px;";
        htmlImg='<div ondblclick="clickU(this);" oncontextmenu="return false;" onMousewheel="mowheel(this);" onMouseOver="momover();" onMouseOut="moveup();" onMouseUp="moveup2();" onMouseDown="movedown_(this);" onMouseMove="movemove(this);" onclick="zhixianShow(this);"    style="transform: rotate(0deg);background-image:url(<%=contextPath %>/static/ck_images/'+flogName+');'+morenStyle+'" data="'+obj+'" class="img_g move_img zhixianbiankuang  question '+remQuestionNum+'" datarotate="0"> </div>';
    }
    //var oldHtml=($("#LAY_layuiproCeshi").find(".back_"+content_back_value).html()+htmlImg);
    //$("#LAY_layuiproCeshi").find(".back_"+content_back_value).html(oldHtml);
    console.log(htmlImg);
    $("#LAY_layuiproCeshi").find(".back_"+content_back_value).append(htmlImg);
}

</script>
</html>

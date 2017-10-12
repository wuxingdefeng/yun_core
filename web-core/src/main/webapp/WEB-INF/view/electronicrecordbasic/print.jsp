<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=contextPath %>/static/layui-master/src/css/layui.css">
	<!-- 自定义工具css -->
	<link rel="stylesheet" href="<%=contextPath %>/static/my/eletronicRecord/common.css">
	<link rel="stylesheet" href="<%=contextPath %>/static/my/system/print.css">
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
	</style>
  </head>
  <body style="background: #fff;">
<%--<input name="jsondata" id="jsondata" value="" type="hidden"> --%>
<div class="print_Allcotent" >
	<div class="print_title_all">
		<div class="print_title_date">
		<div class="print_title_date_content">
		<div class="print_title_date_content_spantitle">填表日期：</div>
		<div class="print_title_date_content_span">${electronicrecordbasic.create_date }</div> 
		<div class="print_title_date_content_spantitle" style="width:60px;">编号：</div>
		<div class="print_title_date_content_span"></div>
		</div>
		</div>
		<div class="print_title_context">个人资料</div>
	</div>
	<div style="width:700px;margin:0 auto;color:#666;">
		<div class="content_title">一、基本信息</div>
		<div class="content_t1">
		<div class="content_t1_1">姓名：</div>
		<div class="content_t1_1 showcontent">${electronicrecordbasic.jsondataMap.name }</div>
		<div class="content_t1_1" style="margin-left:40px;">性别：</div>
		<div class="content_t1_1 showcontent">${electronicrecordbasic.jsondataMap.sex }</div>
		<div class="content_t1_1" style="margin-left:55px;">出生日期：</div>
		<div class="content_t1_1 showcontent" style="width:100px;">${electronicrecordbasic.jsondataMap.birthday }</div>
		<div class="content_t1_1" style="margin-left:70px;">年龄：</div>
		<div class="content_t1_1 showcontent">${electronicrecordbasic.jsondataMap.age }</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">婚姻：</div>
		<div class="content_t1_1 showcontent">${electronicrecordbasic.jsondataMap.marriage }</div>
		<div class="content_t1_1" style="margin-left:40px;">职业：</div>
		<div class="content_t1_1 showcontent" style="width:160px;">${electronicrecordbasic.jsondataMap.pation }</div>
		<div class="content_t1_1" style="margin-left:20px;">联系方式：</div>
		<div class="content_t1_1 showcontent" style="width:234px;">${electronicrecordbasic.jsondataMap.phone }</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">长期居住地址：</div>
		<div class="content_t1_1 showcontent" style="width:254px;">${electronicrecordbasic.jsondataMap.change_address }</div>
		<div class="content_t1_1" style="margin-left:20px;">通讯地址：</div>
		<div class="content_t1_1 showcontent" style="width:234px;">${electronicrecordbasic.jsondataMap.phone_address }</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">最不舒服的地方：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:254px;">${electronicrecordbasic.jsondataMap.bing }</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">满分是9分，您觉得您的症状程度有</div>
		<div class="content_t1_1 showcontent">${electronicrecordbasic.jsondataMap.inter }</div>
		分
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">您曾患有何种疾病：</div>
		<div class="content_t1_1 showcontent" style="width:254px;">${electronicrecordbasic.jsondataMap.jibing }</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">您是否有手术史：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:254px;">
		<c:if test="${electronicrecordbasic.jsondataMap.shoushushi=='是'}">${electronicrecordbasic.jsondataMap.shoushushi_text }</c:if>
		<c:if test="${electronicrecordbasic.jsondataMap.shoushushi=='否'}">${electronicrecordbasic.jsondataMap.shoushushi }</c:if>
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">您是否有家族史：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:254px;">
		<c:if test="${electronicrecordbasic.jsondataMap.jiazushi=='是'}">${electronicrecordbasic.jsondataMap.jiazushi_text }</c:if>
		<c:if test="${electronicrecordbasic.jsondataMap.jiazushi=='否'}">${electronicrecordbasic.jsondataMap.jiazushi }</c:if>
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">您是否有过敏史：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:254px;">
		<c:if test="${electronicrecordbasic.jsondataMap.guominshi=='是'}">${electronicrecordbasic.jsondataMap.guominshi_text }</c:if>
		<c:if test="${electronicrecordbasic.jsondataMap.guominshi=='否'}">${electronicrecordbasic.jsondataMap.guominshi }</c:if>
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">您存在的病史有：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:254px;">
		<c:if test="${!empty electronicrecordbasic.jsondataMap.bingshi}">${electronicrecordbasic.jsondataMap.bingshi }</c:if>
		<c:if test="${empty electronicrecordbasic.jsondataMap.bingshi}">无</c:if>
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">舌像：</div>
		<div class="content_t1_1">舌体：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.st}
		</div>
		<div class="content_t1_1">舌质：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.sz}
		</div>
		<div class="content_t1_1">，舌苔：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.tz}
		</div>
		</div>
		
		<div class="show_q3_8 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_8">
					
				</div>
			</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">舌下脉络：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.sxml}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">脉象</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">左：</div>
		<div class="content_t1_1">整体</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.left_zhengti}
		</div>
		<div class="content_t1_1">寸</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.left_cun}
		</div>
		<div class="content_t1_1">关</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.left_guan}
		</div>
		<div class="content_t1_1">尺</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.left_chi}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">右：</div>
		<div class="content_t1_1">整体</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.right_zhengti}
		</div>
		<div class="content_t1_1">寸</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.right_cun}
		</div>
		<div class="content_t1_1">关</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.right_guan}
		</div>
		<div class="content_t1_1">尺</div>
		<div class="content_t1_1 showcontent" style="width:100px;">
		${electronicrecordbasic.jsondataMap.right_chi}
		</div>
		</div>
		<!-- 女性问卷start -->
		<c:if test="${electronicrecordbasic.jsondataMap.sex =='女'}">
		<div style="widht:100%;text-align: center;height: 30px;line-height: 30px;color:#787878;font-size:18px;">
		女性补充资料
		</div>
		<div class="content_t1">
		<div class="content_t1_1">孕：</div>
		<div class="content_t1_1 showcontent" style="width:60px;">
		${electronicrecordbasic.jsondataMap.yun}
		</div>
		<div class="content_t1_1">生：</div>
		<div class="content_t1_1 showcontent" style="width:60px;">
		${electronicrecordbasic.jsondataMap.sheng}
		</div>
		<div class="content_t1_1">流产：</div>
		<div class="content_t1_1 showcontent" style="width:60px;">
		${electronicrecordbasic.jsondataMap.liuchan}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">是否顺产：</div>
		<div class="content_t1_1 showcontent" style="width:160px;">
		${electronicrecordbasic.jsondataMap.shunchan}
		</div>
		<div class="content_t1_1">是否剖宫产：</div>
		<div class="content_t1_1 showcontent" style="width:160px;">
		${electronicrecordbasic.jsondataMap.paogongchan}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">是否早产：</div>
		<div class="content_t1_1 showcontent" style="width:160px;">
		${electronicrecordbasic.jsondataMap.zaochan}
		</div>
		<div class="content_t1_1">是否难产：</div>
		<div class="content_t1_1 showcontent" style="width:160px;">
		${electronicrecordbasic.jsondataMap.nanchan}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">月经史</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(1)月经规律性：</div>
		<div class="content_t1_1 showcontent" style="width:160px;">
		${electronicrecordbasic.jsondataMap.yjgl}
		<c:if test="${electronicrecordbasic.jsondataMap.yjgl=='推后'}">
			${electronicrecordbasic.jsondataMap.yjgl_h} 天
		</c:if>
		
		<c:if test="${electronicrecordbasic.jsondataMap.yjgl=='推后'}">
			${electronicrecordbasic.jsondataMap.yjgl_q} 天
		</c:if>
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(2)月经周期：</div>
		<div class="content_t1_1 showcontent" style="width:300px;">
		两次月经头天间隔${electronicrecordbasic.jsondataMap.jgt}天
		行径${electronicrecordbasic.jsondataMap.xjt}天
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(3)月经量：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:300px;">
		${electronicrecordbasic.jsondataMap.yjl}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(4)月经颜色：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:300px;">
		${electronicrecordbasic.jsondataMap.yjys}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(5)月经质量：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:300px;">
		${electronicrecordbasic.jsondataMap.yjzl}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(6)是否痛经：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:300px;">
		${electronicrecordbasic.jsondataMap.sftj}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(7)上次月经时间：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:300px;">
		${electronicrecordbasic.jsondataMap.yjdate}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">(8)是否绝经：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:300px;">
		${electronicrecordbasic.jsondataMap.sfjj}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">白带情况：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:300px;">
		${electronicrecordbasic.jsondataMap.bd}
		</div>
		</div>
		</c:if>
		<!-- 女性问卷end -->
		<!-- 疼痛问卷start   -->
		<c:if test="${electronicrecordbasic.jsondataMap.bing=='颈肩腰腿疼' }" >
		<div style="widht:100%;text-align: center;height: 30px;line-height: 30px;color:#787878;font-size:18px;">
		疼痛问卷
		</div>
		<div class="content_t1">
		<div class="content_t1_1">此症状发生有多久了？</div>
		<div class="content_t1_1 showcontent" style="width:300px;">
		${electronicrecordbasic.jsondataMap.bing21_rj}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">最近加重多久了？</div>
		<div class="content_t1_1 showcontent" style="width:300px;">
		${electronicrecordbasic.jsondataMap.bing22_jiazhong}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">1：疼痛的部位</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing23_buwei}
		</div>
		</div>
		
		<div class="show_q1_1 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_1">
					
				</div>
			</div>
		</div>
		<div class="show_q1_2 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_2">
					
				</div>
			</div>
		</div>
		<div class="show_q1_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">2：感觉疼痛的位置在哪一层</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing24_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">3：疼痛的性质 (有疼痛的部位填写,可多选)</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">头部?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing251_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">颈部?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing252_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">腰背部?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing253_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">胸腹部?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing254_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">大腿部?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing255_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">小腿部?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing256_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">手?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing257_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">脚?</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing258_buwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">4：疼痛时间规律</div>
		<div class="content_t1_1 showcontent" style="width:450px;">
		${electronicrecordbasic.jsondataMap.bing26_tengtongTime}
		一天之中疼痛时间特点：
		${electronicrecordbasic.jsondataMap.bing26_tengtongTime_txt}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">5：您的疼痛和以下那种因素有关</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing27_tengtongyinsu}
		一天之中疼痛时间特点：
		${electronicrecordbasic.jsondataMap.bing27_tengtongyinsu_txt}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">6：您还有以下哪种情况？</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing28_qingkuang}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">胆囊问题：</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing28_qingkuang_danlan}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">乳腺问题：</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing28_qingkuang_ruxian}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">脾胃不适：</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing28_qingkuang_piwei}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">7：疼痛附近有外伤史？</div>
		<div class="content_t1_1 showcontent" style="width:auto;">
		${electronicrecordbasic.jsondataMap.bing29_waishang}
		</div>
		</div>
		
		<div class="show_q2_1 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_1">
					
				</div>
			</div>
		</div>
		<div class="show_q2_2 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_2">
					
				</div>
			</div>
		</div>
		<div class="show_q2_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">8：做过核磁共振、CT、肌电图、血管、B超等检查?</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">结果：</div>
		<div class="content_t1_1 showcontent" style="width:400px;">
		${electronicrecordbasic.jsondataMap.bing2a_jianchaqingkuang}
		</div>
		</div>
		</c:if>
		<!-- 疼痛问卷end -->
		<div class="content_title">二、一般情况</div>
		<div class="content_t1">
		<div class="content_t1_1">体型：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.tixing}
		</div>
		</div>
		
		<div class="show_q4_1 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_1">
					
				</div>
			</div>
		</div>
		
		<div class="show_q4_2 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_2">
					
				</div>
			</div>
		</div>
		
		<div class="show_q4_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">睡眠：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.shuimin}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">饮食：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.yinshi}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">饮水：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.yinshui}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">口中：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.kouzhong}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">大便：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.dabian}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">小便：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.xiaobian}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">寒热是否是局部：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.hanre_status}
		</div>
		</div>
		
		<div class="show_q5_1 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_1">
					
				</div>
			</div>
		</div>
		
		<div class="show_q5_2 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_2">
					
				</div>
			</div>
		</div>
		
		<div class="show_q5_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>

		<div class="content_t1">
		<div class="content_t1_1">出汗：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.chuhanSelect}
		</div>
		</div>

	<div class="show_q16_1 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_1">
					
				</div>
			</div>
		</div>
		
		<div class="show_q16_2 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_2">
					
				</div>
			</div>
		</div>
		
		<div class="show_q16_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>

		<div class="content_t1">
		<div class="content_t1_1">情志：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.qingzhi}
		</div>
		</div>
		
		<div class="content_title">三、望、切诊</div>
		
		<div class="content_t1">
		<div class="content_t1_1">头面部：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.toumianbu}
		</div>
		</div>
		
		<div class="show_q6_9 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_9">
					
				</div>
			</div>
		</div>
		
		<div class="show_q6_10 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_10">
					
				</div>
			</div>
		</div>
		
		<div class="show_q6_11 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_11">
					
				</div>
			</div>
		</div>
		
		<div class="show_q6_12 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_12">
					
				</div>
			</div>
		</div>
		<!-- 眼睛开始 -->
		<div class="content_t1">
		<div class="content_t1_1">眼睛
		<c:if test="${electronicrecordbasic.jsondataMap.toumianbu_yan=='全正常'}">：全正常</c:if>
		</div>
		</div>
		
		<c:if test="${empty electronicrecordbasic.jsondataMap.toumianbu_yan}">
		<div class="content_t1">
		<div class="content_t1_1">眼睑（胞睑/肉轮）：</div>
		<div class="content_t1_1">是否有水肿：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.shuizhong}
		</div>
		<div class="content_t1_1">是否有下垂：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:160px;">
		${electronicrecordbasic.jsondataMap.xiachui}
		</div>
		</div>
		
		<div class="content_t1" style="margin-left:150px;">
		<div class="content_t1_1">是否有充血：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:80px;">
		${electronicrecordbasic.jsondataMap.chongxue}
		</div>
		<div class="content_t1_1">是否有滤泡：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:80px;">
		${electronicrecordbasic.jsondataMap.lvpao}
		</div>
		<div class="content_t1_1">是否关闭不全：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:80px;">
		${electronicrecordbasic.jsondataMap.guanbibuquan}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">眼角（两眦/血轮）：</div>
		<div class="content_t1_1">是否有分泌物：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:80px;">
		${electronicrecordbasic.jsondataMap.fenmiwu}
		</div>
		<div class="content_t1_1">是否有疼痛：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:80px;">
		${electronicrecordbasic.jsondataMap.tentong_status}
		</div>
		<div class="content_t1_1">是否有脓肿：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:80px;">
		${electronicrecordbasic.jsondataMap.chongxue}
		</div>
		</div>
		
		<div class="show_q7_5 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_5">
					
				</div>
			</div>
		</div>
		
		
		<div class="content_t1">
		<div class="content_t1_1">结/巩膜（白睛/气轮）：</div>
		<div class="content_t1_1">是否有充血：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.d3_chongxue}
		</div>
		<div class="content_t1_1">是否有出血：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.d3_chuxue}
		</div>
		<div class="content_t1_1">是否有滤泡：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.d3_lvpao}
		</div>
		<div class="content_t1_1">是否有黄染：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.d3_huangran}是
		</div>
		</div>
		
		<div class="show_q8_5 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_5">
					
				</div>
			</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">角膜（黑睛/风轮）：</div>
		<div class="content_t1_1">是否有浑浊：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d4_hunzhuo}
		</div>
		<div class="content_t1_1">是否有异变：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d4_yibian}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">瞳孔（瞳神/水轮）：</div>
		<div class="content_t1_1">是否对光反应灵敏：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d5_lingmian}
		</div>
		<div class="content_t1_1">是否两侧等大等圆：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d5_dengyuan}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">眼球：</div>
		<div class="content_t1_1">是否活动正常：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d6_active}
		</div>
		<div class="content_t1_1">是否有震颤：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d6_zhenchan}
		</div>
		</div>
		
		<div class="content_t1" style="margin-left:47px;">
		<div class="content_t1_1">是否有斜视：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d6_xieshi}
		</div>
		<div class="content_t1_1">是否有充血：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.d6_chongxue}
		</div>
		</div>
		</c:if>
		<!-- 眼睛结束 -->
		<!-- 耳朵开始  -->
		<div class="content_t1">
		<div class="content_t1_1">耳朵</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">左耳耳廊描述：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.e1_lefter_text}
		</div>
		<div class="content_t1_1">耳穴探测结果(阳性点)：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.e1_lefter_yangxing}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">右耳耳廊描述：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.e1_righter_text}
		</div>
		<div class="content_t1_1">耳穴探测结果(阳性点)：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.e1_righter_yangxing}
		</div>
		</div>
		
		<div class="show_q9_6 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_6">
					
				</div>
			</div>
		</div>
		
		<div class="show_q9_7 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_7">
					
				</div>
			</div>
		</div>
		
		<!-- 耳朵end -->
		<!-- 口咽,甲状腺,胸部开始 -->
		<div class="content_t1">
		<div class="content_t1_1">口咽,甲状腺,胸部</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">口咽
		<c:if test="${electronicrecordbasic.jsondataMap.f1_status=='全正常'}">：全正常</c:if>
		</div>
		</div>
		
		<c:if test="${empty electronicrecordbasic.jsondataMap.f1_status}">
		<div class="content_t1">
		<div class="content_t1_1">扁桃体</div>
		<div class="content_t1_1">有无肿大：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.f2_zhongda}
		</div>
		<div class="content_t1_1">有无充血：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.f2_chongxue}
		</div>
		<div class="content_t1_1">有无异常分泌物：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.f2_fenmiwu}
		</div>
		</div>
		</c:if>
		
		<c:if test="${empty electronicrecordbasic.jsondataMap.f1_status}">
		<div class="content_t1">
		<div class="content_t1_1">咽</div>
		<div class="content_t1_1">有无充血：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.f3_chongxue}
		</div>
		<div class="content_t1_1">有无滤泡：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.f3_lvpao}
		</div>
		</div>
		</c:if>
		<div class="content_t1">
		<div class="content_t1_1">甲状腺</div>
		<div class="content_t1_1">有无肿大：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.f4_zhongda}
		</div>
		<div class="content_t1_1">有无结节：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.f4_jiejie}
		</div>
		<div class="content_t1_1">有无肿块：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.f4_zhongkuai}
		</div>
		<div class="content_t1_1">若有大小：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.f4_b}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">胸部
		<c:if test="${electronicrecordbasic.jsondataMap.f5_xiongbu=='全正常'}">：全正常</c:if>
		</div>
		</div>
		<c:if test="${empty electronicrecordbasic.jsondataMap.f5_xiongbu}">
		<div class="content_t1">
		<div class="content_t1_1">有无压痛：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:50px;">
		${electronicrecordbasic.jsondataMap.f5_yatong}
		</div>
		<div class="content_t1_1">有无肿块：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:50px;">
		${electronicrecordbasic.jsondataMap.f5_zhongkuaih}
		</div>
		<div class="content_t1_1">有无结节：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:50px;">
		${electronicrecordbasic.jsondataMap.f5_jiejieh}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">乳房</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无桔皮样外观:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.f6_jiepiwaiguan}
		</div>
		<div class="content_t1_1">有无干湿性罗音、哮鸣音：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.f6_xiaoming}
		</div>
		</div>
		</c:if>
		<!-- 口咽,甲状腺,胸部end-->
		<!-- 腹部开始 -->
		<div class="content_t1">
		<div class="content_t1_1">腹部
		<c:if test="${electronicrecordbasic.jsondataMap.g1_status=='全正常'}">：全正常</c:if>
		</div>
		</div>
		<c:if test="${empty electronicrecordbasic.jsondataMap.g1_status}">
		<div class="content_t1">
		<div class="content_t1_1">望诊</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无皮疹、片区色素带:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g2_pizhen}
		</div>
		<div class="content_t1_1">有无疤痕：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g2_baheng}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无肿块:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g2_zhongkuai}
		</div>
		<div class="content_t1_1">有无颈静脉曲张：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g2_jinmaiqu}
		</div>
		</div>
		
		<div class="show_q10_13 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_13">
					
				</div>
			</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">触诊</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无异常温度处（手触局部有过热或者过凉）:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g3_wenduyichang}
		</div>
		<div class="content_t1_1">有无肿块、结节、条索：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g3_zhongkuai_jiejie}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无异常高张力点:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g3_zhanglidian}
		</div>
		<div class="content_t1_1">有无压痛、反跳痛：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g3_yatong}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无肝脏压痛 、囊肿:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g3_ganzhangyatong}
		</div>
		<div class="content_t1_1">胆囊压痛:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g3_danlang}
		</div>
		<div class="content_t1_1">有无输尿管压痛点：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.g3_shuniaoyatong}
		</div>
		</div>
		<div class="show_q11_13 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_13">
					
				</div>
			</div>
		</div>
		</c:if>
		<!-- 腹部end -->
		<!-- 四肢开始 -->
		<div class="content_t1">
		<div class="content_t1_1">四肢
		<c:if test="${electronicrecordbasic.jsondataMap.h1_status=='全正常'}">：全正常</c:if>
		</div>
		</div>
		<c:if test="${empty electronicrecordbasic.jsondataMap.h1_status}">
		<div class="content_t1">
		<div class="content_t1_1">望诊</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无皮疹、片区色素带:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_pizhen}
		</div>
		<div class="content_t1_1">有无疤痕：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_baheng}
		</div>
		<div class="content_t1_1">有无肿块：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_zhongkuai}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无颈静脉曲张:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_jinmaiqu}
		</div>
		<div class="content_t1_1">有无骨折：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_guzhe}
		</div>
		<div class="content_t1_1">有无水肿：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_shuizhong}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无畸形:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_jixing}
		</div>
		<div class="content_t1_1">有无外伤：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_waishang}
		</div>
		<div class="content_t1_1">有无活动异常：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h2_active}
		</div>
		</div>
		<div class="show_q12_1 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_1">
					
				</div>
			</div>
		</div>
		<div class="show_q12_2 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_2">
					
				</div>
			</div>
		</div>
		<div class="show_q12_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">触诊</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无异常温度处（手触局部有过热或者过凉）:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h3_wendu}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无肿块、结节、条索:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h3_zhongkuai}
		</div>
		<div class="content_t1_1">有无异常高张力点：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h3_yichangli}
		</div>
		<div class="content_t1_1">有无压痛：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.h3_yatong}
		</div>
		</div>
		</c:if>
		<!-- 四肢end -->
		<!-- 项背腰部开始 -->
		<div class="content_t1">
		<div class="content_t1_1">项背腰部</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">望诊</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">皮疹/片区色素带:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i1_pizhen}
		</div>
		<div class="content_t1_1">有无疤痕：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i1_baheng}
		</div>
		<div class="content_t1_1">有无肿块：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i1_zhongkuai}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无颈静脉怒张:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i1_jinmainu}
		</div>
		<div class="content_t1_1">有无水肿：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i1_shuizhong}
		</div>
		<div class="content_t1_1">有无外伤：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i1_waishang}
		</div>
		</div>
		<div class="content_t1">
		<div class="content_t1_1">有无活动受限:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i1_acitve}
		</div>
		</div>
		<div class="show_q13_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">触诊</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无异常温度处（手触局部有过热或者过凉）:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i2_wendu}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">肿块/结节/条索:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i2_zhongkuai}
		</div>
		<div class="content_t1_1">异常高张力点：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i2_yichangli}
		</div>
		<div class="content_t1_1">有无压痛：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i2_yatong}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无肾压痛:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i2_shengyatong}
		</div>
		<div class="content_t1_1">有无叩击痛：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.i2_koujitong}
		</div>
		</div>
		<div class="show_q14_3 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_3">
					
				</div>
			</div>
		</div>
		<!-- 项背腰部end-->
		<!-- 神经系统开始 -->
		<div class="content_t1">
		<div class="content_t1_1">神经系统
		<c:if test="${electronicrecordbasic.jsondataMap.j1_status=='全正常'}">：全正常</c:if>
		</div>
		</div>
		<c:if test="${empty electronicrecordbasic.jsondataMap.j1_status}">
		<div class="content_t1">
		<div class="content_t1_1">是否有痛觉、温度觉、 触觉 异常:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_tongjue}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_miangan}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_queshi}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">肌肉有无紧张及萎缩、瘫痪:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_jirou}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_chihuan}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_jingluan}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">共无济运动异常:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_yundong}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_zhibishiyan}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_duizhishiyan}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:100px;">
		${electronicrecordbasic.jsondataMap.j2_luntidongzuo}
		</div>
		</div>
		</c:if>
		<!-- 神经系统end-->
		<!-- 神经反射开始 -->
		<div class="content_t1">
		<div class="content_t1_1">神经反射
		<c:if test="${electronicrecordbasic.jsondataMap.k1_status=='全正常'}">：全正常</c:if>
		</div>
		</div>
		<c:if test="${empty electronicrecordbasic.jsondataMap.k1_status}">
		<div class="content_t1">
		<div class="content_t1_1">神经反射:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k2_status}
		</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k2_weizhi}
		</div>
		存在 腹壁反射
		</div>
		<div class="content_t1">
		<div class="content_t1_1">存在：</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:auto;">
		${electronicrecordbasic.jsondataMap.k3_Hoffmonn} 
		${electronicrecordbasic.jsondataMap.k3_Babinski} 
		${electronicrecordbasic.jsondataMap.k3_Gordon} 
		${electronicrecordbasic.jsondataMap.k3_Chaddock} 
		${electronicrecordbasic.jsondataMap.k3_Kemig}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">脊柱:</div>
		<div class="content_t1_1">有无畸形:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k5_jixing}
		</div>
		<div class="content_t1_1">有无侧弯:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k5_cewan}
		</div>
		<div class="content_t1_1">有无前突:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k5_qiantu}
		</div>
		</div>
		
		<div class="content_t1">
		<div class="content_t1_1">有无后突:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k5_houtu}
		</div>
		<div class="content_t1_1">有无叩击痛:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k5_jitong}
		</div>
		<div class="content_t1_1">有无压痛:</div>
		<div class="content_t1_1 showcontentNoBorder" style="width:35px;">
		${electronicrecordbasic.jsondataMap.k5_yatong}
		</div>
		</div>
		<div class="show_q15_2 " style="width: 449px;height: 425px;position: relative;">
			<div class="content_">
				<div class="back_com back_2">
					
				</div>
			</div>
		</div>
		</c:if>
		<!-- 神经反射end-->
		<div style="widht:100%;height: 50px;"></div>
	</div>
</div>
<div id="yingcang" style="display:none;">
${electronicrecordbasic.htmldata }
</div>
 </body>

 <!-- 图片编辑js（标注图标） -->
<!--layui.js  -->
<script type="text/javascript" src="<%=contextPath %>/static/layer/layui.js"></script>
<script type="text/javascript" src="<%=contextPath %>/static/layui-master/src/layui.js"></script>
<!-- 数据录入js -->
<script src="<%=contextPath %>/static/layer/layer.js"></script>
<%--<script src="<%=contextPath %>/static/my/eletronicRecord/edit.js"></script>
--%><!-- 弹出层js -->
<script src="<%=contextPath %>/static/my/eletronicRecord/jquery.rotate.min.js"></script>
<script src="<%=contextPath %>/static/my/eletronicRecord/chuangti.js"></script>
<script type="text/javascript">
	var questionsShow={"q1":[1,2,3],"q2":[1,2,3],"q3":[8],"q4":[1,2,3],"q5":[1,2,3],
			"q6":[9,10,11,12],"q7":[5],"q8":[5],"q9":[6,7],"q10":[13],
			"q11":[13],"q12":[1,2,3],"q13":[3],"q14":[3],"q15":[2],"q16":[1,2,3]};
$(function(){
	for(var k=0;k<16;k++){
		var intk=parseInt(k+1);
		var qNum = 'q'+intk; //问题css
		var qlist =questionsShow[qNum];
		if(qNum =='q4'){
			console.log(qNum+",qlist:"+qlist);
		}
		for(var j=0;j<qlist.length;j++){
			var get_class='back_'+qlist[j]; //得到获取样式位置
			var show_class = 'show_'+qNum+'_'+qlist[j];//得到展示当前标注的位置，样式
			var Ojbect1 = $("#yingcang").find("."+get_class).find("."+qNum);
			if(qNum =='q4'){
				console.log(get_class+"，Ojbect1:"+Ojbect1.length);
			}
			if(Ojbect1.length>0){
				var html2 = $("#yingcang").find("."+get_class).html();
				if(qNum =='q4'){
				console.log("html2:"+html2);
				}
				$("."+show_class).find("."+get_class).append(html2); //给当前题目加上所有该图片的标注
				$("."+show_class).find("."+get_class).find(".question").addClass("back_noshow"); //给所有标注加上隐藏
				$("."+show_class).find("."+get_class).find("."+qNum).removeClass("back_noshow"); //展示当前题目的标注
			}else{
				$("."+show_class).css("display","none");
			}
			
		}
	}
	//移除所有标注的时间
	$(".question").removeAttr("onMousewheel");
	$(".question").removeAttr("onMouseOver");
	$(".question").removeAttr("onMouseOut");
	$(".question").removeAttr("onMouseUp");
	$(".question").removeAttr("onMouseDown");
	$(".question").removeAttr("onMouseMove");
	$(".question").removeAttr("onclick");
    //给日期放入数据
   // var jsondata = ${electronicrecordbasic.jsondata};
    //console.log(JSON.stringify(jsondata));
    //var json = JSON.parse(jsondata);
    //var json = jsondata.parseJSON();
    //var json = JSON.stringify(jsondata);
   <%-- if(jsondata!=undefined){
    	$("input[name='birthday']").val(jsondata.birthday);
    	$("input[name='yjdate']").val(jsondata.yjdate);
    }
    $("#submitBtnId").remove();
    $("input").attr('readonly','readonly'); 
    $("input[name='birthday']").removeAttr("onclick");
    $("input[name='yjdate']").removeAttr("onclick");--%>
});

</script>
</html>

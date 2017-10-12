<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" href="<%=contextPath %>/static/layui-master/src/css/layui.css">
	<!-- 自定义工具css -->
	<link rel="stylesheet" href="<%=contextPath %>/static/my/eletronicRecord/common.css">
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
  <body>
<%--<input name="jsondata" id="jsondata" value="" type="hidden"> --%>
${electronicrecordbasic.htmldata }
 </body>

 <!-- 图片编辑js（标注图标） -->
<script src="<%=contextPath %>/static/my/eletronicRecord/photo_.js"></script>
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
$(function(){
	$("html, body").animate({scrollTop: $(".a").offset().top-8 }, {duration: 500,easing: "swing"});

    //添加目录索引滚动到相应位置
    $(".catalog_g").click(function(){
        $(".catalog_g_sel").removeClass("catalog_g_sel");
        $(this).addClass("catalog_g_sel");
	    var class_=$(this).attr("data");
	    $("html, body").animate({scrollTop: $("."+class_).offset().top-8 }, {duration: 500,easing: "swing"});
	});
    //给日期放入数据
    var jsondata = ${electronicrecordbasic.jsondata };
    console.log(JSON.stringify(jsondata));
    //var json = JSON.parse(jsondata);
    //var json = jsondata.parseJSON();
    //var json = JSON.stringify(jsondata);
    if(jsondata!=undefined){
    	$("input[name='birthday']").val(jsondata.birthday);
    	$("input[name='yjdate']").val(jsondata.yjdate);
    }
    $("#submitBtnId").remove();
    $("input").attr('readonly','readonly'); 
    $("input[name='birthday']").removeAttr("onclick");
    $("input[name='yjdate']").removeAttr("onclick");
});
<%--
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
    htmlImg='<div ondblclick="clickU(this);" oncontextmenu="return false;" onMousewheel="mowheel(this);" onMouseOver="momover();" onMouseOut="moveup();" onMouseUp="moveup2();" onMouseDown="movedown_(this);" onMouseMove="movemove(this);"    style="background-image:url(<%=contextPath %>/static/ck_images/'+flogName+');'+morenStyle+'" data="'+obj+'" class="img_g move_img"></div>';
    if(obj=="zhiXian1svg" || obj=="zhixian_wen" || obj=="zhixian_wang" || obj=="zhixian_qie"){
        morenStyle ="width:32px;height:32px;"
        htmlImg='<div ondblclick="clickU(this);" oncontextmenu="return false;" onMousewheel="mowheel(this);" onMouseOver="momover();" onMouseOut="moveup();" onMouseUp="moveup2();" onMouseDown="movedown_(this);" onMouseMove="movemove(this);" onclick="zhixianShow(this);"    style="transform: rotate(0deg);background-image:url(<%=contextPath %>/static/ck_images/'+flogName+');'+morenStyle+'" data="'+obj+'" class="img_g move_img zhixianbiankuang" datarotate="0"> </div>';
    }
    //var oldHtml=($("#LAY_layuiproCeshi").find(".back_"+content_back_value).html()+htmlImg);
    //$("#LAY_layuiproCeshi").find(".back_"+content_back_value).html(oldHtml);
    console.log(htmlImg);
    $("#LAY_layuiproCeshi").find(".back_"+content_back_value).append(htmlImg);
}
--%>
</script>
</html>

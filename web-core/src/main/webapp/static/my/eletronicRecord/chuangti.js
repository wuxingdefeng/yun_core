/**
 * Created by Administrator on 2017/7/27.
 */
var indexLayer2;
var content_back_value=1;//记录当前显示的图片，为了标记使用
var remQuestionNum="";
var questionsShow={"q1":[1,2,3],"q2":[1,2,3],"q3":[8],"q4":[1,2,3],"q5":[1,2,3],"q6":[9,10,11,12],"q7":[5]
,"q8":[5],"q9":[6,7],"q10":[13],"q11":[13],"q12":[1,2,3],"q13":[3],"q14":[3],"q15":[2],"q16":[1,2,3]};
//打开弹窗
function openTC(obj,backshow){
	/*var questionBtn = questionsShow['q1'];
	for(var k=0;k<questionBtn.length;k++){
		console.log(questionBtn[k]);
	}*/
	//先修改内部背景并且隐藏其他题目的按钮，只显示本题的按钮
	changeBackground2(backshow);
    var html = $("#tc").html();
    //alert(html);
    indexLayer2 =layer.open({
        type:1
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: ['560px', '550px']
        ,shade: 0.8
        ,id: 'LAY_layuiproCeshi' //设定一个id，防止重复弹出
        //,btn: ['确定']
        ,moveType: 0 //拖拽模式，0或者1
        ,content: html
        ,scrollbar:false
        ,success: function(layero,index){
            //layer.close(indexLayer);
           // canvasXian();
            $(".zhixianbiankuang").each(function(){
                var deg = parseFloat($(this).attr("datarotate"));
                $(this).rotate({ animateTo:deg});
            });
            
        }
    });
}
function openTC2(obj,backshow){
	/*var questionBtn = questionsShow['q1'];
	for(var k=0;k<questionBtn.length;k++){
		console.log(questionBtn[k]);
	}*/
	remQuestionNum =backshow;
	//先修改内部背景并且隐藏其他题目的按钮，只显示本题的按钮
	changeBackground3(backshow);
    var html = $("#tc").html();
    //alert(html);
    indexLayer2 =layer.open({
        type:1
        ,title: false //不显示标题栏
        ,closeBtn: false
        ,area: ['560px', '550px']
        ,shade: 0.8
        ,id: 'LAY_layuiproCeshi' //设定一个id，防止重复弹出
        //,btn: ['确定']
        ,moveType: 0 //拖拽模式，0或者1
        ,content: html
        ,scrollbar:false
        ,success: function(layero,index){
            //layer.close(indexLayer);
           // canvasXian();
        	//隐藏非本问题标注，值显示本问题标注
        	$(".question").addClass("back_noshow");
        	//console.log($(".question").find("."+remQuestionNum));
        	$("."+remQuestionNum).removeClass("back_noshow");
        	//选择定位
            $(".zhixianbiankuang").each(function(){
                var deg = parseFloat($(this).attr("datarotate"));
                $(this).rotate({ animateTo:deg});
            });
        }
    });
}
// 关闭弹窗
function closeTC(obj){
    var html2 = $("#LAY_layuiproCeshi").html();
    $("#tc").html(html2);
    layer.close(indexLayer2);
    $(".zhixianbiankuang").removeClass("redBorder")
    $(".zhixianbiankuang").each(function(){
        var deg = parseFloat($(this).attr("datarotate"));
        $(this).rotate({ animateTo:deg});
    });
}
//改变弹出内部背景
function changeBackground(obj,back) {
    content_back_value = back;
    var backint = parseInt(back);
    $(obj).closest(".bottom_menu").find(".btn_l").removeClass("selected");
    $(".content_").find(".back_com").addClass("back_noshow");
    $(obj).addClass("selected");
    $(".back_"+back).removeClass("back_noshow");

} 
//改变弹出内部背景  修改内部背景并且隐藏其他题目的按钮，只显示本题的按钮
function changeBackground2(back) {
    content_back_value = back;
    var backint = parseInt(back)-1;
    //console.log(backint);
    $(".bottom_menu").find(".btn_l").removeClass("selected");
    $(".content_").find(".back_com").addClass("back_noshow");
    $(".bottom_menu").find(".btn_l").eq(backint).addClass("selected");
    $(".back_"+back).removeClass("back_noshow");

}
function changeBackground3(back) {
	var questionBtn = questionsShow[back];
	$(".bottom_menu").find(".btn_l").removeClass("selected");
	$(".content_").find(".back_com").addClass("back_noshow");//内容隐藏
	$(".bottom_menu").find(".btn_l").addClass("back_noshow");//按钮隐藏
	for(var k=0;k<questionBtn.length;k++){//循环展示按钮
		content_back_btn = questionBtn[k];
		$(".bottom_menu").find(".back_title_"+content_back_btn).removeClass("back_noshow");
		if(k==0){
			content_back_value = questionBtn[k];
			var backint = parseInt(content_back_value)-1;
			$(".bottom_menu").find(".btn_l").eq(backint).addClass("selected");
			$(".back_"+content_back_value).removeClass("back_noshow");
		}
	}

}
var isDown=1;//是否按下
var x_old=0;//x轴
var y_old=0;//y轴
var x_=0;//移动之前的X轴
var y_=0;//移动之前的Y轴
var isWeek=1,moWeek=2;
// var html="";//需要移动的图案
/*******************************人体移动开始*******************************/
//图片放大缩小事件
function wheel(event) {
    if(isWeek==1){
        event = event || window.event;
        event.stopPropagation();
        var xyArr=$(".content_").css("background-position").split(" ");
        x_=parseFloat(xyArr[0]);
        y_=parseFloat(xyArr[1]);
        var y=event.wheelDeltaY;
        var size=parseFloat($(".content_").css("background-size"));
        var style=$(".content_").attr("style");
        if(isDown==1){
            if(typeof(style)!="undefined"){
                style=rep(style,"background-size");
                style=rep(style,"background-position");
            }
          /*  var intStyle= parsein(style);
            if(intStyle>8){
            	
            }*/
            if(y>0){//向上（放大）
                size+=8;
                x_-=4;
                y_-=1;
                style+="background-size:"+size+"px;background-position:"+x_+"px "+y_+"px;";
                $(".content_").attr("style",style);
            }else{//向下(缩小)
                size-=8;
                x_+=4;
                y_+=1;
                if(size>200){
                    style+="background-size:"+size+"px;background-position:"+x_+"px "+y_+"px;";
                    $(".content_").attr("style",style);
                }
            }
        }
    }


};
//按下鼠标
function mosedown(event){
    event = event || window.event;
    event.stopPropagation();
    isDown=2;
    x_old=parseFloat(event.clientX);
    y_old=parseFloat(event.clientY);
    var xyArr=$(".content_").css("background-position").split(" ");
    x_=parseFloat(xyArr[0]);
    y_=parseFloat(xyArr[1]);

}
//放开鼠标
function monseup(){
    isDown=1;
    x_old=0;
    y_old=0;
}
function rep(sty,old){
    var array=sty.split(";");
    var news="";
    for(var i=0;i<array.length;i++){
        if(array[i].indexOf(old)<0&&array[i]!=""){
            news+=(array[i]+";");
        }
    }
    return news;
}
//鼠标按下移动事件
function mosedownmove(event){
    event = event || window.event;
    event.stopPropagation();
    if(isDown==2){

        var x_new=parseFloat(event.clientX);
        var y_new=parseFloat(event.clientY);
        var x=(x_new-x_old)+x_;
        var y=(y_new-y_old)+y_;

        var style=$(".content_").attr("style");
        var oldPos="background-position:"+(x_new-x_old)+"px "+(y_new-y_old)+"px;";
        var pos="background-position:"+x+"px "+y+"px;";
        if(typeof(style)!="undefined"){
            var style2=rep(style,"background-position");
            style2+=pos;
            $(".content_").attr("style",style2);
        }else{
            $(".content_").attr("style",pos);
        }
    }
}
//松开事件
function up(){
    isDown=1;
    x_old=0;
    y_old=0;
}
/*******************************人体移动开始*******************************/

//人体中标记图标

/*******************************元素与元素移动开始*******************************/
var mo_x=0,mo_y=0,mo_down=1,mo_x_old=0,mo_y_old=0,rolate_old=0,rolate_x_old=0,rolate_y_old=0;
function movedown_(obj,event){
    event = event || window.event;
    event.stopPropagation();
    var btn=event.button;
    if(btn==2){//右键
        $(obj).remove();
    }else{
        isDown=1;
        mo_down=2;
        isWeek=2;
        mo_x_old=parseFloat(event.clientX);
        mo_y_old=parseFloat(event.clientY);
        rolate_x_old=parseFloat(event.clientX);
        rolate_y_old=parseFloat(event.clientY);
        mo_x=parseInt($(obj).css("left"));
        mo_y=parseInt($(obj).css("top"));
    }
}
//移动标记
function movemove(obj,event){
    event = event || window.event;
    event.stopPropagation();
    if(mo_down==2){
        var x_new=parseFloat(event.clientX);
        var y_new=parseFloat(event.clientY);
        var x=(x_new-mo_x_old)+mo_x;
        var y=(y_new-mo_y_old)+mo_y;
        var style=$(obj).attr("style");
        var pos="top:"+y+"px;left:"+x+"px;";
        if(typeof(style)!="undefined"){
            style=rep(style,"top");
            style=rep(style,"left");
            style+=pos;
            $(obj).attr("style",style);
        }else{
            $(obj).attr("style",pos);
        }
    }
}
//标记放大缩小
function mowheel(obj,event){
    if(moWeek==1){
        event = event || window.event;
        event.stopPropagation();
        var y=event.wheelDeltaY;
        var width=parseInt($(obj).css("width"));
        var height=parseInt($(obj).css("height"));
        var left=parseInt($(obj).css("left"));
        var top=parseInt($(obj).css("top"));
        if(y>0){//放大
            width+=4;height+=4;
            left-=2;top-=2;
        }else{//缩小
        	width-=4;height-=4;
        	left+=2;top+=2;
        	if(height<=4 || width<=4){
        		height=4;
        		width=4;
        		left-=2;top-=2;
        	}
        }
        var style=$(obj).attr("style");
        var pos="width:"+width+"px;height:"+height+"px;top:"+top+"px;left:"+left+"px;";
        if(typeof(style)!="undefined"){
            style=rep(style,"width");
            style=rep(style,"height");
            style=rep(style,"left");
            style=rep(style,"top");
            style+=pos;
            $(obj).attr("style",style);
        }else{
            $(obj).attr("style",pos);
        }
    }
}

//直线移动标记
function zhixianmovemove(obj,event) {
    event = event || window.event;
    event.stopPropagation();
    if (mo_down == 2) {
        var x_new = parseFloat(event.clientX);
        var y_new = parseFloat(event.clientY);
        var x_cha = x_new - rolate_x_old;
        var y_cha = y_new - rolate_y_old;
        //console.log(rolate_x_old, rolate_y_old, x_new, y_new);

    }


}

//初始化移动元素的所有东西
function moveup(){
    mo_x=0;mo_y=0;mo_down=1;mo_x_old=0;mo_y_old=0;isWeek=1;moWeek=2;
}
function moveup2(){
    mo_x=0;mo_y=0;mo_down=1;mo_x_old=0;mo_y_old=0;
}
function momover(){
    isWeek=2;moWeek=1;
}
/*******************************元素与元素移动结束*******************************/

//添加移动图标
/*function flog_(obj){
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
    //增加新的标注 background-image:url(<%=contextPath %>/static/ck_images/'+flogName+'); <%=contextPath %>
    htmlImg='<div ondblclick="clickU(this);" oncontextmenu="return false;" onMousewheel="mowheel(this);" onMouseOver="momover();" onMouseOut="moveup();" onMouseUp="moveup2();" onMouseDown="movedown_(this);" onMouseMove="movemove(this);"    style="background-image:url(/static/ck_images/'+flogName+');'+morenStyle+'" data="'+obj+'" class="img_g move_img"></div>';
    if(obj=="zhiXian1svg" || obj=="zhixian_wen" || obj=="zhixian_wang" || obj=="zhixian_qie"){
        morenStyle ="width:32px;height:32px;"
        htmlImg='<div ondblclick="clickU(this);" oncontextmenu="return false;" onMousewheel="mowheel(this);" onMouseOver="momover();" onMouseOut="moveup();" onMouseUp="moveup2();" onMouseDown="movedown_(this);" onMouseMove="movemove(this);" onclick="zhixianShow(this);"    style="transform: rotate(0deg);background-image:url(/static/ck_images/'+flogName+');'+morenStyle+'" data="'+obj+'" class="img_g move_img zhixianbiankuang" datarotate="0"> </div>';
    }
    //var oldHtml=($("#LAY_layuiproCeshi").find(".back_"+content_back_value).html()+htmlImg);
    //$("#LAY_layuiproCeshi").find(".back_"+content_back_value).html(oldHtml);
    console.log(htmlImg);
    $("#LAY_layuiproCeshi").find(".back_"+content_back_value).append(htmlImg);
}*/
//标记处的文本描述
function clickU(obj){
    var title =$(obj).attr("title");
    layer.prompt({
        formType: 0,
        value:title,
        title: '请填写注释'},
        function(val, index){
        //layer.msg('得到了'+val);
        $(obj).attr("title",val);
        layer.close(index);
    });
    /*var html='';
    html+='<div style="width:150px;padding-bottom:15px;">';
    html+='<div style="margin-left:15px;margin-top:5px;margin-bottom:5px;"><input type="checkbox" value="皮疹"><font onclick="sel(this);" style="cursor:pointer;display:inline-block;margin-left:8px;">皮疹</font></div>';
    html+='<div style="margin-left:15px;margin-top:5px;margin-bottom:5px;"><input type="checkbox" value="疤痕"><font onclick="sel(this);" style="cursor:pointer;display:inline-block;margin-left:8px;">疤痕</font></div>';
    html+='<div style="margin-left:15px;margin-top:5px;margin-bottom:5px;"><input type="checkbox" value="肿块"><font onclick="sel(this);" style="cursor:pointer;display:inline-block;margin-left:8px;">肿块</font></div>';
    html+='<div style="margin-left:15px;margin-top:5px;margin-bottom:5px;"><input type="checkbox" value="经脉曲张"><font onclick="sel(this);" style="cursor:pointer;display:inline-block;margin-left:8px;">经脉曲张</font></div>';
    html+='<div style="margin-left:15px;margin-top:5px;margin-bottom:5px;"><input type="checkbox" value="其它"><font onclick="sel(this);" style="cursor:pointer;display:inline-block;margin-left:8px;">其它</font></div>';
    html+='</div>';
    layer.open({
        type: 1,
        title: "标注",
        closeBtn: 1,
        shadeClose: false,
        skin: 'flog_text',
        content: html,
        end:function(){
            console.log(layero);
        }
    });*/
}
//点击文字选中多选框
function sel(obj){
    $(obj).closest("div").find("input[type='checkbox']").click();
}

var xuanzhanobj;
function zhixianShow(obj) {
    $(".zhixianbiankuang").removeClass("redBorder");
    $(obj).addClass("redBorder");
    var reg = $(obj).css("transform");
   // console.log("transform:"+reg);
    //var regRotate = get+reg;
   // var deg=eval('get'+$(obj).css('transform'));
   // console.log(deg);
    /*if(xuanzhanobj !=undefined && xuanzhanobj!=null){
        $(xuanzhanobj).attr("datarotate",fangxiang);
    }
    console.log("xuanzhanobj:"+xuanzhanobj);*/
    fangxiang = parseFloat($(obj).attr("datarotate"));
    //console.log("获取fangxiang:"+fangxiang);
    //$(obj).rotate({ animateTo:fangxiang});
    xuanzhanobj =obj;
}
/*
 * 解析matrix矩阵，0°-360°，返回旋转角度
 * 当a=b||-a=b,0<=deg<=180
 * 当-a+b=180,180<=deg<=270
 * 当a+b=180,270<=deg<=360
 *
 * 当0<=deg<=180,deg=d;
 * 当180<deg<=270,deg=180+c;
 * 当270<deg<=360,deg=360-(c||d);
 * */
function getmatrix(a,b,c,d,e,f){
    var aa=Math.round(180*Math.asin(a)/ Math.PI);
    var bb=Math.round(180*Math.acos(b)/ Math.PI);
    var cc=Math.round(180*Math.asin(c)/ Math.PI);
    var dd=Math.round(180*Math.acos(d)/ Math.PI);
    var deg=0;
    if(aa==bb||-aa==bb){
        deg=dd;
    }else if(-aa+bb==180){
        deg=180+cc;
    }else if(aa+bb==180){
        deg=360-cc||360-dd;
    }
    return deg>=360?0:deg;
    //return (aa+','+bb+','+cc+','+dd);
}

/*function zhixianZuoMove(obj,f){
    if(f==1){
        fangxiang -=1;
    }else{
        fangxiang +=1;
    }
    console.log(fangxiang);
   $(".redBorder").rotate({ animateTo:fangxiang});
 //   $(obj).rotate({ animateTo:fangxiang});

}*/
//clearInterval(interval);
var fangxiang;
var interval ;
//直线选择按下鼠标
function zhixianZuoDown(obj,fa,event){
    event = event || window.event;
    event.stopPropagation();
    var btn=event.button;
    if(btn==0) {//左键
        if(fa==1){
            interval= setInterval(function(){
                fangxiang-=1;
                //console.log("fangxiang2:"+fangxiang);
               //$(".redBorder").rotate({ animateTo:fangxiang});
                $(xuanzhanobj).rotate({ animateTo:fangxiang});
            },70);
        }else if(fa==2){
            interval = setInterval(function(){
                fangxiang +=1;
                //console.log("fangxiang2:"+fangxiang);
               // $(".redBorder").rotate({ animateTo:fangxiang});
                $(xuanzhanobj).rotate({ animateTo:fangxiang});
            },70);
        }
    }
}
//直线选择松开鼠标
function zhixianmoveup(){
        $(xuanzhanobj).attr("datarotate",fangxiang);
        clearInterval(interval);

}
//直线选择松开鼠标
function zhixianmoveout(){
    $(xuanzhanobj).attr("datarotate",fangxiang);
    clearInterval(interval);
}
//切换标注图案
var eletype;
function changEleType(obj,type){
    $(".eleType").removeClass("eleType_show_title");
    $(obj).addClass("eleType_show_title");
    //$(".all_eleType_image").removeClass("eleType_show");
    if(eletype!=undefined){
        $(eletype).css("display","none");
    }else{
        $(".eleType_wen").css("display","none");
    }
    eletype =".eleType_"+type;
    $(eletype).css("display","inline-block");
}
//部分选择全部正常，隐藏下面的内容
function changeShowContent(o){
	var tName = $(o).attr("name");
	//console.log(tName);
}

document.onkeydown=function(event){
	  var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){
  	 var obj=$("#user_name");
  	 if(typeof(obj.val()) != "undefined"){
  		 $("#jiuwujib").remove();
  		 //var obj=$("input[name='ELE_TEMP_NAME']");
  		 var name=obj.val();
  		 if(name==null||trim(name)==""||typeof(name)=="undefined"){
  			 layer.msg("请输入用户名");
  			 return;
  		 }
      	 $.getJSON("../tuserbasic/getUserName",{userName:name},function(result){
      		    //console.log(result);
      		    if(result.success){
      		    	if(result.data != null){
      		    		var html='<div id="jiuwujib" style="position: absolute;width:147px;left:237px;height:145px;border:1px solid #e0e0e0;border-top:0px;background:#fff;overflow-y:auto;overflow-x:hidden;z-index: 990;">';
      		    		$.each(result.data, function(i, obj){
        	    		       html+='<div onclick="selectJiuwu(this);" style="width:224px;height:29px;line-height:29px;padding-left:8px;border-bottom:1px dashed #e0e0e0;cursor:pointer;">'+obj.user_name;
            		           html+='<input type="hidden" name="search_user_name" value="'+obj.user_name+'">';
            		           html+='<input type="hidden" name="search_user_id" value="'+obj.user_id+'">';
            		           
            		           html+='<input type="hidden" name="search_user_age" value="'+obj.user_age+'">';
            		           html+='<input type="hidden" name="search_user_birthday" value="'+obj.user_birthday+'">';
            		           var user_sex ="女";
            		           if(obj.user_sex =="1" || obj.user_sex ==1){
            		        	   user_sex ="男";
            		           }
            		           html+='<input type="hidden" name="search_user_sex" value="'+user_sex+'">';
            		           var user_marrige ="未婚";
            		           if(obj.user_marrige =="1" || obj.user_marrige ==1){
            		        	   user_marrige ="已婚";
            		           }
            		           html+='<input type="hidden" name="search_user_marrige" value="'+user_marrige+'">';
            		           html+='<input type="hidden" name="search_user_job" value="'+obj.user_job+'">';
            		           html+='<input type="hidden" name="search_user_long_address" value="'+obj.user_long_address+'">';
            		           html+='<input type="hidden" name="search_user_communication_address" value="'+obj.user_communication_address+'">';
            		           html+='<input type="hidden" name="search_user_phone" value="'+obj.user_phone+'">';
            		           html+='</div>';
      		    		});
      		    		html+='</div>';
      		    		$(obj).focus();
      		    		$(obj).parent().append(html);
      		    	}else{
      		    		layer.msg("没有找到用户");
      		    	}
      		    }else{
      		    	layer.msg(result.message);
      		    }
      	 });
  	 }
    }
};
//选中
function selectJiuwu(obj){
	var user_name= $(obj).find("input[name='search_user_name']").val();
	$("#user_name").val(user_name);
	var sex = $(obj).find("input[name='search_user_sex']").val();
	var selectSexObj = $("input[name='sex'][title='"+sex+"']");
	var sexobj = $("input[name='sex']").closest(".xm").find(".layui-unselect");
	sexobj.removeClass("layui-form-checked");
	$(selectSexObj).next().addClass("layui-form-checked");
	if(sex=="女"){
	    $(".a_6").attr("style","display:block;");
	}else{
	    $(".a_6").attr("style","display:none;");
	}
	$(selectSexObj).attr("checked",true);
	var marray = $(obj).find("input[name='search_user_marrige']").val();
	var selectObj = $("input[name='marriage'][title='"+marray+"']");
	var marrayobj = $("input[name='marriage']").closest(".xm").find(".layui-unselect");
	marrayobj.removeClass("layui-form-checked");
	$(selectObj).next().addClass("layui-form-checked");
	$(selectObj).attr("checked",true);
	var birthday = $(obj).find("input[name='search_user_birthday']").val();
	var age = ages(birthday);
	$("input[name='age']").val(age);
	$("input[name='birthday']").val(birthday);
	$("input[name='pation']").val($(obj).find("input[name='search_user_job']").val());
	$("input[name='phone']").val($(obj).find("input[name='search_user_phone']").val());
	$("input[name='change_address']").val($(obj).find("input[name='search_user_long_address']").val());
	$("input[name='phone_address']").val($(obj).find("input[name='search_user_communication_address']").val());
	$("input[name='user_id']").val($(obj).find("input[name='search_user_id']").val());
	
}
function   ages(str)   
{   
      var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
      if(r==null)
      return   false;     
      var   d=   new   Date(r[1],   r[3]-1,   r[4]);     
      if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
      {   
            var   Y   =   new   Date().getFullYear();   
            return(Y-r[1]);   
      }   
      return("");   
}   

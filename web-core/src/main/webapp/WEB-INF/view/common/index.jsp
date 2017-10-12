<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="../../common.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>主页</title>
    <style type="text/css">
       body{font-familay:'Open Sans',sans-serif;}
	   img{border:0px;}
       a{text-decoration:none;font-size:13px;color:#e6f1f7;}
      .left_{width:200px;height:100%;float:left;background-color:#3b5666;position:fixed;}
      ._menu{overflow-y:auto;}
      .right_{height:100%;float:left;background-color:#eee;}
      ._menu{width:100%;}
      
      .parent_menu{margin-bottom:2px;}
      .parent_menu,.chail_menu{cursor:pointer;position:relative;} 
      .parent_menu{padding:10px 0;background-color:#677786;width:100%;color:#fff;opacity:0.7;}
      .chail_menu{display:none;width:98.5%;margin-left:1.5%;padding:10px 0;background-color:#3b5666;width:100%;color:#fff;border-top:1px solid #506274;border-bottom:1px solid #415160;}
    .chail_menu:hover{background-color:#415160;}
    
      ._menu  a{text-decoration:none;font-size:13px;color:#e6f1f7;}
      .parent_menu a{text-align:left;width:80%;margin-left:26px;display:inline-block;}
      .chail_menu a{display:none;text-align:left;width:80%;margin-left:20px;display:inline-block;}
      .png, .png2{background-image:url(static/sys_images/xitong1.png);background-size: cover; -ms-behavior: url(static/backgroundsize.min.htc);display: inline-block;height: 20px; left: 6px;position: absolute;top: 10px; width: 20px;}
      
      .png2{background-image:url(static/sys_images/xiangxia2.png); -ms-behavior: url(static/backgroundsize.min.htc);right:3px;left:157px;top:11px;width:16px;height:16px;}
      .logos{width:100%;height:55px;line-height:55px;background-color:#1f3a4a;}
      .logoIMG{width:45px;float:left;margin-left:29px;margin-top:4px;}
      
      .logoIMG2{
	      float: left;
	    margin-left: 3px;
	    margin-top: 10px;
	    width: 34px;
      } 
      .logoFont{font-size:20px;font-weight:bold;color:#7c98a8;display:inline-block;float:left;margin-left:16px;}
      .heand_url{width:100%;height:55px;background-color:#1f3a4a;}
      .main{background-color:#fff;}
      
      .chail_menuselected{background-color:#415160;}
        .aselectedHover{color:#fff;}
      .chailDIVselectedHover{background-color:#fff;}
      
      .aselected{color:#fff;}
      .chailDIVselected{background-color:#fff;}
      .zhankaishousuo{cursor:pointer;width:20px;height:20px;margin-left:9px;background-image:url(static/sys_images/shousuo3.png);
      margin-top:16px;background-size: cover;float:left;
      -ms-behavior: url(static/backgroundsize.min.htc);}
      
      .model{position:relative;}
      .main{border-top:1px solid #fff;}
      .pageTabls{height:40px;width:100%;background-color:#eee;}
      .parent{width:100%;height:100%;}
      
      .tab{font-size:13px;margin-top:5px;display:inline-block;position:relative;border:1px solid #ccc;margin-left:5px;border-radius:3px;padding:0px 14px;height:27px;line-height:27px;text-align:center;float:left;color:#9f9f9f;}
     .tabSelected{background-color:#fff;color:#2b333c;border:1px solid #94afbf}
     .closebtn{display:inline-block;width:10px;position:absolute;right:2px;}
    </style>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	
	<link href="static/scroll/jquery.mCustomScrollbar.css" rel="stylesheet" />
	<script src="static/scroll/jquery.mCustomScrollbar.concat.min.js"></script>
  </head>
  <body>
         <div class="left_ content" >
               <%--LOGO位置 --%>
               <div class="logos"><img id="logoIMG" class="logoIMG" src="static/sys_images/logo8.png" ><font class="logoFont">云系统</font></div>
               <%--菜单控制区START --%>
               <input type="hidden" id="menuID">
               <div class="_menu start  content" id="LEFT_" >
                      <div class="model">
		                      <div class="parent_menu daikaiMenu" onclick="parentMenuClick(this);" >
		                                <i class="png"></i>
		                                <a href="javascript:void(0);" >系统管理</a>
		                                <i class="png2"></i>
		                       </div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">百度设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://iqiyi.com"><a href="javascript:void(0);">爱奇艺设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://jd.com"><a href="javascript:void(0);">京东设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="../system/demo/toList"><a href="javascript:void(0);">Demo管理</a></div></div>
                      </div>
                      <div class="model">
		                      <div class="parent_menu daikaiMenu" onclick="parentMenuClick(this);">
		                            <i class="png" ></i>
		                            <a href="javascript:void(0);" >测试管理</a>
		                            <i class="png2" ></i>
		                      </div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试一设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试二设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试三设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试四设置</a></div></div>
                      </div>
                        <div class="model">
		                      <div class="parent_menu daikaiMenu" onclick="parentMenuClick(this);">
		                            <i class="png" ></i>
		                            <a href="javascript:void(0);" >测试管理2</a>
		                            <i class="png2" ></i>
		                      </div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试一设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试二设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试三设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试四设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试五设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试六设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试七设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试八设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试九设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试九设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试九设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试九设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试九设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试九设置</a></div></div>
                      </div>
                      
                        <div class="model">
		                      <div class="parent_menu daikaiMenu" onclick="parentMenuClick(this);">
		                            <i class="png" ></i>
		                            <a href="javascript:void(0);" >测试管理3</a>
		                            <i class="png2" ></i>
		                      </div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试一设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试二设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试三设置</a></div></div>
		                      <div class="chailDIV"><div class="chail_menu"><input type="hidden"  value="http://baidu.com"><a href="javascript:void(0);">测试四设置</a></div></div>
                      </div>
                      
               </div>
               <%--  --%>
                <%--菜单控制区END --%>
         </div>
         <%--右边区域Start --%>
         <div class="right_">
                 <%--头部区域 --%>
                 <div class="heand_url"><div class="zhankaishousuo" title="收缩"></div></div>
                 <%--tabls --%>
                 <div class="pageTabls">
                        <a class="tab tabSelected" href="javascript:void(0);" onclick="selectTab(this);">首页</a>
                 </div>
                 
                 <%--主页面Start --%>
                 <div class="main " id="main" >
                       <div class="parent">
                            <iframe name="mainFrame" id="mainFrame" frameborder="0" src="http://jiuzhekan.com" style="margin:0 auto;width:100%;height:100%;"></iframe>
                       </div>
                 </div> 
                   <%--主页面End --%>
         </div>
          <%--右边区域End --%>
  </body>
  <script type="text/javascript">
          var indc=0;//记录上次选中位置
		  $(window).resize(function(){
		       jisuanSeHW();
		  });
		  //关闭标签
		  function closeTab(obj){
		        var o=$(obj).closest("a");
		        var ind=$(o).index();
		        $(o).remove();
		        $($(".parent")[ind]).remove();
		        $(o).attr("onclick","");
		        //删除前面是自己时显示前面一个
		        if(ind==indc){
		           indc-=1;
		        }
		        //删除不是最后时显示上次选中的那个
		        var length=$(".tab").length;
		        if(indc>=length){
		           indc=(indc-ind);
		        }
		        $(".parent").css("display","none");
		        $(".tabSelected").removeClass("tabSelected");
                $(".closebtn").attr("src","static/sys_images/close4.png");
                $($(".tab")[indc]).addClass("tabSelected");
                $($(".tab")[indc]).find(".closebtn").attr("src","static/sys_images/close3.png");
                $($(".parent")[indc]).css("display","block");
                indc=$(".tabSelected").index();//记录上次位置
                 
		  }
		  
		  //直接选择Tabs
		  function selectTab(obj){
		         indc=$(".tabSelected").index();//记录上次位置
		         $(".tabSelected").removeClass("tabSelected");
                 $(".closebtn").attr("src","static/sys_images/close4.png");
		         var ind=$(obj).index();
		         $(obj).addClass("tabSelected");
                 $(obj).find(".closebtn").attr("src","static/sys_images/close3.png");
                 $(".parent").css("display","none");
                 $($(".parent")[ind]).css("display","block");
                
		  }
         $(document).ready(function(){
              menuScroll();
			 <%-- $(".daikaiMenu").click(function(){
			        $(".chail_menu").slideUp();
			        var chails=$(this).closest(".model").find(".chail_menu");
			        $("#menuID").val(($(this).closest(".model").index()));
			        $(".png2").css("background-image","url(static/sys_images/xiangxia2.png)");
			        $(chails).slideToggle(function(){
                           $("#LEFT_").mCustomScrollbar("update");
                    });
                    $(this).find(".png2").css("background-image","url(static/sys_images/xiangshang1.png)");
             });
             --%>
             
             //菜单点击
             $(".chail_menu").click(function(){
                    $(".chailDIV").removeClass("chailDIVselected");
                    $(".chailDIV a").removeClass("aselected");
                    $(".chail_menu").removeClass("chail_menuselected");
                    $(this).find("a").addClass("aselected");
                    $(this).addClass("chail_menuselected");
                    $(this).closest(".chailDIV").addClass("chailDIVselected");
                    var url=$(this).find("input").val();
                    var title=$(this).find("a").html();
                    indc=$(".tabSelected").index();//记录上次位置
                    $(".tabSelected").removeClass("tabSelected");
                    $(".closebtn").attr("src","static/sys_images/close4.png");
                    var obj=tabExists(title);
                   var ind=$(".tab").length;
                    if(obj==null){
                        ind+=1;
	                    var tabHtml="<a class=\"tab tabSelected\" href=\"javascript:void(0);\" onclick=\"selectTab(this);\">"+title+"<img class=\"closebtn\" onclick=\"closeTab(this);\" src=\"static/sys_images/close3.png\"/></a>";
	                    $(".pageTabls a:last").after(tabHtml);
                    }else{
                        ind=($(obj).index()-1);
                        $(obj).addClass("tabSelected");
                        $(obj).find(".closebtn").attr("src","static/sys_images/close3.png");
                    }
                    parentJS(ind,obj,url);
             });
             //判断tab是否已经存在了
             function tabExists(tl){
                   var obj=null;
                   $(".tab").each(function(){
					    if($(this).html().split("<")[0]==tl){
					       obj=$(this);
					       return false;
					    }
				   });
				   return obj;
             }
             //控制面板
             function parentJS(ind,obj,url){
                $(".parent").css("display","none");
                if(obj!=null){
                    $($(".parent")[ind+1]).css("display","block");
                }else{
                    var html="<div class=\"parent\"><iframe name=\"mainFrame\" id=\"mainFrame\" frameborder=\"0\" src=\""+url+"\" style=\"margin:0 auto;width:100%;height:100%;\"></iframe></div>";
                    $(".parent:last").after(html);
                }
             }
             //计算宽度
             jisuanSeHW();
             $("#LEFT_").mCustomScrollbar("update");
             //子级菜单选择器
             $(".chail_menu").mouseover(function(){
	                $(".chailDIV").removeClass("chailDIVselectedHover");
                    $(".chailDIV a").removeClass("aselectedHover");
                    $(this).find("a").addClass("aselectedHover");
                    $(this).closest(".chailDIV").addClass("chailDIVselectedHover");
             });
             $(".chail_menu").mouseout(function(){
	                $(".chailDIV").removeClass("chailDIVselectedHover");
                    $(".chailDIV a").removeClass("aselectedHover");
              });
              //父级菜单收缩后触发事件
             <%--$(".parent_menu").mouseover(function(){
	               var width=parseInt($(this).css("width"));
	               if(width==45){
	                  layer.tips(''+$(this).find("a").html(), $(this),{
	                         tips: [2, '#cccc']
	                  });
	               }
             });
              //父级菜单收缩后触发事件
             $(".parent_menu").mouseout(function(){
	               var width=parseInt($(this).css("width"));
	               if(width==45){
	                  //移动走了后
	                  $(".xuanfu").attr("style","display:none;");
	               }
              });--%>
              //收缩点击事件
              $(".zhankaishousuo").click(function(){
                     zhankaishousuoClick();
              });
         });
           //菜单滚动条
         function menuScroll(){
	              $("#LEFT_").mCustomScrollbar({
						autoHideScrollbar:true,
						autoDraggerLength:true,
						theme:"light-1"
				 });
          }
         //计算右边区域大小
         function jisuanSeHW(){
              var height=$(window).height();
              var width=$(window).width();
              var left_w=parseInt($(".left_").css("width"))+1;
              $(".right_").attr("style","width:"+(width-left_w)+"px;margin-left:"+left_w+"px;height:"+height+"px;");
              $("#LEFT_").attr("style","height:"+(height-70)+"px;");
              $("#main").attr("style","height:"+(height-100)+"px;");
              //$("#main").attr("style","height:"+(height-45)+"px;");
         }
         //父级菜单展开后点击事件
         function parentMenuClick(obj){
                    $(".chail_menu").slideUp();
			        var chails=$(obj).closest(".model").find(".chail_menu");
			        $("#menuID").val(($(obj).closest(".model").index()));
			        if($(obj).find(".png2").css("background-image").indexOf("xiangshang1")>=0){
			          $(".chail_menu").slideUp();
			          $(".png2").css("background-image","url(static/sys_images/xiangxia2.png)");
			          $("#menuID").val("");
			          return;
			        }
			        $(".png2").css("background-image","url(static/sys_images/xiangxia2.png)");
			        $(chails).slideToggle(function(){
                           $("#LEFT_").mCustomScrollbar("update");
                    });
                    $(obj).find(".png2").css("background-image","url(static/sys_images/xiangshang1.png)");
         }
         //收缩展开函数
         function zhankaishousuoClick(){
                 $(".chail_menu").slideUp();
                 var txt=$(".zhankaishousuo").attr("title");
                 if(txt=="收缩"){
                   $(".parent_menu").attr("onclick","");
                   $(".zhankaishousuo").attr("title","展开");
	               $(".left_").find("a").css("display","none");
	               $("#logoIMG").addClass("logoIMG2");
	               $(".logoFont").css("display","none");
	               $(".png2").css("display","none");
	               $(".parent_menu").css("height","25px");
                   $(".left_").animate({width:'45px'},300);
                   $(".png").css("left","10px");
                   var w= parseInt($(".right_").css("width"))+155;
                   $(".right_").animate({marginLeft:46+'px',width:w+'px'},300,function(){
                       $("#LEFT_").mCustomScrollbar("update");
                   });
                 }else{
                   $(".left_").animate({width:'200px'},300);
                   var w= parseInt($(".right_").css("width"))-155;
                   $(".right_").animate({marginLeft:201+'px',width:w+'px'},300,function(){
                        $(".parent_menu").attr("onclick","parentMenuClick(this)");
                        $("#LEFT_").mCustomScrollbar("update");
                        $(".zhankaishousuo").attr("title","收缩");
                        $(".png").css("left","6px");
                        $(".png2").css("display","block");
	                    $(".left_").find("a").css("display","inline-block");
	                    $(".parent_menu").css("height","auto");
	                    $("#logoIMG").removeClass("logoIMG2");
	                    $(".logoFont").css("display","inline-block");
	                    $("#menuID").val();
	                    $($(".model")[$("#menuID").val()]).find(".chail_menu").slideToggle(function(){
                             $("#LEFT_").mCustomScrollbar("update");
                        });
                   });
                 }
         }
  </script>
</html>

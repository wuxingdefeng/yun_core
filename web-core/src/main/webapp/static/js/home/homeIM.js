function alert_(message){
	 layer.alert(message, {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 5 //动画类型
		 });
}
var websocket = null;
/**
 * 添加成员面板控制
 */
function addUsers(){
	var accessToken=$(".accesscToken").val();
	var roomID=$(".roomID").val();
	var serviceURL=$(".serviceURL").val();
	var localID=$("input[name='loginID']").val();
	//console.log(serviceURL+"###"+roomID+"###"+accessToken);
	var yhs=$(".yh");
	//添加用户界面开始
	var htmlstr="";
	if(yhs!=null&&yhs!=""&&typeof(yhs)!="undefined"){
		
		for(var i=0;i<yhs.length;i++){
			var yh=$(yhs)[i];
			if($(yh).find("input[name='ids']").val()!=localID&&$(yh).attr("title")!="未在线"){
				htmlstr+="<div onclick='addUser(this);' style='text-align: center;width: 100%;padding: 5px 0px;border-bottom: 1px solid #e0e0e0;cursor:pointer;'>";
				htmlstr+=$(yh).html();
				htmlstr+="</div>";
			}
		}
		
		layer.open({
			  type: 1,
			  shade: false,
			  title: false,
			  id:"users",
			  offset:"rb",
			  content: htmlstr, 
			  area: ['300px', '500px'],
			  cancel: function(){
			    
			  }
		 });
	}
}
/**
 * 选择添加某个成员进行通话
 * @param obj
 */
function addUser(obj){
	var accessToken=$(".accesscToken").val();
	var roomID=$(".roomID").val();
	var serviceURL=$(".serviceURL").val();
	var localID=$("input[name='loginID']").val();
	var localName=$("input[name='loginName']").val();
	var remoID=$(obj).find("input[name='ids']").val();
	$.post("getExists",{toID:remoID,accessToken:accessToken},function(data){
		if(data.code==0){
			joinRoom(serviceURL,accessToken,roomID,localID,localName,"data","password");
		    var html_s="@@"+accessToken+"@@"+roomID+"@@"+serviceURL+"@@"+localID;
		    var params="{\"data\":\""+localName+"邀请您加入视频聊天哦"+html_s+"\",\"code\":4,\"toID\":\""+remoID+"\"}";
			websocket.send(params);
		}else if(data.code==1){
			alert_("对方正在通话中，请稍后重试！！");
		}else if(data.code==2){
			alert_("请选择某个用户进行视频通话！！");
		}else{
			alert_("发生了未知情况！！");
		}
	},"json");

}


//点击进行通话
function vid(obj){
		var status=$(obj).attr("title");
		if(status=="在线"){
			var localID=$("input[name='loginID']").val();
			var remoID=$(obj).find("input[name='ids']").val();
			var localName=$("input[name='loginName']").val();
			if(localID==remoID){
				alert_("不可以跟自己视频哦");
			}else{
				//获取accessToken 和房间消息
				$.post("getAccessToken",{toID:remoID},function(data){
					if(data.code==0){
						var accessToken=data.accessToken;
						var roomID=data.roomId;
						var serviceURL=data.serviceURL;
						//获取失败
						if(accessToken==null||typeof(accessToken)=="undefined"||roomID==null||typeof(roomID)=="undefined"){
							alert_("邀请参加视频聊天失败,请稍后重新重试！！");
						}else{
							//
							$(".accesscToken").val(accessToken);
							$(".roomID").val(roomID);
							$(".serviceURL").val(serviceURL);
							//获取成功
							$("#IMpanent").fadeIn(1000);
							$("#IMparent_bg").fadeIn(1000);
							joinRoom(serviceURL,accessToken,roomID,localID,localName,"data","password");
	                        var html_s="@@"+accessToken+"@@"+roomID+"@@"+serviceURL+"@@"+localID;
						    var params="{\"data\":\""+localName+"邀请您加入视频聊天哦"+html_s+"\",\"code\":4,\"toID\":\""+remoID+"\"}";
							websocket.send(params);
						}
					}else if(data.code==1){
						alert_("对方正在通话中，请稍后重试！！");
					}else if(data.code==2){
						alert_("请选择某个用户进行视频通话！！");
					}else{
						alert_("发生了未知情况！！");
					}
					
				},"json");
				
			}
		}else{
			alert_("对方未在线不能视频哦");
		}
	}


//WebSocket
$(function(){
	  var flog=true;
	   //登录IM
	  if('WebSocket' in window){
		     var href=window.location.href;
		     href=href.split("://")[1];
		     var wssURL=href.split("/")[0];
		     var ID=$("input[name='loginID']").val();
		     websocket = new WebSocket("ws://192.168.5.45:83/yun_core/loginPCIM/"+ID);
	  }else{
		     alert_("您当前浏览器暂未支持哦！！");
	  }
	   websocket.onerror = function(){
		   alert_("连接发生错误，暂不能使用通知哦");
		   flog=false;
	   };
	   
	   //连接成功需要做啥呢
	   websocket.onopen = function(event){
	       if(flog){
	    	   //获取管理员列表
	    	   $.post("admins",function(data){
	    		   var html_='<div  style="width:265px;padding:0px 10px;height:500px;position:fixed;z-index:100000;bottom:5px;right:5px;background-color:#fff;';
		    	   html_+='-webkit-box-shadow:0px 0px 30px #95B8E7;-moz-box-shadow:0px 0px 30px #95B8E7;box-shadow:0px 0px 30px #95B8E7;">';
		    	   
		    	   for(var i=0;i<data.length;i++){
		    		     html_+='<div class="yh" onclick="vid(this);" title="'+(data[i].is_online?"在线":"未在线")+'" style="'+(data[i].is_online?"":"background-color:#ccc;")+'margin-bottom:8px;text-align:left;height:55px;width:100%;border-bottom:1px solid #e0e0e0;line-height:55px;cursor:pointer;">';
		    		     html_+='<input type="hidden" name="ids" value="'+data[i].ADMIN_ID+'">';
		    		     html_+='<img  src="'+data[i].ADMIN_HEAND+'" style="width:40px;height:40px;clip:rect(40px);border-radius:8px;border:1px solid #eee;margin-left:7px;"/>';
		    		     
		    		     html_+='<font style="width:180px;height:30px;display:inline-block;font-size:15px;margin-left:18px;"><font class="name_" style="width:60px;display:inline-block;">'+data[i].ADMIN_NAME+'</font>';
		    		     html_+='<font style="display:inline-block;font-size:13px;margin-left:18px;color:#808080;">'+data[i].LAST_LOGINIP+'</font></font>';
		    		     
		    		     html_+='</div>';   
		    	   }
		    	   
		    	   html_+='</div>';
		    	   $("#bottom_").html(html_);
	    	   },"json");
	    	   
	    	  
	       }
	   };
	   //接受到相关消息
	   websocket.onmessage = function(event){
           if(flog){
        	   var json=eval("("+event.data+")");
        	   var code=(json.code);
        	  // 1：错误消息 2：系统消息 3：聊天消息 4：视频消息 5:用户列表
        	   if(code==1){
        		   alert_(json.data);
        	   }
        	   if(code==2){
        		   alert_(json.data);
        	   }
        	   if(code==3){
              		
        	   }
        	   if(code==4){
        		 var ns=json.data.split("@@");
        		   var msg=ns[0];
        		   var accessToken=ns[1];
        		   var roomID=ns[2];
        		   var serviceURl=ns[3];
        		   var remoID=ns[4];
        		   var localID=$("input[name='loginID']").val();
//       			   var remoID=$("input[name='ids']").val();
       			   var localName=$("input[name='loginName']").val();
        		   layer.confirm(msg, {
        			   btn: ['接受','取消'] //按钮
        			 }, function(index){//接受操作（需要判断对方是否还在线）
        				 
        				 var acct=$(".accesscToken").val();
        				 if(acct==null||acct==""||typeof(acct)=="undefined"){
        					 $(".addUser").remove();
        				 }
        				$("#IMpanent").fadeIn(1000);
 						$("#IMparent_bg").fadeIn(1000);
 						
        				 joinRoom(serviceURl,accessToken,roomID,localID,localName,"data",localID);
        				 layer.close(index);
        				 
        			 }, function(index){//取消操作
        				$("#IMpanent").fadeOut(1000);
  						$("#IMparent_bg").fadeOut(1000);
        				layer.close(index);
        				var params="{\"data\":\""+localName+"拒绝了视频呢！！\",\"code\":8,\"toID\":\""+remoID+"\"}";
   						websocket.send(params);
        			 });
        	   }
        	   if(code==5){
        		
        	   }
        	   if(code==6){//上线
        		   var yhs=$(".yh");
           		   for(var i=0;i<yhs.length;i++){
           			   if($(yhs[i]).find("input[name='ids']").val()==json.data){
           				   $(yhs[i]).attr("title","在线");
           				   $(yhs[i]).attr("style",'margin-bottom:8px;text-align:left;height:55px;width:100%;border-bottom:1px solid #e0e0e0;line-height:55px;cursor:pointer;background-color:#fff;');
           			   }
           		   }
        	   }
        	   if(code==7){//下线
        		   var yhs=$(".yh");
           		   for(var i=0;i<yhs.length;i++){
           			   if($(yhs[i]).find("input[name='ids']").val()==json.data){
           				   $(yhs[i]).attr("title","未在线");
           				   $(yhs[i]).attr("style",'margin-bottom:8px;text-align:left;height:55px;width:100%;border-bottom:1px solid #e0e0e0;line-height:55px;cursor:pointer;background-color:#ccc;');
           			   }
           		   }
        	   }else if(code==8){//拒绝视频是否提示啥的(当页面未打开视频时就不需要通知了)
    	    	   if($("#IMparent_bg").css("display")=="block"){
    	    		   alert_(json.data);
    	    	   }
    	       }
	       }else{
	    	   flog=false;
	       }
	        
	   };
	   websocket.onclose = function(){
	      /*if(flog){
	        	  alert_("关闭连接");
		       }else{
		    	   flog=false;
		       }*/
	   };
	   //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
	   window.onbeforeunload = function(){
	          websocket.close();
	   };
	   
});
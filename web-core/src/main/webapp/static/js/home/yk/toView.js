/**
 * @author QinBing
 * @date 20170728
 * 叁体集成API,需要与WebSoket集合使用(只能使用于谷歌浏览器中)
 */
var SoketURL="192.168.5.45:83";//Soket路径
//提示层（这里采用layer 插件 ，以下示例各种弹出层均使用）
function alert_(message){
	 layer.alert(message, {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 5
		 });
}
//消息发送
function sendMSG(code,MSG,localID,remoID,localName,remoName){
	if(websocket!=null){
		var sendJSON={"localID":localID,"remoID":remoID,"localName":localName,"remoName":remoName,"message":MSG};
		var params=JSON.stringify({"code":code,"data":sendJSON,"toID":remoID});
		websocket.send(params);	
	}else{
		console.log("当前不支持发送数据");	
	}
}
$(function(){
	  var flog=true;
	  if('WebSocket' in window){
		     var ID=$("input[name='loginID']").val();
		     websocket = new WebSocket("ws://"+SoketURL+"/yun_core/loginPCIM/"+ID+"@"+encodeURI(SoketURL));
	  }else{
		     alert_("您当前浏览器暂未支持哦！！");
		     flog=false;
	  }
	  websocket.onerror = function(){
		   alert_("连接发生错误，暂不能使用通知哦");
		   flog=false;
	   };
	   websocket.onopen = function(event){
		   //TODO 打开
	   };
	   
	   websocket.onmessage = function(event){
		   //TODO 消息监听
		   try{
			   var json=eval("("+event.data+")");
	    	   var code=(json.code);
	    	   var msg=json.data.message;
			   var remoIDS=json.data.localID;
			   var remoNameS=json.data.localName;
			   var localIDS=json.data.remoID;
			   var localNameS=json.data.remoName;
			   if(flog){
				   if(code==1){//视频邀请
					   layer.confirm(remoNameS+"邀请您协助远程就医！", {
	        			   btn: ['接受','取消'] //按钮
	        			 }, function(index){
	        				  //需要判断对方暂时是否还在线，如果未在线给予提示
	        				  layer.open({
		        					    type: 2,
			  	      					title:"视频页面",
			  	      					shade:1,
			  	      					shadeClose:false,
			  	      					scrollbar: false,
			  	      					move:false,
			  	      					area:['901px','600px'],
			  	      					content:"video?remoID="+remoIDS+"&remoName="+remoNameS+"&localID="+localIDS+"&localName="+localNameS+"&accesscToken="+msg.accessToken+"&roomID="+msg.roomID+"&serviceURL="+msg.serverURL,
			  	      					success:function(layero,index){
			  	      						var top=parseInt($(layero).css("top"))+28;
			  	      						var css=$(layero).attr("style")+"height:545px;top:"+top+"px;";
			  	      						$(layero).attr("style",css);
			  	      					}
		        			   });
	        				   layer.close(index);
	        			 }, function(index){
	        				 //取消操作
	        			 });
				   }
				   //TODO
			   }
		   }catch(err){
			   console.log(error);
		   }
	   };
       websocket.onclose = function(){
		 //TODO 关闭一切连接事件  
	   };
	   //监听窗口关闭事件
	   window.onbeforeunload = function(){
	          websocket.close();
	   };
});



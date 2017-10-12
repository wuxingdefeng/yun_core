/**
 *@author QinBing
 *@Date 20170615 
 *@deprecated 多人视频聊天实现(基于P2P 实验测试阶段)
*/
var websocket = null;

var localID="";//本地的ID
var remoID="";//远方的ID
var remoName="";//远方的名称
var localName="";//本地的名称
/**
 * 还可以配置多个摄像设备和多个录音设备进行选择
 * 配置视频相关信息
 */
var videoParams2={};
var videoParams={
		"audio":true,
		"video":{"width":1280,"height":720}
};

var getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia || 
        navigator.mozGetUserMedia || 
        navigator.msGetUserMedia);

        
//兼容浏览器的PeerConnection写法
var PeerConnection = (window.PeerConnection ||
        window.webkitPeerConnection00 || 
        window.webkitRTCPeerConnection || 
        window.mozRTCPeerConnection);         
// stun和turn服务器，用于内部网络穿透(需要自己搭建实现比较)
//var iceServer = {
//      "iceServers": [{
//              "url": "stun:stun.l.google.com:19302"
//        }, {
//              "url": "turn:numb.viagenie.ca",
//              "username": "webrtc@live.com",
//              "credential": "muazkh"
//        }]
//};

var iceServer = {
		"iceServers": [{
		      "url": "stun:116.62.219.190:3478"
		}, {
			"url": "turn:116.62.219.190:3478",
            "username": "yun_core",
            "credential": "yun_core"
		}]
}; 

//设置连接相关信息
function selectDev(localIDS,remoIDS,localNameS,remoNameS,code){
	 var aHtml="",bHtml="";
	 var DevHtml='<div class="lis_sb">';
	 if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
		     console.log("enumerateDevices() not supported.");
		     $("#IMpanent").fadeIn(1000);
		     $("#IMparent_bg").fadeIn(1000);
			  if(code==2){//发送方的自己
   				  getUserMedia.call(navigator,videoParams, function(stream){ 
 				       document.getElementById('localVideo').src = URL.createObjectURL(stream); 
 				       layer.close(index);
				           local_stream=stream;
     				   peerConnection.addStream(stream);
     				   var json={"localID":localIDS,"remoID":remoIDS,"localName":localNameS,"remoName":remoNameS,"message":localNameS};
     				   var params=JSON.stringify({"code":code,"data":json,"toID":remoIDS});
     				   websocket.send(params);//发送邀请消息
 				   }, function(error){ 
	 					   if(error.name=="ConstraintNotSatisfiedError"){
	 						   alert_("摄像头不支持该分辨率，请重新调整");
	 					   }else{
	 						   console.log(error);
	 					   }
 				   });
			   }else{//接受方的自己
				  getUserMedia.call(navigator,videoParams, function(stream){ 
		                   document.getElementById('localVideo').src = URL.createObjectURL(stream); 
		                   layer.close(index);
		                   peerConnection.addStream(stream);
		                   local_stream=stream;
		                   peerConnection.createOffer(function(desc){
	                              peerConnection.setLocalDescription(desc); 
	                              var sdpJSON={"sdp":desc};
				                  var offerJSON={ "event": "_offer","data": sdpJSON,"localID":localIDS,"remoID":remoIDS,"localName":localNameS,"remoName":remoNameS};
				                  var params=JSON.stringify({"code":code,"data":offerJSON,"toID":remoIDS});
					              websocket.send(params);
			               }, function (error) {
			                   console.log('Failure callback: ' + error);
			         }); 
		          }, function(error){ 
			    	   if(error.name=="ConstraintNotSatisfiedError"){
			    		   alert_("摄像头不支持该分辨率，请重新调整");
						   }else{
							   console.log(error);
						   }
			          });
			   }
	}else{
		 navigator.mediaDevices.enumerateDevices().then(function (data) {
			  data.forEach(function (item) {
				    if(item.kind=="audioinput"){ //麦克风
				    	aHtml+=  "<option value='"+ item.deviceId +"'>" + item.label + " </option> ";
				    }else if(item.kind=="videoinput"){ //摄像头
				    	bHtml+=  "<option value='"+ item.deviceId +"'>" + item.label + " </option> ";
				    }
			  });
			  DevHtml+='<div class="sel_sb"><font>录音设备：</font><select id="luyinS" class="sel_g">'+aHtml+'</select></div>';
			  DevHtml+='<div class="sel_sb"><font>摄像设备：</font><select id="shexiangS"  class="sel_g">'+bHtml+'</select></div>';
			  DevHtml+='<div class="sel_sb"><font>分辩率：</font><select id="exactS"  class="sel_g">';
			  DevHtml+= '<option value="160*120">160*120</option>';
			  DevHtml+= '<option value="320*180">320*180</option>';
			  DevHtml+= '<option value="320*240">320*240</option>';
			  DevHtml+= '<option value="508*360">508*360</option>';
			  DevHtml+= '<option value="640*360">640*360</option>';
			  DevHtml+= '<option value="640*480">640*480</option>';
			  DevHtml+= '<option value="960*720">960*720</option>';
			  DevHtml+= '<option value="1280*720">1280*720</option>';
			  DevHtml+= '<option value="1920*1080">1920×1080</option>';
			  DevHtml+= '</select></div>';
			  DevHtml+='<div class="sel_sb"><font>帧率：</font><input type="number"  id="frameRateS"  value="30" style=" width: 214px;height: 23px;line-height: 23px;padding-left: 3px;"/></div>';
			  DevHtml+='</div>';
			  layer.open({
			     	  type: 1,
			     	  title:"选择相关设备列表",
			     	  shade:1,
			     	  shadeClose:false,
			     	  scrollbar: false,
			     	  move:false,
			     	  area:['430px','260px'],
			     	  content:DevHtml,
			     	  btn: ['确定', '取消']
			     	  ,yes: function(index, layero){
			     		   var sourceId=$(layero).find("#luyinS").val();
			     		   var sourceId2=$(layero).find("#shexiangS").val();
			     		   var exact=$(layero).find("#exactS").val();
			     		   var frameRate=$(layero).find("#frameRateS").val();
			     		   videoParams2={
			     				 "audio":{
			     					 "mandatory":{ 
			     				            "sourceId":sourceId
			     				       }
			     				   },
			     				  "video":{
			     					       "width": {"exact": exact.split("*")[0]},
			     					       "height": {"exact": exact.split("*")[1]},
			     					       "sourceId":sourceId2
			     				   },
			     				  "frameRate":frameRate,
			     		   };
			     		  $("#IMpanent").fadeIn(1000);
	       				  $("#IMparent_bg").fadeIn(1000);
	       				  
	       				   if(code==2){//发送方的自己
			       				  getUserMedia.call(navigator,videoParams2, function(stream){ 
			     				       document.getElementById('localVideo').src = URL.createObjectURL(stream); 
			     				       layer.close(index);
		     				           local_stream=stream;
				     				   peerConnection.addStream(stream);
				     				   var json={"localID":localIDS,"remoID":remoIDS,"localName":localNameS,"remoName":remoNameS,"message":localNameS};
				     				   var params=JSON.stringify({"code":code,"data":json,"toID":remoIDS});
				     				   websocket.send(params);//发送邀请消息
			     				   }, function(error){ 
			     					   if(error.name=="ConstraintNotSatisfiedError"){
			     						   alert_("摄像头不支持该分辨率，请重新调整");
			     					   }else{
			     						   console.log(error);
			     					   }
			     				   });
	       				   }else{//接受方的自己
	       					      getUserMedia.call(navigator,videoParams2, function(stream){ 
						                   document.getElementById('localVideo').src = URL.createObjectURL(stream); 
						                   layer.close(index);
						                   peerConnection.addStream(stream);
						                   local_stream=stream;
						                   peerConnection.createOffer(function(desc){
					                              peerConnection.setLocalDescription(desc); 
					                              var sdpJSON={"sdp":desc};
								                  var offerJSON={ "event": "_offer","data": sdpJSON,"localID":localIDS,"remoID":remoIDS,"localName":localNameS,"remoName":remoNameS};
								                  var params=JSON.stringify({"code":code,"data":offerJSON,"toID":remoIDS});
									              websocket.send(params);
							               }, function (error) {
							                   console.log('Failure callback: ' + error);
							         }); 
						       }, function(error){ 
						    	   if(error.name=="ConstraintNotSatisfiedError"){
						    		   alert_("摄像头不支持该分辨率，请重新调整");
		     					   }else{
		     						   console.log(error);
		     					   }
						       });
	       				   }
			     	  },btn2: function(index, layero){
			     		  console.log("");
			     		  //关闭弹出窗口
			     	  }
			 	});
       });
	}
	
}
/*************视频录制相关开始***************/
//远程
var remo_stream = null, remo_recorder = null,remo_chunks;
//本地
var local_stream=null,local_recorder=null,local_chunks;

function stopRecording(){
	 var flogs=parseInt($(".startRecord").attr("flogs"));
	  if(flogs==2){
		  $(".startRecord").html("开始录制");
		  $(".startRecord").attr("flogs",1);
		  $(".startRecord").removeClass("record_red");
		  remo_recorder.stop();
//		  local_recorder.stop();
	  }
}
function startRecording(){
	  var flogs=parseInt($(".startRecord").attr("flogs"));
	  if(flogs==1){
		  remo_chunks=[];
//		  local_chunks=[];
		  $(".startRecord").attr("flogs",2);
		  $(".startRecord").addClass("record_red");
		  $(".startRecord").html("正在录制");
		  //远程视频录制开始
		  remo_recorder = new MediaRecorder(remo_stream,{mimeType:"video/webm"});
		  remo_recorder.ondataavailable = function(e) {
			  remo_chunks.push(e.data);
		  };
		  remo_recorder.onstop = function(e) {
			  downRecord();
		  };
		  remo_recorder.start();
		  //远程视频录制结束
		  /*//本地视频录制开始
		  local_recorder = new MediaRecorder(local_stream,{mimeType:"video/webm"});
		  local_recorder.ondataavailable = function(e) {
			  local_chunks.push(e.data);
		  };
		  local_recorder.onstop = function(e) {
			  //停止录制本地
		  };
		  local_recorder.start();
		//本地视频录制结束
*/	  }
}
//预览视频
function preRecording(){
//	var localblob = new Blob(local_chunks, { 'type' : 'video/webm' });
	var removeblob = new Blob(remo_chunks, { 'type' : 'video/webm' });
	var flogs=parseInt($(".startRecord").attr("flogs"));
    if(flogs==1){
    	var html='<div style="width:734;height:550px;position:relative;background-color:#000;">';
//    	html+='<video autoplay  width="250" height="120" style="position:absolute;left:-45px;top:0px;" src="'+URL.createObjectURL(localblob)+'"></video>';
    	html+='<video autoplay  width="734" height="550" controls="controls" src="'+URL.createObjectURL(removeblob)+'"></video>';
    	html+='</div>';
        layer.open({
	      	  type: 1,
	      	  title:"预览录制视频",
	      	  shade:0.9,
	      	  shadeClose:false,
	      	  scrollbar: false,
	      	  move:false,
	      	  area:['738px','650px'],
	      	  content:html,
	      	  btn: ['确定', '取消']
	      	  ,yes: function(index, layero){
	      		  var htmlStr="";
	      	  },btn2: function(index, layero){
	      		 
	      	  }
      	});
    }
}
//拍照
function startPaly(){
	var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var video = document.getElementById("localVideo");
    context.drawImage(video, 0, 0, 600, 436);
    layer.open({
    	  type: 1,
    	  title:"拍照预览",
    	  shade:0.9,
    	  shadeClose:false,
    	  scrollbar: false,
    	  move:false,
    	  area:['600px','536px'],
    	  content:$("#pla"),
    	  btn: ['上传', '取消']
    	  ,yes: function(index, layero){
    		  console.log("当前未增加上传");
    		  layer.close(index);
    	  },btn2: function(index, layero){
    		 
    	  }
	});
}
//下载视频
function downRecord(){
	var blob = new Blob(remo_chunks, {type: 'video/webm'});
	var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = remoName+'.webm';
	document.body.appendChild(a);
	a.click();
    setTimeout(function() {
	    document.body.removeChild(a);
	    window.URL.revokeObjectURL(url);
	  }, 100);
}
/*************视频录制相关结束***************/
var peerConnection = new PeerConnection(iceServer);
peerConnection.onicecandidate = function(event){
    if (event.candidate != null) {
          var sdpJSON={"candidate":event.candidate};
		  var offerJSON={ "event": "_ice_candidate","data": sdpJSON};
		  var params=JSON.stringify({"code":4,"data":offerJSON,"toID":remoID});
		  websocket.send(params);
    }
};
peerConnection.onaddstream = function(event){
	var exists_html=$("#remoteVideo").find("#"+remoID).html();
	if(exists_html==null||exists_html==""||typeof(exists_html)=="undefined"){
		 /******视频录制需要开始******/
		 remo_stream = event.stream;
		 var  funHtml='<div class="fun_">';
		 funHtml+='<font class="fun_btn startRecord" onclick="startRecording();" flogs="1">开始录制</font>';
		 funHtml+='<font class="fun_btn" onclick="stopRecording();">停止录制</font>';
		 funHtml+='<font class="fun_btn" onclick="startPaly();">立即拍照</font>';
		/* funHtml+='<font class="fun_btn" onclick="preRecording();">预览视频</font>';*/
//		 funHtml+='<font class="fun_btn" onclick="downRecord();">下载视频</font>';
		 
		 funHtml+='</div>';
		 $("#videos").append(funHtml);
		 /******视频录制需要结束******/
		var html="<div id='"+remoID+"' style='margin-top:31px;width:150px;background-color:#000;height:138px;position:relative;float:left;cursor:pointer;' >";
		html+="<video id='remoVideo'  class='"+remoID+"' src='"+URL.createObjectURL(event.stream)+"' flog='1' ondblclick='onMaxVideo(this);' onclick='onchange_imV(this);'   autoplay='true' width='150' height='114'></video>";
	    html+="<div class='videoName'>"+remoName+"</div>";
	    html+="</div>";
	    $("#remoteVideo").append(html);
	}
};
//远程视频最大化与最小化
function onMaxVideo(obj){
	  var flogs=parseInt($(obj).attr("flog"));//标记
	  if(flogs%2==0){
		  $(obj).attr("flog",1);
		  exitFullscreen(obj);
	  }else{
		  requestFullScreen(obj);
		  $(obj).attr("flog",2);
	  }
}
function requestFullScreen(de) {
	 if (de.requestFullscreen) {
	    de.requestFullscreen();
	 } else if (de.mozRequestFullScreen) {
		de.mozRequestFullScreen();
	 } else if (de.webkitRequestFullScreen) {
	   de.webkitRequestFullScreen();
	 }
}
function exitFullscreen(element) { 
	if(element.exitFullscreen) { 
		element.exitFullscreen(); 
	}else if(element.mozExitFullScreen) { 
		element.mozExitFullScreen(); 
	}else if(element.webkitExitFullscreen) { 
		element.webkitExitFullscreen(); 
	} 
} 
//enter 发送消息（视频聊天中的文本）
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // enter 键
    	if($("#IMparent_bg").css("display")=="block"){//发送消息（非视频模式下请单独实现）
    		messageSend();
  	    }
   }
};
//发送消息（聊天使用，暂时只能支持文本消息）
function messageSend(){
	var message=$(".message_im").val();
	if (message==null||message==""||typeof(message)=="undefined") {
		return;
	}else {
		 $(".message_im").val("");
		 var html='<div class="im_message_g"><font class="im_message_g_name">我：</font><div class="im_message_centent">'+message+'</div></div>';
		 $("#centent_im").append(html);
		 var div = document.getElementById('centent_im');
		 div.scrollTop = div.scrollHeight;
		 var html_s="@@"+$("input[name='loginName']").val();
		 var params="{\"data\":\""+message+""+html_s+"\",\"code\":3,\"toID\":\""+remoID+"\"}";
		 websocket.send(params);
	}
}
//切换视频视角
function onchange_imV(obj){
	var src=$(obj)[0].srcObject;
	var oldSrc=$("#localVideo")[0].srcObject;
	var objname=$(obj).parent().find(".videoName");
	var objName=$(objname).html();
	var localName=$(".locaName").html();
	if(src==null||typeof(src)=="undefined"){
		src=$(obj)[0].src;
		oldSrc=$("#localVideo")[0].src;
		$("#localVideo")[0].src=src;
		$(obj)[0].src=oldSrc;
	}else{
		$("#localVideo")[0].srcObject=src;
		$(obj)[0].srcObject=oldSrc;
	}
	$(objname).html(localName);
	$(".locaName").html(objName);
}
/**
 *  消息提示框（采用Layer 测试）
 */
function alert_(message){
	 layer.alert(message, {
		    skin: 'layui-layer-lan'
		    ,closeBtn: 0
		    ,shift: 5
		 });
}
/**
 * 发出参加视频邀请
 * @param obj
 */
function vid(obj){
		var status=$(obj).attr("title");
		if(status=="在线"){
			 localID=$("input[name='loginID']").val();
			 remoID=$(obj).find("input[name='ids']").val();
			 remoName=$(obj).find(".name_").html();
			 localName=$("input[name='loginName']").val();
			if(localID==remoID){
				alert_("不可以跟自己视频哦");
			}else{
			    var offerJSON={"localID":localID,"remoID":remoID,"localName":localName,"remoName":remoName};
                var params=JSON.stringify({"code":9,"data":offerJSON,"toID":remoID});
                websocket.send(params);
			}
		}else{
			alert_("对方未在线不能视频哦");
		}
}

$(function(){
	  //标记字段
	  var flog=true;
	  $(".addUser").remove();//移除添加成员
	  //自己的视频双击全屏
	  $("#localVideo").dblclick(function(){
		  var flogs=parseInt($(this).attr("flog"));//标记
		  if(flogs%2==0){
			  $(this).attr("flog",1);
			  exitFullscreen(this);
		  }else{
			  requestFullScreen(this);
			  $(this).attr("flog",2);
		  }
	  });
	   //登录IM
	  if('WebSocket' in window){
		     var href=window.location.href;
		     href=href.split("://")[1];
		     var wssURL=href.split("/")[0];
		     var ID=$("input[name='loginID']").val();
		     //console.log(wssURL);//测试路径是否正确，防止代理时发生错误
		     websocket = new WebSocket("ws://192.168.5.45:83/yun_core/loginPCIM/"+ID+"@"+encodeURI("192.168.5.45:83"));
	  }else{
		     alert_("您当前浏览器暂未支持哦！！");
	  }
	  websocket.onerror = function(){
		   alert_("连接发生错误，暂不能使用通知哦");
		   flog=false;
	   };
	   websocket.onopen = function(event){
	       if(flog){
	    	   //集群环境下不合适
	    	   $.post("admins",function(data){
	    		   var html_='<div style="width:265px;padding:0px 10px;height:500px;position:fixed;z-index:100000;bottom:5px;right:5px;background-color:#fff;';
		    	   html_+='-webkit-box-shadow:0px 0px 30px #95B8E7;-moz-box-shadow:0px 0px 30px #95B8E7;box-shadow:0px 0px 30px #95B8E7;">';
		    	   for(var i=0;i<data.length;i++){
		    		     html_+='<div class="yh" id="'+data[i].ADMIN_ID+'"  onclick="vid(this);" title="'+(data[i].is_online?"在线":"未在线")+'" style="'+(data[i].is_online?"":"background-color:#ccc;")+'margin-bottom:8px;text-align:left;height:55px;width:100%;border-bottom:1px solid #e0e0e0;line-height:55px;cursor:pointer;">';
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
	   /**
	    * 相关消息处理
	    * 1：错误消息 2：视频邀请消息 3：聊天消息 4：视频交换消息 5:用户列表 6：用户上线 7:用户下线 8：拒绝视频消息 9：查看对方是否在通话中 10根据打探消息作出回应
	    * 11 :接受时再次发送打探消息 12：根据接受打探消息作出相应回应
	    */
	   websocket.onmessage = function(event){
           if(flog){
        	   var json=eval("("+event.data+")");
        	   var code=(json.code);
        	   if(code==1){
        		   alert_(json.data);
        	   }
        	   if(code==2){
        		   var msg=json.data.message;
        		   var remoIDS=json.data.localID;
        		   var remoNameS=json.data.localName;
        		   var localIDS=json.data.remoID;
        		   var localNameS=json.data.remoName;
        		   layer.confirm(localNameS+"邀请您加入视频聊天！", {
        			   btn: ['接受','取消'] //按钮
        			 }, function(index){
        				   remoID=remoIDS;
              		       remoName=remoNameS;
              		       localID=localIDS;
              		       localName=localNameS;
        				   if($("#"+remoID).attr("title")=="在线"){
        					   var offerJSON={"localID":localID,"remoID":remoID,"localName":localName,"remoName":remoName};
    					       var params=JSON.stringify({"code":11,"data":offerJSON,"toID":remoID});
    						   websocket.send(params);
        				   }else{
        					   alert_("对方暂时没在线了呀！！");
        				   }
        				   layer.close(index);
        			 }, function(index){
        				 //取消操作
        				$("#IMpanent").fadeOut(1000);
  						$("#IMparent_bg").fadeOut(1000);
        				layer.close(index);
        				var params="{\"data\":\""+localName+"拒绝了视频呢！！\",\"code\":8,\"toID\":\""+remoIDS+"\"}";
   						websocket.send(params);
        			 });
        	   }
        	   if(code==3){//收到来自远方的聊天消息
        		   var ns=json.data.split("@@");
        		   var msg=ns[0];
        		   remoName=ns[1];//对于接受方来说发送方永远都是远方
        		   var html='<div class="im_message_g"><font class="im_message_g_name">'+remoName+'：</font><div class="im_message_centent">'+msg+'</div></div>';
        		   $("#centent_im").append(html);
        		   var div = document.getElementById('centent_im');
        		   div.scrollTop = div.scrollHeight;
        	   }
        	   if(code==4){
        		  var event=json.event;
        		  var json=json.data;
                   //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
   		          if(json.event=="_ice_candidate"){
   		                   peerConnection.addIceCandidate(new RTCIceCandidate(json.data.candidate)); 
   		          }else{
   		        	        peerConnection.setRemoteDescription(new RTCSessionDescription(json.data.sdp));
   		        	    	if(json.event == "_offer") {
   		        	    	         remoID=json.localID;
   		         		             localID=json.remoID;
   		         		             remoName=json.localName;
   		         		             localName=json.remoName;
		                             peerConnection.createAnswer(function(desc){ // 发送answer
					                       peerConnection.setLocalDescription(desc); // 设置本地Offer
					                       var sdpJSON={"sdp":desc};
					                       // 发送answer
					                       var offerJSON={ "event": "_answer","data": sdpJSON,"localID":localID,"remoID":remoID,"remoName":remoName,"localName":localName};
					                       var params=JSON.stringify({"code":4,"data":offerJSON,"toID":remoID});
					                       websocket.send(params);//这次是最后信令服务器发送
				                    }, function (error) {
		                                   console.log('Failure callback: ' + error);
		                            });
		                    }
   		           }
        	   }
        	   if(code==5){
        		  console.log(json);
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
           				   var videHtml=$("#IMpanent").find("#"+json.data).html();
           				   if(videHtml!=null&&videHtml!=""&&typeof(videHtml)!="undefined"){
           					   var videoName=$("#IMpanent").find("#"+json.data).find(".videoName").html();
           					   $("#IMpanent").find("#"+json.data).remove();
           					   layer.alert(videoName+"退出了视频聊天", {
           					             skin: 'layui-layer-lan'
           					            ,closeBtn: 0
           					            ,shift: 5
           					           },function(index){
           					        	   location.reload();//可以关闭摄像头
           					        	   layer.close(index);
           					           });
           				    }
           				    $(yhs[i]).attr("title","未在线");
           				    $(yhs[i]).attr("style",'margin-bottom:8px;text-align:left;height:55px;width:100%;border-bottom:1px solid #e0e0e0;line-height:55px;cursor:pointer;background-color:#ccc;');
           			   }
           		   }
        	   }else if(code==8){//拒绝视频是否提示啥的(当页面未打开视频时就不需要通知了)
    	    	   if($("#IMparent_bg").css("display")=="block"){
    	    		   layer.alert(json.data, {
					             skin: 'layui-layer-lan'
					            ,closeBtn: 0
					            ,shift: 5
					           },function(index){
					        	   location.reload();//可以关闭摄像头（效果不太理想，后面改成局部）
					        	   layer.close(index);
					   });
    	    	   }
    	       }else if(code==9){//打探消息（探知有没有在通话中）
    	    	    var iscall=false;
    	    	    //不改变全局变量以免造成混乱
    	    	    var remoIDS=json.data.localID;
         		    var remoNameS=json.data.localName;
         		    var localIDS=json.data.remoID;
         		    var localNameS=json.data.remoName;
    	    	    if($("#IMparent_bg").css("display")=="block"){
    	    	    	iscall=true;
     	    	    }
    	    	    var offerJSON={"localID":localIDS,"remoID":remoIDS,"localName":localNameS,"remoName":remoNameS,"isCall":iscall};
    	    	    var params=JSON.stringify({"code":10,"data":offerJSON,"toID":remoIDS});
                    websocket.send(params);
                    
    	       }else if(code==10){
    	    	   //A第二次接受消息，第一次有效保存后可以再次使用
    	    	   if(json.data.isCall){//未在通话中
    	    		   alert_("对方正在通话中");
    	    	   }else{
    	    		   var remoIDS=json.data.localID;
            		   var remoNameS=json.data.localName;
            		   var localIDS=json.data.remoID;
            		   var localNameS=json.data.remoName;
       				   selectDev(localIDS,remoIDS,localNameS,remoNameS,2);
    	    	   }
    	       }else if(code==11){//接受探知消息并且返回探知结果
    	    	   var localIDS=json.data.remoID;
	    		   var localNameS=json.data.remoName;
	    		   var remoIDS=json.data.localID;
	    		   var remoNameS=json.data.localName;
	    		   var is_Video_wait=1;//不可以连接
	    		   if($("#IMparent_bg").css("display")=="block"){
	    			    is_Video_wait=2;//继续在等待中未与别人在通话中
    	    	   }
	    		   var exists_html=$("#remoteVideo").html();
	    		   if(is_Video_wait==2&&exists_html!=null&&exists_html!=""&&typeof(exists_html)!="undefined"){
	    			   is_Video_wait=3;
	    		   }
	    		   //等待的不是自己
	    		   var offerJSON={"localID":localIDS,"remoID":remoIDS,"localName":localNameS,"remoName":remoNameS,"video_wait":is_Video_wait};
				   var params=JSON.stringify({"code":12,"data":offerJSON,"toID":remoIDS});
				   websocket.send(params);//发送邀请消息
    	       }else if(code==12){//接受探知结果
    	    	   var localIDS=json.data.remoID;
	    		   var localNameS=json.data.remoName;
	    		   var remoIDS=json.data.localID;
	    		   var remoNameS=json.data.localName;
	    		   var wait=json.data.video_wait;
	    		   if(wait==2){//对方还处于等待中，我需要响应他
	    			   selectDev(localIDS,remoIDS,localNameS,remoNameS,4);
	    		   }else if(wait==1){
	    			   alert_("对方暂时已经关闭视频了哦");
	    		   }else if(wait==3){
	    			   alert_("对方正在视频通话中！！");
	    		   }
    	       }
	       }else{
	    	   flog=false;
	       }
	   };
	   /**
	    * 管理连接需要断开一切连接
	    */
	   websocket.onclose = function(){
		   
	   };
	   //监听窗口关闭事件
	   window.onbeforeunload = function(){
	          websocket.close();
	   };
	   
});

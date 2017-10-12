var websocket = null;
var SoketURL="192.168.5.45:83";//Soket路径
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
	var remoID=$("#remoID").val();
	var remoName=$("#remoName").val();
	var localID=$("#localID").val();
	var localName=$("#localName").val();
	$.post("../sys/getAccessToken",{toID:remoID},function(data){
		if(data.code==0){
			var accessToken=data.accessToken;
			var roomID=data.roomId;
			var serviceURL=data.serviceURL;
			$("#accesscToken").val(accessToken);
			$("#roomID").val(roomID);
			$("#serviceURL").val(serviceURL);
			joinRoom(serviceURL,accessToken,roomID,localID,localName,"data","password");
			var json={"accessToken":accessToken,"roomID":roomID,"serverURL":serviceURL};
			sendMSG(1,json,localID,remoID,localName,remoName);
		}else if(data.code==1){
			alert_("对方正在通话中，请稍后重试！！");
		}else if(data.code==2){
			alert_("请选择某个用户进行视频通话！！");
		}else{
			alert_("发生了未知情况！！");
		}
	},"json");
	if('WebSocket' in window){
		var ID=$("#localID").val();
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
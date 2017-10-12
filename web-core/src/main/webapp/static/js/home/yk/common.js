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
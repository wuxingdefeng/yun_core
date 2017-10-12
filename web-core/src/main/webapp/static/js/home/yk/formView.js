$(function(){
	var flog=true;
	//点击医生操作
	$(".doctor").click(function(){
		//TODO 需要前置判断是否获取
		var remoID=$(this).attr("data-id");
		var remoName=$(this).attr("data-name");
		var localID=$("#loginID").val();
		var localName=$("#loginName").val();
		parent.layer.open({
					type: 2,
					title:"视频页面",
					shade:1,
					shadeClose:false,
					scrollbar: false,
					move:false,
					area:['901px','600px'],
					content:"localVideo?remoID="+remoID+"&remoName="+remoName+"&localID="+localID+"&localName="+localName,
					success:function(layero,index){
						var top=parseInt($(layero).css("top"))+28;
						var css=$(layero).attr("style")+"height:545px;top:"+top+"px;";
						$(layero).attr("style",css);
					}
			});
	});
	if('WebSocket' in window){
		var ID=$("#loginID").val();
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
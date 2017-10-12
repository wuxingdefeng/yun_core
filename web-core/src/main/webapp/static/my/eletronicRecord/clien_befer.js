function openClient(){
	var param={};
	param.userName=$("#user_name").val();
	param.userSex=$("input[name='sex']").closest(".xm").find(".layui-form-checked").prev().val();
	param.userAge=$("input[name='age']").val();
	param.telephone=$("input[name='phone']").val();
	param.address=$("input[name='change_address']").val();
	param.token=$("input[name='pageToken']").val();
	param.userID=$("input[name='user_id']").val();
	if(isBlock(param.userName)){
		layer.msg("用户名不能为空");
		return;
	}
	if(isBlock(param.userAge)){
		layer.msg("年龄不能为空");
		return;
	}else{
		if(isNaN(param.userAge)){
			layer.msg("年龄只能填写数字");
			return;
		}
	}
	if(isBlock(param.telephone)){
		layer.msg("联系方式不能为空");
		return;
	}
	if(isBlock(param.address)){
		layer.msg("地址不能为空");
		return;
	}
	if(isBlock(param.token)){
		layer.msg("token失效，请刷新页面！！");
		return;
	}
	if(isBlock(param.userID)){
		layer.msg("用户名不能随便输入,请选择");
		return;
	}
	//测试打开一个客户端
//	var dd="Launcher.FSM://JTdCaHR0cCUzQSUyRiUyRmZzLmZzbWVldGluZy5jb20lMkZkb3dubG9hZCUyRkZNRGVza3RvcC5leGUlN0QlN0JGYXN0b256JTdEJTdCRk1EZXNrdG9wJTdEJTdCLWxpbmslMjBUQ1AlM0FhLmZzbWVldGluZy5jb20lM0ExMDg5JTNCVENQJTNBdC5mc21lZXRpbmcuY29tJTNBMTA4OSUzQiUyMC11bmFtZSUyMCUyMmFhJTIyJTIwLXV0eXBlJTIwMCUyMC1yaWQlMjAxMDEwNCUyMC1ycHdkJTIwMTExMTExJTIwLW5vZGUlMjAxJTdE";
//	window.location.href = dd;
//	console.log(param);
	var base=new Base64();
//	console.log("after:"+base.encode(JSON.stringify(param)));
	layer.msg("客户端正在研发中");
	
}

function isBlock(str){
	if(null == str || "" == trim(str) || typeof(str) == "undefined"){
		return true;
	}
	return false;
}

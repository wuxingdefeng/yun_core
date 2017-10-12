String.prototype.NoSpace = function(){ 
	return this.replace(/\s+/g, ""); 
};
String.prototype.trim = function() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); }; 
$(document).ready(function(){
	$("#Password").focus(function(){
		this.type="password";
	});
	$("#code").click(function(){
		$(this).attr("src","code?date="+new Date());
	});
	$(".clearbtn").click(function(){
		$("input").val("");
	});
	function login(){
		var vals=true; 
		$(".inp").each(function(){
			var vl=$(this).val();
			var names=($(this).closest("div").find("font").html().split("：")[0]).trim();
			names=names.NoSpace();
			if(vl==null||vl==""||typeof(vl)=="undefined"){
				var id=this.id;
				layer.alert(''+names+'不能为空哦!！', {
					skin: 'layui-layer-lan'
						,closeBtn: 0
						,shift: 5 //动画类型
				});
				vals=false;
				return false;
			}
		});
		if(vals){//登录中
			$.post("login",{"name":$("#Name").val(),"pwd":$("#Password").val(),"code":$("#Code").val()},function(result){
				if(result.code!="0"){
					$("#code").attr("src","code?date="+new Date());
					var msg=(result.msg);
					layer.alert(''+msg, {
						skin: 'layui-layer-lan'
							,closeBtn: 0
							,shift: 5 //动画类型
					});
				}else{
					window.location.href="sys/main";
				}
			},"json");
		}
	}
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){ // enter 键
			login();
		}
	};
	//登录操作
	$(".login_btn").click(function(){
		login();
	}); 
});
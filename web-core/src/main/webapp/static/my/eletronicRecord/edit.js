function getJSON(obj){
  var inputs=$("form").find("input");
  var param={};
  for(var i=0;i<inputs.length;i++){
     var type=$(inputs[i]).attr("type");
	 var name=$(inputs[i]).attr("name");
	 var required=$(inputs[i]).attr("required");
	 var values=$(inputs[i]).val();
     if(required){
	     if(values==null||values==""||typeof(values)=="undefined"){
			$(inputs[i]).focus();
		    return;
		 }
	 }

	 if(type=="text"){
	   param[name]=values;
	 }else if(type=="checkbox"){
	   //param[name]=values;
	 }
  
  } 
  var checks=$(".layui-form-checked");
  for(var i=0;i<checks.length;i++){
      var obj=$(checks[i]).prev();
	  var name=$(obj).attr("name");
	  var val=param[name];
	  if(val!=null&&val!=""&&typeof(val)!="undefined"){
	     param[name]=($(obj).val()+","+val);
	  }else{
	     param[name]=$(obj).val();
	  }
      
  }
  var jsondata =JSON.stringify(param);
  var user_name = $("#user_name").val();
  //var user_sex = $('input:radio[name="sex"]:checked').val();
  var user_sex = param.sex;
  var user_age = $('input[name="age"]').val();
  var user_birthday_string = $("input[name='birthday']").val();
  //var user_rmarrige =$('input:radio[name="marriage"]:checked').val();
  var user_rmarrige =param.marriage;
  var user_job =$('input[name="pation"]').val();
  var user_phone =  $('input[name="phone"]').val();
  var user_long_address =  $('input[name="change_address"]').val();
  var user_postal_address =  $('input[name="phone_address"]').val();
  //var uncomfortable_place =  $('input:radio[name="bing"]:checked').val();
  //var uncomfortable_place =  $('input[name="bing"]').val();
  //var htmldata=$("body").html();.clone()
  var htmldata=$("body").html();
  var user_id = $("input[name='user_id']").val();
  //return;
  //提交保存
  layer.confirm('您确认要提交该电子病历吗？', {
	  btn: ['确定','取消'] //按钮
	}, function(index){
		$.post(sy.contextPath+"/sys/electronicrecordbasic/insert",{"user_id":user_id,
			"jsondata":jsondata,"user_name":user_name,"user_sex":user_sex,"user_age":user_age,
			"user_birthday_string":user_birthday_string,"user_rmarrige":user_rmarrige,"user_job":user_job,"user_phone":user_phone,
			"user_long_address":user_long_address,"user_postal_address":user_postal_address,"htmldata":htmldata,"uncomfortable_place":uncomfortable_place
		},function(result){
			if(result.success==true){
				layer.confirm('提交成功，是否继续添加？',{btn:['是','否']},function(){
					addTab("电子病历填写", "electronicRecord/go");
				},function(){
					$("#submitBtnId").css("display","none");
				});
			}else{
				layer.msg("提交失败！");
			}
		 },"json");
	},function(index){
		 layer.close(index);
	});
/*  $.messager.confirm('提示','确认要提交吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/electronicrecordbasic/insert",{
				"jsondata":jsondata,"user_name":user_name,"user_sex":user_sex,"user_age":user_age,
				"user_birthday_string":user_birthday_string,"user_rmarrige":user_rmarrige,"user_job":user_job,"user_phone":user_phone,
				"user_long_address":user_long_address,"user_postal_address":user_postal_address,"htmldata":htmldata,"uncomfortable_place":uncomfortable_place
			},function(result){
				if(result.success==true){
					layer.msg("提交成功！");
				}else{
					layer.msg("提交失败！");
				}
			 },"json");
		}
	});*/
}
var uncomfortable_place="";
$(function(){
	$("html, body").animate({scrollTop: $(".a").offset().top-8 }, {duration: 500,easing: "swing"});

    //添加目录索引滚动到相应位置
    $(".catalog_g").click(function(){
        $(".catalog_g_sel").removeClass("catalog_g_sel");
        $(this).addClass("catalog_g_sel");
	    var class_=$(this).attr("data");
	    $("html, body").animate({scrollTop: $("."+class_).offset().top-8 }, {duration: 500,easing: "swing"});
	})

   //初始化表单
   var form=null;
   layui.use(['form','laydate'], function(){
			  form= layui.form();
			  //多选框变成单选框
			  form.on('checkbox', function(data){
                  var name=$(data.elem).attr("name");
				  var obj= $("input[name='"+name+"']");
				  var isRadio=$(obj).attr("type2");
				  //是否选中 复选框的判断方式
                  var isChecked=$(data.othis).is(".layui-form-checked");

				  if(isRadio=="radio"){
                            
                            var len=$(obj).closest(".xm").find(".layui-form-checked").length;

							$(obj).closest(".xm").find(".layui-form-checked").removeClass("layui-form-checked");

						    $(data.othis).addClass("layui-form-checked");

							//if(isChecked){
                            //   len=(len-1);
							//}
							//if(isChecked&&le==0){
							//  $(data.othis).removeClass("layui-form-checked");
							//}
							
				  }

				  var val=($(data.elem).attr("title"));
				  if(name=="sex"){//性别
					if(val=="女"){
					    $(".a_6").attr("style","display:block;");
					}else{
					    $(".a_6").attr("style","display:none;");
					}
				  }
				  if(name=="bing"){
					  uncomfortable_place =val;
				     if(val!="颈肩腰腿疼"){
					    layer.msg('正在开发中，敬请期待', {icon: 4,shade:[0.4, '#393D49']});
					 }
					 if(val=="颈肩腰腿疼"){
					     $(".bing2").attr("style","display:block;");
					 }else{
					     $(".bing2").attr("style","display:none;");
					 }
				  }
				  if(name=="toumianbu_yan"){//眼部如果选择全部正常其他的隐藏
					  if(data.elem.checked){
						  $(".toumianbu_yan_class").css("display","none");
					  }else{
						  $(".toumianbu_yan_class").css("display","");
					  }
				  }
				  if(name=="f1_status"){//口咽如果选择全部正常其他的隐藏
					  if(data.elem.checked){
						  $(".f1_status_class").css("display","none");
					  }else{
						  $(".f1_status_class").css("display","");
					  }
				  }
				  if(name=="g1_status"){//腹部如果选择全部正常其他的隐藏
					  if(data.elem.checked){
						  $(".g1_status_class").css("display","none");
					  }else{
						  $(".g1_status_class").css("display","");
					  }
				  }
				  if(name=="h1_status"){//四肢如果选择全部正常其他的隐藏
					  if(data.elem.checked){
						  $(".h1_status_class").css("display","none");
					  }else{
						  $(".h1_status_class").css("display","");
					  }
				  }
				  if(name=="j1_status"){//神经系统如果选择全部正常其他的隐藏
					  if(data.elem.checked){
						  $(".j1_status_class").css("display","none");
					  }else{
						  $(".j1_status_class").css("display","");
					  }
				  }
				  if(name=="k1_status"){//神经反射如果选择全部正常其他的隐藏
					  if(data.elem.checked){
						  $(".k1_status_class").css("display","none");
					  }else{
						  $(".k1_status_class").css("display","");
					  }
				  }
				  if(name=="f5_xiongbu"){//胸部如果选择全部正常其他的隐藏
					  if(data.elem.checked){
						  $(".f5_xiongbu_class").css("display","none");
					  }else{
						  $(".f5_xiongbu_class").css("display","");
					  }
				  }
              });  
			  
			  
   });

   $("input").bind("change", function() {  
       /*方法一：*/  
       var v = $(this).val();  
       $(this).attr("value", v); //这句是用改变属性的方式    

       /*方法二：*/  
       //this.defaultValue = this.value; //也可以用这一句代替上面两句    
});
        
})


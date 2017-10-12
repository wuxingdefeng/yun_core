var grid;
$(function(){
	grid=$('#dg');
});
function resetSearch(){
	$("#searchForm").form("clear");
	$('#dg').datagrid('load', dd.serializeObject($('#searchForm').form()));
}
function refresh() {
	window.location.reload();
}
function searchs(){
	$('#dg').datagrid('load', dd.serializeObject($('#searchForm').form()));
}
function clears() {
	$("#searchForm").form("clear");
}
//新增按钮事件
function insert(){
	var dialog = parent.sy.modalDialog({
		title : '新增',
		url : 'sysadmin/toAddOrUpdatePage',
		width:'700',
		height:'350',
		toolbar:[{
			text:'保存',
			iconCls:'icon-ok',
			handler:function(){
			dialog.find('iframe').get(0).contentWindow.submitForm(dialog, grid, parent.$);
			
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){
				dialog.dialog('destroy');
			
			}
		}]
	});
}

var submitForm = function($dialog) {
	popJon2=(idHtml.substring(0,idHtml.length-1)+"--"+nameHtml.substring(0,nameHtml.length-1));
	parent.dialog2.dialog('close');
};
//编辑
function update(){
	var rows=$('#dg').datagrid('getSelections');
	if(rows.length==0){
		$.messager.show({
			title:'提示消息',
			msg:'请选择一条编辑的数据！',
			timeout:2000,
			showType:'slide'
		});
		return;
	}
	var ID=rows[0].ADMIN_ID; 
	var dialog = parent.sy.modalDialog({
		title : '修改',
		url : 'sysadmin/toAddOrUpdatePage?ID='+ID,
		width:'700',
		height:'350',
		toolbar:[{
			text:'保存',
			iconCls:'icon-ok',
			handler:function(){
			dialog.find('iframe').get(0).contentWindow.submitForm(dialog, grid, parent.$);
			
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){
				dialog.dialog('destroy');
			
			}
		}]
	});
}
//删除
function deletes(){
	var rows=$('#dg').datagrid('getSelections');
	if(rows.length==0){
		$.messager.show({
			title:'提示消息',
			msg:'请选择一条数据！',
			timeout:2000,
			showType:'slide'
		});
		return;
	}
	var ID=rows[0].ADMIN_ID; 
	$.messager.confirm('确认','确认要删除吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/sysadmin/delete",{ID:ID},function(result){
				if(result.success==true){
					searchs();
				}
			 },"json");
		}
	});
}

//formatter
function sexFormatterT(v,r,i){
	if(v==0){
		return "未知";
	}else if(v==1){
		return "男";
	}else if(v==2){
		return "女";
	}else{
		return "地球无此种";
	}
}
//1 正常 2冻结  3过期
function statusFormatterT(v,r,i){
	if(v==1){
		return "<font color='blue'>正常</font>";
	}else if(v==2){
		return "<font color='red'>冻结</font>";
	}else if(v==3){
		return "<font color='#808080'>过期</font>";
	}else{
		return "<font color='red'>未知</font>";
	}
}

function heandFormatterT(v,r,i){
	if(v==null||v==""){
		return "<div style='width:30px;height:30px;border_radius:4px;background-color:#000;margin:5px auto;'><img src='../../static/sys_images/adminHend.jpg' style='width:100%;height:100%;'></div>";
	}else{
		return "<div style='width:30px;height:30px;border_radius:4px;background-color:#000;margin:5px auto;'><img src='"+v+"' style='width:100%;height:100%;'></div>";
	}
}
//重置密码
function updatePwd(){
	var rows=$('#dg').datagrid('getSelections');
	if(rows.length==0){
		$.messager.show({
			title:'提示消息',
			msg:'请选择需要重置的管理员！',
			timeout:2000,
			showType:'slide'
		});
		return;
	}
	var ID=rows[0].ADMIN_ID; 
	$.messager.confirm('确认','确认要重置为：<font color="red">123456</font>吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/sysadmin/updatePwd?type=2",{ADMIN_ID:ID,newPwd:123456},function(result){
				if(result.success==true){
					$.messager.show({
						title:'提示消息',
						msg:'重置成功！',
						timeout:2000,
						showType:'slide'
					});
				}else{
					$.messager.alert('错误',result.errorMsg);  
				}
			 },"json");
		}
	});
}
//正常/冻结
function updateStatus(){
	var rows=$('#dg').datagrid('getSelections');
	if(rows.length==0){
		$.messager.show({
			title:'提示消息',
			msg:'请选择需要操作的管理员！',
			timeout:2000,
			showType:'slide'
		});
		return;
	}
	var ID=rows[0].ADMIN_ID; 
	var status=rows[0].ADMIN_STATUS;
	var statusStr="<font color='blue'> 解冻 </font>";
	if(status==1){
		statusStr="<font color='red'> 冻结 </font>";
	}
	status=(status==1?2:1);
	$.messager.confirm('确认','确认要'+statusStr+'吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/sysadmin/updateStatus",{ADMIN_ID:ID,ADMIN_STATUS:status},function(result){
				if(result.success==true){
					refresh();
					$.messager.show({
						title:'提示消息',
						msg:''+statusStr+'成功！',
						timeout:2000,
						showType:'slide'
					});
				}else{
					$.messager.alert('错误',result.errorMsg);  
				}
			 },"json");
		}
	});
}

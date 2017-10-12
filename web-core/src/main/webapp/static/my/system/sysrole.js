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
		url : 'sysrole/toAddOrUpdatePage',
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
	var ID=rows[0].ROLE_ID; 
	var dialog = parent.sy.modalDialog({
		title : '修改',
		url : 'sysrole/toAddOrUpdatePage?ID='+ID,
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
	var ID=rows[0].ROLE_ID; 
	$.messager.confirm('确认','确认要删除吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/sysrole/delete",{ID:ID},function(result){
				if(result.success==true){
					searchs();
				}
			 },"json");
		}
	});
}

//formatter
function formatterT(v,r,i){
	
}
//获取ID;
function selectedHR(){
	var rows=$('#dg').datagrid('getSelections');
	var ID=rows[0].ROLE_ID; 
	$('#tt').tree({    
	    url:'../public/getMenulist?roleID='+ID   
	});  
}
//设置权限
function setJurs(){
	var nodes = $('#tt').tree('getChecked');
	var nodes2 = $('#tt').tree('getChecked', 'indeterminate');
	var rows=$('#dg').datagrid('getSelections');
	if(rows.length==0){
		$.messager.show({
			title:'提示消息',
			msg:'请选择角色进行设置权限！',
			timeout:2000,
			showType:'slide'
		});
		return;
	}
	var ID=rows[0].ROLE_ID; 
	var s = '';
	for(var i=0; i<nodes2.length;i++){
		if (s != '') {
			s += ',';
		}
		s +=("jr"+nodes2[i].id+"jr");
	}
	for(var i=0; i<nodes.length; i++){
		var node=("jr"+nodes[i].id+"jr");
		if(s.indexOf(node)<0){
			if (s != '') {
				s += ',';
			}
			s +=node;
		}
	}
	$.post(sy.contextPath+"/sys/public/saveJurs",{roleID:ID,jurs:s},function(result){
		if(result.success==true){
			$.messager.show({
				title:'提示消息',
				msg:'设置权限成功！',
				timeout:2000,
				showType:'slide'
			});
		}else{
			$.messager.show({
				title:'提示消息',
				msg:'设置权限失败！',
				timeout:2000,
				showType:'slide'
			});
		}
	 },"json");
	
}

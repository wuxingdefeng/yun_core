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
		url : 'electronicrecordbasic/toAddOrUpdatePage',
		width:'700',
		height:'600',
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
	var ID=rows[0].record_id; 
	var dialog = parent.sy.modalDialog({
		title : '修改',
		url : 'electronicrecordbasic/toAddOrUpdatePage?ID='+ID,
		width:'700',
		height:'600',
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
// 查询
function research(){
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
	var record_id=rows[0].record_id; 
	addTab("电子病历[查看]", "electronicrecordbasic/research?record_id="+record_id);
}
//跳转到打印预览页面 sy.contextPath+"/sys/electronicrecordbasic/delete"
function toPrint(){
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
	var record_id=rows[0].record_id; 
	//window.open('webpage.asp','_self')
	window.open(sy.contextPath+"/sys/electronicrecordbasic/toPrint?record_id="+record_id,'_blank');
	//addTab("电子病历[查看]", "electronicrecordbasic/toPrint?record_id="+record_id);
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
	
	var ID=rows[0].record_id; 
	$.messager.confirm('确认','确认要删除吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/electronicrecordbasic/delete",{ID:ID},function(result){
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

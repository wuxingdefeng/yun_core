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
	var parentID=$("input[name='PARENT_MENUID']").val();
	var dialog = parent.sy.modalDialog({
		title : '新增菜单',
		url : ' menu/toAddOrUpdatePage?parentID='+parentID,
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
//启用或禁止
function status(){
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
	var ID=rows[0].MENU_ID; 
	var status=rows[0].MENU_STATUS;
	var statusStr="启动";
	if(status==1){
		statusStr="禁用";
	}
	var reStatus=(status==1?2:1);
	$.messager.confirm('确认','确认要'+statusStr+'吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/menu/status",{menuID:ID,menuStatus:reStatus},function(result){
				if(result.success==true){
					searchs();
				}
			 },"json");
		}
	});
}
//编辑
function update(){
	var parentID=$("input[name='PARENT_MENUID']").val();
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
	var ID=rows[0].MENU_ID; 
	var dialog = parent.sy.modalDialog({
		title : '修改菜单',
		url : 'menu/toAddOrUpdatePage?parentID='+parentID+'&ID='+ID,
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
//启用或禁止
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
	var ID=rows[0].MENU_ID; 
	$.messager.confirm('确认','确认要删除吗?',function(a){
		if(a){
			$.post(sy.contextPath+"/sys/menu/delete",{menuID:ID},function(result){
				if(result.success==true){
					searchs();
				}
			 },"json");
		}
	});
}
//formatter
function statusFormatter(v,r,i){
	if(v==1){
		return "<font style='color:blue;'>启用</font>";
	}else if(v==2){
		return "<font style='color:red;'>禁止</font>";
	}else{
		return "<font style='color:#ccc;'>敬请期待</font>";
	}
}
//formatter
function caozuoFormatter(v,r,i){
	if(v==null||v=="null"){
		return "<input type='hidden' value='"+v+"'><a href='javascript:void(0);' class='a_btn' onclick='menuClick(this,2);'>下级菜单</a>";
	}else{
		return "<input type='hidden' value='"+v+"'><a href='javascript:void(0);' class='a_btn' onclick='menuClick(this,1);'>上级菜单</a><a href='javascript:void(0);' class='a_btn' onclick='menuClick(this,2);'>下级菜单</a>";
	}
}
function menuClick(obj,type){
	var parentID=null;
	if(type==1){//上级
		parentID=$(obj).closest("td").find("input").val();
	}else{//下级
		parentID=$(obj).closest("tr").find("td").eq(0).find("div").html();
	}
	$("input[name='PARENT_MENUID']").val(parentID);
	searchs();
}

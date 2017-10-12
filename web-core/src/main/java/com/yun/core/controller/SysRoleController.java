package com.yun.core.controller;


import com.yun.core.interceptor.Token;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysRole;
import com.yun.service.inter.SysRoleServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yun.commons.Page;

@Controller
public class SysRoleController extends BaseController{
	@Autowired
	private SysRoleServiceInter sysroleService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/sysrole/go")
	public String go(){
		super.getFunBtns();
		return "/sysrole/list";
	}

	/**
	 * 返回分页数据
	 * @param sysrole
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/sysrole/list")
	public Object list(SysRole sysrole,Page page){
		Object obj=sysroleService.getPages(sysrole,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/sysrole/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("sysrole", sysroleService.getSysRoleByROLE_ID(ID));
		}
		return "/sysrole/addOrUpdate";
	}
	/**
	 * 新增
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysrole/insert")
	@Token(remove=true)
	public ResultMessage insert(ModelMap model, SysRole sysrole) {
		ResultMessage msg = new ResultMessage();
		if (sysrole == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		sysrole.setADMIN_ID(this.getLoginID());
		return sysroleService.insert(sysrole);
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysrole/update")
	@Token(remove=true)
	public ResultMessage update(ModelMap model,SysRole sysrole) {
		ResultMessage msg = new ResultMessage();
		if (sysrole == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		sysrole.setADMIN_ID(this.getLoginID());
		return sysroleService.update(sysrole);
	}
	/**
	 * 删除
	 * @param ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysrole/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=sysroleService.delete(ID);
		return msg;
	}
	@ResponseBody
	@RequestMapping(value = "sys/public/getRoles")
	public Object getRoles() {
		return sysroleService.getRoles();
	}
	/**
	 * 获取角色菜单
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/public/getMenulist")
	public Object getMenulist(String roleID) {
		Object obj=sysroleService.getMenulist(roleID);
		return obj;
	}
	/**
	 * 设置角色
	 * @param roleID
	 * @param jurs
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/public/saveJurs")
	public Object saveJurs(String roleID,String jurs) {
		return sysroleService.saveJurs(roleID,jurs);
	}
}

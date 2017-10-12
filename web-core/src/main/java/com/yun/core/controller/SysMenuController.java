package com.yun.core.controller;


import com.yun.entity.ResultMessage;
import com.yun.entity.SysMenu;
import com.yun.service.inter.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.yun.commons.Page;


@Controller
public class SysMenuController extends BaseController{
	@Autowired
	private SysMenuService sysMenuService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/menu/go")
	public String go(){
		super.getFunBtns();
		return "/menu/list";
	}

	/**
	 * 返回分页数据
	 * @param menu
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/menu/list")
	public Object list(SysMenu menu,Page page){
		Object obj=sysMenuService.getMenuPages(menu,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/menu/toAddOrUpdatePage")
	public String goAddOrUpdatePage(ModelMap model,String ID,String parentID){
		model.put("parentID", parentID);
		if(ID!=null){
			model.put("sysMenu", sysMenuService.getMenuByID(ID));
		}
		return "/menu/addOrUpdate";
	}
	/**
	 * 新增
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/menu/insert")
	public ResultMessage insert(ModelMap model,SysMenu sysMenu) {
		ResultMessage msg = new ResultMessage();
		if (sysMenu == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		sysMenu.setADMIN_ID(super.getLoginID());
		return sysMenuService.insert(sysMenu);
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/menu/update")
	public ResultMessage update(ModelMap model,SysMenu sysMenu) {
		ResultMessage msg = new ResultMessage();
		if (sysMenu == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		sysMenu.setADMIN_ID(super.getLoginID());
		return sysMenuService.update(sysMenu);
	}
	/**
	 * 启用或者禁用
	 * @param menuID
	 * @param reStatus
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/menu/status")
	public ResultMessage status(String menuID,int menuStatus) {
		ResultMessage msg = new ResultMessage();
		if (menuID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=sysMenuService.updateMenuStatus(menuID,menuStatus);
		return msg;
	}
	/**
	 * 删除菜单
	 * @param menuID
	 * @param reStatus
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/menu/delete")
	public ResultMessage delete(String menuID) {
		ResultMessage msg = new ResultMessage();
		if (menuID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=sysMenuService.delete(menuID);
		return msg;
	}

}

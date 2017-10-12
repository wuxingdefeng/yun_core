package com.yun.core.controller;


import com.yun.commons.MD5;
import com.yun.commons.Page;
import com.yun.core.interceptor.Token;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysAdmin;
import com.yun.service.inter.SysAdminServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
public class SysAdminController extends BaseController{
	@Autowired
	private SysAdminServiceInter sysadminService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/sysadmin/go")
	public String go(){
		super.getFunBtns();
		return "/sysadmin/list";
	}

	/**
	 * 返回分页数据
	 * @param sysadmin
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/sysadmin/list")
	public Object list(SysAdmin sysadmin,Page page){
		Object obj=sysadminService.getPages(sysadmin,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/sysadmin/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("sysadmin", sysadminService.getSysAdminByADMIN_ID(ID));
		}
		return "/sysadmin/addOrUpdate";
	}
	/**
	 * 新增
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysadmin/insert")
	@Token(remove=true)
	public ResultMessage insert(ModelMap model, SysAdmin sysadmin) {
		ResultMessage msg = new ResultMessage();
		if (sysadmin == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		sysadmin.setADMIN_PWD(MD5.md5(sysadmin.getADMIN_PWD()));
		return sysadminService.insert(sysadmin);
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysadmin/update")
	@Token(remove=true)
	public ResultMessage update(ModelMap model,SysAdmin sysadmin) {
		ResultMessage msg = new ResultMessage();
		if (sysadmin == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return sysadminService.update(sysadmin);
	}
	/**
	 * 删除
	 * @param ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysadmin/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=sysadminService.delete(ID);
		return msg;
	}
	
	@ResponseBody
	@RequestMapping(value = "sys/sysadmin/updatePwd")
	public ResultMessage updatePwd(SysAdmin admin) {
		ResultMessage msg = new ResultMessage();
		if (admin == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		if(admin.getType()==1){
			admin.setADMIN_ID(this.getLoginID());
			admin.setADMIN_PWD(this.getLoginFiled("ADMIN_PWD"));
		}
		msg=sysadminService.updatePwd(admin);
		return msg;
	}
	//冻结、解冻
	@ResponseBody
	@RequestMapping(value = "sys/sysadmin/updateStatus")
	public ResultMessage updateStatus(SysAdmin admin) {
		ResultMessage msg = new ResultMessage();
		if (admin == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		
		msg=sysadminService.updateStatus(admin);
		return msg;
	}
	

}

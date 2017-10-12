package com.yun.core.controller;


import com.yun.core.interceptor.Token;
import com.yun.entity.Loginfo;
import com.yun.entity.ResultMessage;
import com.yun.service.inter.LoginfoServiceInter;
import com.yun.commons.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginfoController extends BaseController{
	@Autowired
	private LoginfoServiceInter loginfoService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/loginfo/go")
	public String go(){
		super.getFunBtns();
		return "/loginfo/list";
	}

	/**
	 * 返回分页数据
	 * @param loginfo
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/loginfo/list")
	public Object list(Loginfo loginfo, Page page){
		Object obj=loginfoService.getPages(loginfo,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/loginfo/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("loginfo", loginfoService.getLoginfoByid(ID));
		}
		return "/loginfo/addOrUpdate";
	}
	/**
	 * 新增
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/loginfo/insert")
	@Token(remove=true)
	public ResultMessage insert(ModelMap model, Loginfo loginfo) {
		ResultMessage msg = new ResultMessage();
		if (loginfo == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return loginfoService.insert(loginfo);
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/loginfo/update")
	@Token(remove=true)
	public ResultMessage update(ModelMap model,Loginfo loginfo) {
		ResultMessage msg = new ResultMessage();
		if (loginfo == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return loginfoService.update(loginfo);
	}
	/**
	 * 删除
	 * @param ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/loginfo/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=loginfoService.delete(ID);
		return msg;
	}

}

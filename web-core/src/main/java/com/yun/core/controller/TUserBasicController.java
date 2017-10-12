package com.yun.core.controller;


import com.yun.core.interceptor.Token;
import com.yun.entity.ResultMessage;
import com.yun.entity.TUserBasic;
import com.yun.service.inter.TUserBasicServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.yun.commons.Page;


@Controller
public class TUserBasicController extends BaseController{
	@Autowired
	private TUserBasicServiceInter tuserbasicService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/tuserbasic/go")
	public String go(){
		super.getFunBtns();
		return "/tuserbasic/list";
	}

	/**
	 * 返回分页数据
	 * @param tuserbasic
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/tuserbasic/list")
	public Object list(TUserBasic tuserbasic,Page page){
		Object obj=tuserbasicService.getPages(tuserbasic,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/tuserbasic/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("tuserbasic", tuserbasicService.getTUserBasicByuser_id(ID));
		}
		return "/tuserbasic/addOrUpdate";
	}
	/**
	 * 新增
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/tuserbasic/insert")
	public ResultMessage insert(ModelMap model, TUserBasic tuserbasic) {
		ResultMessage msg = new ResultMessage();
		if (tuserbasic == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		tuserbasic.setCreate_by(this.getLoginID());
		return tuserbasicService.insert(tuserbasic);
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/tuserbasic/update")
	public ResultMessage update(ModelMap model,TUserBasic tuserbasic) {
		ResultMessage msg = new ResultMessage();
		if (tuserbasic == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		tuserbasic.setUpdate_by(this.getLoginID());
		return tuserbasicService.update(tuserbasic);
	}
	/**
	 * 删除
	 * @param ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/tuserbasic/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=tuserbasicService.delete(ID);
		return msg;
	}
	@ResponseBody
	@RequestMapping(value = "sys/tuserbasic/getUserName")
	public ResultMessage getUserName(String userName) {
		ResultMessage msg = new ResultMessage();
		if (userName == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return tuserbasicService.getUserName(userName);
	}
}

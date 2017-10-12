package com.yun.core.controller;


import com.yun.core.interceptor.Token;
import com.yun.entity.ElectronicRecordBasicDetail;
import com.yun.entity.ResultMessage;
import com.yun.service.inter.ElectronicRecordBasicDetailServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.yun.commons.Page;


@Controller
public class ElectronicRecordBasicDetailController extends BaseController{
	@Autowired
	private ElectronicRecordBasicDetailServiceInter electronicrecordbasicdetailService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/electronicrecordbasicdetail/go")
	public String go(){
		super.getFunBtns();
		return "/electronicrecordbasicdetail/list";
	}

	/**
	 * 返回分页数据
	 * @param electronicrecordbasicdetail
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/electronicrecordbasicdetail/list")
	public Object list(ElectronicRecordBasicDetail electronicrecordbasicdetail, Page page){
		Object obj=electronicrecordbasicdetailService.getPages(electronicrecordbasicdetail,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/electronicrecordbasicdetail/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("electronicrecordbasicdetail", electronicrecordbasicdetailService.getElectronicRecordBasicDetailBydetail_id(ID));
		}
		return "/electronicrecordbasicdetail/addOrUpdate";
	}
	/**
	 * 新增
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/electronicrecordbasicdetail/insert")
	@Token(remove=true)
	public ResultMessage insert(ModelMap model, ElectronicRecordBasicDetail electronicrecordbasicdetail) {
		ResultMessage msg = new ResultMessage();
		if (electronicrecordbasicdetail == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return electronicrecordbasicdetailService.insert(electronicrecordbasicdetail);
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/electronicrecordbasicdetail/update")
	@Token(remove=true)
	public ResultMessage update(ModelMap model,ElectronicRecordBasicDetail electronicrecordbasicdetail) {
		ResultMessage msg = new ResultMessage();
		if (electronicrecordbasicdetail == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return electronicrecordbasicdetailService.update(electronicrecordbasicdetail);
	}
	/**
	 * 删除
	 * @param ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/electronicrecordbasicdetail/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=electronicrecordbasicdetailService.delete(ID);
		return msg;
	}

}

package com.yun.core.controller;


import com.yun.core.interceptor.Token;
import com.yun.entity.ElectronicRecordBasic;
import com.yun.entity.ResultMessage;
import com.yun.service.inter.ElectronicRecordBasicServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yun.commons.Page;

@Controller
public class ElectronicRecordBasicController extends BaseController{
	@Autowired
	private ElectronicRecordBasicServiceInter electronicrecordbasicService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/electronicrecordbasic/go")
	public String go(){
		super.getFunBtns();
		return "/electronicrecordbasic/list";
	}

	/**
	 * 返回分页数据
	 * @param electronicrecordbasic
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/electronicrecordbasic/list")
	public Object list(ElectronicRecordBasic electronicrecordbasic, Page page){
		Object obj=electronicrecordbasicService.getPages(electronicrecordbasic,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/electronicrecordbasic/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("electronicrecordbasic", electronicrecordbasicService.getElectronicRecordBasicByrecord_id(ID));
		}
		return "/electronicrecordbasic/addOrUpdate";
	}
	/**
	 * 前往查看页面
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/electronicrecordbasic/research")
	public String goResearch(ModelMap model,String record_id){
		model.put("record_id", record_id);
		if(record_id!=null){
			model.put("electronicrecordbasic", electronicrecordbasicService.getElectronicRecordBasicByrecord_id(record_id));
		}
		return "/electronicrecordbasic/research";
	}
	@RequestMapping(value="sys/electronicrecordbasic/toPrint")
	public String toPrint(ModelMap model,String record_id){
		model.put("record_id", record_id);
		if(record_id!=null){
			model.put("electronicrecordbasic", electronicrecordbasicService.getElectronicRecordBasicByrecord_id(record_id));
		}
		return "/electronicrecordbasic/print";
	}
	/**
	 * 新增 
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/electronicrecordbasic/insert")
	public ResultMessage insert(ModelMap model, ElectronicRecordBasic electronicrecordbasic) {
		ResultMessage msg = new ResultMessage();
		electronicrecordbasic.setCreate_by(this.getLoginID());
		if (electronicrecordbasic == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		try {
			msg =electronicrecordbasicService.insert(electronicrecordbasic);
		} catch (Exception e) {
			e.printStackTrace();
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}
		return msg;
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/electronicrecordbasic/update")
	@Token(remove=true)
	public ResultMessage update(ModelMap model,ElectronicRecordBasic electronicrecordbasic) {
		ResultMessage msg = new ResultMessage();
		if (electronicrecordbasic == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return electronicrecordbasicService.update(electronicrecordbasic);
	}
	/**
	 * 删除
	 * @param ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/electronicrecordbasic/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=electronicrecordbasicService.delete(ID);
		return msg;
	}

}

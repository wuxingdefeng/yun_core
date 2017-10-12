package com.yun.core.controller;


import com.yun.core.interceptor.Token;
import com.yun.core.listener.SystemControllerLog;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysDemo;
import com.yun.service.inter.SysDemoServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.yun.commons.Page;
import javax.servlet.http.HttpServletRequest;



@Controller
public class SysDemoController extends BaseController{
	@Autowired
	private SysDemoServiceInter sysdemoService;
	/**
	 * 前往管理中心
	 * @return
	 */
	@RequestMapping(value="sys/sysdemo/go")
	public String go(){
		super.getFunBtns();
		return "/sysdemo/list";
	}

	/**
	 * 返回分页数据
	 * @param sysdemo
	 * @param page
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="sys/sysdemo/list")
	public Object list(SysDemo sysdemo, Page page){
		Object obj=sysdemoService.getPages(sysdemo,page);
		return obj;
	}
	/**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 */
	@RequestMapping(value="sys/sysdemo/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("sysdemo", sysdemoService.getSysDemoBydemo_id(ID));
		}
		return "/sysdemo/addOrUpdate";
	}
	/**
	 * 新增
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysdemo/insert")
	@Token(remove=true)
	@SystemControllerLog(description = "新增测试数据")
	public ResultMessage insert(ModelMap model, SysDemo sysdemo) {
		ResultMessage msg = new ResultMessage();
		if (sysdemo == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return sysdemoService.insert(sysdemo);
	}
	/**
	 * 修改
	 * @param model
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysdemo/update")
	@SystemControllerLog(description = "修改测试数据")
	public ResultMessage update(ModelMap model,SysDemo sysdemo) {
		ResultMessage msg = new ResultMessage();
		if (sysdemo == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		return sysdemoService.update(sysdemo);
	}
	/**
	 * 删除
	 * @param ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "sys/sysdemo/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=sysdemoService.delete(ID);
		return msg;
	}
	@RequestMapping(value="test")
	@ResponseBody
    public Object testAndroidORIOS(HttpServletRequest request){
		String userAgent=request.getHeader("user-agent");
		String[] keywords = { "Android", "iPhone", "iPod", "iPad", "Windows Phone", "MQQBrowser","Windows"};
		String str=null;
		for(String key:keywords){
			if(userAgent.indexOf(key)>=0){
				str=key;
				break;
			}
		}
		System.out.println(str);
    	return "设备来源是："+str;
    }
}

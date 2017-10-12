package com.yun.core.controller.electronicRecord;

import com.yun.commons.UUIDUtil;
import com.yun.core.controller.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;



@Controller
@RequestMapping("/sys")
public class ElectronicRecordController extends BaseController {
	
	/**
	 * 打开填写电子病历页面
	 * @return
	 */
	@RequestMapping("/electronicRecord/go")
	public String electronicRecordGo(HttpServletRequest request){
		String token = UUIDUtil.getUUid();
		request.setAttribute("token", token);
		return "/electronicRecord/electronicRecord_add";
	}
	

}

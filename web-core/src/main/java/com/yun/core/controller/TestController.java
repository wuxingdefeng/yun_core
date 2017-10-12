package com.yun.core.controller;

import com.yun.commons.MyFileUtil;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.Session;
import java.util.HashMap;
import java.util.Map;


/**
 * 测试控制器
 * @author QB
 *
 */
@Controller
public class TestController extends BaseController{
	
    /**
     * 前往上传页面
     * @return
     */
	@RequestMapping(value="test/uploadImg/go")
	public String go(){
		super.getFunBtns();
		return "/upload/upload";
	}
	/**
	 * 发送邮件测试
	 * @param reuquest
	 * @param response
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value="test/sendEmail")
	@ResponseBody
	public Object sendEmail(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> result=new HashMap<String,Object>();
		Map m=request.getParameterMap();
		System.out.println(m);
		return result;
	}
	@SuppressWarnings("unchecked")
	@RequestMapping(value="test/sendMessage")
	public void send(String toID,String message){
		MessageUtil messageUtil=new MessageUtil();
		Session s=messageUtil.getSession(toID);
		JSONObject json=new JSONObject();
		json.put("code", 3);
		json.put("data", message);
		json.put("toID", toID);
		messageUtil.OnMessage(json.toJSONString(), s);
	}
	
	@RequestMapping(value="test/uploadImg/upload")
	@ResponseBody
    public Object uploadFile(HttpServletRequest request){
    	try {
			return MyFileUtil.uploadImgFile(request, "test");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
    }
}

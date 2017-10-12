package com.yun.core.controller;

import com.yun.commons.Base64Utils;
import com.yun.commons.XiaoShuo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * UeDitor
 * @author QB
 *
 */
@Controller
public class UeditorController {

	@RequestMapping("to/ueditor")
	public String toKindEditorPage(){
		return "/ueditor/addOrUpdate";
	}
	@RequestMapping("to/ueditor2")
	public String toKindEditorPage2(){
		return "/ueditor/addOrUpdate2";
	}
	@RequestMapping(value="to/ueditorPost")
	public Object ueditorPost(HttpServletRequest request,HttpServletResponse response,String editor,String name){
		System.out.println(editor.substring(1,editor.length()));
		if(editor!=null&&!"".equals(editor.trim())){
			response.setHeader("X-XSS-Protection", "0");
			request.setAttribute("html", editor.substring(1,editor.length()));
		}
		
		return "/ueditor/testBlueditor";
//		return "/ueditor/addOrUpdate2";
	}
	@RequestMapping("getXiaoshuo")
	@ResponseBody
	public Object getXiaoshuo(Integer page) throws Exception{
		//     起点小说
		//		String url="http://a.qidian.com/?size=-1&sign=-1&tag=-1&chanId=-1&subCateId=-1&orderId=&update=-1&page="+page+"&month=-1&style=1&action=-1&vip=-1";
		//		return XiaoShuo.getQidian(url);
		//返回顶点小说
		String url="http://www.23us.com/top/allvote_"+page+".html";
		return XiaoShuo.getDingdian(url);
	}
	@RequestMapping("getAllZhangjie")
	@ResponseBody
	public Object getAllZhangjie(String bookID,HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		String url= Base64Utils.jieMi(bookID);
		System.out.println(url);
		return XiaoShuo.getAllZhangjie2(url);
	}
	@RequestMapping("dakai")
	@ResponseBody
	public Object dakai(String url,HttpServletResponse response) throws Exception{
		response.setCharacterEncoding("utf-8");
		return XiaoShuo.dakai(Base64Utils.jieMi(url));
	}
}

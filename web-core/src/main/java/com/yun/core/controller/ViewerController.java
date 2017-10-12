package com.yun.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewerController {
	@RequestMapping("to/viewer")
	public String toKindEditorPage(){
		return "/viewer/addOrUpdate";
	}
	@RequestMapping("to/Pdfview")
	public String toPdfviewPage(){
		return "/pdfView/addOrUpdate";
	}
	@RequestMapping("to/blank")
	public String toBlank(){
		return "/blank/addOrUpdate";
	}
}

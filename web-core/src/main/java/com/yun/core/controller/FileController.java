package com.yun.core.controller;

import com.yun.commons.MyFileUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;



@Controller
public class FileController {
	@ResponseBody
	@RequestMapping(value="sys/upload")
     public Object uploadFile(HttpServletRequest request, String destPath) {
		Map<String,Object> result=new HashMap<String,Object>();
		result.put("filePaths",null);
    	 try {
			result.put("filePaths", MyFileUtil.uploadFile(request, destPath));
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return result;
     }
}

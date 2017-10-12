package com.yun.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TmtController {
   //TODO 参数提交
   @RequestMapping("public/tmtCommit")
   @ResponseBody
   public Object saveTmt(){
	   return null;
   }
}

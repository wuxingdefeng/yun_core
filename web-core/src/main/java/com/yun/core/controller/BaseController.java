package com.yun.core.controller;

import com.yun.core.util.Constonts;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;


@Controller
public class BaseController {

	@SuppressWarnings("unchecked")
	public void getFunBtns(){
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		try{
			Object obj=((Map<String,Object>)session.getAttribute(Constonts.MENUFUNCTION)).get(request.getRequestURI().split(request.getContextPath()+"/")[1]);
			request.setAttribute("funBtns",obj);
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	public  String getIpAddress() throws IOException {  
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
		String ip = request.getHeader("X-Forwarded-For");  
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
				ip = request.getHeader("Proxy-Client-IP");  
			}  
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
				ip = request.getHeader("WL-Proxy-Client-IP");  
			}  
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
				ip = request.getHeader("HTTP_CLIENT_IP");  
			}  
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
				ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
			}  
			if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
				ip = request.getRemoteAddr();  
			}  
		} else if (ip.length() > 15) {  
			String[] ips = ip.split(",");  
			for (int index = 0; index < ips.length; index++) {  
				String strIp = (String) ips[index];  
				if (!("unknown".equalsIgnoreCase(strIp))) {  
					ip = strIp;  
					break;  
				}  
			}  
		}  
		return ip;  
	}  

	@SuppressWarnings("unchecked")
	public String getLoginID(){
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		try{
			Object obj=((Map<String,Object>)session.getAttribute(Constonts.USER)).get("ADMIN_ID");
			return obj.toString();
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public String getLoginFiled(String filed){
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		try{
			Object obj=((Map<String,Object>)session.getAttribute(Constonts.USER)).get(filed);
			return obj.toString();
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
}

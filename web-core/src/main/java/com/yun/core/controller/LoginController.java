package com.yun.core.controller;

import com.yun.commons.MD5;
import com.yun.commons.PropertiesUtil;
import com.yun.core.util.Constonts;
import com.yun.service.inter.SysAdminServiceInter;
import com.yun.service.inter.SysMenuService;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;



@Controller
public class LoginController extends BaseController{
	@Autowired
	private SysAdminServiceInter adminService;
	@Autowired
	private SysMenuService sysMenuService;
	@RequestMapping(value="To_login")
	public String toLogin(HttpServletRequest request){
//		System.out.println(request.getRemoteAddr());
//		System.out.println("前往登录--"+request.getRequestURI());
		return "/login";	  
	}
	@ResponseBody
	@RequestMapping(value="login")
	public Object login(HttpServletRequest request,String name,String pwd,String code) throws IOException{
		Map<String,Object> result=new HashMap<String,Object>();
		if(StringUtils.isBlank(name)||StringUtils.isBlank(pwd)||StringUtils.isBlank(code)){
			result.put(Constonts.MsgCode, "1");
			result.put(Constonts.MsgName, Constonts.ErrOrMsg);
		}
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		Object codeObj=session.getAttribute(Constonts.CODE);
		if(codeObj==null||StringUtils.isBlank(codeObj.toString())||code==null){
			result.put(Constonts.MsgCode, "1");
			result.put(Constonts.MsgName, "验证码不能为空");
			return result;
		}
		if(!code.toUpperCase().equals(codeObj.toString())){
			result.put(Constonts.MsgCode, "1");
			result.put(Constonts.MsgName, "验证码错误！！");
			return result;
		}else{
			result.put(Constonts.MsgCode, "0");
			result.put(Constonts.MsgName, "OK");
		}
		Map<String,Object> objM=adminService.getAdminMap(name,pwd);
		if(objM==null||objM.size()<=0){
			result.put(Constonts.MsgCode, "1");
			result.put(Constonts.MsgName, "账户不存在！！");
			return result;
		}else{
			pwd= MD5.md5(pwd);
			if(pwd.equals(objM.get("ADMIN_PWD").toString())){
				int status=Integer.parseInt(objM.get("ADMIN_STATUS").toString());
				//1 正常 2冻结  3过期
				if(status==2){
					result.put(Constonts.MsgCode, "1");
					result.put(Constonts.MsgName, "账户被冻结，请联系管理员！！");
				}else if(status==3){
					result.put(Constonts.MsgCode, "1");
					result.put(Constonts.MsgName, "账户已过期，请联系管理员！！");
				}else{//登录成功
					Subject subject = SecurityUtils.getSubject(); 
					UsernamePasswordToken token = new UsernamePasswordToken(name, pwd);
					session.setAttribute(Constonts.USER, objM);
					session.setAttribute("SYSNAME", PropertiesUtil.get(Constonts.SYSNAME));
					Map<String,Object> params=new HashMap<String,Object>();
					params.put("filed", "LAST_LOGINIP");
					params.put("filedValue",getIpAddress());
					params.put("filed2", "LAST_LOGINDATE");
					params.put("filedValue2",new Date());
					params.put("params1","ADMIN_ID");
					params.put("paramsValue1", this.getLoginID());
					adminService.updateKeyVal(params);
					//	session.removeAttribute(Constonts.CODE);
					subject.login(token);
				}
			}else{
				result.put(Constonts.MsgCode, "1");
				result.put(Constonts.MsgName, "密码错误！！");
			}
		}
		return result;	  
	}
	@RequestMapping(value="sys/main")
	public String main(HttpServletRequest request){
		return "/home";	  
	}
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value="menu/getMenus")
	public Object getMenus(){
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		Object obj=session.getAttribute(Constonts.USER);
		if(obj!=null){
			Map<String,Object> resultM=(Map<String, Object>) obj;
			List<Map<String,Object>> menuList=sysMenuService.getMenuList(resultM.get("ADMIN_ID").toString(),resultM.get("ADMIN_NAME").toString());
			session.setAttribute(Constonts.MENU, menuList);
			Map<String,List<Map<String,Object>>> menusM=new HashMap<String,List<Map<String,Object>>>();
			for(Map<String,Object> m:menuList){
				if(!"0".equals(m.get("PARENT_MENUID").toString())){
					List<Map<String,Object>> childrenMs2=new ArrayList<Map<String,Object>>();
					for(Map<String,Object> m3:menuList){
						if(m.get("MENU_ID").toString().equals(m3.get("PARENT_MENUID").toString())){
							childrenMs2.add(m3);
						}
					}
					menusM.put(m.get("MENU_URL").toString(), childrenMs2);
				}
			}
			session.setAttribute(Constonts.MENUFUNCTION, menusM);
			List<Map<String,Object>> easyUIs=new ArrayList<Map<String,Object>>();
			for(Map<String,Object> m:menuList){
				Map<String,Object> mg=new HashMap<String,Object>();
				if(m.get("PARENT_MENUID").toString().equals("0")){
					String ID=m.get("MENU_ID").toString();
					mg.put("id", ID);
					mg.put("text", m.get("MENU_NAME"));
					List<Map<String,Object>> childrenMs=new ArrayList<Map<String,Object>>();
					for(Map<String,Object> m2:menuList){
						if(ID.equals(m2.get("PARENT_MENUID").toString())){
							Map<String,Object> childrenM=new HashMap<String,Object>();
							childrenM.put("id", m2.get("MENU_ID"));
							childrenM.put("text", m2.get("MENU_NAME"));
							Map<String,Object> attributesM=new HashMap<String,Object>();
							attributesM.put("url", m2.get("MENU_URL"));
							childrenM.put("attributes", attributesM);
							childrenMs.add(childrenM);
						}
					}
					mg.put("children", childrenMs);
					easyUIs.add(mg);
				}
			}
			return easyUIs;
		}
		return null;
	}
	@SuppressWarnings("unchecked")
	@ResponseBody
	@RequestMapping(value="menu/getMenus2")
	public Object getMenus2(String ID){
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		List<Map<String,Object>> menuList=(List<Map<String, Object>>) session.getAttribute(Constonts.MENU);
		List<Map<String,Object>> childrenMs=new ArrayList<Map<String,Object>>();
		for(Map<String,Object> m2:menuList){
			if(ID.equals(m2.get("PARENT_MENUID").toString())){
				Map<String,Object> childrenM=new HashMap<String,Object>();
				childrenM.put("id", m2.get("MENU_ID"));
				childrenM.put("text", m2.get("MENU_NAME"));
				Map<String,Object> attributesM=new HashMap<String,Object>();
				attributesM.put("url", m2.get("MENU_URL"));
				childrenM.put("attributes", attributesM);
				childrenMs.add(childrenM);
			}
		}
		return childrenMs;
	}
	@ResponseBody
	@RequestMapping(value="sys/exit")
	public boolean exit(HttpServletRequest request){
		Subject currentUser = SecurityUtils.getSubject();  
		
		//登录者退出IM（测试开始）
		MessageUtil messageUtil=new MessageUtil();
		messageUtil.deleteMes(super.getLoginID());
		//登录者退出IM（测试结束）
		
		Session session = currentUser.getSession();
		session.removeAttribute(Constonts.USER);
//		currentUser.logout();
		return true;
	}
	@RequestMapping(value="showstyle_show")
	public String showstyle_show(HttpServletRequest request){
		return "/showstyle/show";	  
	}
}

package com.yun.core.filter;

import com.yun.core.util.Constonts;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;




public class LoginFilter implements  Filter{

	FilterConfig filterConfig = null;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
	}

	public void destroy() {
		this.filterConfig = null;
	}

	public void doFilter(ServletRequest request, ServletResponse response,FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req=(HttpServletRequest)request;
		HttpServletResponse res=(HttpServletResponse)response;
		Subject currentUser = SecurityUtils.getSubject();  
		Session session = currentUser.getSession();
		Object obj=session.getAttribute(Constonts.USER);
		System.out.println(req.getRequestURI()+"-------"+req.getContextPath());
		//添加 下面三个设置页面禁止缓存 2016-09-27
		res.setDateHeader("Expires", -1);
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Pragma", "no-cache");
		if(obj==null){
		//	System.out.println(req.getRequestURI());
			res.getWriter().write("<script  type=\"text/javascript\">window.parent.location.href=\""+req.getContextPath()+"\"</script>");
		}else{
			req.setCharacterEncoding("utf-8");
			res.setCharacterEncoding("utf-8");
			chain.doFilter(request, response);
		}
	}

}

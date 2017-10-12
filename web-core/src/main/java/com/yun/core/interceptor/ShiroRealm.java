package com.yun.core.interceptor;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;


public class ShiroRealm extends AuthorizingRealm{
    /**
     * 授权
     */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		System.out.println("执行权限认证操作");
		return null;
	}
    /**
     * 登录
     */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		
		String username = (String)token.getPrincipal();  				//得到用户名 
		String password = new String((char[])token.getCredentials()); 	//得到密码
		if(null != username && null != password){
			return new SimpleAuthenticationInfo(username, password, getName());
		}else{
			return null;
		}
	}
}

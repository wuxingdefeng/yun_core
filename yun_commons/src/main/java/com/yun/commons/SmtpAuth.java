package com.yun.commons;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class SmtpAuth extends Authenticator{

	private String user, password;      

	public void setUserinfo(String getuser, String getpassword) {      
		user = getuser;      
		password = getpassword;      
	}
	
	public PasswordAuthentication getPasswordAuthentication(){
		return new PasswordAuthentication(this.user,this.password);
	}
	//    @Override
	//    
	//    public javax.mail.PasswordAuthentication getPasswordAuthentication() {      
	//        return new javax.mail.PasswordAuthentication(user, password);      
	//    }      
	public String getPassword() {      
		return password;      
	}      
	public void setPassword(String password) {      
		this.password = password;      
	}      
	public String getUser() {      
		return user;      
	}      
	public void setUser(String user) {      
		this.user = user;      
	}      
}

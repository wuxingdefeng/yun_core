package com.yun.entity;

import java.util.Date;

public class SysAdmin {
	private String ADMIN_ID;//主键
	private String ADMIN_NAME;//管理员名称
	private String ADMIN_PWD;//管理员密码
	private Date CREATE_DATE;//管理员创建时间
	private String ADMIN_HEAND;//管理员头像
	private int  ADMIN_SEX=-1;//管理员性别 0未知 1 男 2女
	private int  ADMIN_STATUS=1;//管理员状态 1 正常 2冻结  3过期
	private Date LAST_LOGINDATE;//最后登录时间
	private String LAST_LOGINIP;//最后登录IP
	/******************************/
	private String roleID;//角色主键
	private String oldPwd;//旧密码
	private String newPwd;//新密码
	private String pwdConfrim;//新第二次密码
	
	
	private Integer type=1;//操作标记 1 管理员修改自己密码 2管理员重置别人的密码
	
	
	
	public String getRoleID() {
		return roleID;
	}
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getNewPwd() {
		return newPwd;
	}
	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}
	public String getOldPwd() {
		return oldPwd;
	}
	public void setOldPwd(String oldPwd) {
		this.oldPwd = oldPwd;
	}
	public String getPwdConfrim() {
		return pwdConfrim;
	}
	public void setPwdConfrim(String pwdConfrim) {
		this.pwdConfrim = pwdConfrim;
	}
	public String getADMIN_ID() {
		return ADMIN_ID;
	}
	public void setADMIN_ID(String aDMIN_ID) {
		ADMIN_ID = aDMIN_ID;
	}
	public String getADMIN_NAME() {
		return ADMIN_NAME;
	}
	public void setADMIN_NAME(String aDMIN_NAME) {
		ADMIN_NAME = aDMIN_NAME;
	}
	public String getADMIN_PWD() {
		return ADMIN_PWD;
	}
	public void setADMIN_PWD(String aDMIN_PWD) {
		ADMIN_PWD = aDMIN_PWD;
	}
	public Date getCREATE_DATE() {
		return CREATE_DATE;
	}
	public void setCREATE_DATE(Date cREATE_DATE) {
		CREATE_DATE = cREATE_DATE;
	}
	public String getADMIN_HEAND() {
		return ADMIN_HEAND;
	}
	public void setADMIN_HEAND(String aDMIN_HEAND) {
		ADMIN_HEAND = aDMIN_HEAND;
	}
	public int getADMIN_SEX() {
		return ADMIN_SEX;
	}
	public void setADMIN_SEX(int aDMIN_SEX) {
		ADMIN_SEX = aDMIN_SEX;
	}
	public int getADMIN_STATUS() {
		return ADMIN_STATUS;
	}
	public void setADMIN_STATUS(int aDMIN_STATUS) {
		ADMIN_STATUS = aDMIN_STATUS;
	}
	public Date getLAST_LOGINDATE() {
		return LAST_LOGINDATE;
	}
	public void setLAST_LOGINDATE(Date lAST_LOGINDATE) {
		LAST_LOGINDATE = lAST_LOGINDATE;
	}
	public String getLAST_LOGINIP() {
		return LAST_LOGINIP;
	}
	public void setLAST_LOGINIP(String lAST_LOGINIP) {
		LAST_LOGINIP = lAST_LOGINIP;
	}
	
}

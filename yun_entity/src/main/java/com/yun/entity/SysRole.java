package com.yun.entity;

import java.util.Date;

public class SysRole {
	private int ROLE_ID;//角色主键
	private String ROLE_NAME;//角色名称 （超级管理员 为必须）
	private String ROLE_SRC;//角色链接（不同角色进入后不同首页）
	private String ROLE_DESCR;//角色描述
	private Date CREATE_DATE;//创建时间
	private String ADMIN_ID;//创建管理员
	private int ROLE_STATUS=1;//角色状态（暂无用）
	
	
	public String getROLE_SRC() {
		return ROLE_SRC;
	}
	public void setROLE_SRC(String rOLE_SRC) {
		ROLE_SRC = rOLE_SRC;
	}
	public int getROLE_ID() {
		return ROLE_ID;
	}
	public void setROLE_ID(int rOLE_ID) {
		ROLE_ID = rOLE_ID;
	}
	public String getROLE_NAME() {
		return ROLE_NAME;
	}
	public void setROLE_NAME(String rOLE_NAME) {
		ROLE_NAME = rOLE_NAME;
	}
	public String getROLE_DESCR() {
		return ROLE_DESCR;
	}
	public void setROLE_DESCR(String rOLE_DESCR) {
		ROLE_DESCR = rOLE_DESCR;
	}
	public Date getCREATE_DATE() {
		return CREATE_DATE;
	}
	public void setCREATE_DATE(Date cREATE_DATE) {
		CREATE_DATE = cREATE_DATE;
	}
	public String getADMIN_ID() {
		return ADMIN_ID;
	}
	public void setADMIN_ID(String aDMIN_ID) {
		ADMIN_ID = aDMIN_ID;
	}
	public int getROLE_STATUS() {
		return ROLE_STATUS;
	}
	public void setROLE_STATUS(int rOLE_STATUS) {
		ROLE_STATUS = rOLE_STATUS;
	}
	
}

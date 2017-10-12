package com.yun.entity;

public class SysAdminRole {
	private int ADMIN_ROLE_ID;//管理员角色主键
	private String ADMIN_ID;//管理员主键
	private int ROLE_ID;//角色主键
	public int getADMIN_ROLE_ID() {
		return ADMIN_ROLE_ID;
	}
	public void setADMIN_ROLE_ID(int aDMIN_ROLE_ID) {
		ADMIN_ROLE_ID = aDMIN_ROLE_ID;
	}
	public String getADMIN_ID() {
		return ADMIN_ID;
	}
	public void setADMIN_ID(String aDMIN_ID) {
		ADMIN_ID = aDMIN_ID;
	}
	public int getROLE_ID() {
		return ROLE_ID;
	}
	public void setROLE_ID(int rOLE_ID) {
		ROLE_ID = rOLE_ID;
	}
	
}

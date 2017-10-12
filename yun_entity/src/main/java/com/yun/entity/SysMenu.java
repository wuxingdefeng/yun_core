package com.yun.entity;

import java.util.Date;

public class SysMenu {
	private int MENU_ID;//菜单主键
	private String  MENU_NAME;//菜单名称
	private String MENU_PNG;//菜单图标
	private String MENU_URL;//菜单链接
	private int MENU_NO;//菜单序列号
	private int PARENT_MENUID;//上级菜单主键
	private String ADMIN_ID;//管理员主键
	private Date CREATE_DATE;//创建时间
	private int MENU_STATUS=2;//菜单状态（1 正常 2禁止 3敬请期待）
	public int getMENU_ID() {
		return MENU_ID;
	}
	public void setMENU_ID(int mENU_ID) {
		MENU_ID = mENU_ID;
	}
	public String getMENU_NAME() {
		return MENU_NAME;
	}
	public void setMENU_NAME(String mENU_NAME) {
		MENU_NAME = mENU_NAME;
	}
	public String getMENU_PNG() {
		return MENU_PNG;
	}
	public void setMENU_PNG(String mENU_PNG) {
		MENU_PNG = mENU_PNG;
	}
	public String getMENU_URL() {
		return MENU_URL;
	}
	public void setMENU_URL(String mENU_URL) {
		MENU_URL = mENU_URL;
	}
	public int getMENU_NO() {
		return MENU_NO;
	}
	public void setMENU_NO(int mENU_NO) {
		MENU_NO = mENU_NO;
	}
	public int getPARENT_MENUID() {
		return PARENT_MENUID;
	}
	public void setPARENT_MENUID(int pARENT_MENUID) {
		PARENT_MENUID = pARENT_MENUID;
	}
	public String getADMIN_ID() {
		return ADMIN_ID;
	}
	public void setADMIN_ID(String aDMIN_ID) {
		ADMIN_ID = aDMIN_ID;
	}
	public Date getCREATE_DATE() {
		return CREATE_DATE;
	}
	public void setCREATE_DATE(Date cREATE_DATE) {
		CREATE_DATE = cREATE_DATE;
	}
	public int getMENU_STATUS() {
		return MENU_STATUS;
	}
	public void setMENU_STATUS(int mENU_STATUS) {
		MENU_STATUS = mENU_STATUS;
	}
	
}

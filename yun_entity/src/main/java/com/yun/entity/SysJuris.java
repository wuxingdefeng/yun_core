package com.yun.entity;

public class SysJuris {
	private String JURIS_ID;//角色权限主键
	private String JURIS_MENUS;//角色权限集
	private int ROLE_ID;//角色主键
	public String getJURIS_ID() {
		return JURIS_ID;
	}
	public void setJURIS_ID(String jURIS_ID) {
		JURIS_ID = jURIS_ID;
	}
	public String getJURIS_MENUS() {
		return JURIS_MENUS;
	}
	public void setJURIS_MENUS(String jURIS_MENUS) {
		JURIS_MENUS = jURIS_MENUS;
	}
	public int getROLE_ID() {
		return ROLE_ID;
	}
	public void setROLE_ID(int rOLE_ID) {
		ROLE_ID = rOLE_ID;
	}
	
}

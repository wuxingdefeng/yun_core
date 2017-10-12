package com.yun.service.inter;

import com.yun.commons.Page;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysMenu;

import java.util.List;
import java.util.Map;



public interface SysMenuService {
	List<Map<String,Object>> getMenuList(String adminID, String admiName);

	Object getMenuPages(SysMenu menu, Page page);

	Object getMenuByID(String iD);

	ResultMessage insert(SysMenu sysMenu);

	ResultMessage update(SysMenu sysMenu);

	ResultMessage updateMenuStatus(String menuID, int menuStatus);

	ResultMessage delete(String menuID);
}

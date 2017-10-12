package com.yun.service.impl;

import com.yun.commons.Page;
import com.yun.commons.PropertiesUtil;
import com.yun.dao.interf.SysJurisDao;
import com.yun.dao.interf.SysMenuDao;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysMenu;
import com.yun.service.inter.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class SysMenuServiceImpl implements SysMenuService {
    @Autowired
    private SysMenuDao sysMenuDao;
    @Autowired
    private SysJurisDao sysJurisDao;
	@Override
	public List<Map<String, Object>> getMenuList(String adminID,String adminName) {
		Map<String,Object> params=new HashMap<String,Object>();
		String admin= PropertiesUtil.get("admin");
		params.put("adminID", adminID);
		List<Map<String,Object>> menusM=sysMenuDao.getListMap(params);
		if(menusM!=null&&menusM.size()>0){
			if(adminName.equals(admin)){
				return menusM;
			}else{
				List<Map<String,Object>> cgMenusM=new ArrayList<Map<String,Object>>();
				List<Map<String,Object>> jurissM=sysJurisDao.getListMap(params);
				for(Map<String,Object> menuM:menusM){
					int menuID=Integer.parseInt(menuM.get("MENU_ID").toString());
					for(Map<String,Object> jurisM:jurissM){
						BigInteger num = new BigInteger(jurisM.get("JURIS_MENUS").toString());
						if(num.testBit(menuID)){//有权限（待测试）
							cgMenusM.add(menuM);
						}
					}
				}
				return cgMenusM;
			}
		}else{
			return null;
		}
	
	}
	@Override
	public Object getMenuPages(SysMenu menu, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		params.put("name", menu.getMENU_NAME());
		int parentID=menu.getPARENT_MENUID();
		params.put("parent_menuID",parentID==0?"0":parentID);
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", sysMenuDao.getPageData(params));
			result.put("total",sysMenuDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getMenuByID(String iD) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "MENU_ID");
			params.put("value", iD);
			Object obj=sysMenuDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(SysMenu sysMenu) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "MENU_NAME");
			params.put("value", sysMenu.getMENU_NAME().trim());
			params.put("key2", "PARENT_MENUID");
			params.put("value2",sysMenu.getPARENT_MENUID());
			int cun=sysMenuDao.getObjectExists(params);
			if(cun>0){
				msg.setSuccess(false);
				msg.setErrorMsg("菜单已存在,不能继续添加了哦！");
				return msg;
			}
			sysMenu.setMENU_NAME(sysMenu.getMENU_NAME().trim());
			sysMenuDao.save(sysMenu);
			msg.setSuccess(true);
			msg.setErrorMsg("新增菜单成功！");
		}catch(Exception e){
		    msg.setSuccess(false);
			msg.setErrorMsg("新增失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(SysMenu sysMenu) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "MENU_NAME");
			params.put("value", sysMenu.getMENU_NAME().trim());
			params.put("key2", "PARENT_MENUID");
			params.put("value2",sysMenu.getPARENT_MENUID());
			params.put("key3", "MENU_ID");
			params.put("value3", sysMenu.getMENU_ID());
			int cun=sysMenuDao.getObjectExists(params);
			if(cun>0){
				msg.setSuccess(false);
				msg.setErrorMsg("菜单已存在,不能修改哦！");
				return msg;
			}
			sysMenu.setMENU_NAME(sysMenu.getMENU_NAME().trim());
			sysMenuDao.update(sysMenu);
			msg.setSuccess(true);
			msg.setErrorMsg("修改菜单成功！");
		}catch(Exception e){
			e.printStackTrace();
		    msg.setSuccess(false);
			msg.setErrorMsg("修改失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage updateMenuStatus(String menuID, int menuStatus) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("filed", "MENU_STATUS");
			params.put("filedValue",menuStatus);
			params.put("params1", "MENU_ID");
			params.put("paramsValue1", menuID);
			sysMenuDao.updateMap(params);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
			e.printStackTrace();
		    msg.setSuccess(false);
			msg.setErrorMsg("服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage delete(String menuID) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "MENU_ID");
			params.put("value", menuID);
			sysMenuDao.delete(params);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
			e.printStackTrace();
		    msg.setSuccess(false);
			msg.setErrorMsg("服务异常！");
		}		
		return msg;
	}

}

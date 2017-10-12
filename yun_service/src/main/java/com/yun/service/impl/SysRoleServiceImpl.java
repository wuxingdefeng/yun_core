package com.yun.service.impl;

import com.yun.commons.Page;
import com.yun.commons.UUIDUtil;
import com.yun.dao.interf.SysJurisDao;
import com.yun.dao.interf.SysMenuDao;
import com.yun.dao.interf.SysRoleDaoInter;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysJuris;
import com.yun.entity.SysRole;
import com.yun.service.inter.SysRoleServiceInter;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class SysRoleServiceImpl implements SysRoleServiceInter {
	@Autowired
	private SysRoleDaoInter sysroleDao;
	@Autowired
	private SysMenuDao sysMenuDao;
	@Autowired
	private SysJurisDao sysJurisDao;
	@Override
	public Object getPages(SysRole sysrole, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		params.put("role_name", sysrole.getROLE_NAME());
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", sysroleDao.getPageData(params));
			result.put("total",sysroleDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getSysRoleByROLE_ID(String ROLE_ID) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "ROLE_ID");
			params.put("value", ROLE_ID);
			Object obj=sysroleDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(SysRole sysrole) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "ROLE_NAME");
			params.put("value", sysrole.getROLE_NAME());
			int cun=sysroleDao.getObjectExists(params);
			if(cun>0){
				msg.setSuccess(false);
				msg.setErrorMsg("数据已存在了哦！");
				return msg;
			}
			sysroleDao.save(sysrole);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
			msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(SysRole sysrole) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "ROLE_NAME");
			params.put("value", sysrole.getROLE_NAME());
			params.put("key3", "ROLE_ID");
			params.put("value3", sysrole.getROLE_ID());
			int cun=sysroleDao.getObjectExists(params);
			if(cun>0){
				msg.setSuccess(false);
				msg.setErrorMsg("数据已存在了哦！");
				return msg;
			}
			sysroleDao.update(sysrole);
			msg.setSuccess(true);
			msg.setErrorMsg("修改成功！");
		}catch(Exception e){
			e.printStackTrace();
			msg.setSuccess(false);
			msg.setErrorMsg("修改失败,服务异常！");
		}		
		return msg;
	}

	@Override
	public ResultMessage delete(String ROLE_ID) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "ROLE_ID");
			params.put("value", ROLE_ID);
			sysroleDao.delete(params);
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
	public Object getRoles() {
		return sysroleDao.getListMap(null);
	}
	@Override
	public Object getMenulist(String roleID) {
		Map<String,Object> params=new HashMap<String,Object>();
		List<Map<String,Object>> menusM=sysMenuDao.getListMap(params);
		List<Map<String,Object>> cgMenusM=new ArrayList<Map<String,Object>>();
		boolean bl=false;
		if(StringUtils.isNotBlank(roleID)){
			bl=true;
		}
		params.put("roleID", roleID);
		List<Map<String,Object>> jurissM=sysJurisDao.getListMap2(params);
		String parent1="0";
		for(Map<String,Object> menuM:menusM){
			int menuID=Integer.parseInt(menuM.get("MENU_ID").toString());
			Map<String,Object> m1=new HashMap<String,Object>();
			if(parent1.equals(menuM.get("PARENT_MENUID").toString())){
				m1.put("id", menuM.get("MENU_ID"));
				m1.put("text", menuM.get("MENU_NAME"));
				List<Map<String,Object>> cgMenusM2=new ArrayList<Map<String,Object>>();
				for(Map<String,Object> ms2:menusM){
					if(menuID==Integer.parseInt(ms2.get("PARENT_MENUID").toString())){
						Map<String,Object> m2=new HashMap<String,Object>();
						int m2ID=Integer.parseInt(ms2.get("MENU_ID").toString());
						m2.put("id", m2ID);
						m2.put("text", ms2.get("MENU_NAME"));
						m2.put("state","closed");
						List<Map<String,Object>> cgMenusM3=new ArrayList<Map<String,Object>>();
						boolean seach=true;
						for(Map<String,Object> ms3:menusM){
							if(m2ID==Integer.parseInt(ms3.get("PARENT_MENUID").toString())){
								Map<String,Object> m3=new HashMap<String,Object>();
								int m3ID=Integer.parseInt(ms3.get("MENU_ID").toString());
								m3.put("id", m3ID);
								m3.put("text", ms3.get("MENU_NAME"));
								if(bl){
									for(Map<String,Object> jurisM:jurissM){
										BigInteger num = new BigInteger(jurisM.get("JURIS_MENUS").toString());
										if(num.testBit(m3ID)){//有权限（待测试）
											m3.put("checked", true);
										}
										if(seach){
											Map<String,Object> m31=new HashMap<String,Object>();
											m31.put("id", m2ID);
											m31.put("text","<font color='#aaa'>刷新</font>");
											if(num.testBit(m2ID)){
												m31.put("checked", true);
											}
											cgMenusM3.add(m31);
											seach=false;
										}
									}
								}else{
									if(seach){
										Map<String,Object> m31=new HashMap<String,Object>();
										m31.put("id", m2ID);
										m31.put("text","<font color='#666'>刷新</font>");
										cgMenusM3.add(m31);
										seach=false;
									}
								}
								cgMenusM3.add(m3);
							}
						}
						if(cgMenusM3.size()>0){
							m2.put("children", cgMenusM3);
						}else{
							m2.put("state", "open");
							for(Map<String,Object> jurisM:jurissM){
								BigInteger num = new BigInteger(jurisM.get("JURIS_MENUS").toString());
								if(num.testBit(m2ID)){//有权限
									m2.put("checked", true);
								}
							}
						}
						cgMenusM2.add(m2);
					}
				}
				if(cgMenusM2.size()>0){
					m1.put("children", cgMenusM2);
				}else{
					m1.put("state", "open");
				}
				cgMenusM.add(m1);
			}
		}
		return cgMenusM;
	}
	@Override
	public Object saveJurs(String roleID, String jurs) {
		ResultMessage msg = new ResultMessage();
		if(StringUtils.isBlank(roleID)){
			msg.setSuccess(false);
			msg.setErrorMsg("请选择角色进行设置哦！");
			return msg;
		}
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "ROLE_ID");
			params.put("value", roleID);
			sysJurisDao.delete(params);
			if(StringUtils.isNotBlank(jurs)){
				String jurStr=jurs.replaceAll("jr","");
				String[] strS=jurStr.trim().split(",");
				BigInteger num = new BigInteger(roleID);
				for(String s:strS){
					num=num.setBit(Integer.parseInt(s));
				}
				SysJuris jur=new SysJuris();
				jur.setJURIS_ID(UUIDUtil.getUUid());
				jur.setJURIS_MENUS(num.toString());
				jur.setROLE_ID(Integer.parseInt(roleID));
				sysJurisDao.save(jur);
			}
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
			e.printStackTrace();
			msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}

}

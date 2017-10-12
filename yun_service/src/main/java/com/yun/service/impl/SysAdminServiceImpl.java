package com.yun.service.impl;

import com.yun.commons.IDUtil;
import com.yun.commons.MD5;
import com.yun.commons.Page;
import com.yun.dao.interf.SysAdminDao;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysAdmin;
import com.yun.service.inter.SysAdminServiceInter;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class SysAdminServiceImpl implements SysAdminServiceInter {
    @Autowired
    private SysAdminDao sysadminDao;
	@Override
	public Object getPages(SysAdmin sysadmin, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		params.put("admin_name", sysadmin.getADMIN_NAME());
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", sysadminDao.getPageData(params));
			result.put("total",sysadminDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getSysAdminByADMIN_ID(String ADMIN_ID) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("params1", "ADMIN_ID");
			params.put("paramsValue1", ADMIN_ID);
			Object obj=sysadminDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(SysAdmin sysadmin) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("params1", "ADMIN_NAME");
			params.put("paramsValue1", sysadmin.getADMIN_NAME());
			int cun=sysadminDao.getObjectExists(params);
			if(cun>0){
				msg.setSuccess(false);
				msg.setErrorMsg("数据已存在了哦！");
				return msg;
			}
			//TODO (主键手动添加)
			sysadmin.setADMIN_ID(IDUtil.getID());
			sysadminDao.save(sysadmin);
			Map<String,Object> adminRoleM=new HashMap<String,Object>();
			adminRoleM.put("ADMIN_ID", sysadmin.getADMIN_ID());
			adminRoleM.put("ROLE_ID", sysadmin.getRoleID());
			sysadminDao.saveAdminRole(adminRoleM);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(SysAdmin sysadmin) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("params1", "ADMIN_NAME");
			params.put("paramsValue1", sysadmin.getADMIN_NAME());
			params.put("params3", "ADMIN_ID");
			params.put("paramsValue3", sysadmin.getADMIN_ID());
			int cun=sysadminDao.getObjectExists(params);
			if(cun>0){
				msg.setSuccess(false);
				msg.setErrorMsg("数据已存在了哦！");
				return msg;
		    }
			sysadminDao.update(sysadmin);
			Map<String,Object> paramss=new HashMap<String,Object>();
			paramss.put("admin_id", sysadmin.getADMIN_ID());
			sysadminDao.deleteAdminRole(paramss);
			Map<String,Object> adminRoleM=new HashMap<String,Object>();
			adminRoleM.put("ADMIN_ID", sysadmin.getADMIN_ID());
			adminRoleM.put("ROLE_ID", sysadmin.getRoleID());
			sysadminDao.saveAdminRole(adminRoleM);
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
	public ResultMessage delete(String ADMIN_ID) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "ADMIN_ID");
			params.put("value", ADMIN_ID);
			sysadminDao.delete(params);
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
	public Map<String, Object> getAdminMap(String name, String pwd) {
		Map<String,Object> params=new HashMap<String,Object>();
		params.put("params1","ADMIN_NAME");
		params.put("paramsValue1", name);
		Map<String,Object> resultM=sysadminDao.getMapObj(params);
		return resultM;
	}
	@Override
	public void updateKeyVal(Map<String, Object> params) {
		sysadminDao.updateMap(params);
	}
	@Override
	public ResultMessage updatePwd(SysAdmin admin) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			if(admin.getType()==1){

				if(StringUtils.isBlank(admin.getOldPwd())){
					msg.setSuccess(false);
					msg.setErrorMsg("旧密码不能为空！");
					return msg;
				}
				if(!MD5.md5(admin.getOldPwd()).equals(admin.getADMIN_PWD())){
					msg.setSuccess(false);
					msg.setErrorMsg("旧密码错误！");
					return msg;
				}
				if(MD5.md5(admin.getOldPwd()).equals(MD5.md5(admin.getNewPwd()))){
					msg.setSuccess(false);
					msg.setErrorMsg("新密码不能和旧密码一致！！");
					return msg;
				}
				if(!admin.getNewPwd().equals(admin.getPwdConfrim())){
					msg.setSuccess(false);
					msg.setErrorMsg("两次密码不一致！！");
					return msg;
				}
			}
			params.put("filed", "ADMIN_PWD");
			params.put("filedValue", MD5.md5(admin.getNewPwd()));
			params.put("params1", "ADMIN_ID");
			params.put("paramsValue1", admin.getADMIN_ID());
			sysadminDao.updateMap(params);
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
	public ResultMessage updateStatus(SysAdmin admin) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("filed", "ADMIN_STATUS");
			params.put("filedValue",admin.getADMIN_STATUS());
			params.put("params1", "ADMIN_ID");
			params.put("paramsValue1", admin.getADMIN_ID());
			sysadminDao.updateMap(params);
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
	public List<Map<String, Object>> getAdminAll() {
		// TODO Auto-generated method stub
		return sysadminDao.getListMap(null);
	}

}

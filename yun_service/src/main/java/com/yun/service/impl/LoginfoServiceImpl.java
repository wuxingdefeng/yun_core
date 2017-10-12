package com.yun.service.impl;

import com.yun.commons.IDUtil;
import com.yun.commons.Page;
import com.yun.dao.interf.LoginfoDaoInter;
import com.yun.entity.Loginfo;
import com.yun.entity.ResultMessage;
import com.yun.service.inter.LoginfoServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class LoginfoServiceImpl implements LoginfoServiceInter {
    @Autowired
    private LoginfoDaoInter loginfoDao;
	@Override
	public Object getPages(Loginfo loginfo, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", loginfoDao.getPageData(params));
			result.put("total",loginfoDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getLoginfoByid(String id) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "id");
			params.put("value", id);
			Object obj=loginfoDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(Loginfo loginfo) {
		ResultMessage msg = new ResultMessage();
		try{
			loginfo.setID(IDUtil.getID());
			loginfoDao.save(loginfo);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(Loginfo loginfo) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//params.put("key3", "filedid");
			//params.put("value3", valueid);
			//int cun=loginfoDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
		    //}
			loginfoDao.update(loginfo);
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
	public ResultMessage delete(String id) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "id");
			params.put("value", id);
			loginfoDao.delete(params);
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

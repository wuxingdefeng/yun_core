package com.yun.service.impl;

import com.yun.commons.IDUtil;
import com.yun.commons.Page;
import com.yun.dao.interf.SysDemoDaoInter;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysDemo;
import com.yun.service.inter.SysDemoServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class SysDemoServiceImpl implements SysDemoServiceInter {
    @Autowired
    private SysDemoDaoInter sysdemoDao;
	@Override
	public Object getPages(SysDemo sysdemo, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", sysdemoDao.getPageData(params));
			result.put("total",sysdemoDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getSysDemoBydemo_id(String demo_id) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "demo_id");
			params.put("value", demo_id);
			Object obj=sysdemoDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(SysDemo sysdemo) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//int cun=sysdemoDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
			//}
			//TODO (主键手动添加)
			sysdemo.setDemo_id(IDUtil.getID());
			sysdemoDao.save(sysdemo);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(SysDemo sysdemo) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//params.put("key3", "fileddemo_id");
			//params.put("value3", valuedemo_id);
			//int cun=sysdemoDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
		    //}
			sysdemoDao.update(sysdemo);
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
	public ResultMessage delete(String demo_id) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "demo_id");
			params.put("value", demo_id);
			sysdemoDao.delete(params);
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

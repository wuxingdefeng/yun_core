package com.yun.service.impl;

import com.yun.commons.GetChineseFirstPinYing;
import com.yun.commons.IDUtil;
import com.yun.commons.Page;
import com.yun.dao.interf.TUserBasicDaoInter;
import com.yun.entity.ResultMessage;
import com.yun.entity.TUserBasic;
import com.yun.service.inter.TUserBasicServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class TUserBasicServiceImpl implements TUserBasicServiceInter {
    @Autowired
    private TUserBasicDaoInter tuserbasicDao;
	@Override
	public Object getPages(TUserBasic tuserbasic, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", tuserbasicDao.getPageData(params));
			result.put("total",tuserbasicDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getTUserBasicByuser_id(String user_id) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "user_id");
			params.put("value", user_id);
			Object obj=tuserbasicDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(TUserBasic tuserbasic) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//int cun=tuserbasicDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
			//}
			//TODO (主键手动添加)
			tuserbasic.setUser_id(IDUtil.getID());
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
			tuserbasic.setUser_birthday(sdf.parse(tuserbasic.getUser_birthday_Str()));
			tuserbasic.setCreate_date(new Date());
			String user_name_first = GetChineseFirstPinYing.getFirstLetter(tuserbasic.getUser_name());
			tuserbasic.setUser_name_first(user_name_first);
			tuserbasicDao.save(tuserbasic);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(TUserBasic tuserbasic) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//params.put("key3", "fileduser_id");
			//params.put("value3", valueuser_id);
			//int cun=tuserbasicDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
		    //}
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
			tuserbasic.setUser_birthday(sdf.parse(tuserbasic.getUser_birthday_Str()));
			tuserbasic.setUpdate_date(new Date());
			String user_name_first =GetChineseFirstPinYing.getFirstLetter(tuserbasic.getUser_name());
			tuserbasic.setUser_name_first(user_name_first);
			tuserbasicDao.update(tuserbasic);
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
	public ResultMessage delete(String user_id) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "user_id");
			params.put("value", user_id);
			tuserbasicDao.deleteBash(params);
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
	public ResultMessage getUserName(String userName) {
		ResultMessage msg = new ResultMessage();
		msg.setData(tuserbasicDao.getUserName(userName));
		msg.setSuccess(true);
		return msg;
	}

}

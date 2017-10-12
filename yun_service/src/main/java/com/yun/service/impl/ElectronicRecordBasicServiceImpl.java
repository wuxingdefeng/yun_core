package com.yun.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yun.commons.IDUtil;
import com.yun.commons.Page;
import com.yun.dao.interf.ElectronicRecordBasicDaoInter;
import com.yun.dao.interf.ElectronicRecordBasicDetailDaoInter;
import com.yun.entity.ElectronicRecordBasic;
import com.yun.entity.ElectronicRecordBasicDetail;
import com.yun.entity.ResultMessage;
import com.yun.service.inter.ElectronicRecordBasicServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class ElectronicRecordBasicServiceImpl implements ElectronicRecordBasicServiceInter {
    @Autowired
    private ElectronicRecordBasicDaoInter electronicrecordbasicDao;
    @Autowired
	ElectronicRecordBasicDetailDaoInter electronicRecordBasicDetailDao;
	@Override
	public Object getPages(ElectronicRecordBasic electronicrecordbasic, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		params.put("searchName", electronicrecordbasic.getSearchName());
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", electronicrecordbasicDao.getPageData(params));
			result.put("total",electronicrecordbasicDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getElectronicRecordBasicByrecord_id(String record_id) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			ObjectMapper mapper = new ObjectMapper();
			params.put("key", "b.record_id");
			params.put("value", record_id);
			Map<String, Object> results=(Map<String, Object>) electronicrecordbasicDao.getMapObjOfRecordDetail(params);
			String jsondata = (String) results.get("jsondata");
			Map<String, Object> map=mapper.readValue(jsondata, Map.class);
			results.put("jsondataMap", map);
			return results;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(ElectronicRecordBasic electronicrecordbasic) throws Exception {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String record_id = IDUtil.getID();
		Date allDate = new Date();
		//TODO (主键手动添加)
		electronicrecordbasic.setRecord_id(record_id);
		electronicrecordbasic.setCreate_date(allDate);
		electronicrecordbasic.setWrite_date(allDate);
		electronicrecordbasic.setIs_del(0);
		electronicrecordbasic.setUser_birthday(sdf.parse(electronicrecordbasic.getUser_birthday_string()));
		electronicrecordbasicDao.save(electronicrecordbasic);
		//保存详情表
		ElectronicRecordBasicDetail detail = new ElectronicRecordBasicDetail();
		detail.setRecord_id(record_id);
		detail.setCreate_by(electronicrecordbasic.getCreate_by());
		detail.setCreate_date(allDate);
		detail.setDetail_id(IDUtil.getID());
		detail.setHtmldata(electronicrecordbasic.getHtmldata());
		detail.setIs_del(0);
		detail.setJsondata(electronicrecordbasic.getJsondata());
		electronicRecordBasicDetailDao.save(detail);
		msg.setSuccess(true);
		msg.setErrorMsg("成功！");
		
	/*	try{
		}catch(Exception e){
			e.printStackTrace();
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}*/		
		return msg;
	}
	@Override
	public ResultMessage update(ElectronicRecordBasic electronicrecordbasic) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//params.put("key3", "filedrecord_id");
			//params.put("value3", valuerecord_id);
			//int cun=electronicrecordbasicDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
		    //}
			electronicrecordbasicDao.update(electronicrecordbasic);
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
	public ResultMessage delete(String record_id) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "record_id");
			params.put("value", record_id);
			electronicrecordbasicDao.deleteBash(params);
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

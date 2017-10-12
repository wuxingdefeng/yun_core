package com.yun.service.impl;

import com.yun.commons.IDUtil;
import com.yun.commons.Page;
import com.yun.dao.interf.ElectronicRecordBasicDetailDaoInter;
import com.yun.entity.ElectronicRecordBasicDetail;
import com.yun.entity.ResultMessage;
import com.yun.service.inter.ElectronicRecordBasicDetailServiceInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class ElectronicRecordBasicDetailServiceImpl implements ElectronicRecordBasicDetailServiceInter {
    @Autowired
    private ElectronicRecordBasicDetailDaoInter electronicrecordbasicdetailDao;
	@Override
	public Object getPages(ElectronicRecordBasicDetail electronicrecordbasicdetail, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", electronicrecordbasicdetailDao.getPageData(params));
			result.put("total",electronicrecordbasicdetailDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getElectronicRecordBasicDetailBydetail_id(String detail_id) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "detail_id");
			params.put("value", detail_id);
			Object obj=electronicrecordbasicdetailDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(ElectronicRecordBasicDetail electronicrecordbasicdetail) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//int cun=electronicrecordbasicdetailDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
			//}
			//TODO (主键手动添加)
			electronicrecordbasicdetail.setDetail_id(IDUtil.getID());
			electronicrecordbasicdetailDao.save(electronicrecordbasicdetail);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(ElectronicRecordBasicDetail electronicrecordbasicdetail) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//params.put("key3", "fileddetail_id");
			//params.put("value3", valuedetail_id);
			//int cun=electronicrecordbasicdetailDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
		    //}
			electronicrecordbasicdetailDao.update(electronicrecordbasicdetail);
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
	public ResultMessage delete(String detail_id) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "detail_id");
			params.put("value", detail_id);
			electronicrecordbasicdetailDao.delete(params);
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

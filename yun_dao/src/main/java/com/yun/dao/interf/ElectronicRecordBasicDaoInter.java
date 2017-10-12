package com.yun.dao.interf;

import com.yun.entity.ElectronicRecordBasic;

import java.util.Map;



public interface ElectronicRecordBasicDaoInter extends BasicDAO<ElectronicRecordBasic>{

	Object getMapObjOfRecordDetail(Map<String, Object> params);
	  
}

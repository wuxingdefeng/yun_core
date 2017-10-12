package com.yun.dao.impl;

import com.yun.dao.interf.ElectronicRecordBasicDaoInter;
import com.yun.entity.ElectronicRecordBasic;
import org.springframework.stereotype.Repository;

import java.util.Map;




@Repository
public class ElectronicRecordBasicDaoImpl extends BasicDAOImpl<ElectronicRecordBasic> implements ElectronicRecordBasicDaoInter {

	@Override
	public Object getMapObjOfRecordDetail(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return this.sqlSessionTemplate.selectOne(getDefaultSqlNamespace()+".getMapObjOfRecordDetail", params);
	}

}

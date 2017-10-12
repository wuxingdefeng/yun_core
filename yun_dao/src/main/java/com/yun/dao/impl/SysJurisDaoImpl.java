package com.yun.dao.impl;

import com.yun.dao.interf.SysJurisDao;
import com.yun.entity.SysJuris;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;



@Repository
public class SysJurisDaoImpl extends BasicDAOImpl<SysJuris> implements SysJurisDao {

	@Override
	public List<Map<String, Object>> getListMap2(Map<String, Object> params) {
		return this.sqlSessionTemplate.selectList(this.getDefaultSqlNamespace()+".getListMap2", params);
	}

}

package com.yun.dao.impl;

import com.yun.dao.interf.TUserBasicDaoInter;
import com.yun.entity.TUserBasic;
import org.springframework.stereotype.Repository;




@Repository
public class TUserBasicDaoImpl extends BasicDAOImpl<TUserBasic> implements TUserBasicDaoInter {

	@Override
	public Object getUserName(String userName) {
		return this.sqlSessionTemplate.selectList(this.getDefaultSqlNamespace()+".getUserName", userName);
	}

}

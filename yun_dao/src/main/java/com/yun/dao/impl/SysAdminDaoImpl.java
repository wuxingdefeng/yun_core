package com.yun.dao.impl;

import com.yun.dao.interf.SysAdminDao;
import com.yun.entity.SysAdmin;
import org.springframework.stereotype.Repository;

import java.util.Map;




@Repository
public class SysAdminDaoImpl extends BasicDAOImpl<SysAdmin> implements SysAdminDao {

	@Override
	public void saveAdminRole(Map<String, Object> adminRoleM) {
		this.sqlSessionTemplate.insert(this.getDefaultSqlNamespace()+".saveAdminRole", adminRoleM);
	}

	@Override
	public void deleteAdminRole(Map<String, Object> paramss) {
		this.sqlSessionTemplate.delete(this.getDefaultSqlNamespace()+".deleteAdminRole", paramss);
	}

}

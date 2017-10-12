package com.yun.dao.interf;

import com.yun.entity.SysAdmin;

import java.util.Map;





public interface SysAdminDao extends BasicDAO<SysAdmin>{

	void saveAdminRole(Map<String, Object> adminRoleM);

	void deleteAdminRole(Map<String, Object> paramss);
	  
}

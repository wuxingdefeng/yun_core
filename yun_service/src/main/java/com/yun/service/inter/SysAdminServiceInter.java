package com.yun.service.inter;

import com.yun.commons.Page;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysAdmin;

import java.util.List;
import java.util.Map;



public interface SysAdminServiceInter {

	Object getPages(SysAdmin sysadmin, Page page);

	Object getSysAdminByADMIN_ID(String ADMIN_ID);

	ResultMessage insert(SysAdmin sysadmin);

	ResultMessage update(SysAdmin sysadmin);

	ResultMessage delete(String ADMIN_ID);

	Map<String, Object> getAdminMap(String name, String pwd);

	void updateKeyVal(Map<String, Object> params);

	ResultMessage updatePwd(SysAdmin admin);

	ResultMessage updateStatus(SysAdmin admin);

	List<Map<String, Object>> getAdminAll();
}

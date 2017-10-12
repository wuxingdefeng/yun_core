package com.yun.service.inter;


import com.yun.commons.Page;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysRole;

public interface SysRoleServiceInter {

	Object getPages(SysRole sysrole, Page page);

	Object getSysRoleByROLE_ID(String ROLE_ID);

	ResultMessage insert(SysRole sysrole);

	ResultMessage update(SysRole sysrole);

	ResultMessage delete(String ROLE_ID);

	Object getRoles();

	Object getMenulist(String roleID);

	Object saveJurs(String roleID, String jurs);
}

package com.yun.dao.interf;

import com.yun.entity.SysJuris;

import java.util.List;
import java.util.Map;





public interface SysJurisDao extends BasicDAO<SysJuris>{

	List<Map<String, Object>> getListMap2(Map<String, Object> params);
	  
}

package com.yun.dao.interf;


import com.yun.entity.TUserBasic;

public interface TUserBasicDaoInter extends BasicDAO<TUserBasic>{

	Object getUserName(String userName);
	  
}

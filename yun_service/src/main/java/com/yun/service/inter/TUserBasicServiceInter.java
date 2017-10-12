package com.yun.service.inter;

import com.yun.commons.Page;
import com.yun.entity.ResultMessage;
import com.yun.entity.TUserBasic;



public interface TUserBasicServiceInter {

	Object getPages(TUserBasic tuserbasic, Page page);

	Object getTUserBasicByuser_id(String user_id);

	ResultMessage insert(TUserBasic tuserbasic);

	ResultMessage update(TUserBasic tuserbasic);

	ResultMessage delete(String user_id);

	ResultMessage getUserName(String userName);
}

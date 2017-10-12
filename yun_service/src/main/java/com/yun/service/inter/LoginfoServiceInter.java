package com.yun.service.inter;

import com.yun.commons.Page;
import com.yun.entity.Loginfo;
import com.yun.entity.ResultMessage;


public interface LoginfoServiceInter {

	Object getPages(Loginfo loginfo, Page page);

	Object getLoginfoByid(String id);

	ResultMessage insert(Loginfo loginfo);

	ResultMessage update(Loginfo loginfo);

	ResultMessage delete(String id);
}

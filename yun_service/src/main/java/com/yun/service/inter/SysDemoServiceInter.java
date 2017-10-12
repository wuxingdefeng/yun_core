package com.yun.service.inter;


import com.yun.commons.Page;
import com.yun.entity.ResultMessage;
import com.yun.entity.SysDemo;

public interface SysDemoServiceInter {

	Object getPages(SysDemo sysdemo, Page page);

	Object getSysDemoBydemo_id(String demo_id);

	ResultMessage insert(SysDemo sysdemo);

	ResultMessage update(SysDemo sysdemo);

	ResultMessage delete(String demo_id);
}

package com.yun.service.inter;

import com.yun.commons.Page;
import com.yun.entity.ResultMessage;
import com.yun.entity.TestTemplate;



public interface TestTemplateServiceInter {

	Object getPages(TestTemplate testtemplate, Page page);

	Object getTestTemplateBytemplate_id(String template_id);

	ResultMessage insert(TestTemplate testtemplate);

	ResultMessage update(TestTemplate testtemplate);

	ResultMessage delete(String template_id);
}

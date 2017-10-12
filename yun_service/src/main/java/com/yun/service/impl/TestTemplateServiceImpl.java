package com.yun.service.impl;

import org.springframework.stereotype.Service;


@Service //implements TestTemplateServiceInter
public class TestTemplateServiceImpl  {
 /*   @Autowired
    private TestTemplateDaoInter testtemplateDao;
    @Autowired
    private SpringRedisUtils redisUtils;
	@Override
	public Object getPages(TestTemplate testtemplate, Page page) {
		Map<String,Object> params=new HashMap<String,Object>();
		if(page!=null){
			params.put("pageNo", page.getCurrentRow());
			params.put("pageSize",page.getRows());
		}
		Map<String,Object> result=new HashMap<String,Object>();
		try{
			result.put("rows", testtemplateDao.getPageData(params));
			result.put("total",testtemplateDao.getPageCount(params));
		}catch(Exception e){
			e.printStackTrace();
			result.put("rows",null);
			result.put("total",0);
		}
		return result;
	}
	@Override
	public Object getTestTemplateBytemplate_id(String template_id) {
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "template_id");
			params.put("value", template_id);
			Object obj=testtemplateDao.getMapObj(params);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public ResultMessage insert(TestTemplate testtemplate) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//int cun=testtemplateDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
			//}
			//TODO (主键手动添加)
			testtemplate.setTemplate_id(IDUtil.getID());
			testtemplateDao.save(testtemplate);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
		    msg.setSuccess(false);
			msg.setErrorMsg("失败,服务异常！");
		}		
		return msg;
	}
	@Override
	public ResultMessage update(TestTemplate testtemplate) {
		ResultMessage msg = new ResultMessage();
		//Map<String,Object> params=new HashMap<String,Object>();
		
		try{
			//params.put("key", "filed");
			//params.put("value", value);
			//params.put("key3", "filedtemplate_id");
			//params.put("value3", valuetemplate_id);
			//int cun=testtemplateDao.getObjectExists(params);
			//if(cun>0){
			//	msg.setSuccess(false);
			//	msg.setErrorMsg("数据已存在了哦！");
			//	return msg;
		    //}
			
			*//*******************测试redis start***********************//*
//			Map<String,Object> mm=new HashMap<String,Object>();
//			mm.put("key", "value");
//			mm.put("key2", "value2");
//			redisUtils.setMap("absd", mm);
			Map<String,Object> mms=redisUtils.getMap("absd");
			//如有有一天你报错了，说明redis挂了 
			System.out.println("读取："+mms.get("key2"));
//			redisUtils.removeMap("absd");
//			mms=redisUtils.getMap("absd");
//			System.out.println("移除后查看："+mms.size());
			
			//测试 List<Object>
//			List<Map<String,Object>> list=new ArrayList<Map<String,Object>>();
//			Map<String,Object> m1=new HashMap<String,Object>();
//			m1.put("name", "张三");
//			m1.put("age", 123);
//			Map<String,Object> m2=new HashMap<String,Object>();
//			m2.put("name", "李四");
//			m2.put("age", 456);
//			list.add(m1);
//			list.add(m2);
//			redisUtils.setListObject("listObject", list);
//			System.out.println("放入成功");
//			List<Map<String,Object>> resultS=redisUtils.getListObject("listObject");
//			if(resultS!=null){
//				System.out.println(resultS+"------------"+resultS.size());
//			}else{
//				System.out.println("缓存没了");
//			}
			*//*******************测试redis end***********************//*
			
			testtemplateDao.update(testtemplate);
			msg.setSuccess(true);
			msg.setErrorMsg("修改成功！");
		}catch(Exception e){
			e.printStackTrace();
		    msg.setSuccess(false);
			msg.setErrorMsg("修改失败,服务异常！");
		}		
		return msg;
	}
	
	@Override
	public ResultMessage delete(String template_id) {
		ResultMessage msg = new ResultMessage();
		Map<String,Object> params=new HashMap<String,Object>();
		try{
			params.put("key", "template_id");
			params.put("value", template_id);
			testtemplateDao.delete(params);
			msg.setSuccess(true);
			msg.setErrorMsg("成功！");
		}catch(Exception e){
			e.printStackTrace();
		    msg.setSuccess(false);
			msg.setErrorMsg("服务异常！");
		}		
		return msg;
	}
*/
}

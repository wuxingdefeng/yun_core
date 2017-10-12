package com.yun.core.controller;

import org.springframework.stereotype.Controller;



@Controller
public class TestTemplateController extends BaseController{
/*	@Autowired
	private TestTemplateServiceInter testtemplateService;
//	@Autowired
//	private ActiveMQ activeMQ;
	*//**
	 * 前往管理中心
	 * @return
	 *//*
	@RequestMapping(value="sys/testtemplate/go")
	public String go(){
		super.getFunBtns();
		return "/testtemplate/list";
	}
    
	*//**
	 * 返回分页数据
	 * @param testtemplate
	 * @param page
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value="sys/testtemplate/list")
	public Object list(TestTemplate testtemplate, Page page){
		long start=System.currentTimeMillis();
		Object obj=testtemplateService.getPages(testtemplate,page);
		System.out.println("用时"+(System.currentTimeMillis()-start));
		return obj;
	}
	*//**
	 * 前往新增或修改
	 * @param model
	 * @param ID
	 * @return
	 *//*
	@RequestMapping(value="sys/testtemplate/toAddOrUpdatePage")
	@Token(save=true)
	public String goAddOrUpdatePage(ModelMap model,String ID){
		model.put("ID", ID);
		if(ID!=null){
			model.put("testtemplate", testtemplateService.getTestTemplateBytemplate_id(ID));
		}
		return "/testtemplate/addOrUpdate";
	}
	@RequestMapping(value="sys/testtemplate/toSelect")
	public String toSelect(String ID,ModelMap model){
		if(ID!=null){
			model.put("testtemplate", testtemplateService.getTestTemplateBytemplate_id(ID));
		}
		return "/testtemplate/toSelect";
	}
	*//**
	 * 新增
	 * @param model
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value = "sys/testtemplate/insert")
	@Token(remove=true)
	public ResultMessage insert(ModelMap model, TestTemplate testtemplate, String tem) {
		ResultMessage msg = new ResultMessage();
		if (testtemplate == null ) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		testtemplate.setTemplate(tem);
		return testtemplateService.insert(testtemplate);
	}
	*//**
	 * 修改
	 * @param model
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value = "sys/testtemplate/update")
	@Token(remove=true)
	public ResultMessage update(ModelMap model,TestTemplate testtemplate,String tem) {
		ResultMessage msg = new ResultMessage();
		
		if (testtemplate == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		
	  
	  
//		System.out.println(dataM);
//		activeMQ.sendQueue("test.queue", "发送队列");
//		activeMQ.sendTopic("test.topic", "发送订阅");
		//<p><span id="职业" title="职业" onclick="EMR.select.tlclick(this)" tl-model="{&quot;ID&quot;:&quot;jobName&quot;,&quot;TYPE&quot;:&quot;select&quot;,&quot;NAME&quot;:&quot;职业&quot;,&quot;TAG&quot;:&quot;&quot;,&quot;DESCNAME&quot;:&quot;职业&quot;,&quot;REQUIRED&quot;:0,&quot;FREEINPUT&quot;:1,&quot;COLOR&quot;:&quot;000000&quot;,&quot;VALUE&quot;:&quot;码农&quot;,&quot;TEXT&quot;:&quot;码农&quot;,&quot;REMOTEURL&quot;:&quot;&quot;,&quot;BINDINGDATA&quot;:[{&quot;VALUE&quot;:&quot;干部&quot;,&quot;TEXT&quot;:&quot;干部&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;工程师&quot;,&quot;TEXT&quot;:&quot;工程师&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;教师&quot;,&quot;TEXT&quot;:&quot;教师&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;律师&quot;,&quot;TEXT&quot;:&quot;律师&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;农民&quot;,&quot;TEXT&quot;:&quot;农民&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;工人&quot;,&quot;TEXT&quot;:&quot;工人&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;医生&quot;,&quot;TEXT&quot;:&quot;医生&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;学生&quot;,&quot;TEXT&quot;:&quot;学生&quot;,&quot;SELECTED&quot;:0},{&quot;VALUE&quot;:&quot;码农&quot;,&quot;TEXT&quot;:&quot;码农&quot;,&quot;SELECTED&quot;:1}]}" class="defaultbackgroundcolor" contenteditable="false"><span class="tl-left" style="color:#0000FF" contenteditable="false">[</span><span title="职业" style="color:#000000;" class="tl-value" onclick="EMR.select.tlspanclick(this);" ondblclick="EMR.select.tlspandblclick(this);" contenteditable="true">码农</span><span style="color:#0000FF" class="tl-right" contenteditable="false">]</span></span></p>
       //<p><span id="职业" title="职业" onclick="EMR.select.tlclick(this)" tl-model="{"ID":"jobName","TYPE":"select","NAME":"职业","TAG":"","DESCNAME":"职业","REQUIRED":0,"FREEINPUT":1,"COLOR":"000000","VALUE":"码农","TEXT":"码农","REMOTEURL":"","BINDINGDATA":[{"VALUE":"干部","TEXT":"干部","SELECTED":0},{"VALUE":"工程师","TEXT":"工程师","SELECTED":0},{"VALUE":"教师","TEXT":"教师","SELECTED":0},{"VALUE":"律师","TEXT":"律师","SELECTED":0},{"VALUE":"农民","TEXT":"农民","SELECTED":0},{"VALUE":"工人","TEXT":"工人","SELECTED":0},{"VALUE":"医生","TEXT":"医生","SELECTED":0},{"VALUE":"学生","TEXT":"学生","SELECTED":0},{"VALUE":"码农","TEXT":"码农","SELECTED":1}]}" class="defaultbackgroundcolor" contenteditable="false"><span class="tl-left" style="color:#0000FF" contenteditable="false">[</span><span title="职业" style="color:#000000;" class="tl-value" onclick="EMR.select.tlspanclick(this);" ondblclick="EMR.select.tlspandblclick(this);" contenteditable="true">码农</span><span style="color:#0000FF" class="tl-right" contenteditable="false">]</span></span></p>
	
		testtemplate.setTemplate(tem);
//		MessageUtil messageUtil=new MessageUtil();
//		Session s=messageUtil.getSession("123456");
//		if(s!=null){
//			JSONObject json=new JSONObject(); 
//			json.put("code", 3);
//			json.put("data", "修改了模板了呀");
//			json.put("toID", "123456");
//			messageUtil.OnMessage(json.toJSONString(), s);
//		}
		return testtemplateService.update(testtemplate);
	}
	*//**
	 * 删除
	 * @param ID
	 * @return
	 *//*
	@ResponseBody
	@RequestMapping(value = "sys/testtemplate/delete")
	public ResultMessage delete(String ID) {
		ResultMessage msg = new ResultMessage();
		if (ID == null) {
			msg.setErrorMsg("参数异常！");
			msg.setSuccess(false);
			return msg;
		}
		msg=testtemplateService.delete(ID);
		return msg;
	}
    public static void main(String[] args){
    	TestTemplate t=new TestTemplate();
    	t.setTemplate("&quotID");
    	Map<String,Object> m=new HashMap<String,Object>();
    	m.put("template","&quotID");
    	System.out.println(m.get("template"));
    }*/
}

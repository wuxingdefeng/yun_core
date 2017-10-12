package com.yun.entity;
import java.util.Date;
   /**
    * 病例模板
    * test_template
    */ 
public class TestTemplate extends BaseEntity{
	private String template_id;
	private String template_name;
	private String template;
	private Date create_date;
	private int is_del;
	private Date del_date;
	private int status;
	public void setTemplate_id(String template_id){
		this.template_id=template_id;
	}
	public String getTemplate_id(){
		return template_id;
	}
	public void setTemplate_name(String template_name){
		this.template_name=template_name;
	}
	public String getTemplate_name(){
		return template_name;
	}
	public void setTemplate(String template){
		this.template=template;
	}
	public String getTemplate(){
		return template;
	}
	public void setCreate_date(Date create_date){
		this.create_date=create_date;
	}
	public Date getCreate_date(){
		return create_date;
	}
	public void setIs_del(int is_del){
		this.is_del=is_del;
	}
	public int getIs_del(){
		return is_del;
	}
	public void setDel_date(Date del_date){
		this.del_date=del_date;
	}
	public Date getDel_date(){
		return del_date;
	}
	public void setStatus(int status){
		this.status=status;
	}
	public int getStatus(){
		return status;
	}
}

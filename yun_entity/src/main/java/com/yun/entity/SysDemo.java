package com.yun.entity;
import java.util.Date;
   /**
    * Demo测试
    * sys_demo
    */ 
public class SysDemo extends BaseEntity{
	private String demo_id;
	private String demo_name;
	private String demo_title;
	private Date create_date;
	private int is_del;
	private Date del_date;
	private String money;
	public void setDemo_id(String demo_id){
		this.demo_id=demo_id;
	}
	public String getDemo_id(){
		return demo_id;
	}
	public void setDemo_name(String demo_name){
		this.demo_name=demo_name;
	}
	public String getDemo_name(){
		return demo_name;
	}
	public void setDemo_title(String demo_title){
		this.demo_title=demo_title;
	}
	public String getDemo_title(){
		return demo_title;
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
	public void setMoney(String money){
		this.money=money;
	}
	public String getMoney(){
		return money;
	}
}

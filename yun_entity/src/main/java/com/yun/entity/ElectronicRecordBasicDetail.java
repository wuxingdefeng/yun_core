package com.yun.entity;
import java.util.Date;
   /**
    * 病历表详情
    * electronic_record_basic_detail
    */ 
public class ElectronicRecordBasicDetail extends BaseEntity{
	private String detail_id;
	private String record_id;
	private String jsondata;
	private String htmldata;
	private Date create_date;
	private String create_by;
	private Date del_date;
	private int is_del;
	private String del_by;
	private String remarks;
	public void setDetail_id(String detail_id){
		this.detail_id=detail_id;
	}
	public String getDetail_id(){
		return detail_id;
	}
	public void setRecord_id(String record_id){
		this.record_id=record_id;
	}
	public String getRecord_id(){
		return record_id;
	}
	public void setJsondata(String jsondata){
		this.jsondata=jsondata;
	}
	public String getJsondata(){
		return jsondata;
	}
	public void setHtmldata(String htmldata){
		this.htmldata=htmldata;
	}
	public String getHtmldata(){
		return htmldata;
	}
	public void setCreate_date(Date create_date){
		this.create_date=create_date;
	}
	public Date getCreate_date(){
		return create_date;
	}
	public void setCreate_by(String create_by){
		this.create_by=create_by;
	}
	public String getCreate_by(){
		return create_by;
	}
	public void setDel_date(Date del_date){
		this.del_date=del_date;
	}
	public Date getDel_date(){
		return del_date;
	}
	public void setIs_del(int is_del){
		this.is_del=is_del;
	}
	public int getIs_del(){
		return is_del;
	}
	public void setDel_by(String del_by){
		this.del_by=del_by;
	}
	public String getDel_by(){
		return del_by;
	}
	public void setRemarks(String remarks){
		this.remarks=remarks;
	}
	public String getRemarks(){
		return remarks;
	}
}

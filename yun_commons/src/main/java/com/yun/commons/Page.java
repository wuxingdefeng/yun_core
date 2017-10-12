package com.yun.commons;

import java.io.Serializable;

public class Page implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2843053623355369576L;

	private Integer rows=10; //每页显示条数
	private Integer page=1; //当前要显示的页数
	
	public Page() {};

	public Page(int rows, int page) {
		this.page = page;
		this.rows = rows;
	}
	
	public int getCurrentRow() {
		if (this.page <= 0) return 0;
		return this.rows * (this.page - 1);
	}

	public Integer getRows() {
		return rows;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	

}

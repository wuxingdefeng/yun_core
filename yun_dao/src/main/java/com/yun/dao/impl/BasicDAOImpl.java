package com.yun.dao.impl;

import com.yun.dao.interf.BasicDAO;
import com.yun.dao.util.ReflectUtils;
import org.mybatis.spring.SqlSessionTemplate;

import java.util.List;
import java.util.Map;



public class BasicDAOImpl<T> implements BasicDAO<T> {
	//sqlSessionTemplate

	protected SqlSessionTemplate   sqlSessionTemplate;
  
    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}

	/**
     * 获取默认SqlMapping命名空间。 使用泛型参数中业务实体类型的全限定名作为默认的命名空间。 如果实际应用中需要特殊的命名空间，可由子类重写该方法实现自己的命名空间规则。
     * @return 返回命名空间字符串
     */
    @SuppressWarnings("unchecked")
    protected String getDefaultSqlNamespace() {
        Class<T> clazz = ReflectUtils.getClassGenricType(this.getClass());
        String nameSpace = clazz.getName();
        return nameSpace;
    }
    
	public void save(T t) {
		sqlSessionTemplate.insert(getDefaultSqlNamespace()+".save", t);
	}
	
	public void saveListObj(List<T> lis) {
		sqlSessionTemplate.insert(getDefaultSqlNamespace()+".saveListT", lis);
	}

	public void saveListMap(List<Map<String, Object>> lismap) {
		sqlSessionTemplate.insert(getDefaultSqlNamespace()+".saveListT", lismap);
	}

	public void update(T t) {
		sqlSessionTemplate.update(getDefaultSqlNamespace()+".update", t);
	}
	
	public void updateMap(Map<String, Object> params) {
		sqlSessionTemplate.update(getDefaultSqlNamespace()+".updateM", params);
	}
	
	public T getObject(Map<String, Object> params) {
		return sqlSessionTemplate.selectOne(getDefaultSqlNamespace()+".get", params);
	}

	public Map<String, Object> getMapObj(Map<String, Object> params) {
		return sqlSessionTemplate.selectOne(getDefaultSqlNamespace()+".getM", params);  
	}

	public List<T> getListObject(Map<String, Object> params) {
		return sqlSessionTemplate.selectList(getDefaultSqlNamespace()+".getList", params);
	}

	public List<Map<String, Object>> getListMap(Map<String, Object> params) {
		return sqlSessionTemplate.selectList(getDefaultSqlNamespace()+".getListMap", params);
	}

	public int getObjectExists(Map<String, Object> params) {
		return sqlSessionTemplate.selectOne(getDefaultSqlNamespace()+".getObjExists", params);
	}

	public List<Map<String, Object>> getPageData(Map<String, Object> params) {
		return sqlSessionTemplate.selectList(getDefaultSqlNamespace()+".getPageData", params);
	}

	public int getPageCount(Map<String, Object> params) {
		return sqlSessionTemplate.selectOne(getDefaultSqlNamespace()+".getPageCount", params);
	}
	@Override
	public int delete(Map<String, Object> params) {
		return sqlSessionTemplate.delete(getDefaultSqlNamespace()+".delete",params );
	}
	@Override
	public int deleteBash(Map<String, Object> params) {
		return sqlSessionTemplate.update(this.getDefaultSqlNamespace()+".deleteBash", params);
	}
}

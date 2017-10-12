package com.yun.commons;

import org.apache.commons.beanutils.BeanUtils;

import java.util.Map;
/**
 * Map工具类
 * @author QB
 *
 */
public class MapUtils {
    /**
     * map转对象
     * @param map
     * @param objClass
     * @return
     */
    public static Object MapToObject(Map<String,Object> map,Class<?> objClass)throws Exception{
        if (map == null)
            return null;

        Object obj = objClass.newInstance();

        BeanUtils.populate(obj, map);

        return obj;
    }
    /**
     * 对象转Map
     * @param obj
     * @return
     */
    public static Map<?, ?> objectToMap(Object obj) {
        if(obj == null)
            return null;

        return new org.apache.commons.beanutils.BeanMap(obj);
    }
}

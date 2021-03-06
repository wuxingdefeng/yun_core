package com.yun.dao.util;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * 类ReflectUtils.java的实现描述：TODO 类实现描述
 * 
 * @author Administrator 2014-8-2 下午10:51:20
 */
public class ReflectUtils {

    /**
     * 获得超类的参数类型，取第一个参数类型
     * 
     * @param <T> 类型参数
     * @param clazz 超类类型
     */
    @SuppressWarnings("rawtypes")
    public static <T> Class getClassGenricType(final Class clazz) {
        return getClassGenricType(clazz, 0);
    }

    /**
     * 根据索引获得超类的参数类型
     * 
     * @param clazz 超类类型
     * @param index 索引
     */
    @SuppressWarnings("rawtypes")
    public static Class getClassGenricType(final Class clazz, final int index) {
        Type genType = clazz.getGenericSuperclass();
        if (!(genType instanceof ParameterizedType)) {
            return Object.class;
        }
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
        if (index >= params.length || index < 0) {
            return Object.class;
        }
        if (!(params[index] instanceof Class)) {
            return Object.class;
        }
        return (Class) params[index];
    }
    
}

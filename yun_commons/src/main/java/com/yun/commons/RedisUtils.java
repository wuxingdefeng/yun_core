package com.yun.commons;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import redis.clients.jedis.Jedis;


public class RedisUtils {
	/**
	 * 设置 list
	 * @param <T>
	 * @param key
	 * @param value
	 */
	public static <T> void setList(String key ,List<T> list){
		Jedis jedis=getJedis();
		try {
			jedis.set(key.getBytes(),ObjectTranscoder.serialize(list));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}finally{
			RedisConfig.returnResource(jedis);
		}
	}
	private static Jedis getJedis() {
		return RedisConfig.getJedis();
	}
	/**
	 * 获取list
	 * @param <T>
	 * @param key
	 * @return list
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> getList(String key){
		Jedis jedis=getJedis();
		List<T> list =null;
		try{
			if(jedis== null || !jedis.exists(key.getBytes())){
				return null;
			}
			byte[] in =jedis.get(key.getBytes());
			list= (List<T>) ObjectTranscoder.deserialize(in);

		}catch(Exception e){
			System.out.println(e.getMessage());
		}finally{
			RedisConfig.returnResource(jedis);
		}
		return list;
	}
	/**
	 * 设置 map
	 * @param <T>
	 * @param key
	 * @param value
	 */
	public static <T> void setMap(String key ,Map<String,T> map){
		Jedis jedis=getJedis();
		try {
			jedis.set(key.getBytes(),ObjectTranscoder.serialize(map));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}finally{
			RedisConfig.returnResource(jedis);
		}
	}
	/**
	 * 获取map
	 * @param <T>
	 * @param key
	 * @return list
	 */
	@SuppressWarnings("unchecked")
	public static <T> Map<String,T> getMap(String key){
		Jedis jedis=getJedis();
		Map<String,T> map =null;
		try{
			if(jedis == null || !jedis.exists(key.getBytes())){
				return null;
			}
			byte[] in = jedis.get(key.getBytes());
			map= (Map<String, T>) ObjectTranscoder.deserialize(in);

		}catch(Exception e){
			System.out.println(e.getMessage());
		}finally{
			RedisConfig.returnResource(jedis);
		}
		return map;
	}
	public  static void main(String[] args){
//		Map<String,Object> m=new HashMap<String,Object>();
//		m.put("sdf", "日广是个逗逼");
//		RedisUtils.setMap("aa", m);
		System.out.println(RedisUtils.getMap("aa"));
	}
}

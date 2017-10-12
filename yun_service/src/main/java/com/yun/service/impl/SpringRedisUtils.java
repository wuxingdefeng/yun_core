package com.yun.service.impl;

import org.springframework.stereotype.Component;


@Component
public class SpringRedisUtils {
	
/*	@Autowired
	private RedisTemplate<String, String> redisTemplate;
	
	*//**
	 * 存储map
	 * @param key  
	 * @param ObjM
	 * @return
	 *//*
	public  void setMap(String key,Map<String,Object> ObjM)throws Exception{
			redisTemplate.opsForHash().putAll(key, ObjM);
	}
	*//**
	 * 设置map 定时清除
	 * @param key
	 * @param ObjM
	 * @param expire 单位 （默认秒）
	 * @return
	 *//*
	public void setMap(String key,Map<String,Object> ObjM,long expire)throws Exception{
			redisTemplate.opsForHash().putAll(key, ObjM);
			redisTemplate.expire(key, expire, TimeUnit.SECONDS);
	}
    *//**
     * 获取Map
     * @param key
     * @return
     *//*
	public Map<String,Object> getMap(String key)throws Exception{
		    Map<Object,Object> m=redisTemplate.opsForHash().entries(key);
		    Map<String,Object> resultM=null;
		    if(m!=null){
		    	resultM=new HashMap<String,Object>();
		    	for(Object obj:m.keySet()){
		    		resultM.put(obj.toString(), m.get(obj));
		    	}
		    }
			return resultM;
	}
	*//**
	 * 移除
	 * @param key
	 * @return
	 *//*
	public void removeMap(String key)throws Exception{
			redisTemplate.delete(key);
	}
	*//**
	 * 存储 key=value
	 * @param key
	 * @param value
	 * @return
	 *//*
	public void setString(String key,String value)throws Exception{
			redisTemplate.opsForValue().set(key, value);
	}
	*//**
	 * 存储 key=value 定时清除
	 * @param key
	 * @param value
	 * @param expire
	 * @return
	 *//*
	public void setString(String key,String value,long expire)throws Exception{
			redisTemplate.opsForValue().set(key, value);
			redisTemplate.expire(key, expire, TimeUnit.SECONDS);
	}
	*//**
	 * 获取String
	 * @param key
	 * @return
	 * @throws Exception
	 *//*
	public String getString(String key)throws Exception{
			return redisTemplate.opsForValue().get(key);
	}
	*//**
	 * 设置List<Object>
	 * @param key
	 * @param list
	 * @throws Exception
	 *//*
	public void setListObject(final String key,final List<Map<String, Object>> list)throws Exception{
		redisTemplate.execute(new RedisCallback<Boolean>() {
			@Override
			public Boolean doInRedis(RedisConnection connection)throws DataAccessException {
				connection.set(redisTemplate.getStringSerializer().serialize(key), ObjectTranscoder.serialize(list));
				return true;
			}});
	}
	*//**
	 * 获取List<Object>
	 * @param key
	 * @return
	 * @throws Exception
	 *//*
	public List<Map<String,Object>> getListObject(final String key)throws Exception{
		 return redisTemplate.execute(new RedisCallback<List<Map<String,Object>>>() {
			@SuppressWarnings("unchecked")
			@Override
			public List<Map<String,Object>> doInRedis(RedisConnection connection)throws DataAccessException {
				RedisSerializer<String> serializer=redisTemplate.getStringSerializer();
				if(connection.exists(serializer.serialize(key))){
					return (List<Map<String,Object>>) ObjectTranscoder.deserialize(connection.get(serializer.serialize(key)));
				}else{
					return null;
				}
			}
		});
	}*/
}

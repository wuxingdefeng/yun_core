package com.yun.core.listener;

import com.yun.core.controller.BaseController;
import com.yun.core.util.Constonts;
import com.yun.entity.Loginfo;
import com.yun.service.inter.LoginfoServiceInter;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;



/**
 * 保存日志
 * @author QB
 *
 */
@Aspect    
@Component
public class SystemLogAspect extends BaseController {
	@Autowired
	private LoginfoServiceInter loginfoService;
	//本地异常日志记录对象    
	private  static  final Logger logger = LoggerFactory.getLogger(SystemLogAspect. class);
	
	@Pointcut("@annotation(com.yun.core.listener.SystemControllerLog)")
	public  void controllerAspect() {    
	}
	
	@Before("controllerAspect()")    
	public  void doBefore(JoinPoint joinPoint)  {    
		HttpServletRequest request =  ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();    
		HttpSession session = request.getSession();    
		Object logObj=session.getAttribute(Constonts.USER);
		Loginfo log=new Loginfo();
		try {    
			String ip=super.getIpAddress();
			log.setCLIENT_IP(ip);
			log.setCLASS_METHOD(joinPoint.getTarget().getClass().getName() + "." + joinPoint.getSignature().getName() + "()");
			log.setMETHOD_DESC(getControllerMethodDescription(joinPoint));
			String params = ""; 
			if (joinPoint.getArgs() !=  null && joinPoint.getArgs().length > 0) {    
				int size=joinPoint.getArgs().length;
				Object[] objs=joinPoint.getArgs();
				for ( int i = 0; i <size ; i++) {    
					Object obj=objs[i];
					if(obj instanceof Integer){
						params+="{Integer="+obj+"}";
					}else if(obj instanceof String){
						params+="{String="+obj+"}";
					}else if(obj instanceof Date){
						params+="{Date="+obj+"}";
					}else{
						Class<? extends Object> cls=obj.getClass();
						for(Field field:cls.getDeclaredFields()){
							String fieldName="get"+toFirstLetterUpperCase(field.getName());
							Object value = cls.getMethod(fieldName).invoke(obj); 
							if(value!=null&&!"".equals(value)&&!"0".equals(value.toString())){
								params+="{"+fieldName+"="+value+"}";
							}
						}
					}
				}    
			}    
			log.setPARAMS(params);
			if(logObj!=null){
				log.setADMIN_ID(super.getLoginID());
				log.setADMIN_NAME(super.getLoginFiled("ADMIN_NAME"));
			}
			loginfoService.insert(log);
			//*========数据库日志=========*//    
		}  catch (Exception e) {    
			logger.error("==日志记录异常==");    
			logger.error("异常信息:{}", e.getMessage());    
		}    
	}
	public static String toFirstLetterUpperCase(String str) {  
	    if(str == null || str.length() < 2){  
	        return str;  
	    }  
	     String firstLetter = str.substring(0, 1).toUpperCase();  
	     return firstLetter + str.substring(1, str.length());  
	 }  
	/**
	 * 获取注解中对方法的描述信息 用于Controller层注解  
	 * @param joinPoint 切点  
	 * @return 方法描述  
	 * @throws Exception  
	 */    
	@SuppressWarnings("rawtypes")
	public  static String getControllerMethodDescription(JoinPoint joinPoint)  throws Exception {    
		String targetName = joinPoint.getTarget().getClass().getName();    
		String methodName = joinPoint.getSignature().getName();    
		Object[] arguments = joinPoint.getArgs();    
		Class targetClass = Class.forName(targetName);    
		Method[] methods = targetClass.getMethods();    
		String description = "";    
		for (Method method : methods) {    
			if (method.getName().equals(methodName)) {    
				Class[] clazzs = method.getParameterTypes();    
				if (clazzs.length == arguments.length) {    
					description = method.getAnnotation(SystemControllerLog. class).description();    
					break;    
				}    
			}    
		}    
		return description;    
	}    
}

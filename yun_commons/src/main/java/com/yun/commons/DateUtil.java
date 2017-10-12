package com.yun.commons;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

//���ڹ�����
public class DateUtil {
	/**
	 * 获取 yyyy-MM-dd HH:mm:ss 格式
	 */
	public static final String date1="yyyy-MM-dd HH:mm:ss";
	/**
	 * 获取 yyyy-MM-dd 格式
	 */
	public static final String date2="yyyy-MM-dd";
	/**
	 * 获取 yyyy年MM月dd HH时mm分ss 格式
	 */
	public static final String date3="yyyy年MM月dd HH时mm分ss";
	/**
	 * 获取 yyyy年MM月dd日 格式
	 */
	public static final String date4="yyyy年MM月dd日";
	/**
	 * 获取 yyyyMMdd 格式
	 */
	public static final String date5="yyyyMMdd";
	/**
	 * 获取 yyyy年MM月dd 格式
	 */
	public static final String date6="yyyy年MM月dd";
	/**
	 * 获取 yyyyMMddHHmmss 格式
	 */
	public static final String date7="yyyyMMddHHmmss";
	/**
	 * 日期格式化为字符串 日期为null 取当前时间
	 * @param format
	 * @param date
	 * @return
	 */
	public static String getDateFormats(String format,Date date) {
		SimpleDateFormat sdfTime = new SimpleDateFormat(format);
		if(date==null){
			return sdfTime.format(new Date());
		}else{
			return sdfTime.format(date);
		}
	}
	/**
	 * 字符串转日期
	 * @param date
	 * @param format
	 * @return
	 */
	public static Date getDateFormatd(String date,String format){
		SimpleDateFormat sdfTime = new SimpleDateFormat(format);
		try {
			return sdfTime.parse(date);
		} catch (ParseException e) {
			System.out.println("日期转换错误！！错误原因："+e.getMessage());
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 计算失效时间
	 * @param nowDate：起始时间
	 * @param type ：如果是year：计算起始时间到几年后的时间、month计算多少月之后，day计算多少天之后的时间,hour 计算多少小时后，minute 计算多少分钟后
	 * @return
	 */
	public static Date getPreDate(Date nowDate,String type,Integer time){
		Calendar cal = Calendar.getInstance();
		cal.setTime(nowDate);
		int amount = 0;
		if("minute".equals(type)){
			amount = time+cal.get(Calendar.MINUTE);
			cal.set(Calendar.MINUTE, amount);
		}else if("hour".equals(type)){
			amount = time+cal.get(Calendar.HOUR);
			cal.set(Calendar.HOUR, amount);
		}else if("day".equals(type)){
			amount = time+cal.get(Calendar.DAY_OF_MONTH);
			cal.set(Calendar.DAY_OF_MONTH, amount);
		}else if("month".equals(type)){
			int mont = time+cal.get(Calendar.MONTH);
			cal.set(Calendar.MONTH, mont);
		}else{
			int year = time+cal.get(Calendar.YEAR);
			cal.set(Calendar.YEAR, year);
		}
		Date preDate = cal.getTime();
		return preDate;
	}
	/**
	 * 获取 date 星期几
	 * @param date 日期
	 * @param weeks 周天数组 默认{ "0", "1", "2", "3", "4", "5", "6" }
	 * @return
	 */
	public static String getWeekOfDate(Date date,String[] weeks) {
		String[] weekDaysCode=weeks;
		if(weeks==null){
			weekDaysCode=new String[]{ "0", "1", "2", "3", "4", "5", "6" };
		}
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int intWeek = calendar.get(Calendar.DAY_OF_WEEK) - 1;
		return weekDaysCode[intWeek];
	}
	/**
	 * 获取日期多少前
	 * @param sourceStamp 过去时间
	 * @param targetStamp  当前时间
	 * @return String 分钟 小时 昨天 前天 三天前 。。
	 * @throws Exception
	 */
	public static String getTimeDifference(Date sourceStamp, Date targetStamp) throws Exception {
		StringBuilder sb = new StringBuilder();
		long diff = targetStamp.getTime() - sourceStamp.getTime();
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		if (diff / (1000 * 60) < 60) {
			sb.append(diff / (1000 * 60) < 1 ? 1 : (int) diff / (1000 * 60));
			sb.append("分钟前");
		} else if ((diff / (1000 * 60)) >= 60 && (diff / (1000 * 60)) < 60 * 24) {
			sb.append((int) diff / (1000 * 60 * 60));
			sb.append("小时前");
		} else {
			diff = sdf1.parse(sdf1.format(targetStamp)).getTime() - sdf1.parse(sdf1.format(sourceStamp)).getTime();
			if ((diff / (1000 * 60)) >= 60 * 24 && (diff / (1000 * 60)) < 60 * 48) {
				sb.append("昨天");
			} else if ((diff / (1000 * 60)) >= 60 * 48 && (diff / (1000 * 60)) < 60 * 72) {
				sb.append("前天");
			} else if ((diff / (1000 * 60)) >= 60 * 72 && (diff / (1000 * 60)) < 60 * 96) {
				sb.append("三天前");
			} else {
				SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				sb.append(sdf2.format(sourceStamp));
			}
		}
		return sb.toString();
	}
	/**
	 * 得到n天之后是周几
	 * @param days
	 * @return
	 */
	public static String getAfterDayWeek(int daysInt) {
		Calendar canlendar = Calendar.getInstance(); // java.util包
		canlendar.add(Calendar.DATE, daysInt); // 日期减 如果不够减会将月变动
		Date date = canlendar.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("E");
		String dateStr = sdf.format(date);
		return dateStr;
	}
	/**
	 * <li>功能描述：时间相减得到天数
	 * @param beginDateStr
	 * @param endDateStr
	 * @return
	 * long
	 * @author Administrator
	 */
	public static long getDaySub(String beginDateStr,String endDateStr){
		long day=0;
		java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
		java.util.Date beginDate = null;
		java.util.Date endDate = null;
		try {
			beginDate = format.parse(beginDateStr);
			endDate= format.parse(endDateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		day=(endDate.getTime()-beginDate.getTime())/(24*60*60*1000);
		return day;
	}
	public static void main(String[] args){
		//		System.out.println(DateUtil.getDateFormats(DateUtil.date1,DateUtil.getPreDate(new Date(), "minute", 2)));
		//		System.out.println(DateUtil.getWeekOfDate(new Date(), null));
	}
}

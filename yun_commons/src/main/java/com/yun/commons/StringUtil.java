package com.yun.commons;

import java.util.Random;

public class StringUtil {
	/**
	 * 获取length 个长度的随机小写字母
	 * @param length
	 * @return
	 */
	public static String getRandomString(int length) { //length表示生成字符串的长度
		String base = "abcdefghijklmnopqrstuvwxyz";
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}
	/**
	 * 获取length 个长度的随机大写字母
	 * @param length
	 * @return
	 */
	public static String getRandomString2(int length) { //length表示生成字符串的长度
		String base = "ABCDEFGHIJKLMNOPQESTUVWXYZ";
		Random random = new Random();
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
	}
}

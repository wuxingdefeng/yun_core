package com.yun.commons;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;

public class ChangePY {


    // 汉字转成拼音
    @SuppressWarnings("deprecation")
    public static String getEname(String name) throws Exception {
        HanyuPinyinOutputFormat pyFormat = new HanyuPinyinOutputFormat();
        /**
         * 设置声调格式： outputFormat.setToeType(HanyuPinyinToneType); 方法参数HanyuPinyinToneType有以下常量对象：
         * HanyuPinyinToneType.WITH_TONE_NUMBER 用数字表示声调，例如：zhao4 HanyuPinyinToneType.WITHOUT_TONE 无声调表示，例如：zhao
         * HanyuPinyinToneType.WITH_TONE_MARK 用声调符号表示，例如：zhao 设置特殊拼音ü的显示格式：
         * outputFormat.setVCharType(HanyuPinyinVCharType); 方法参数HanyuPinyinVCharType有以下常量对象：
         * HanyuPinyinVCharType.WITH_U_AND_COLON 以U和一个冒号表示该拼音， HanyuPinyinVCharType.WITH_V 以V表示该字符，
         * HanyuPinyinVCharType.WITH_U_UNICODE 设置大小写格式 outputFormat.setCaseType(HanyuPinyinCaseType);
         * HanyuPinyinCaseType.LOWERCASE 转换后以全小写方式输出 HanyuPinyinCaseType.UPPERCASE 转换后以全大写方式输出
         */
        pyFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE); // 设置样式，LOWERCASE小写
        pyFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);// 声调格式，WITHOUT_TONE无声调
        pyFormat.setVCharType(HanyuPinyinVCharType.WITH_V);// 设置特殊拼音ü的显示格式,

        return PinyinHelper.toHanyuPinyinString(name, pyFormat, "");
    }

    public static String getPyName(String name) throws Exception {
        char[] strs = name.toCharArray();
        String newname = "";

        // 拼接首字母
        for (int i = 0; i < strs.length; i++) {
            newname += toLowerCase(getEname("" + strs[i]));
        }

        return newname;
    }

    // 提取首字母，并小写
    private static String toLowerCase(String str) {
        StringBuffer newstr = new StringBuffer();
        newstr.append((str.substring(0, 1)).toLowerCase());
        return newstr.toString();
    }

    // 用于拼音联想功能，把任何传过来的值（包括中文）都做乱码处理，转成拼音，且小写
    public static String getPY(String val) {
        String py = null;
        if (val != null) {
            try {
                // val = new String(val.getBytes("iso-8859-1"), "utf-8");
                py = getPyName(val);
                py = py.toLowerCase();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return py;
    }

    public static void main(String[] args) throws Exception {
        System.out.println(getEname("龘"));
        //System.out.println(getPY("重庆"));
    }


}

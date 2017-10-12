package com.yun.commons.intferce;

import java.util.Map;

/**
 * ���ͽӿ�
 * @author QinBin
 *
 */
public interface SendIntferce {
	    /**
	     * ���Ͷ���
	     * @param obj
	     * @return
	     */
       Object send(Map<String, Object> params);
        /**
         * ����������֤��
         * @param params
         * @return
         */
       Object sendVideo(Map<String, Object> params);
}

package com.yun.service.inter;

import com.yun.commons.Page;
import com.yun.entity.ElectronicRecordBasic;
import com.yun.entity.ResultMessage;


public interface ElectronicRecordBasicServiceInter {

	Object getPages(ElectronicRecordBasic electronicrecordbasic, Page page);

	Object getElectronicRecordBasicByrecord_id(String record_id);

	ResultMessage insert(ElectronicRecordBasic electronicrecordbasic) throws Exception;

	ResultMessage update(ElectronicRecordBasic electronicrecordbasic);

	ResultMessage delete(String record_id);
}

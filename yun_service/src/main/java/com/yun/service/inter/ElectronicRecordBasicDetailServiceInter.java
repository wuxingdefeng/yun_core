package com.yun.service.inter;

import com.yun.commons.Page;
import com.yun.entity.ElectronicRecordBasicDetail;
import com.yun.entity.ResultMessage;


public interface ElectronicRecordBasicDetailServiceInter {

	Object getPages(ElectronicRecordBasicDetail electronicrecordbasicdetail, Page page);

	Object getElectronicRecordBasicDetailBydetail_id(String detail_id);

	ResultMessage insert(ElectronicRecordBasicDetail electronicrecordbasicdetail);

	ResultMessage update(ElectronicRecordBasicDetail electronicrecordbasicdetail);

	ResultMessage delete(String detail_id);
}

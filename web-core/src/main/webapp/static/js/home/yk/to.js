$(function(){
	var serviceURL=$("#serviceURL").val();
	var accessToken=$("#accessToken").val();
	var roomID=$("#roomID").val();
	var localID=$("#localID").val();
	var localName=$("#localName").val();
	 joinRoom(serviceURL,accessToken,roomID,localID,localName,"data",localID);
});
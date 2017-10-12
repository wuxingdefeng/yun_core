//自定义文件上传插件(定义参数)
(function($){
		//默认参数
	    var defaults={
	      	  _fileClass:"fileUpload",
	       	  _maxNum:9
	     };
        $.myUpload=function(options){
                var op = $.extend(defaults,options);
                $("."+op._fileClass+"").onchange=function(){
                	if (!this.files.length) return;
                    var files = Array.prototype.slice.call(this.files);
                    if (files.length >op._maxNum) {
                      alert("最多同时只可上传"+op._maxNum+"个文件");
                      return;
                    }
                    files.forEach(function (file, i) {
                      if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                      var reader = new FileReader();
                      var li = document.createElement("li");
                      li.innerHTML = '<div class="progress"><span></span></div>';
                      $(".img-list").append($(li));
                      reader.onload = function () {
                        var result = this.result;
                        var img = new Image();
                        img.src = result;
                        if (result.length <= maxsize) {
                          $(li).css("background-image", "url(" + result + ")");
                          img = null;
                          upload(result, file.type, $(li));
                          return;
                        }
//                				图片加载完毕之后进行压缩，然后上传
                        if (img.complete) {
                          callback();
                        } else {
                          img.onload = callback;
                        }
                        function callback() {
                          var data = compress(img);
                          $(li).css("background-image", "url(" + data + ")");
                          upload(data, file.type, $(li));
                          img = null;
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                };
        };
 })(jQuery);
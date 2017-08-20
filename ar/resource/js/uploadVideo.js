/**
   * 前台JS主入口
   */
  layui.define(['layer'], function (exports) {
    var video_url = Routing.generate('kit_web_work_retrieve');
    $("#upload_videoss").change(function(){
      //创建FormData对象
      var data = new FormData();
      $.each($('#upload_videoss')[0].files, function(i, file) {
        data.append('video', file);
      });
      var aa = checkfile();
      if(!aa)
      {
        return false;
      }

      $(".progress-out").show();
      $.ajax({
        url:video_url,
        type:'POST',
        data:data,
        cache: false,
        contentType: false,
        processData: false,
        xhr: function(){
          var xhr = $.ajaxSettings.xhr();
          if(onprogress && xhr.upload) {
            xhr.upload.addEventListener("progress" , onprogress, false);
            return xhr;
          }
        },
        success:function(data){
          if(data.code == 1)
          {
        	layer.msg(data.msg);
            //parent.location.reload();
            var dom = $(".upload-video",window.parent.document);
            var input = $("#form_video",window.parent.document);
            input.val(data.data);
            dom.html('<video src="'+data.url+'" controls="controls" preload="Metadata" width="100%" height="100%"></video>">');
            var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
            parent.layer.close(index);
          }else
          {
            layer.msg(data.msg);
          }
        }
      });
    });

    function onprogress(evt){
      var loaded = evt.loaded;          //已经上传大小情况
      var tot = evt.total;            //附件总大小
      var per = Math.floor(100*loaded/tot);   //已经上传的百分比
      $(".percent-show span").text(per);
      $(".progress-in").css("width" , per +"%");
    }

    var maxsize = 10*1024*1024;//2M
    var errMsg = "上传的视频不能超过10M！！！";
    var tipMsg = "您的浏览器暂不支持计算上传文件的大小，确保上传视频不要超过10M，建议使用IE、FireFox、Chrome浏览器。";
    var  browserCfg = {};
    var ua = window.navigator.userAgent;
    if (ua.indexOf("MSIE")>=1){
      browserCfg.ie = true;
    }else if(ua.indexOf("Firefox")>=1){
      browserCfg.firefox = true;
    }else if(ua.indexOf("Chrome")>=1){
      browserCfg.chrome = true;
    }
    function checkfile(){
      try{
        var obj_file = document.getElementById("upload_videoss");
        if(obj_file.value==""){
          layer.msg("请先选择上传文件");
          return false;
        }
        var filesize = 0;
        if(browserCfg.firefox || browserCfg.chrome ){
          filesize = obj_file.files[0].size;
        }else if(browserCfg.ie){
          var obj_img = document.getElementById('tempimg');
          obj_img.dynsrc=obj_file.value;
          filesize = obj_img.fileSize;
        }else{
          layer.msg(tipMsg);
        }
        if(filesize==-1){
          layer.msg(tipMsg);
          return true;
        }else if(filesize>maxsize){
          layer.msg(errMsg);
          return false;
        }else{
          return true;
        }
      }catch(e){
        layer.msg(e);
      }
    }
    exports('uploadVideo', {});
  });



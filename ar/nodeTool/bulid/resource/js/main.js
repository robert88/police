/**
   * 前台JS主入口
   */
  layui.define(['form', 'layer', 'laydate'], function (exports) {
    debugger
    var layer = layui.layer;
    var console = window.console || { log: function () {} },
        $alert = $('.docs-alert'),
        $message = $alert.find('.message'),
        showMessage = function (message, type) {
          $message.text(message);

          if (type) {
            $message.addClass(type);
          }

          $alert.fadeIn();

          setTimeout(function () {
            $alert.fadeOut();
          }, 3000);
        };

    // Demo
    // -------------------------------------------------------------------------

    (function () {
      var $image = $('.img-container > img'),
          $dataX = $('#dataX'),
          $dataY = $('#dataY'),
          $dataHeight = $('#dataHeight'),
          $dataWidth = $('#dataWidth'),
          $dataRotate = $('#dataRotate'),
          options = {
            aspectRatio: 16 / 9,
            preview: '.img-preview',
            crop: function (data) {}
          };

      $image.cropper(options);


      // Methods
      $(document.body).on('click', '[data-method]', function () {
        var data = $(this).data(),
            $target,
            result;

        if (data.method) {
          data = $.extend({}, data); // Clone a new one

          if (typeof data.target !== 'undefined') {
            $target = $(data.target);

            if (typeof data.option === 'undefined') {
              try {
                data.option = JSON.parse($target.val());
              } catch (e) {
                console.log(e.message);
              }
            }
          }

          result = $image.cropper(data.method, data.option);

          if (data.method === 'getCroppedCanvas') {
            //jjf $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
            var canvaURL = result.toDataURL('image/jpeg');
            var index = layer.load(2);
            var arrecordid = $("#arrecordid").val();
            $.ajax({
              method: 'POST',
              dataType: 'json',
              url: Routing.generate('kit_web_work_retrieve'),
              data: {photo: canvaURL,id:arrecordid, type: 'image'},
              success: function (info) {
                if (info.code == 1) {
                  layer.msg(info.msg);
                  var dom = $(".upload-img",window.parent.document);
                  var input = $("#form_image",window.parent.document);
                  dom.html('<img src="'+info.url+'">');
                  input.val(info.data);
                  //parent.location.reload();
                  var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                  parent.layer.close(index);
                }else
                {
                  layer.msg(info.msg);
                  layer.close(index);
                }

              }
            });
          }

          if ($.isPlainObject(result) && $target) {
            try {
              $target.val(JSON.stringify(result));
            } catch (e) {
              console.log(e.message);
            }
          }

        }
      }).on('keydown', function (e) {

        switch (e.which) {
          case 37:
            e.preventDefault();
            $image.cropper('move', -1, 0);
            break;

          case 38:
            e.preventDefault();
            $image.cropper('move', 0, -1);
            break;

          case 39:
            e.preventDefault();
            $image.cropper('move', 1, 0);
            break;

          case 40:
            e.preventDefault();
            $image.cropper('move', 0, 1);
            break;
        }

      });


      // Import image
      var $inputImage = $('#inputImage'),
          URL = window.URL || window.webkitURL,
          blobURL;

      if (URL) {
        $inputImage.change(function () {
          var files = this.files,
              file;

          if (files && files.length) {
            file = files[0];

            if (/^image\/\w+$/.test(file.type)) {
              blobURL = URL.createObjectURL(file);
              $image.one('built.cropper', function () {
                URL.revokeObjectURL(blobURL); // Revoke when load complete
              }).cropper('reset', true).cropper('replace', blobURL);
              $inputImage.val('');
            } else {
              showMessage('Please choose an image file.');
            }
          }
        });
      } else {
        $inputImage.parent().remove();
      }


      // Options
      $('.docs-options :checkbox').on('change', function () {
        var $this = $(this);

        options[$this.val()] = $this.prop('checked');
        $image.cropper('destroy').cropper(options);
      });
      

    }());
    exports('main', {});
  });



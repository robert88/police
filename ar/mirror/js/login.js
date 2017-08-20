
$(function(){
	$(".tabtitle i").click(function(){
		$(".errormsg").empty().removeClass('Validform_wrong');       
		$(this).addClass("on").siblings().removeClass('on');
		$(this).parent().parent().find(".tabct").hide().eq($(this).index()).show();
	})
	$(".pics ul li").click(function(){
		$(this).addClass("on").siblings().removeClass('on');
		var _img = $(this).data("src");
		$(".bigpics img").attr("src",_img);
	});
	var old_num = 1;
	$(".changeprice i").click(function(){
		var _text = $(this).data("text");
		var _old = $(this).data("old");
		var _now = $(this).data("now");
		var _img = $(this).data("src");
		var _id = $(this).data("id");
		if(_id == 2)
		{
			var goods_num = $("input[name='goods_num']").val();
			if(goods_num < 50)
			{
				$("input[name='goods_num']").val(50);
			}
		}else
		{
			$("input[name='goods_num']").val(old_num);
		}
		$("input[name='goods_id']").val(_id);
		$(".bigpics img").attr("src",_img);
		$(this).addClass("on").siblings().removeClass('on');
		$(".nowchange").text(_text);
		$(".tempprice li:eq(0)").find("b").text('¥'+_now);
		$(".tempprice li:eq(1)").find("i").text(_old+'元');
	});
	
	$(".arrowup").click(function(){
		var goods_num = $("input[name='goods_num']").val();
		goods_num = parseInt(goods_num)+1;
		old_num = goods_num;
		$("input[name='goods_num']").val(goods_num);
	});
		
	$(".arrowdown").click(function(){
		var goods_num = $("input[name='goods_num']").val();
		var goods_id = $("input[name='goods_id']").val();
		goods_num = parseInt(goods_num)-1;
		if(goods_num == 0)
		{
			return false;
		}
		if(goods_id == 2)
		{
			if(goods_num < 50)
			{
				layer.msg("相册50份起售");
				return false;
			}
		}
		old_num = goods_num;
		$("input[name='goods_num']").val(goods_num);
	});
		
	$("input[name='goods_num']").keyup(function(){
		var goods_num = $("input[name='goods_num']").val();
		var goods_id = $("input[name='goods_id']").val();
		if(goods_num == '' || isNaN(goods_num))
		{
			goods_num = 1;
		}
		goods_num = parseInt(goods_num);
		if(goods_id == 2)
		{
			if(goods_num < 50)
			{
				$("input[name='goods_num']").val(50)
				return false;
			}
		}
		old_num = goods_num;
		$("input[name='goods_num']").val(goods_num);
	});
	
	var scene={
		logintk:function(obj,id)
		{
			var returnurl = $(obj).data("returnurl");
			if(returnurl)
			{
				$("input[name='returnurl']").val(returnurl);
			}else
			{
				$("input[name='returnurl']").val('');
			}
			$(".dialog").addClass("show");
			$(".tabtitle i:eq(0)").addClass("on").siblings().removeClass('on');
			$(".tabtitle i:eq(0)").parent().parent().find(".tabct").hide().eq(0).show();	
		},
		redirect:function (obj) {
			var url = $(obj).data("url");
			if($.cookie("login")){
				window.location.href = url;
			}else{
				$("#loginTrigger").click();
			}
		},
		registertk:function(obj,id)
		{
			$(".dialog").addClass("show");
			$(".tabtitle i:eq(1)").addClass("on").siblings().removeClass('on');
			$(".tabtitle i:eq(1)").parent().parent().find(".tabct").hide().eq(1).show();
		},
		forgetpass:function(obj,id)
		{
			$(".errormsg").empty().removeClass('Validform_wrong');
			$(".tabtitle i").removeClass('on');
			$(".formcont").find(".tabct").hide().eq(2).show();	
		},
		closetk:function(obj,id)
		{
			$(".errormsg").empty().removeClass('Validform_wrong');
			$(".dialog").removeClass("show");
		},
		rememberpass:function(obj,id)
		{
			if($(obj).hasClass("on"))
			{	$(obj).removeClass("on")
				$(obj).find("input[name='rememberpass']").val(0);
			}else{
				$(obj).addClass("on")
				$(obj).find("input[name='rememberpass']").val(1);
			}
		},
		getvercode:function(obj,id)
		{
			var obj = $(obj);
			var mobile = obj.parents("ul").find("input[name='mobile']").val();
			var myreg =  /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$|17[0-9]{9}$/; 
			if(!myreg.test(mobile)) 
			{
				obj.parents(".zprts ").find(".errormsg").removeClass('Validform_right').addClass('Validform_wrong').text("请输入正确的手机号");
				return false;
			}
			var sms_url = obj.data('url');
			$.ajax({
			    url: sms_url,
			    type: "post",
			    data: {
		                mobile: mobile,
		            },
			    success: function (data) {
			        if(data.status == 'n')
				{
					clearInterval(interval);
					obj.val('获取验证码');
					obj.removeClass("on").attr("disabled",false);
					obj.parents(".zprts ").find(".errormsg").removeClass('Validform_right').addClass('Validform_wrong').text(data.info);
				}else
				{
					obj.parents(".zprts ").find(".errormsg").removeClass('Validform_wrong').addClass('Validform_right').text(data.info);
				}
				
			    }
			});
			obj.addClass("on").attr('disabled',true);
			obj.val('120s后重置');
			var waitTime, currTime = 119;
			var interval = setInterval(function() {
				timeChange(currTime,obj);
				currTime--;
				if (currTime < 0) {
					clearInterval(interval);
					currTime = waitTime;
				}
			}, 1000);
		},
		nowbuy:function(obj,id){
			var obj = $(obj);
			var goods_id = $("input[name='goods_id']").val();
			var goods_num = $("input[name='goods_num']").val();
			var goods_text = $(".nowchange").text();
			var _url = obj.data("url")+"?t="+$.now();
			obj.text("订购中...");
			$.ajax({
			   type: "POST",
			   url: _url,
			   data : {"goods_id":goods_id,"goods_num":goods_num,"goods_text":goods_text},
			   success: function(info){
					if (info.code === 1) {
				            setTimeout(function () {
				                location.href = info.url;
				            }, 1000);
				        }else
					{
						obj.text("立即订购");
						layer.msg(info.msg);
					}
			   }
			});
		},
		js_video:function(obj,id)
		{
			$(".html_video .cont").empty().append('<embed src="http://player.polyv.net/videos/player.swf?vid=ddf3c94a79aa572595262f3c37ffad9e_d" allowfullscreen="true" quality="high" width="1100" height="555" align="middle" allowscriptaccess="always" type="application/x-shockwave-flash" wmode="Transparent" autostart="true">');
			$(".graybg").show();
			$(".html_video").show();    
		},
		js_video_ljxq:function(obj,id)
		{
			$(".html_video .cont").empty().append('<embed src="http://player.polyv.net/videos/player.swf?vid=ddf3c94a7975ad4e0af27a6f9ac13b13_d" allowfullscreen="true" quality="high" width="1100" height="555" align="middle" allowscriptaccess="always" type="application/x-shockwave-flash" wmode="Transparent" autostart="true">');
			$(".graybg").show();
			$(".html_video").show();    
		},
		close_video:function(obj,id)
		{
			$(".html_video .cont").empty();
			$(".html_video,.graybg").hide();
		}
		
	}
	
	$(".registerform").Validform({
		tiptype:function(msg,o,cssctl){
			var objtip=$(".errormsg");
			cssctl(objtip,o.type);
			objtip.text(msg);
		},
		ajaxPost:true,
		//postonce:true,
		callback:function(data){
			//返回数据data是json对象，{"info":"demo info","status":"y"}
			if(data.status == 'y')
			{
				if(data.returnurl)
				{
					window.location.href=data.returnurl;
				}else
				{
					window.location.reload();
				}				
			}
			
		}
	});
	
	function timeChange(waitTime,obj) {
		if (waitTime != 0) {
			obj.val(+ waitTime + 's后重置');
		} else {
			obj.val('获取验证码');
			obj.removeClass("on").attr("disabled",false);
		}
	}

	$(document).off("click.login",".scene_option").on('click.login',".scene_option",function(){
		var type=$(this).data('type'),id=0;
		if(scene[type]){
			scene[type](this,id);
		}
	})
});
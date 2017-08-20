layui.use(['layer', 'laydate','form'], function(){
	var layer = layui.layer
		,laydate = layui.laydate
		,form = layui.form()
		,$ = layui.jquery;

	var start = {
		max: '2099-06-16 23:59:59'
		,istoday: false
		,choose: function(datas){
			end.min = datas; //开始日选好后，重置结束日的最小日期
			end.start = datas //将结束日的初始值设定为开始日
		}
	};

	var end = {
		max: '2099-06-16 23:59:59'
		,istoday: false
		,choose: function(datas){
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	$("#LAY_demorange_s").click(function(){
		start.elem = this;
		laydate(start);
	});
	$("#LAY_demorange_e").click(function(){
		end.elem = this
		laydate(end);
	});

	$(".zfstyle li").click(function(){
		$(this).addClass("on").append('<div class="icon"><img src="http://ss.ppt20.com/images/ppdt/tureico.png"></div>').siblings().removeClass("on").children('.icon').remove();
		$("#payment").val($(this).data('value'));

	});
	$(".layui-pay").click(function(){
		var trade_sn = $(this).data("order");
		layer.open({
			title:'订单支付',
			type:1,
			content:$("#payResume"),
			btn:['立即支付','我已支付'],
			success:function(layero,index){
				layero.find("#trade_sn").val(trade_sn);
			},
			btn1:function(){
				$("#payform").submit();

			},
			btn2:function(){
				window.location.reload();
			},
		});
	});
	
	$(".layui-cancel").click(function(){
		var trade_sn = $(this).data("order");
		$(".takdeter").data("order",trade_sn);
		$(".graybg").show();
		$(".takmains").show();
	});

	$(".takdeter").click(function(){
		var _url = "/index/account/cancel.html";
		var trade_sn = $(this).data("order");
		if(!trade_sn)
		{
			layer.msg("参数错误");
		}
		$.ajax({
			url: _url,
			type: 'post',
			data: {"trade_sn":trade_sn},
			success: function (info) {
				if (info.code === 1) {
					setTimeout(function () {
						location.href = info.url;
					}, 1000);
				}
				layer.msg(info.msg);
			}
		});
	});

	$(".takcancel").click(function(){
		$(".graybg").hide();
		$(".takmains").hide();
	});

	$(".layui-address").click(function(){
		var address_id = $(this).data('address');
		var _url = "/index/account/address.html";
		$.ajax({
			url: _url,
			type: 'post',
			data: {"address_id":address_id},
			success: function(info){
				if (info.code === 1) {
					var info = info.data;
					var html = "<div style='padding:20px;font-size:14px;line-height:28px;'>姓名 : "+info['realname']+" <br/> 电话 : "+info['phone']+" <br/> 地址 : "+info['address']+" <br/>备注 : "+info['note']+"</div>";
				}else
				{
					var html = "<div style='padding:20px;font-size:14px;line-height:28px;'>"+info.msg+"</div>";
				}

				layer.open({
					type: 1,
					shadeClose: true,
					title:'地址信息',
					area: ['420px', '240px'], //宽高
					content: html
				});
			}
		});
	});

	$(".layui-logistics").click(function(){
		var logistics = $(this).data('logistics');
		var html = "<div style='padding:20px;font-size:14px;line-height:28px;'>"+logistics+"</div>";
		layer.open({
			type: 1,
			shadeClose: true,
			title:'物流详情',
			area: ['300px', '180px'], //宽高
			content: html
		});
	});


});
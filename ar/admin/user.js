$(function(){
	$(".registerform").Validform({
		tiptype:4,
		ajaxPost:true,
		showAllError:true,
		callback:function(data){
			//返回数据data是json对象，{"info":"demo info","status":"y"}
			if(data.status == 'y')
			{
				layer.msg(data.info);
				window.location.reload();
			}
		}
	});

});

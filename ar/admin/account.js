$(function(){

	$(".addmoney p input").keyup(function(){
		var val = $(this).val()*1;
		$(".addmoney p a").find("span").html(val+"元");
		if(val>=20){
			$(".addmoney p a").find("em").html(val+"张+20张")
		}else if(val>=10){
			$(".addmoney p a").find("em").html(val+"张+10张")
		}else if(val>=5){
			$(".addmoney p a").find("em").html(val+"张+5张")
		}else{
			$(".addmoney p a").find("em").html(val+"张+0张")
		}
		var amount = $(this).data('amount');
		$("#amount").val(val);
	});
	var payment = $("#payment").val();
	if(payment == 1)
	{
		$(".addway p a:eq(0)").addClass("active").siblings().removeClass('active');
	}else if(payment == 2)
	{
		$(".addway p a:eq(1)").addClass("active").siblings().removeClass('active');
	}
	$(".addway p a").click(function(){
		var payment = $(this).data('payment');
		$("#payment").val(payment);
		$(this).addClass("active").siblings().removeClass('active');
	});
});
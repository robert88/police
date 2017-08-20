$(function(){
	$(".addmoney p a").click(function(){
		var amount = $(this).data('amount');
		$("#amount").val(amount);
		$(this).addClass("active").siblings().removeClass('active');
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
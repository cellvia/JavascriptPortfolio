var open = "no";


jQuery(function($) {

	function openparan(){
		if(open != "yes"){
			open = "yes";
			$(".paranblock").css("display", "block");
			$("#cursor").animate({opacity: 0}, 250);
			$("#page2").animate({opacity: 1}, 250)
				.unbind('tap longTap doubleTap touchablemove')
				.css("cursor", "auto");
			var email = $("#gatheremail").Touchable();
			email.bind('tap', function(){
				$(this).focus();
			});
			$("#leftparan").animate({left: 115}, 2500, "easeOutElastic").css("cursor", "default");
			$("#rightparan").animate({left: 710}, 2500, "easeOutElastic").css("cursor", "default");
			//$("#gatheremail").focus().css("cursor", "text");
			$("#gatheremail").css("cursor", "text");
		}
	}

	$(document).ready(function(){

        //setTimeout(openparan, 1500); 
        jQuery(window).load(function(){
            openparan();
        });
	
		jQuery("#page2").css("opacity", 0);
		jQuery("#cursor").css("opacity", 1);	
		jQuery("#leftparan").css("left", "285px");
		jQuery("#rightparan").css("left", "535px");
		jQuery("#leftparan, #rightparan, #gatheremail").css("cursor", "pointer");

		//preload images
		$("img").each(function(){
			$('<img/>')[0].src = $(this).attr("src");
		});
		$('<img/>')[0].src = $("#tooltip").css("backgroundImage").replace("url(", "").replace(")", "");
		$("form").submit(function(e){
			e.preventDefault();
		});
		var arrow = $("#arrow").Touchable();
		arrow.bind('click tap longTap doubleTap', function(e){
			e.preventDefault();
			if($.trim($("#gatheremail").val()) != "" && $.trim($("#gatheremail").val()).indexOf("@") != -1){
				var serializedform = $("form").serialize();
				$.ajax({
					url: "http://sexdiariesproject.com/php/subscribe.php",
					type: "POST",
					data: serializedform,
					success: function(){
						//alert("success");
						window.parent.location.href = window.parent.location.protocol + "//" + window.parent.location.host + "/about/";
					},
					error: function(){
						//alert("error");
						window.parent.location.href = window.parent.location.protocol + "//" + window.parent.location.host + "/about/";
					},
					}
				);
			}else{
				window.parent.location.href = window.parent.location.protocol + "//" + window.parent.location.host + "/about/";
			}
		});
		
/*		$(window).keypress(function(e){
			var event = $.Event("keypress");
			event.which = e.which;
			$("#gatheremail").trigger(event);
			openparan();
		});
		var parantheses = $("#page2").Touchable();
		parantheses.bind('tap longTap doubleTap touchablemove', function(){
			openparan();
		});
*/		
		  var hoverme = $('#qmark').Hoverable();
		  hoverme.newHover(function(e, touch){ //hoverIN
			if($(this).hasClass("off")){
				$("#tooltip").show();
			}
		  }, function(e, touch){//hoverOut
			if($(this).hasClass("off")){
				$("#tooltip").hide();
			}
		  });
		  hoverme.bind('tap longTap doubleTap', function(){
		  	var thisel = $(this);
			if(thisel.hasClass("off")){
				thisel.removeClass("off");
			}else{
				$("#tooltip").hide();
				thisel.addClass("off");
			}
		  });
	});
	
	
	$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur();
	
});
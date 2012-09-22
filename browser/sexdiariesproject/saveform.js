	var typingTimeout;
	var sessionTimeout;


jQuery(function($) {
//	$("textarea#entry").focus();
	function updateclocktime(){			
		$.get("./ajax/currenttime.php?timezone="+$("#timezone").val(),
			function(data){
				$(".entry-time").val(data);					
			}
		);
	}
	
	function updateentrytotal(dataday){
		var current = parseInt($.trim($("#total_entries_count"+dataday).text()));
		var newone = current+1;
		if(newone < 10){
			newone = " "+String(newone);
		}
		$("#total_entries_count"+dataday).text(newone);
	}
	
	function updateanswertotal(dataday){
		var current = parseFloat($("#answer_count"+dataday).text());
		$("#answer_count"+dataday).text( (current+1) );
	}
	
	function resetTypingTimer(){
		clearTimeout(sessionTimeout);
		sessionTimeout = setTimeout( sessiontimedout, parseFloat( $("#sessiontimeout").val() )*60000 );

		clearTimeout(typingTimeout);
		typingTimeout = setTimeout( refreshsession, 10000 );
	}

	function sessiontimedout(){
		$(".entry-form, .answer-form").each(function(){
			var thisform = $(this);
			var entryfield = thisform.find("textarea");
			var entryval = entryfield.val();
			if(entryval != "" && typeof(entryval) != "undefined"){
				entryfield.val(entryval + " [SESSION TIMED OUT]");
				thisform.trigger("submit");
			}
		});
	}

	function refreshsession(){
		$.get("./ajax/sessionrefresh.php");
	}
	
$(document).ready(function(){

	$('html').bind("keypress click", function(){
		resetTypingTimer();
	});
	

	$('.entry[data-current*="y"], .top[data-current*="y"], .notes[data-current*="y"]').show();
	$('.currenttab').attr('src', $('.currenttab').attr('data-mouseover'));

	$(".tabimg").hover(function(){
		var thisel = $(this);
		//thisparent 
		if(!thisel.hasClass("currenttab")){
			thisel.attr('src', thisel.attr('data-mouseover'));
		}
	}, function(){
		var thisel = $(this);
		if(!thisel.hasClass("currenttab")){
			thisel.attr('src', thisel.attr('data-mouseout'));
		}
	});
	
	$(".daylink").click(function(e){
		e.preventDefault();
		var thisel = $(this);
		var data_day = thisel.attr("data-day");
		$(".entry, .top, .notes").hide();
		$("#entry"+data_day+", #top"+data_day+", #notes"+data_day).show();

		var thisel = $(this).find("img");
		if(!thisel.hasClass("currenttab")){
			var current = $('.currenttab');
			current.attr('src', current.attr('data-mouseout'));
			current.removeClass('currenttab');
			thisel.addClass('currenttab');
			thisel.attr('src', thisel.attr('data-mouseover'));
		}
		var list = $(".list-entries");
		list.each(function(){
			$(this).attr({ scrollTop: $(this).attr("scrollHeight") });
		});
	});
	$(".welcome-page-link").click(function(e){
		e.preventDefault();
		$(".entry, .top, .notes").hide();
		$("#welcome-page, #top_welcome, #notes_welcome").show();		
		var thisel = $(".welcome-page-link").find("img");
		if(!thisel.hasClass("currenttab")){
			var current = $('.currenttab');
			current.attr('src', current.attr('data-mouseout'));
			current.removeClass('currenttab');
			thisel.addClass('currenttab');
			thisel.attr('src', thisel.attr('data-mouseover'));
		}
	});
	$(".settings-page-link").click(function(e){
		e.preventDefault();
		$(".entry, .top, .notes").hide();
		$("#settings-page, #top_settings, #notes_settings").show();		
		var current = $('.currenttab');
		current.attr('src', current.attr('data-mouseout'));
		current.removeClass('currenttab');
	});
	
	$(".sample1-page-link").click(function(e){
		e.preventDefault();
		$(".entry, .top, .notes").hide();
		$("#sample1-page, #top_sample1, #notes_sample1").show();		
		var thisel = $(".sample1-page-link").find("img");
		if(!thisel.hasClass("currenttab")){
			var current = $('.currenttab');
			current.attr('src', current.attr('data-mouseout'));
			current.removeClass('currenttab');
			thisel.addClass('currenttab');
			thisel.attr('src', thisel.attr('data-mouseover'));
		}	
	});
		
	$(".sample2-page-link").click(function(e){
		e.preventDefault();
		$(".entry, .top, .notes").hide();
		$("#sample2-page, #top_sample2, #notes_sample2").show();		
		var thisel = $(".sample2-page-link").find("img");
		if(!thisel.hasClass("currenttab")){
			var current = $('.currenttab');
			current.attr('src', current.attr('data-mouseout'));
			current.removeClass('currenttab');
			thisel.addClass('currenttab');
			thisel.attr('src', thisel.attr('data-mouseover'));
		}
	});	

	$(".faq-page-link").click(function(e){
		e.preventDefault();
		$(".entry, .top, .notes").hide();
		$("#faq-page, #top_faq, #notes_faq").show();		
		var thisel = $(".faq-page-link").find("img");
		if(!thisel.hasClass("currenttab")){
			var current = $('.currenttab');
			current.attr('src', current.attr('data-mouseout'));
			current.removeClass('currenttab');
			thisel.addClass('currenttab');
			thisel.attr('src', thisel.attr('data-mouseover'));
		}
	});	
		
	$("#submit-diary .submit-button").click(function (e) {
		e.preventDefault();
		var submitbutton = $(this);
		if(	submitbutton.attr("disabled") != "true" ){
			var thisform = submitbutton.parent().parent();
			var ajaxtarget = "./ajax/"+thisform.attr('action');
			var serializedform = thisform.serialize();
			submitbutton.attr("disabled", "true");			
			$.post(ajaxtarget,
				serializedform,
				function(data){
					$("form, .entry-area").not("#feedback-form, #subscribe-form, #refer-form").remove();
					$(".entry, .top, .notes").hide();
					$("#thankyou-page, #top_thankyou, #notes_thankyou").show();		
					var current = $('.currenttab');
					current.attr('src', current.attr('data-mouseout'));
					current.removeClass('currenttab');
			});
		}
	});
	
	$(".entry-form").submit(function(e) {
		e.preventDefault();
		var thisform = $(this);
		var entryfield = thisform.find("textarea");
		if(entryfield.val() != "" && typeof(entryfield.val()) != "undefined"){
			var ajaxtarget = "./ajax/" + thisform.attr('action');
			var serializedform = thisform.serialize();
			var listentries = thisform.parent().prev();
			var submitbutton = $(".submit-button", thisform);
			submitbutton.attr("disabled", "true");						
			var dataday = $(".data_day", thisform).val();
			$.post(ajaxtarget,
				serializedform,
				function(data){
					if(typeof(data) != "undefined"){
						//success
						listentries.append(data);
						entryfield.val("");
						listentries.attr({ scrollTop: listentries.attr("scrollHeight") });
						submitbutton.removeAttr("disabled");	
						entryfield.focus();
						updateentrytotal(dataday);
						updateclocktime();
					}
			});				
			
		}		
	});

	$(".answer-form").submit(function (e) {
		e.preventDefault();
		var thisform = $(this);
		var entryfield = thisform.find("textarea");
		if(entryfield.val() != "" && typeof(entryfield.val()) != "undefined"){
			var ajaxtarget = "./ajax/" + thisform.attr('action');
			var serializedform = thisform.serialize();
			var dataday = $(".data_day", thisform).val();
			$.post(ajaxtarget,
				serializedform,
				function(data){
					if(typeof(data) != "undefined"){
						//success
						thisform.parent().append(data);
						thisform.remove();
						updateanswertotal(dataday);
						updateclocktime();
					}
			});
		}				
	});

	$(".settings .submit-button").click(function (e) {
		e.preventDefault();
			var submitbutton = $(this);
			var thisform = submitbutton.parent().parent();
			var url = thisform.attr('action');
			var ajaxtarget = (url.indexOf("madmimi") == -1) ? "./ajax/" + url : url;
			var serializedform = thisform.serialize();
			submitbutton.attr("disabled", "true");			

			$.post(ajaxtarget,
				serializedform,
				function(data){
					if(typeof(data) != "undefined" && data != "feedback" && data != "subscribe" && data != "refer"){
						//success
						submitbutton.removeAttr("disabled");	
						updateclocktime();
					}
					if(typeof(data) != "undefined" && data == "refer"){
						jQuery("#refer-form").html("Thank you!");
					}
			});
	});

	var list = $(".list-entries");
	list.each(function(){
		$(this).attr({ scrollTop: $(this).attr("scrollHeight") });
	});

	
});
});
function delayed(){

	//move widget up
//	var moveme = jQuery("#nobanner-widgets > ul > li:eq(0)");
//	jQuery("#nobanner-widgets > ul > li:eq(1)").after(moveme);

	// clean up pagination
//	jQuery('.wp-pagenavi a.page').addClass('sep');
//	jQuery('.wp-pagenavi span.current').addClass('sep');
	jQuery('.wp-paginate .sep:first').remove();
//	jQuery('.wp-paginate .sep:last').remove();
	jQuery('.gap.left').parent('li').next('.sep').remove();
	jQuery('.gap.right').parent('li').next('.sep').remove();


	//gallery pagination
//	jQuery('.ngg-navigation').wrapInner('<ul class="wp-paginate" />').children();
//	jQuery('.ngg-navigation .wp-paginate').children().wrap('<li />');
//	jQuery('.ngg-navigation .wp-paginate li').addClass('pagenum');
//	jQuery('<li class="sep"></li>').insertBefore('.ngg-navigation li.pagenum');

	//center pagination
	// jQuery(".wp-pagenavi").css( "margin-left", ((jQuery("#maincontent").width() - jQuery(".wp-pagenavi").width()) / 2 ) );
	
	//fix image tags in gallery to have commas
	if(jQuery(".ngg-tagcloud").length){
		jQuery(".ngg-tagcloud").each(function(){
			var xreplace = jQuery(this).html();
			var yreplace = xreplace.replace(/<\/a>/g, "</a>, ");
			var zreplace = yreplace.replace(/<\/a>, $/, "</a>");
			jQuery(this).html(zreplace);
		});
	}


// Setting for slideshow in sidebar
//	var bilbo = jQuery("a:contains('')")
	
	jQuery('.slideshow').cycle({ 
		fx:     'scrollHorz',
		timeout: 5000, 
		pager:  '#nav', 
		next:   '#next2',
		prev:   '#prev2'
	});	

	jQuery('#pauseButton').toggle(function(){	
		jQuery('.slideshow').cycle('pause'); 
		jQuery(this).html("RESUME");
	}, function(){
		jQuery('.slideshow').cycle('resume'); 	
		jQuery(this).html(" PAUSE ");
	});	

	//style the comments to have those dynamic bracket shapes
	jQuery("#comments > ol > li").each(function(index){
		var theheight = (jQuery(this).height()/2)-12;
		var bill = jQuery('<span class="commentnumber">'+(index+1)+'</span>').height(theheight).css("margin-top", (theheight) );
		jQuery("div:first", this).addClass("ui-corner-left").parent("li").prepend(bill);
		
	});
	
	//force nextgen thumbnails to be 130 px
	//jQuery(".ngg-thumbnail-list img").each(function(){
	//	jQuery(this).width(130).height(130);
	//});

	//various nextgen styling
	jQuery(".ngg-gallery-list li a, .ngg-gallery-list li.selected a").css("background", "none").css("border", 0);
	jQuery(".ngg-gallery-list li").css("margin", 0);
	
	//delete search text when clicked if its SEARCH
	jQuery("#s")
		.val("SEARCH")
		.click(function(){
			var bilbo = jQuery(this);
			if(bilbo.val() == "SEARCH"){
				bilbo.val("");
			}
		})
		.blur(function(){
			var bilbo = jQuery(this);
			if(bilbo.val() == ""){
				bilbo.val("SEARCH");
			}
		});

	//fix advanced-random-posts
	if(jQuery(".advanced-random-posts").length){
		jQuery(".advanced-random-posts > li").each(function(index){
			if(index > 2){
				jQuery(this).remove();
			}
		});
	}

	
	if(jQuery("#comments").length){
	//fix comments styling
		jQuery("#bottomleft-border").css("background-color", "#F2F2F2");
		//validate commenting
		jQuery("#submitcomment").click(function(e){
			e.preventDefault();
			if(jQuery("#author").length){
				if(jQuery("#comment").val() && jQuery("#author").val() && jQuery("#email").val()){
					jQuery(this).parents("form:eq(0)").submit();
				}else{
					alert("Please ensure you have filled in all required fields.");
				}
			}else{
				if(jQuery("#comment").val()){
					jQuery(this).parents("form:eq(0)").submit();
				}else{
					alert("Please ensure you have filled in all required fields.");
				}			
			}
		});
	}

	/* set dropdown styles for: by style, by color, by season */
	jQuery(".tax-navlist").each(function(){
		var bytax = jQuery(this);
		var role = jQuery("#"+bytax.attr("role"));
		var newwidth = role.width();
		jQuery(this).width(newwidth);
	});	
	
	// fixes z index styling for: by style, color season
	jQuery(".tax-navlist-border").each(function(){
		var duplicate = jQuery(this).clone().css("z-index", 99999).css("background-color", "transparent");
		jQuery(this).parent().append(duplicate);
		duplicate.children("ul").css("background-color", "transparent");
	});

	//delete unnecessary menu wrapper in topmost navbar
	jQuery("#topmost_remove li:first-child").unwrap();
	jQuery("#access-0 .menu-item, #container, #access-2,#access-3, #access-1b").css('opacity', 1).css('filter', 'Alpha(opacity=100)');

if (jQuery.browser.msie) {	
	jQuery("#archives-dropdown-scroller, #archives .jScrollPaneContainer").hide();
	jQuery("#searchmod-dropdown-scroller, #searchmod .jScrollPaneContainer").hide();
}
	
	//easy debugging setup
	if(jQuery(".cfct_banner").length){
		thecounter = 0;
		lasttop = -1;
		lefff="off";
		addd=0;
		jQuery(".cfct_banner").each(function(index){
			jQuery(this).show();
			var theleft = jQuery(this).offset().left;
			var thetop = jQuery(this).offset().top;
			var theheight = jQuery(this).height();
			var thistop = thetop;
			if(lasttop>=(thistop-30)){theleft += 50;addd+=20;}else{addd=0;}
			var newb = jQuery(this).css("position", "absolute").css("left", theleft).css("top", thistop+addd).height("auto").width(400);
			lasttop = thistop;
			jQuery("body").append(newb);
			jQuery(newb).hover(function(){
				jQuery(newb).addClass("indexup");
			}, function(){
				jQuery(newb).removeClass("indexup");			
			})
			.hide()
			;
			var text = jQuery(newb).text();
			var splits = text.split('\\');
			var newtext = text.replace(splits[splits.length-2]+"\\"+splits[splits.length-1], "<span class='dirhilite'>"+splits[splits.length-2]+"\\"+splits[splits.length-1]+"</span>");
			jQuery(newb).html("<span class='topright'>" + thecounter + "</span>" + newtext);
			thecounter+=1;
		});
		bilbo = jQuery('<div class="debug">DEBUG</div>').click(function(){
			jQuery(".cfct_banner").toggle();
		}).hover(function(){
			jQuery(this).addClass("debughover");
		}, function(){
			jQuery(this).removeClass("debughover");	
		});
		jQuery("#container").append(bilbo);
	}

// remove styles from gallery
jQuery('.ngg-thumbnail-list > a > img').addClass('gallery_thumb').removeAttr('style').removeAttr('height').removeAttr('width');
jQuery('li.ngg-thumbnail-list').removeAttr('style');
	

};

delayed();


//stuff that needs to wait til all images load
jQuery(window).load(
    function() {
		//for image gallery make arrows in the middle of the image
		jQuery(".ngg-arrow").css( "margin-top", (jQuery(".pic img").height() / 2 ));

		//update sidebar height
		var contentheight = jQuery("#content").height();
		var sidebartest = jQuery("#sidebar").height();
		if (sidebartest <= contentheight){
			jQuery("#sidebar").height( contentheight );		
		}else{
			var contentheight2 = sidebartest - 31;
			jQuery("#maincontent").height( contentheight2 );
			if(jQuery("#comments").length){
				var contentheight = (sidebartest - contentheight) + jQuery("#comments").height();
				jQuery("#comments").height( contentheight );	
			}
		}

		//add flowers to the right IF height is beyond 1600 px
		if(contentheight > 1600){
			var imgsrc = jQuery("#topleftflower").attr("src");
			var replaced = imgsrc.replace(/topleftflower_423x435/, 'midrightflowers_167x609');
			jQuery("#access-0").append('<img id="midrightflowers" src="'+replaced+'">');
		}		
		
	jQuery("#archives-dropdown-scroller, #archives .jScrollPaneContainer").hide();
	jQuery("#searchmod-dropdown-scroller, #searchmod .jScrollPaneContainer").hide();

    }
);


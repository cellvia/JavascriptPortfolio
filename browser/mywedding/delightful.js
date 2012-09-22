jQuery.noConflict();

jQuery(document).ready(function(){
	
	jQuery(".button").button();
	
	//create hovers for by color etc styles
	jQuery("#by-color_holder")
		.hover( function(){
			jQuery("#by-color").addClass("by-color-hover");
			jQuery(".tax-navlist, .tax-navlist-border", this).show();
		}, function(){
			jQuery("#by-color").removeClass("by-color-hover");		
			jQuery(".tax-navlist, .tax-navlist-border", this).hide();
		});

	jQuery("#by-style_holder")
		.hover( function(){
			jQuery("#by-style").addClass("by-style-hover");
			jQuery(".tax-navlist, .tax-navlist-border", this).show();
		}, function(){
			jQuery("#by-style").removeClass("by-style-hover");		
			jQuery(".tax-navlist, .tax-navlist-border", this).hide();
		});

	jQuery("#by-season_holder")
		.hover( function(){
			jQuery("#by-season").addClass("by-season-hover");
			jQuery(".tax-navlist, .tax-navlist-border", this).show();
		}, function(){
			jQuery("#by-season").removeClass("by-season-hover");		
			jQuery(".tax-navlist, .tax-navlist-border", this).hide();
		});


	//archives archives dropdown
	jQuery("#archives-menu").jScrollPane({showArrows:true,arrowSize:1,scrollbarWidth:18});
	jQuery("#archives .jScrollPaneTrack").height(jQuery("#archives-menu").height());
	jQuery("#archives-menu").css("padding-right", 0);
if (!jQuery.browser.msie) {	
	jQuery("#archives-dropdown .jScrollArrowDown, #archives-dropdown .jScrollArrowUp").hide();	
}else{
	jQuery("#archives-menu").width(jQuery("#archives-menu").width() + 5);

}
	jQuery("#archives-dropdown").append(jQuery("#archives .jScrollArrowDown").clone(true).attr('id','archives-dropdown-scroller').width(150));
	jQuery("#archives .jScrollPaneDrag").height(12);
	
if (!jQuery.browser.msie) {	
	jQuery("#archives .jScrollPaneContainer").hide();
	jQuery("#archives .jScrollPaneContainer").css("opacity", 1);
	jQuery("#archives-dropdown").css("opacity", 1);
}
	jQuery('body').click(function(event){
		if(!jQuery(event.target).is('#archives-dropdown, #archives-dropdown *, #archives .jScrollPaneContainer, #archives .jScrollPaneContainer *'))
			{
				jQuery("#archives-dropdown-scroller, #archives .jScrollPaneContainer").hide();
			}
	});

	jQuery('#archives-dropdown-title').mouseenter(function(){
		if(jQuery("#archives-dropdown-scroller").is(":hidden")){
			jQuery("#archives-dropdown-scroller, #archives .jScrollPaneContainer").show();
			jQuery('#archives-dropdown-title').addClass('topmost-hover');
		}
	});

if (!jQuery.browser.msie) {		
	jQuery('#archives').mouseleave(function(event){
		jQuery("#archives-dropdown-scroller, #archives .jScrollPaneContainer").hide();
		jQuery('#archives-dropdown-title').removeClass('topmost-hover');
	});
}
	
	jQuery('#archives-dropdown-title, #archives .jScrollPaneContainer li').click(function(event){
		if(jQuery("#archives-dropdown-scroller").is(":visible")){
			jQuery("#archives-dropdown-scroller, #archives .jScrollPaneContainer").hide();
			jQuery('#archives-dropdown-title').removeClass('topmost-hover');
		}
	});
	
	jQuery("#archives-menu li").hover( function(){
		jQuery(this).css("background", "#FFF");
	}, function(){
		jQuery(this).css("background", "#F9F9F9");	
	});
	
		
		

	//searchmod dropdown
	jQuery("#searchmod-menu").jScrollPane({showArrows:true,arrowSize:1,scrollbarWidth:18});
	jQuery("#searchmod .jScrollPaneTrack").height(jQuery("#searchmod-menu").height());
	jQuery("#searchmod-menu").css("padding-right", 0);
	jQuery("#searchmod-menu").width(jQuery("#searchmod-menu").width() + 5);
if (!jQuery.browser.msie) {	
	jQuery("#searchmod-dropdown .jScrollArrowDown, #searchmod-dropdown .jScrollArrowUp").hide();	
}
	jQuery("#searchmod-dropdown").append(jQuery("#searchmod .jScrollArrowDown").clone(true).attr('id','searchmod-dropdown-scroller').width(150));
	jQuery("#searchmod .jScrollPaneDrag").height(12);

if (!jQuery.browser.msie) {	
	jQuery("#searchmod .jScrollPaneContainer").hide();
	jQuery("#searchmod .jScrollPaneContainer").css("opacity", 1);
	jQuery("#searchmod-dropdown").css("opacity", 1);
}
	jQuery('body').click(function(event){
		if(!jQuery(event.target).is('#searchmod-dropdown, #searchmod-dropdown *, #searchmod .jScrollPaneContainer, #searchmod .jScrollPaneContainer *'))
			{
				jQuery("#searchmod-dropdown-scroller, #searchmod .jScrollPaneContainer").hide();
			}
	});

	jQuery('#searchform').append('<input id="searchmod-hidden" value="" name="cat" type="hidden">');
	

if (jQuery.browser.msie) {		
	jQuery('#searchmod-dropdown-text').click(function(event){
		jQuery("#searchmod-dropdown-scroller, #searchmod .jScrollPaneContainer").toggle();
	});
	jQuery('#searchmod .jScrollPaneContainer select').change(function(event){
		jQuery('#searchmod-menu-actual').text(jQuery("option:selected", this).text());
		jQuery('#searchmod-hidden').val(jQuery(this).val());
		jQuery("#searchmod-dropdown-scroller, #searchmod .jScrollPaneContainer").toggle();
	});
}else{
	jQuery('#searchmod-dropdown-text, #searchmod .jScrollPaneContainer option').click(function(event){
		if(jQuery(this).val()){
			jQuery('#searchmod-menu-actual').html(jQuery(this).html());
			jQuery('#searchmod-hidden').val(jQuery(this).val());
		}
		jQuery("#searchmod-dropdown-scroller, #searchmod .jScrollPaneContainer").toggle();
	});
}
	
	
	jQuery('#searchmod-dropdown-text, #searchmod .jScrollPaneContainer option').select(function(event){
		if(jQuery(this).val()){
			jQuery('#searchmod-menu-actual').html(jQuery(this).html());
			jQuery('#searchmod-hidden').val(jQuery(this).val());
		}
		jQuery("#searchmod-dropdown-scroller, #searchmod .jScrollPaneContainer").toggle();
	});
	
	jQuery("#searchmod-menu option").hover( function(){
		jQuery(this).css("background", "#FFF");
	}, function(){
		jQuery(this).css("background", "#F9F9F9");	
	});
	
	jQuery("#searchmod-menu,#searchmod .jScrollPaneContainer").width(150);
	

	
	
	//uses the crumbs to cross check cats to make sure that not more than one category is highlighted in the menu
	if(jQuery('#access-1b').length && jQuery('#trailingcrumbs a, .crumbcurrent').length){
		thecrumbs = [];
		jQuery('#trailingcrumbs a, .crumbcurrent').each(function(index){
			if(index != 0){
				thecrumbs.push(jQuery(this).html());
			}
		});

		jQuery(".current-menu-item, .current-menu-ancestor, .current-page-ancestor, .current-post-ancestor, .current-category-ancestor").each(function(){
				var test = jQuery('a', this).html();
				var checkifincrumbs = jQuery.inArray(test, thecrumbs);
			if(checkifincrumbs == -1){
				jQuery(this).removeClass('current-menu-item current-menu-ancestor current-page-ancestor current-post-ancestor current-category-ancestor');
			}
		});	
	}
	
	
	//only display appropriate secondary menu items
	colorcounter=-1;	
	jQuery("#access-1b #secondary_nav > li").each(function(){
		colorcounter++;
		if(colorcounter==3){colorcounter = 0}
		if(colorcounter==0){var color = "blue"}
		if(colorcounter==1){var color = "red"}
		if(colorcounter==2){var color = "green"}
		
//		jQuery("#access-1 > ul > li > a:contains('Photo Galleries')").parent().hasClass(".current-menu-item, .current-menu-ancestor, .current-page-ancestor, .current-post-ancestor, .current-category-ancestor");
				
		if(jQuery(this).is(".current-menu-item, .current-menu-ancestor, .current-page-ancestor, .current-post-ancestor, .current-category-ancestor")
		&& !jQuery("#access-1 > ul > li > a:contains('Photo Galleries')").parent().is(".current-menu-item, .current-menu-ancestor, .current-page-ancestor, .current-post-ancestor, .current-category-ancestor")
		){
			var cloned = jQuery(this).children("ul").clone(true).removeClass("sub-menu").addClass("menu").attr("id", "secondary_nav");
			var cloneto = jQuery(this).parent().parent();
			jQuery(this).parent().remove();
			jQuery(cloneto).append(cloned);
			jQuery("li", cloned).show().children("a:not(.sub-menu a)").hover(function(){
				jQuery(this).addClass("hover_" + color);
			}, function(){
				jQuery(this).removeClass("hover_" + color);
			});
			jQuery(cloned).addClass("navbarbg_" + color);
			jQuery(cloned).children("li").each(function(){
				if(jQuery(this).is(".current-menu-ancestor, .current-page-ancestor, .current-post-ancestor, .current-category-ancestor")){
					jQuery("a:not(.sub-menu a)", this).addClass("permhover_" + color);
				}
			});
		}
	});
	
	colorcounter=-1;	
	jQuery("#access-1 > ul > li").each(function(){
		colorcounter++;
		if(colorcounter==3){colorcounter = 0}
		if(colorcounter==0){var color = "blue"}
		if(colorcounter==1){var color = "red"}
		if(colorcounter==2){var color = "green"}
		if(jQuery("a:contains('Photo Galleries')", this).length){
			thecolor = color;
		}
	});
	
	if(jQuery(".ngg-galleryoverview").length || jQuery(".ngg-albumoverview").length || jQuery(".entry-title a:contains('Photo Galleries')").length){
		jQuery("#access-1 > ul > li > a:contains('Photo Galleries')").parent().addClass("current-category-ancestor");		
		jQuery("#access-1b #secondary_nav > li").each(function(){
			var doit = jQuery(this).parent();
			jQuery("li", doit).show().children("a:not(.sub-menu a)").hover(function(){
				jQuery(this).addClass("hover_" + thecolor);
			}, function(){
				jQuery(this).removeClass("hover_" + thecolor);
			});
			doit.addClass("navbarbg_" + thecolor);
			doit.children("li").each(function(){
				if(jQuery(this).is(".current-menu-item") 
//					|| jQuery("a", this).attr("href").indexOf("album-"+jQuery("#album").attr("role"))
//					|| jQuery("a", this).attr("href").indexOf("album="+jQuery("#album").attr("role"))
				){
					jQuery("a:not(.sub-menu a)", this).addClass("permhover_" + thecolor).addClass("hover_" + thecolor);
				}
			});
		});
	};

	
	
	//deletes submenus of currently selected category, since its selected the sub-cats show up in access-1b
	jQuery("#access-1 #main_nav > li").each(function(){
		if(jQuery(this).is(".current-menu-item, .current-menu-ancestor, .current-page-ancestor, .current-post-ancestor, .current-category-ancestor")){
			jQuery(this).children().not(':eq(0)').remove();
		}else{
			jQuery(this).hover( function(){
				jQuery("a", this).addClass("primarylinkhover");
			}, function(){
				jQuery("a", this).removeClass("primarylinkhover");
			});
		}
	});


//			var thecrumb = jQuery(this);
//				if( == thecrumb.text){
//				}

/* add width to main navigation li */
	//stabilize the div widths so that when the hover expands it by bolding it, nothing shifts around
//	jQuery("#access-1 .menu > li, #access-1b .menu > li").each(function(){
//		jQuery(this).width(jQuery(this).width()+(jQuery(this).width()*.1));
//	});
	
	jQuery("#menu-footer-menu .sub-menu").removeClass("sub-menu");
	
	//add bottom corners to dropdown menus
	jQuery('.sub-menu').addClass("corner-12px-bottom");

});
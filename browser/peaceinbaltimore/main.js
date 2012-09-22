

function ajaxloop(hash_str){
  if ( newcontent != "none" ) {
	clearInterval ( IntervalLoad );
	clearInterval ( IntervalId );
	maincontent.stop().animate({opacity: 0}, 500, function(){
		parsepage(hash_str);
	});	
  }
} 

function parsepage(hash_str){

	if(!contentcache [ hash_str ] ){
		newcontent = calendarprep(newcontent);
	}
		
	maincontent.html(newcontent);

	
	setcontentheight();

	maincontent.animate({opacity: 1},1000, function(){
		resetmenu();
		jQuery("a").removeClass("disabled");
	});

	if(imagecache[hash_str]){
		refreshimage(hash_str, "y");					
	}else{
		refreshimage(hash_str);
	}							

	formscript();
	jQuery('.wpcf7-captcha-captcha-163').show();

	if(!contentcache [ hash_str ] )
		updatecontentcache(hash_str);

	soundclip();		
		
}


function loading(){
  if ( newcontent == "none" ) {
		if(!maincontent.html().split(".").length){
			maincontent.append(" .");
		}else if((maincontent.html().split(".").length-1) == 10){
			maincontent.html("Time to Meditate");
		}else{
			maincontent.append(" .");
		}
	}
}

function startload(){
  if ( newcontent == "none" ) {
		maincontent.html("Time to Meditate").animate({opacity: 1}, 3000);
		IntervalLoad = setInterval ( "loading()", 500 );
	}
}	

function resetmenu(){
	var pagecheck3 = jQuery('#pagecheck3').val();
	var alink = jQuery('a[href$="/'+pagecheck3+'/"]', "#primary, #branding");


	if(alink.parents("#primary").length)
		alink.parent().parent().prev().trigger('mouseenter');







	alink.trigger('mouseenter').trigger('click');	







}


function slug (url){
	var split = url.split('/');
	if (split.length > 2) {
		split.pop();
		split[split.length - 2] += "/#" + split.pop();
	}
	str = split.join("/");

	var slug = jQuery.param.fragment(str);
	return slug;
}


jQuery.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len   = elems.length;
      
  elems.bind('load',function(){
      if (--len <= 0){ callback.call(elems,this); }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        this.src = src;
     }  
  }); 

  return this;
};

function refreshimage(hash_str, cached){

	if(typeof(cached) == "undefined"){
	
		var maincontent = jQuery(".hentry");
		//if no cached is passed to function
		var images = jQuery("img:not(.wpcf7-captcha-captcha-163)", maincontent);
		if(images.length){
			var firstimgsrcreal = jQuery(images).first().attr('src');
			var firstimgsrc = jQuery(images).last().attr('src');
			var headerimage = jQuery("#headerimage-tr");
			var showholder = jQuery(".showholder", headerimage);
//			var check = jQuery("img", showholder).last().attr('src');
//			if(typeof(check) == "undefined"){var check = "none";}
//			if(check != "none" && firstimgsrc != check){
				showholder.css("z-index",2).addClass("old");
				images.removeAttr('height').removeAttr('width').removeAttr('title').wrap('<div class="imgholder" />');
				jQuery(".imgholder", maincontent).wrapAll('<div class="showholder" />');
				var show = jQuery(".showholder", maincontent);
				jQuery("<img />").attr('src', firstimgsrcreal).imagesLoaded(function(){
					if(images.length > 1){show.cycle();}
					headerimage.append(show.css("z-index",1));
					jQuery(".old").animate({opacity: 0}, 1500, function(){
						jQuery(this).remove();
						updateimagecache(hash_str);
					});			
				});
//			}else{
//				updateimagecache(hash_str);
//			}
		}			
	}else{		
	
		var headerimage = jQuery("#headerimage-tr");
		var showholder = jQuery(".showholder", headerimage);
		var currentimgsrc = jQuery("img", showholder).last().attr('src');
		
		showholder.css("z-index",2).addClass("old");
		var wrapme = jQuery(imagecache [ hash_str ]).wrap('<div class="showholder" />');
		var show = wrapme.parent();
		
		if(jQuery("img", show).last().attr('src') != currentimgsrc){
			jQuery("<img />").attr('src', jQuery("img", show).first().attr('src')).load(function(){
				if(show.children(".imgholder").length > 1)
					show.cycle();
				headerimage.append(show.css("z-index",1));
				jQuery(".old").animate({opacity: 0}, 1500, function(){
					jQuery(this).remove();
				});	
			});
		}
	}	
}

function updateimagecache(hash_str){
	imagecache [ hash_str ] = jQuery('.showholder').html();
}

function updatecontentcache(hash_str){
	if(hash_str != "contact-us")
		contentcache [ hash_str ] = maincontent.html();
}

function setcontentheight(){
	var newheight = maincontent.height()+40;
	if (newheight < 555) newheight = 555;
	jQuery("#content").stop().animate({height: newheight}, 1500);
}
function initpage( url, thissp ){
	jQuery("a").addClass("disabled");
	jQuery(".selected").removeClass("selected");
	if(typeof(url) != "undefined" && url != "none"){
//		var theslug = slug(url);
//		jQuery("#pagecheck").val(theslug);
		window.location.hash = slug(url);
	}
	
	if(typeof(thissp) != "undefined")
		fadeexcept( thissp );
	else
		fadeexcept();					
}

function fadeexcept( x ) {
	if(typeof(x) != "undefined" && typeof(x) == "object"){
		var theul = jQuery("#primary ul.sub-menu").not(x);
		theul.stop().animate({opacity: 0}, 500, function(){jQuery(this).css("display", "none")});
		jQuery("#primary .menu > li > a").not(x).stop().animate({backgroundColor: '#2c273f', color: '#828282'}, 500);
		x.addClass("selected");
	//}else if(typeof(x) == "string"){
		
	}else{
		var theul = jQuery("#primary ul.sub-menu");
		theul.stop().animate({opacity: 0}, 500, function(){jQuery(this).css("display", "none")});
		jQuery("#primary .menu > li > a").stop().animate({backgroundColor: '#2c273f', color: '#828282'}, 500);
	}
}	

function calendarprep(page) {
	var thispage = jQuery(page);
	jQuery(".gce-list > li", thispage).each(function(){
		var link = jQuery(".gce-list-desc > a", this);
		if(link.length){
			link.html(jQuery(".gce-list-event", this).html());
			jQuery(".gce-list-event", this).html("").append(link);
		}
		var start = jQuery(".gce-list-start", this).add(jQuery(".gce-list-end", this));
		start.wrapAll("<span class='gce-list-duration' />");
		var loc = jQuery(".gce-list-loc", this);
		jQuery("span", loc).remove();
		var locurl = loc.html().trim();
		//loc.html('<a href="http://peaceinbaltimore.com/'+locurl+'">Directions</a>');
		loc.html('<a href="'+locurl+'">Directions</a>');

	});
	jQuery(".gce-list-desc", thispage).remove();
	return thispage;
}

function calendarpage(){
	//if page contains calendar
		//clone main window, put seminars in it
	//else
		//delete secondary window
}

function soundclip(){
//	if(!audioclip[ theslug ]){
		jQuery('a[href$=".mp3"]').each(function(index){
			index = index+1;
			var thiss = jQuery(this);
			var clipname = thiss.html();
			var filename = thiss.attr("href");
			var template = "<div id=\"jquery_jplayer_"+index+"\" class=\"jp-jplayer\"></div>";
			template += "		<div class=\"jp-audio\">";
			template += "			<div class=\"jp-type-single\">";
			template += "				<div id=\"jp_interface_"+index+"\" class=\"jp-interface\">";
			template += "					<ul class=\"jp-controls\">";
			template += "						<li><a href=\"#\" class=\"jp-play\" tabindex=\"1\">play</a></li>";
			template += "						<li><a href=\"#\" class=\"jp-pause\" tabindex=\"1\">pause</a></li>";
			template += "						<li><a href=\"#\" class=\"jp-stop\" tabindex=\"1\">stop</a></li>";
			template += "						<li><a href=\"#\" class=\"jp-mute\" tabindex=\"1\">min volume</a></li>";
			template += "						<li><a href=\"#\" class=\"jp-unmute\" tabindex=\"1\">max volume</a></li>";
			template += "					</ul>";
			template += "					<div class=\"jp-progress\">";
			template += "						<div class=\"jp-seek-bar\">";
			template += "							<div class=\"jp-play-bar\"></div>";
			template += "						</div>";
			template += "					</div>";
			template += "					<div class=\"jp-volume-bar\">";
			template += "						<div class=\"jp-volume-bar-value\"></div>";
			template += "					</div>";
			template += "					<div class=\"jp-current-time\"></div>";
			template += "					<div class=\"jp-duration\"></div>";
			template += "				</div>";
			template += "				<div id=\"jp_playlist_"+index+"\" class=\"jp-playlist\">";
			template += "					<ul>";
			template += "						<li>";
			template += 							clipname;
			template += "						</li>";
			template += "					</ul>";
			template += "				</div>";
			template += "			</div></div>";
			
		
			thiss.parent().append(template);
//			audioclip[ theslug ] = thiss.attr("href");
			thiss.remove();
			initsoundclip(filename, index);
		});
//	}else{
//		initsoundclip(audioclip[ theslug ]);
//	}
}

function initsoundclip(filename, index){

	jQuery("#jquery_jplayer_"+index).jPlayer({

		ready: function () {
			jQuery(this).jPlayer("setMedia", {

				mp3: filename

			});
//			jQuery(this).jPlayer("play");

		},

		ended: function (event) {

//			jQuery(this).jPlayer("stop");

		},

		supplied: "mp3",
		cssSelectorAncestor: "#jp_interface_"+index

	})

//	.bind(jQuery.jPlayer.event.play, function() { // Using a jPlayer event to avoid both jPlayers playing together.

//			jQuery(this).jPlayer("pauseOthers");

//	})
	;

}


function begincaching(){
	var alla = jQuery('a:not(a[href*="contact-us"])', '#primary, #branding');
	var max = alla.length;
	alla.each(function(index){
		var url1 = jQuery(this).attr("href");		
		var theslug = slug(url1);
		var url = jQuery.param.querystring( url1, "&ajax=y" );
		IntervalCache[index] = 0;
		IntervalCache[index] = setInterval ( "cacheloop('"+theslug+"', '"+url+"', '"+index+"', '"+max+"')", 500 );		
	});
}

function cacheloop(theslug, url, index, max){
	if(cacheindex == index && !contentcache[ theslug ] && cacheindex <= max){
		clearInterval( IntervalCache[index] );
		jQuery.get(url, function(data) {
			cacheindex+=1;
			var loopcontent = jQuery("<div />").append(data);
			cacheme(loopcontent, theslug);
		});
	}else if(cacheindex == index && contentcache[ theslug ] && cacheindex <= max){
		clearInterval( IntervalCache[index] );
		cacheindex+=1;
	}
}

function cacheme(newcontent, theslug){
	var images = jQuery("img:not(.wpcf7-captcha-captcha-163)", newcontent);
	if(images.length){	
		images.wrapAll('<div class="showholder" />');
		images.removeAttr('height').removeAttr('width').removeAttr('title').wrap('<div class="imgholder" />');
		var show = jQuery(".showholder", newcontent);
		var newimage = jQuery("<div />").append(show.css("z-index",1));
		imagecache [ theslug ] = newimage.html();
	}else{
		imagecache [ theslug ] = '';	
	}

	newcontent = calendarprep(newcontent);
	contentcache [ theslug ] = newcontent.html();
}

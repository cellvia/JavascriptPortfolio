/*
 * cycle plugin
 */
(function(D){var A="Lite-1.0";D.fn.cycle=function(E){return this.each(function(){E=E||{};if(this.cycleTimeout){clearTimeout(this.cycleTimeout)}this.cycleTimeout=0;this.cyclePause=0;var I=D(this);var J=E.slideExpr?D(E.slideExpr,this):I.children();var G=J.get();if(G.length<2){if(window.console&&window.console.log){window.console.log("terminating; too few slides: "+G.length)}return }var H=D.extend({},D.fn.cycle.defaults,E||{},D.metadata?I.metadata():D.meta?I.data():{});H.before=H.before?[H.before]:[];H.after=H.after?[H.after]:[];H.after.unshift(function(){H.busy=0});var F=this.className;H.width=parseInt((F.match(/w:(\d+)/)||[])[1])||H.width;H.height=parseInt((F.match(/h:(\d+)/)||[])[1])||H.height;H.timeout=parseInt((F.match(/t:(\d+)/)||[])[1])||H.timeout;if(I.css("position")=="static"){I.css("position","relative")}if(H.width){I.width(H.width)}if(H.height&&H.height!="auto"){I.height(H.height)}var K=0;J.css({position:"absolute",top:0,left:0}).hide().each(function(M){D(this).css("z-index",G.length-M)});D(G[K]).css("opacity",1).show();if(D.browser.msie){G[K].style.removeAttribute("filter")}if(H.fit&&H.width){J.width(H.width)}if(H.fit&&H.height&&H.height!="auto"){J.height(H.height)}if(H.pause){I.hover(function(){this.cyclePause=1},function(){this.cyclePause=0})}D.fn.cycle.transitions.fade(I,J,H);J.each(function(){var M=D(this);this.cycleH=(H.fit&&H.height)?H.height:M.height();this.cycleW=(H.fit&&H.width)?H.width:M.width()});J.not(":eq("+K+")").css({opacity:0});if(H.cssFirst){D(J[K]).css(H.cssFirst)}if(H.timeout){if(H.speed.constructor==String){H.speed={slow:600,fast:200}[H.speed]||400}if(!H.sync){H.speed=H.speed/2}while((H.timeout-H.speed)<250){H.timeout+=H.speed}}H.speedIn=H.speed;H.speedOut=H.speed;H.slideCount=G.length;H.currSlide=K;H.nextSlide=1;var L=J[K];if(H.before.length){H.before[0].apply(L,[L,L,H,true])}if(H.after.length>1){H.after[1].apply(L,[L,L,H,true])}if(H.click&&!H.next){H.next=H.click}if(H.next){D(H.next).bind("click",function(){return C(G,H,H.rev?-1:1)})}if(H.prev){D(H.prev).bind("click",function(){return C(G,H,H.rev?1:-1)})}if(H.timeout){this.cycleTimeout=setTimeout(function(){B(G,H,0,!H.rev)},H.timeout+(H.delay||0))}})};function B(J,E,I,K){if(E.busy){return }var H=J[0].parentNode,M=J[E.currSlide],L=J[E.nextSlide];if(H.cycleTimeout===0&&!I){return }if(I||!H.cyclePause){if(E.before.length){D.each(E.before,function(N,O){O.apply(L,[M,L,E,K])})}var F=function(){if(D.browser.msie){this.style.removeAttribute("filter")}D.each(E.after,function(N,O){O.apply(L,[M,L,E,K])})};if(E.nextSlide!=E.currSlide){E.busy=1;D.fn.cycle.custom(M,L,E,F)}var G=(E.nextSlide+1)==J.length;E.nextSlide=G?0:E.nextSlide+1;E.currSlide=G?J.length-1:E.nextSlide-1}if(E.timeout){H.cycleTimeout=setTimeout(function(){B(J,E,0,!E.rev)},E.timeout)}}function C(E,F,I){var H=E[0].parentNode,G=H.cycleTimeout;if(G){clearTimeout(G);H.cycleTimeout=0}F.nextSlide=F.currSlide+I;if(F.nextSlide<0){F.nextSlide=E.length-1}else{if(F.nextSlide>=E.length){F.nextSlide=0}}B(E,F,1,I>=0);return false}D.fn.cycle.custom=function(K,H,I,E){var J=D(K),G=D(H);G.css({opacity:0});var F=function(){G.animate({opacity:1},I.speedIn,I.easeIn,E)};J.animate({opacity:0},I.speedOut,I.easeOut,function(){J.css({display:"none"});if(!I.sync){F()}});if(I.sync){F()}};D.fn.cycle.transitions={fade:function(F,G,E){G.not(":eq(0)").css("opacity",0);E.before.push(function(){D(this).show()})}};D.fn.cycle.ver=function(){return A};D.fn.cycle.defaults={timeout:4000,speed:1000,next:null,prev:null,before:null,after:null,height:"auto",sync:1,fit:0,pause:0,delay:0,slideExpr:null}})(jQuery);
/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 */
(function($,i,b){var j,k=$.event.special,c="location",d="hashchange",l="href",f=$.browser,g=document.documentMode,h=f.msie&&(g===b||g<8),e="on"+d in i&&!h;function a(m){m=m||i[c][l];return m.replace(/^[^#]*#?(.*)$/,"$1")}$[d+"Delay"]=100;k[d]=$.extend(k[d],{setup:function(){if(e){return false}$(j.start)},teardown:function(){if(e){return false}$(j.stop)}});j=(function(){var m={},r,n,o,q;function p(){o=q=function(s){return s};if(h){n=$('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;q=function(){return a(n.document[c][l])};o=function(u,s){if(u!==s){var t=n.document;t.open().close();t[c].hash="#"+u}};o(a())}}m.start=function(){if(r){return}var t=a();o||p();(function s(){var v=a(),u=q(t);if(v!==t){o(t=v,u);$(i).trigger(d)}else{if(u!==t){i[c][l]=i[c][l].replace(/#.*/,"")+"#"+u}}r=setTimeout(s,$[d+"Delay"])})()};m.stop=function(){if(!n){r&&clearTimeout(r);r=0}};return m})()})(jQuery,this);

function formscript(){

	if (jQuery(".wpcf7-form").length){

		(function($) {

			$(function() {
				try {
					if (typeof _wpcf7 == 'undefined' || _wpcf7 === null)
						_wpcf7 = {};

					_wpcf7 = $.extend({ cached: 0 }, _wpcf7);

					$('div.wpcf7 > form').ajaxForm({
						beforeSubmit: function(formData, jqForm, options) {
							jqForm.wpcf7ClearResponseOutput();
							jqForm.find('img.ajax-loader').css({ visibility: 'visible' });
							return true;
						},
						beforeSerialize: function(jqForm, options) {
							jqForm.find('.wpcf7-use-title-as-watermark.watermark').each(function(i, n) {
								$(n).val('');
							});
							return true;
						},
						data: { '_wpcf7_is_ajax_call': 1 },
						dataType: 'json',
						success: function(data) {
							var ro = $(data.into).find('div.wpcf7-response-output');
							$(data.into).wpcf7ClearResponseOutput();

							if (data.invalids) {
								$.each(data.invalids, function(i, n) {
									$(data.into).find(n.into).wpcf7NotValidTip(n.message);
								});
								ro.addClass('wpcf7-validation-errors');
							}

							if (data.captcha)
								$(data.into).wpcf7RefillCaptcha(data.captcha);

							if (data.quiz)
								$(data.into).wpcf7RefillQuiz(data.quiz);

							if (1 == data.spam)
								ro.addClass('wpcf7-spam-blocked');

							if (1 == data.mailSent) {
								$(data.into).find('form').resetForm().clearForm();
								ro.addClass('wpcf7-mail-sent-ok');

								if (data.onSentOk)
									$.each(data.onSentOk, function(i, n) { eval(n) });
							} else {
								ro.addClass('wpcf7-mail-sent-ng');
							}

							if (data.onSubmit)
								$.each(data.onSubmit, function(i, n) { eval(n) });

							$(data.into).find('.wpcf7-use-title-as-watermark.watermark').each(function(i, n) {
								$(n).val($(n).attr('title'));
							});

							ro.append(data.message).slideDown('fast');
						}
					});

					$('div.wpcf7 > form').each(function(i, n) {
						if (_wpcf7.cached)
							$(n).wpcf7OnloadRefill();

						$(n).wpcf7ToggleSubmit();

						$(n).find('.wpcf7-acceptance').click(function() {
							$(n).wpcf7ToggleSubmit();
						});

						$(n).find('.wpcf7-exclusive-checkbox').each(function(i, n) {
							$(n).find('input:checkbox').click(function() {
								$(n).find('input:checkbox').not(this).removeAttr('checked');
							});
						});

						$(n).find('.wpcf7-use-title-as-watermark').each(function(i, n) {
							var input = $(n);
							input.val(input.attr('title'));
							input.addClass('watermark');

							input.focus(function() {
								if ($(this).hasClass('watermark'))
									$(this).val('').removeClass('watermark');
							});

							input.blur(function() {
								if ('' == $(this).val())
									$(this).val($(this).attr('title')).addClass('watermark');
							});
						});
					});

				} catch (e) {
				}
			});

			$.fn.wpcf7ToggleSubmit = function() {
				return this.each(function() {
					var form = $(this);
					if (this.tagName.toLowerCase() != 'form')
						form = $(this).find('form').first();

					if (form.hasClass('wpcf7-acceptance-as-validation'))
						return;

					var submit = form.find('input:submit');
					if (! submit.length) return;

					var acceptances = form.find('input:checkbox.wpcf7-acceptance');
					if (! acceptances.length) return;

					submit.removeAttr('disabled');
					acceptances.each(function(i, n) {
						n = $(n);
						if (n.hasClass('wpcf7-invert') && n.is(':checked')
						|| ! n.hasClass('wpcf7-invert') && ! n.is(':checked'))
							submit.attr('disabled', 'disabled');
					});
				});
			};

			$.fn.wpcf7NotValidTip = function(message) {
				return this.each(function() {
					var into = $(this);
					into.append('<span class="wpcf7-not-valid-tip">' + message + '</span>');
					$('span.wpcf7-not-valid-tip').mouseover(function() {
						$(this).fadeOut('fast');
					});
					into.find(':input').mouseover(function() {
						into.find('.wpcf7-not-valid-tip').not(':hidden').fadeOut('fast');
					});
					into.find(':input').focus(function() {
						into.find('.wpcf7-not-valid-tip').not(':hidden').fadeOut('fast');
					});
				});
			};

			$.fn.wpcf7OnloadRefill = function() {
				return this.each(function() {
					var url = $(this).attr('action');
					if (0 < url.indexOf('#'))
						url = url.substr(0, url.indexOf('#'));

					var id = $(this).find('input[name="_wpcf7"]').val();
					var unitTag = $(this).find('input[name="_wpcf7_unit_tag"]').val();

					$.getJSON(url,
						{ _wpcf7_is_ajax_call: 1, _wpcf7: id },
						function(data) {
							if (data && data.captcha)
								$('#' + unitTag).wpcf7RefillCaptcha(data.captcha);

							if (data && data.quiz)
								$('#' + unitTag).wpcf7RefillQuiz(data.quiz);
						}
					);
				});
			};

			$.fn.wpcf7RefillCaptcha = function(captcha) {
				return this.each(function() {
					var form = $(this);

					$.each(captcha, function(i, n) {
						form.find(':input[name="' + i + '"]').clearFields();
						form.find('img.wpcf7-captcha-' + i).attr('src', n);
						var match = /([0-9]+)\.(png|gif|jpeg)$/.exec(n);
						form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[1]);
					});
				});
			};

			$.fn.wpcf7RefillQuiz = function(quiz) {
				return this.each(function() {
					var form = $(this);

					$.each(quiz, function(i, n) {
						form.find(':input[name="' + i + '"]').clearFields();
						form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[0]);
						form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[1]);
					});
				});
			};

			$.fn.wpcf7ClearResponseOutput = function() {
				return this.each(function() {
					$(this).find('div.wpcf7-response-output').hide().empty().removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked');
					$(this).find('span.wpcf7-not-valid-tip').remove();
					$(this).find('img.ajax-loader').css({ visibility: 'hidden' });
				});
			};

		})(jQuery);

	} //end if

}


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

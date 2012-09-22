(function(d){d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(f,e){d.fx.step[e]=function(g){if(!g.colorInit){g.start=c(g.elem,e);g.end=b(g.end);g.colorInit=true}g.elem.style[e]="rgb("+[Math.max(Math.min(parseInt((g.pos*(g.end[0]-g.start[0]))+g.start[0]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[1]-g.start[1]))+g.start[1]),255),0),Math.max(Math.min(parseInt((g.pos*(g.end[2]-g.start[2]))+g.start[2]),255),0)].join(",")+")"}});function b(f){var e;if(f&&f.constructor==Array&&f.length==3){return f}if(e=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)){return[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])]}if(e=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)){return[parseFloat(e[1])*2.55,parseFloat(e[2])*2.55,parseFloat(e[3])*2.55]}if(e=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}if(e=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}if(e=/rgba\(0, 0, 0, 0\)/.exec(f)){return a.transparent}return a[d.trim(f).toLowerCase()]}function c(g,e){var f;do{f=d.curCSS(g,e);if(f!=""&&f!="transparent"||d.nodeName(g,"body")){break}e="backgroundColor"}while(g=g.parentNode);return b(f)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);
//fgnass.github.com/spin.js#v1.2.2
(function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a,b,c){c&&!c.parentNode&&h(a,c),a.insertBefore(b,c||null);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");h(b.getElementsByTagName("head")[0],a);return a.sheet||a.styleSheet}(),o=function r(a){if(!this.spin)return new r(a);this.opts=m(a||{},r.defaults,p)},p=o.defaults={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20},q=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(e=n(h(a,c,a.firstChild)),d=n(c),l(c,{left:(a.offsetWidth>>1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var i=b.opts,j=0,k=i.fps,m=k/i.speed,o=(1-i.opacity)/(m*i.trail/100),p=m/i.lines;(function q(){j++;for(var a=i.lines;a;a--){var d=Math.max(1-(j+a*p)%m*o,i.opacity);b.opacity(c,i.lines-a,d,i)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};q.lines=function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:"translate3d(0,0,0)",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},q.opacity=function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");q.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},q.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}else f=k(a,"animation")}(),a.Spinner=o})(window,document);

jQuery.fn.spin = function(opts) {
  this.each(function() {
    var $this = jQuery(this),
        data = $this.data();

    if (data.spinner) {
      data.spinner.stop();
      delete data.spinner;
    }
    if (opts !== false) {
      data.spinner = new Spinner(jQuery.extend({color: $this.css('color')}, opts)).spin(this);
    }
  });
  return this;
};

function getday(){
    return parseInt(jQuery("a.activedaymenuitem").html());
}
    
function cleanclasses(){
    jQuery(".daymenuitem").removeClass("activedaymenuitem");
    jQuery(".dayitem").removeClass("activedayitem");
    jQuery(".daycomment").removeClass("activedaycomment");
}

function updateday(daynumber, excludehash){
    cleanclasses();
    jQuery('a.daymenuitem:contains("'+daynumber+'")')
        .addClass("activedaymenuitem");
    jQuery("#day"+daynumber).addClass("activedayitem");
    jQuery(".daycomment"+daynumber).addClass("activedaycomment");
    jQuery("#hiddencommentday").val(daynumber);
    if(!excludehash){
        window.location.hash = daynumber;    
    }
}

jQuery(document).ready(function(){

    jQuery("select[id*='fields']").attr('id', function(i, val) {
        return val.split("[")[1].split("]")[0];
    });
    jQuery("input[id*='fields']").attr('id', function(i, val) {
        return val.split("[")[1].split("]")[0]+i;
    })

    jQuery(".daycomment1").addClass("activedaycomment");

    var hash = window.location.hash;
    if(typeof hash != "undefined" && hash != "" && (hash.length == 2 || hash.indexOf("comment") != -1)){
        if(~hash.indexOf("comment")){
            var comment = jQuery(hash);
            var daynumber = comment.data("day");            
        }else{
            var daynumber = parseInt(hash.split("#").join(""));
        }
        updateday(daynumber, true);        
    }
    

    jQuery("a[href*='#']").click(function(e){
        e.preventDefault();
        var self = jQuery(this);
        var tag = self.attr("href");
        if(tag != "#" && tag != ""){
            var taga = "a[name='"+tag.split("#").join("")+"']";
            var scrollme = jQuery(tag+", "+taga).first().offset().top;
            whichone = ( jQuery.browser.mozilla || jQuery.browser.msie || jQuery.browser.opera )? "html" : "body";
            var body = jQuery(whichone);
            if(scrollme == body.scrollTop()){
                if(self.is(".daymenuitem")){
                    var daynumber = self.html();
                    updateday(daynumber);                    
                }else if(self.is(".nextday")){
                    updateday(getday()+1);
                }                    
            }else{                
                body.animate({ scrollTop: scrollme }
                                        , 1000
                                        , jQuery.proxy(function() {
                                            var self2 = jQuery(this);
                                            if(self2.is(".daymenuitem")){
                                                var daynumber = self2.html();
                                                updateday(daynumber);                    
                                            }else if(self2.is(".nextday")){
                                                updateday(getday()+1);
                                            }
                                        }, self)
                );
            }            
        }
    });
    jQuery("#search_container").delegate("#more", "click", function(e){
       e.preventDefault();
       var page = parseInt(jQuery("#page").val())+1; 
       jQuery("#page").val(page);        
       jQuery("#searchform").submit();
    });
    
    jQuery("#search_container").delegate("#prev", "click", function(e){
       e.preventDefault();
       var page = parseInt(jQuery("#page").val())-1; 
       jQuery("#page").val(page);        
       jQuery("#searchform").submit();
    });
    
    //anytime searchform changed, update results
    jQuery("#searchform input,#searchform select").change(function(){
        jQuery("#page").val(1);        
        jQuery("#searchform").submit();         
    });
    //allow radio box to be unchecked
/*    jQuery("#searchform input[type='radio']")
        .attr("checked", false)
        .attr("previousValue", "false")
        .click(function(){  
            jQuery("#page").val(1);        
            var self = jQuery(this);    
            var root = self.parents(".field")[0];
            jQuery(root).find("input[type='radio']").not(self).attr("previousValue", "false");
                
            var previousValue = self.attr('previousValue');
            
            if(previousValue == 'true'){
                self.attr('checked', false);
                jQuery("#searchform").submit();
            }   
            self.attr('previousValue', self.prop('checked'));
        });
 */

    //post search query to server
    jQuery("#searchform").submit(function(e){
        e.preventDefault();
        jQuery(".spinner").spin();
        var serializedform = jQuery(this).serialize();
        jQuery.post("../read_results/",
            serializedform,
            function(data){
                if(data != ""){
                    jQuery("#results").html(data);
                    if(!~data.indexOf("No matches.")){
                        jQuery(".spinner").html("(Results Below!)");
                    }else{
                        jQuery(".spinner").html("(No matches.)");
                    }                    
                }else{
                    jQuery(".spinner, #results").html(data);
                }
            }
        )
    });

    
    
    jQuery("#expand_tab").toggle(function(e){
       e.preventDefault();
       jQuery("#mightlike_container").fadeTo(1000, 1);
       jQuery("#search_container").css("overflow", "hidden");
       jQuery("#searchform").animate({marginLeft: "-230px"}, 1000);        
       jQuery("#expand_tab").animate({backgroundColor: "#e66aa7"}, 1000);
    }, function(e){
       e.preventDefault();
       jQuery("#mightlike_container").fadeTo(500, 0);
       jQuery("#searchform").animate({marginLeft: "0px"}, 1000, function(){
           jQuery("#search_container").css("overflow", "visible");
       });
       jQuery("#expand_tab").animate({backgroundColor: "#d71c43"}, 1000);
    });

    //refresh search session
    jQuery("input").prop("checked", false);
    jQuery("select").val("null");
    if(typeof fields != "undefined" && typeof fields == "object"){
        var signifier = false;
        jQuery.each(fields, function(k,v){
//                     alert("[name='fields["+k+"][]'][value='']"+typeof v);
            if(typeof v == "object"){
                signifier = true;
                 jQuery.each(v, function(k2,v2){
                    var self2 = jQuery("[name='fields["+k+"][]'][value='"+v2+"']");
//                    alert(self2.val());
                    self2.each(function(){
                        var self3 = jQuery(this);
                        if(self3.val() == v2){
//                            self3.attr("checked", true);
                            self3.prop("checked", true);
                        }
                    });       
                 });
            }else if (typeof v == "string"){            
                if(v != "" && !(k=="page" && v=="1")){
                    if(v != "null"){signifier = true;}
                    var self = jQuery("[name='fields["+k+"]']");
                    if(self.length == 1){               
                        self.val(v);
                    }                                        
                }
            }
        });
        jQuery("#searchform").submit();
    }    
    jQuery("select").each(function(){
        var self = jQuery(this);
        var parent = jQuery(self.parents("div.field")[0]);
        jQuery("select option:first", parent).html(parent.data("title"));           
    })
    .chosen();
    jQuery(".chzn-container").width(150).css({"float": "right", "clear": "both"});

    jQuery(window).load(function(){
        jQuery("#expand_tab").trigger("click"); 
    });

});	                                                                                           

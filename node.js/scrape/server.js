var tame = require('tamejs').runtime;
var __tame_defer_cb = null;
var __tame_fn_0 = function (__tame_k) {
    tame.setActiveCb (__tame_defer_cb);
    require ( 'tamejs' ) . register ( ) ;
    
    
    
    
    
    var connect = require ( 'connect' ) ;
    var express = require ( 'express' ) ;
    var dnode = require ( 'dnode' ) ;
    var EventEmitter = require ( 'events' ) . EventEmitter ;
    var emitter = new EventEmitter ;
    var host = "localhost" ;
    var port = 8080 ;
    var server = express . createServer ( host ) ;
    
    
    
    
    var _ = require ( 'underscore' ) ;
    
    var cheerio = require ( 'cheerio' ) ;
    var request = require ( 'request' ) ;
    
    
    
    
    server . use ( express . static ( __dirname ) ) ;
    
    
    
    
    
    var vars = { } ;
    function dnodeServer (client, con) {
        var Send = {
        dataUpdate :
        function  (data) {
            emitter . emit ( 'dataUpdate' , data ) ;
        }
        ,
        enable :
        function  () {
            emitter . emit ( 'enable' ) ;
        }
        ,
        start :
        function  () {
            emitter . emit ( 'start' ) ;
        }
        }
        var eventNames = _ . keys ( Send ) ;
        
        
        
        
        con . on ( 'ready' ,
        function  () {
            _ . each ( eventNames ,
            function  (eventName) {
                emitter . on ( eventName , client [ eventName ] ) ;
            }
            ) ;
            if (typeof ( vars . yearLinks ) == "undefined") {
                Send . enable ( ) ;
            } else {
            }
        }
        ) ;
        con . on ( 'end' ,
        function  () {
            _ . each ( eventNames ,
            function  (eventName) {
                if (typeof ( client [ eventName ] ) == "function") {
                    emitter . removeListener ( eventName , client [ eventName ] ) ;
                } else {
                }
            }
            ) ;
        }
        ) ;
        this . initiate =
        function  (order) {
            var __tame_defer_cb = tame.findDeferCb ([order]);
            tame.setActiveCb (__tame_defer_cb);
            var __tame_this = this;
            var __tame_fn_36 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                Send . start ( ) ;
                
                vars . yearLinks = [ ] ;
                vars . pageLinks = [ ] ;
                vars . finalDates = [ ] ;
                vars . finalResult = "" ;
                var __tame_fn_1 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_fn_2 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_defers = new tame.Deferrals (__tame_k);
                        var __tame_fn_3 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            LINKS . addLinks (
                            'http://government.gov.ge/index.php?lang_id=ENG&sec_id=146' ,
                            'div#main-area div.content-area div.mid-cont div ul li a' ,
                            'yearLinks' ,
                            __tame_defers.defer ( { 
                                parent_cb : __tame_defer_cb,
                                line : 89,
                                file : "scrape.tjs"
                            } )
                            ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        __tame_fn_3(tame.end);
                        __tame_defers._fulfill();
                        tame.setActiveCb (null);
                    };
                    var __tame_fn_35 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        Send . dataUpdate ( "logging yearlinks\n" ) ;
                        var __tame_fn_4 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            var __tame_fn_5 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                var __tame_fn_11 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    var yrLnkCnt = vars . yearLinks . length ;
                                    var __tame_fn_6 = function (__tame_k) {
                                        tame.setActiveCb (__tame_defer_cb);
                                        var __tame_k_implicit = {};
                                        var i = 0;
                                        var __tame_fn_7 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            var __tame_fn_8 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                i ++
                                                tame.callChain([__tame_fn_7, __tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            __tame_k_implicit.k_break = __tame_k;
                                            __tame_k_implicit.k_continue = function() { __tame_fn_8(__tame_k); };
                                            if (i <yrLnkCnt) {
                                                var __tame_fn_9 = function (__tame_k) {
                                                    tame.setActiveCb (__tame_defer_cb);
                                                    var __tame_defers = new tame.Deferrals (__tame_k);
                                                    var __tame_fn_10 = function (__tame_k) {
                                                        tame.setActiveCb (__tame_defer_cb);
                                                        var link = vars . yearLinks [ i ] ;
                                                        LINKS . addLink ( link , 'pageLinks' ) ;
                                                        LINKS . addLinks (
                                                        link ,
                                                        'div#main-area div.content-area div.mid-cont div.pager a[title!="previous page"][title!="next page"]' ,
                                                        'pageLinks' ,
                                                        __tame_defers.defer ( { 
                                                            parent_cb : __tame_defer_cb,
                                                            line : 106,
                                                            file : "scrape.tjs"
                                                        } )
                                                        ) ;
                                                        tame.callChain([__tame_k]);
                                                        tame.setActiveCb (null);
                                                    };
                                                    __tame_fn_10(tame.end);
                                                    __tame_defers._fulfill();
                                                    tame.setActiveCb (null);
                                                };
                                                tame.callChain([__tame_fn_9, __tame_fn_8, __tame_k]);
                                            } else {
                                                tame.callChain([__tame_k]);
                                            }
                                            tame.setActiveCb (null);
                                        };
                                        tame.callChain([__tame_fn_7, __tame_k]);
                                        tame.setActiveCb (null);
                                    };
                                    tame.callChain([__tame_fn_6, __tame_k]);
                                    tame.setActiveCb (null);
                                };
                                var __tame_fn_12 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    var __tame_fn_13 = function (__tame_k) {
                                        tame.setActiveCb (__tame_defer_cb);
                                        var __tame_defers = new tame.Deferrals (__tame_k);
                                        var __tame_fn_15 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            var yrLnkCnt = vars . yearLinks . length ;
                                            var __tame_fn_14 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                 for (var i = 0 ; i <yrLnkCnt ; i ++) {
                                                    var link = vars . yearLinks [ i ] ;
                                                    LINKS . addLink ( link , 'pageLinks' ) ;
                                                    LINKS . addLinks (
                                                    link ,
                                                    'div#main-area div.content-area div.mid-cont div.pager a[title!="previous page"][title!="next page"]' ,
                                                    'pageLinks' ,
                                                    __tame_defers.defer ( { 
                                                        parent_cb : __tame_defer_cb,
                                                        line : 122,
                                                        file : "scrape.tjs"
                                                    } )
                                                    ) ;
                                                }
                                                tame.callChain([__tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            tame.callChain([__tame_fn_14, __tame_k]);
                                            tame.setActiveCb (null);
                                        };
                                        __tame_fn_15(tame.end);
                                        __tame_defers._fulfill();
                                        tame.setActiveCb (null);
                                    };
                                    if (order == "parallel") {
                                        tame.callChain([__tame_fn_13, __tame_k]);
                                    } else {
                                        tame.callChain([__tame_k]);
                                    }
                                    tame.setActiveCb (null);
                                };
                                if (order == "serial") {
                                    tame.callChain([__tame_fn_11, __tame_k]);
                                } else {
                                    tame.callChain([__tame_fn_12, __tame_k]);
                                }
                                tame.setActiveCb (null);
                            };
                            var __tame_fn_34 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                ;
                                
                                vars . yearLinks = [ ] ;
                                
                                
                                Send . dataUpdate ( "logging pagelinks\n" ) ;
                                var __tame_fn_16 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    var __tame_fn_17 = function (__tame_k) {
                                        tame.setActiveCb (__tame_defer_cb);
                                        var __tame_fn_23 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            var pgLnkCnt = vars . pageLinks . length ;
                                            var __tame_fn_18 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                var __tame_k_implicit = {};
                                                var i = 0;
                                                var __tame_fn_19 = function (__tame_k) {
                                                    tame.setActiveCb (__tame_defer_cb);
                                                    var __tame_fn_20 = function (__tame_k) {
                                                        tame.setActiveCb (__tame_defer_cb);
                                                        i ++
                                                        tame.callChain([__tame_fn_19, __tame_k]);
                                                        tame.setActiveCb (null);
                                                    };
                                                    __tame_k_implicit.k_break = __tame_k;
                                                    __tame_k_implicit.k_continue = function() { __tame_fn_20(__tame_k); };
                                                    if (i <pgLnkCnt) {
                                                        var __tame_fn_21 = function (__tame_k) {
                                                            tame.setActiveCb (__tame_defer_cb);
                                                            var __tame_defers = new tame.Deferrals (__tame_k);
                                                            var __tame_fn_22 = function (__tame_k) {
                                                                tame.setActiveCb (__tame_defer_cb);
                                                                var page = vars . pageLinks [ i ] ;
                                                                LINKS . addLinks (
                                                                page ,
                                                                'div#main-area div.content-area div.mid-cont div.pagetype-list-cascad div.latest-news ul li h2.title span.date' ,
                                                                'finalDates' ,
                                                                __tame_defers.defer ( { 
                                                                    parent_cb : __tame_defer_cb,
                                                                    line : 144,
                                                                    file : "scrape.tjs"
                                                                } )
                                                                ) ;
                                                                tame.callChain([__tame_k]);
                                                                tame.setActiveCb (null);
                                                            };
                                                            __tame_fn_22(tame.end);
                                                            __tame_defers._fulfill();
                                                            tame.setActiveCb (null);
                                                        };
                                                        tame.callChain([__tame_fn_21, __tame_fn_20, __tame_k]);
                                                    } else {
                                                        tame.callChain([__tame_k]);
                                                    }
                                                    tame.setActiveCb (null);
                                                };
                                                tame.callChain([__tame_fn_19, __tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            tame.callChain([__tame_fn_18, __tame_k]);
                                            tame.setActiveCb (null);
                                        };
                                        var __tame_fn_24 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            var __tame_fn_32 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                var pgLnkCntOrig = vars . pageLinks . length ;
                                                var pgLnkCnt = vars . pageLinks . length ;
                                                var __tame_fn_25 = function (__tame_k) {
                                                    tame.setActiveCb (__tame_defer_cb);
                                                    var __tame_k_implicit = {};
                                                    var __tame_fn_26 = function (__tame_k) {
                                                        tame.setActiveCb (__tame_defer_cb);
                                                        if (pgLnkCnt > 0) {
                                                            var __tame_fn_31 = function (__tame_k) {
                                                                tame.setActiveCb (__tame_defer_cb);
                                                                var current = pgLnkCntOrig - pgLnkCnt ;
                                                                var maxLnkCnt = ( pgLnkCnt > 6 ) ? 6 : pgLnkCnt ;
                                                                var __tame_fn_27 = function (__tame_k) {
                                                                    tame.setActiveCb (__tame_defer_cb);
                                                                    var __tame_fn_28 = function (__tame_k) {
                                                                        tame.setActiveCb (__tame_defer_cb);
                                                                        var __tame_defers = new tame.Deferrals (__tame_k);
                                                                        var __tame_fn_29 = function (__tame_k) {
                                                                            tame.setActiveCb (__tame_defer_cb);
                                                                             for (var i = current ; i <current+maxLnkCnt ; i ++) {
                                                                                var page = vars . pageLinks [ i ] ;
                                                                                LINKS . addLinks (
                                                                                page ,
                                                                                'div#main-area div.content-area div.mid-cont div.pagetype-list-cascad div.latest-news ul li h2.title span.date' ,
                                                                                'finalDates' ,
                                                                                __tame_defers.defer ( { 
                                                                                    parent_cb : __tame_defer_cb,
                                                                                    line : 163,
                                                                                    file : "scrape.tjs"
                                                                                } )
                                                                                ) ;
                                                                            }
                                                                            tame.callChain([__tame_k]);
                                                                            tame.setActiveCb (null);
                                                                        };
                                                                        __tame_fn_29(tame.end);
                                                                        __tame_defers._fulfill();
                                                                        tame.setActiveCb (null);
                                                                    };
                                                                    var __tame_fn_30 = function (__tame_k) {
                                                                        tame.setActiveCb (__tame_defer_cb);
                                                                        pgLnkCnt = pgLnkCnt - maxLnkCnt ;
                                                                        tame.callChain([__tame_k]);
                                                                        tame.setActiveCb (null);
                                                                    };
                                                                    tame.callChain([__tame_fn_28, __tame_fn_30, __tame_k]);
                                                                    tame.setActiveCb (null);
                                                                };
                                                                tame.callChain([__tame_fn_27, __tame_k]);
                                                                tame.setActiveCb (null);
                                                            };
                                                            tame.callChain([__tame_fn_31, __tame_fn_26, __tame_k]);
                                                        } else {
                                                            tame.callChain([__tame_k]);
                                                        }
                                                        tame.setActiveCb (null);
                                                    };
                                                    __tame_k_implicit.k_break = __tame_k;
                                                    __tame_k_implicit.k_continue = function() { __tame_fn_26(__tame_k); };
                                                    tame.callChain([__tame_fn_26, __tame_k]);
                                                    tame.setActiveCb (null);
                                                };
                                                tame.callChain([__tame_fn_25, __tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            if (order == "parallel") {
                                                tame.callChain([__tame_fn_32, __tame_k]);
                                            } else {
                                                tame.callChain([__tame_k]);
                                            }
                                            tame.setActiveCb (null);
                                        };
                                        if (order == "serial") {
                                            tame.callChain([__tame_fn_23, __tame_k]);
                                        } else {
                                            tame.callChain([__tame_fn_24, __tame_k]);
                                        }
                                        tame.setActiveCb (null);
                                    };
                                    var __tame_fn_33 = function (__tame_k) {
                                        tame.setActiveCb (__tame_defer_cb);
                                        vars . pageLinks = [ ] ;
                                        
                                        
                                        Send . dataUpdate ( "logging finaldates\n" ) ;
                                        
                                        _ . each ( vars . finalDates ,
                                        function  (date, index) {
                                            Send . dataUpdate ( date ) ;
                                        }
                                        ) ;
                                        
                                        vars = { } ;
                                        Send . enable ( ) ;
                                        tame.callChain([__tame_k]);
                                        tame.setActiveCb (null);
                                    };
                                    tame.callChain([__tame_fn_17, __tame_fn_33, __tame_k]);
                                    tame.setActiveCb (null);
                                };
                                tame.callChain([__tame_fn_16, __tame_k]);
                                tame.setActiveCb (null);
                            };
                            tame.callChain([__tame_fn_5, __tame_fn_34, __tame_k]);
                            tame.setActiveCb (null);
                        };
                        tame.callChain([__tame_fn_4, __tame_k]);
                        tame.setActiveCb (null);
                    };
                    tame.callChain([__tame_fn_2, __tame_fn_35, __tame_k]);
                    tame.setActiveCb (null);
                };
                tame.callChain([__tame_fn_1, __tame_k]);
                tame.setActiveCb (null);
            };
            tame.callChain([__tame_fn_36, __tame_k]);
            tame.setActiveCb (null);
        }
        ;
        
        
        
        
        
        var LINKS = {
        addLink :
        function  (val, varToAppend) {
            vars [ varToAppend ] . push ( val ) ;
        }
        ,
        addLinks :
        function  (uri, aSelector, varToAppend, ev) {
            var __tame_defer_cb = tame.findDeferCb ([uri, aSelector, varToAppend, ev]);
            tame.setActiveCb (__tame_defer_cb);
            var __tame_this = this;
            var __tame_fn_44 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                var error , response , requestBody ;
                var __tame_fn_37 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_fn_38 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_defers = new tame.Deferrals (__tame_k);
                        var __tame_fn_39 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            request ( uri ,
                            __tame_defers.defer ( { 
                                assign_fn : 
                                    function () {
                                        error = arguments[0];
                                        response = arguments[1];
                                        requestBody = arguments[2];
                                    }
                                    ,
                                parent_cb : __tame_defer_cb,
                                line : 200,
                                file : "scrape.tjs"
                            } )
                            ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        __tame_fn_39(tame.end);
                        __tame_defers._fulfill();
                        tame.setActiveCb (null);
                    };
                    var __tame_fn_40 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_fn_41 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            Send . dataUpdate ( 'Error when contacting site: ' +uri ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        var __tame_fn_42 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            Send . dataUpdate ( 'Successfully contacted site: ' +uri ) ;
                            tame.callChain([__tame_k]);
                            tame.setActiveCb (null);
                        };
                        if (error && response . statusCode !== 200) {
                            tame.callChain([__tame_fn_41, __tame_k]);
                        } else {
                            tame.callChain([__tame_fn_42, __tame_k]);
                        }
                        tame.setActiveCb (null);
                    };
                    var __tame_fn_43 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var $ = cheerio . load ( requestBody ) ;
                        $ ( aSelector )
                        . each (
                        function  () {
                            if (varToAppend == 'finalDates') {
                                var thelink = $ ( this ) . text ( ) ;
                            } else {
                                var thelink = "http://government.gov.ge/" +$ ( this ) . attr ( "href" ) ;
                            }
                            thelink = thelink . split ( "&amp;" ) . join ( "&" ) ;
                            LINKS . addLink ( thelink , varToAppend ) ;
                        }
                        ) ;
                        
                        
                        ev ( ) ;
                        tame.callChain([__tame_k]);
                        tame.setActiveCb (null);
                    };
                    tame.callChain([__tame_fn_38, __tame_fn_40, __tame_fn_43, __tame_k]);
                    tame.setActiveCb (null);
                };
                tame.callChain([__tame_fn_37, __tame_k]);
                tame.setActiveCb (null);
            };
            tame.callChain([__tame_fn_44, __tame_k]);
            tame.setActiveCb (null);
        }
        } ;
    }
    dnode ( dnodeServer ) . listen ( server ) ;
    server . listen ( port ) ;
    console . log ( 'http://' +host+ ':' +port+ '/' ) ;
    tame.callChain([__tame_k]);
    tame.setActiveCb (null);
};
__tame_fn_0 (tame.end);
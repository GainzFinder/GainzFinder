
var screen = $.mobile.getScreenHeight();

console.log(screen)
// var header = $(".ui-header").outerHeight();




// set up DOM Cache
$.mobile.page.prototype.options.domCache = true;


// set up scroll
// $("#save .ui-content").css({
//     'height':($(document).height()) + 'px'
// });

// $(window).resize(function(){
//     $("#save .ui-content").css({
//         'height':($(document).height()) + 'px'
//     });
// });
// $(function() {
//   $('.btn').click(function(e) {    
//     $('#source').quicksand( $('#destination li') );
//     e.preventDefault();
//   })
// });

(function($) {
  $.fn.sorted = function(customOptions) {
    var options = {
      reversed: false,
      by: function(a) { return a.text(); }
    };
    $.extend(options, customOptions);
    $data = $(this);
    arr = $data.get();
    arr.sort(function(a, b) {
      var valA = options.by($(a));
      var valB = options.by($(b));
      if (options.reversed) {
        return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;        
      } else {    
        return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;  
      }
    });
    return $(arr);
  };
})(jQuery);

// DOMContentLoaded
$(function() {


  // get the first collection
  var $avatars = $('#avatars');

  // clone avatars to get a second collection
  var $data = $avatars.clone();



  // attempt to call Quicksand on every form change
   

   $('#people').click(function(e) {    
      
            var $filteredData = $data.find('li[data-type=' + 'people' + ']');
          


          // finally, call quicksand
          $avatars.quicksand( $filteredData, {
            adjustHeight: 'dynamic',
            duration: 800,
              easing: 'swing'
          });


    });

   $('#all').click(function(e) {    
      
            var $filteredData = $data.find('li');
          


          // finally, call quicksand
          $avatars.quicksand( $filteredData, {
            adjustHeight: 'dynamic',
            duration: 800,
              easing: 'swing'
          });


    });

});
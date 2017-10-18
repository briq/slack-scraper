//= require vendor/jquery-3.1.1

$(function() {
  var token = '';

  $(document).on('change', 'input#token', function() {
    token = this.value;
  });

  $(document).on('click', 'button[type="submit"]', function(evt) {
    evt.preventDefault();
    var url = window.location.origin + '/download?token=' + encodeURIComponent(token);
    window.open(url);
  });
});

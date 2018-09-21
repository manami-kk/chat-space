$ (function() {

  function buildHTML(message) {
    message.image == null ? image = "" : image = `<img src="${message.image}", class="main__body__message-list__message__image">`
    var html = `<div class="main__body__message-list__message">
                  <div class="main__body__message-list__message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="main__body__message-list__message__time">
                    ${message.created_at}
                  </div>
                  <div class="main__body__message-list__message__text">
                      <p class="main__body__message-list__message__text">
                        ${message.text}
                      </p>
                      ${image}
                  </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action');
    
    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log(data);
      var html = buildHTML(data);
      $('.main__body__message-list').append(html);
      $('.form__message').val('');
      $('.hidden').val('');
      $('.form__submit').prop('disabled', false);
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'slow');
    })
    .fail(function(data) {
      alert('error');
    });
  });

});

$ (function() {
  //メッセージの描画
  function buildHTML(message) {
    message.image ? image = `<img src="${message.image}", class="message__image">` : image = ""
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="message__time">
                    ${message.created_at}
                  </div>
                    <p class="message__text">
                      ${message.text}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  };
  
  //メッセージ投稿の非同期化
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
  
  //自動更新機能
  $(function() {
    setInterval(update, 3000);
  });

  function update() {
    if ($('.message')[0]) {
      var last_message_id = $('.message:last').data('messageId');
    } else {
      var last_message_id = 0;
    }

    $.ajax({
    url: location.href,
    type: 'GET',
    data: {message: {id: last_message_id}},
    dataType: 'json',
    })
    .done(function(data) {
      $.each(data, function(i, data){
        var html = buildHTML(data);
        $('.main__body__message-list').append(html);
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'slow');
      });
    })
    .fail(function(){
      alert("自動メッセージ取得に失敗しました");
    });
  };
});

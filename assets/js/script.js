(function () {
    const $remove_content = $('.remove-content');
    const $form_content = $('.form-content');

    $('[data-action="handleSureClick"]').on('click', function () {
        const value = $(this).attr('data-value');
        $remove_content.remove()
        if(value === '1'){
            $form_content.fadeIn('slow')
        }else{
            alert('Очень жаль!')
        }
    })

    $form_content.find('form').on('submit', function (e) {
        e.preventDefault()
        const
            token = "7595010296:AAG-zMhAniG7MrqeMucxbgfZUq7TvyTXwpI",
            chatId = "-4649035626"
        ;
        const $button = $(this).find('[type="submit"]')
        let message = '🗯 Ответ на пригласительное: 🗯\n'
        let count_false = 0
        for(let val of $(this).find('[name]')){
            if($(val).val() !== ''){
                message += '👉' + ' '+ $(val).attr('data-telegram') + ' ' + $(val).val() + '\n'
            }else{
                count_false++
            }
        }
        if(count_false === 0){
            if(localStorage.getItem('answer') == null){
                $.ajax({
                    type: "POST",
                    url: "https://api.telegram.org/bot" + token + "/sendMessage",
                    data: {
                        chat_id: chatId,
                        text: message
                    },
                    success: function(response){
                        alert("Форма успешно отправлена");
                        localStorage.setItem('answer', 'true')
                    },
                    error: function(xhr, status, error){
                        console.error("Произошла ошибка при отправке сообщения в Telegram:", error);
                    }
                });
            }else{
                alert("Вероятно, вы уже отправляли форму");
            }
        }else{
            alert("Заполните, пожалуйста, все поля формы");
        }
    })
})();
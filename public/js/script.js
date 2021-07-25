function startChat(user = null,receiverEmail=null) {
    let email
    if(receiverEmail) {
        email = receiverEmail
    }else {
         email = user.getAttribute('value')

    }
    document.getElementById('live-chat').style.display = 'block';
    document.getElementById('userName').innerHTML = email
    // element.
    $.ajax({
        contentType: 'application/json',
        url: `/getMessages`,
        method: 'post',
        data:JSON.stringify({ "receiverEmail": email.trim()}),
        success: function (response) {
            document.getElementById('chat-history').innerHTML = ''
            let chatHistory = document.getElementById('chat-history');
            if(response.messages && response.messages.length) {
                response.messages.forEach(item=>{
                    let newDiv = document.createElement('div');
                    chatHistory.append(newDiv);
                    newDiv.setAttribute('class','chat-message clearfix');
                    newDiv.innerHTML =  `
                     <div class="chat-message-content clearfix">

                        <span class="chat-time">${item.data}</span>

                        <h5>${item.senderEmail}</h5>

                        <p>${item.message}</p>

                    </div> <!-- end chat-message-content -->

                </div> <!-- end chat-message -->

                <hr>`
                })
            }

            var element = document.getElementById("chat-history");
            element.scrollTop = element.scrollHeight;
        },
        error: function (err) {
            console.log('Create Message failed :' + err);
        }
    });
}

// chat

(function() {

    $('#live-chat header').on('click', function() {

        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');

    });

    $('.chat-close').on('click', function(e) {

        e.preventDefault();
        $('#live-chat').fadeOut(300);

    });

}) ();
function sendMessage() {
    const msg = document.getElementById('msg').value;
    const email =  document.getElementById('userName').innerHTML;
    $.ajax({
        contentType: 'application/json',
        url: `/createMessage`,
        method: 'post',
        data:JSON.stringify({ "data": msg ,email:email.trim()}),
        success: function (response) {
            document.getElementById('msg').value = ''
            let chatHistory = document.getElementById('chat-history');
                    let newDiv = document.createElement('div');
                    chatHistory.append(newDiv);
                    newDiv.setAttribute('class','chat-message clearfix');
                    newDiv.innerHTML =  `
                     <div class="chat-message-content clearfix">

                        <span class="chat-time">${response.message.data}</span>

                        <h5>${response.message.senderEmail}</h5>

                        <p>${response.message.message}</p>

                    </div> <!-- end chat-message-content -->

                </div> <!-- end chat-message -->

                <hr>`

            var element = document.getElementById("chat-history");
            element.scrollTop = element.scrollHeight;
        },
        error: function (err) {
            console.log('Create Message failed :' + err);
        }
    });
}

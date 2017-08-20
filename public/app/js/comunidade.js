// Load
$(function () {

    //TODO: trazer informações do banco
    var userName = getParameterByName("user");

    if (!userName)
        window.location.href = 'login.html';

    fillUserInterests(userName);
});


// FUNCTIONS

function fillUserInterests(userName) {

    $.ajax({
        url: 'https://node-red-bluehack-app.mybluemix.net/info?user=' + userName,
        dataType: "jsonp",
        success: function (data) {

            $("#imgUser").attr("src", data.info.image);
            $("#userName").html(data.info.name);

            var interestsCloud = [];

            data.interest.forEach(function (interest) {
                interestsCloud = interestsCloud.concat(interest.description);
            }, this);

            var items = [];

            $.each(interestsCloud, function (id, option) {
                items.push('<li class="fa-li">' + option + '</li>');
            });

            $('#tagCloud').html(items.join(''));

            fillUsersChatList(data);
        },
        error: function (request, error){
            window.location.href = 'login.html'
        }
    });
}

function fillUsersChatList(data) {

    var usersChatList = {
        users: data.friends,
		mainUser: data.info.user
    }

    var template = $('#userChatTemplate').html();
    Mustache.parse(template);

    var rendered = Mustache.render(template, usersChatList);

    $('#divUserChatList').append(rendered);
}

//private
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
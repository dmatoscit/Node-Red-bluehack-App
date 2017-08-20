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

            fillUsersChatList();
        },
        error: function (request, error){
            window.location.href = 'login.html'
        }
    });
}

function fillUsersChatList() {
    
    //  $.ajax({
    //     url: 'https://node-red-bluehack-app.mybluemix.net/users',
    //     success: function (data) {
    //         console.log(data);
    //     },
    //     error: function (request, error){
    //         window.location.href = 'login.html'
    //     }
    // });

    var usersChatList = {
        users: [
            {
                image: 'img/users/avatar1.png',
                name: 'Leticia Soares',
                resume: 'Gosto de animais, cultivo flores e amo minhas novelas',
                nativeLaguageImage: 'img/pt-br.png',
                learnLaguageImage: 'img/eua.png'
                // info: 'Já participou de 4 conversas com mais de 1000 palavras trocadas :o'
            },
            {
                image: 'img/users/avatar2.png',
                name: 'Andrew Whatson',
                resume: 'Sports, music, TV, movies, games and history',
                nativeLaguageImage: 'img/eua.png',
                learnLaguageImage: 'img/pt-br.png'
                // info: 'Já participou de mais de 30 conversas :o'
            },
            {
                image: 'img/users/avatar3.png',
                name: 'Kleber Marcondes',
                resume: 'Montanhista, aventureiro e paraquedista',
                nativeLaguageImage: 'img/pt-br.png',
                learnLaguageImage: 'img/eua.png'
                // info: 'Se inscreveu recentemente, que tal dar as boas vindas a ele :)'
            }
        ]
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
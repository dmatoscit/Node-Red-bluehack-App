// Load
$(function () {

    //TODO: trazer informações do banco
    var user = {
        name: 'Francisco',
        email: 'fcarlos@ciandt.com',
    }

    fillUserInterests();
    fillUsersChatList();
});


// FUNCTIONS

function fillUserInterests() {

    //TODO: trazer do banco
    var interests = [
        {
            type: 'interests',
            description: 'RUNNING, LONDRES, PROGRAMAÇÃO'
        },
        {
            type: 'music-genre',
            description: 'POP, ROCK, HIP-HOP',
        },
        {
            type: 'music-artists',
            description: 'U2, ENGENHEIROS DO HAWAII, DJAVAN'
        }
    ]

    var interestsCloud = [];

    interests.forEach(function (interest) {
        interestsCloud = interestsCloud.concat(interest.description.split(','));
    }, this);

    var items = [];

    $.each(interestsCloud, function (id, option) {
        items.push('<li class="fa-li">' + option + '</li>');
    });

    $('#tagCloud').html(items.join(''));
}

function fillUsersChatList() {
    //TODO: trazer do banco
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
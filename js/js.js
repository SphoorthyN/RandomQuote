// var wh = $(window).height();
// var ww = $(window).width();
// $(window).resize(function () {
//     wh = $(window).height();
//     ww = $(window).width();
//     // console.log("wh:"+wh+ " bodyH:"+ $('body').height() );
//     // console.log("ww:"+ww+ " bodyW:"+ $('body').width());
//     // console.log("\n"+"\n");
//     $('body').css({
//         minWidth: ww,
//         minHeight: wh
//     });
// });

var button = $('button');
var quote = $('#quote');
var author = $('#author');
button.on('click', function () {
    quote.addClass("fade-out").removeClass("fade-in");
    author.addClass("fade-out").removeClass("fade-in");
    ajaxRequest();
    setTimeout(function () {
        quote.addClass("fade-in").removeClass("fade-out");
        author.addClass("fade-in").removeClass("fade-out");
    }, 1500)
});

// JSON and AJAX

function ajaxRequest() {
    var request = new XMLHttpRequest();
    request.open('GET', "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies&count=1");
    request.setRequestHeader("X-Mashape-Key", "Ry9j81Rdgtmsh2bzisdgOIAWf8d4p1U1T0Hjsnz82pM3Uwp2Kv");
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var data = JSON.parse(request.responseText);
            var myQuote = data.quote;
            var myAuthor = data.author;
            quote.html(myQuote);
            author.html(myAuthor);
            // changeHTML();
        }
    };
    request.send();
}

function changeHTML() {
    // $(window).delay(300);
    // quote.addClass("fade-in");
    // author.addClass("fade-in");
}

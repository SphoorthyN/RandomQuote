var button = $('#button');
var quote = $('#quote');
var author = $('#author');
var tweet = $('#tweet');

var Red = getRandomInt(0, 256); //uses the 'getRandomInt function to get a randomSix 'integer' between 0 and 266 inclusive
var Green = getRandomInt(0, 256);
var Blue = getRandomInt(0, 256);
var Dark = colorShade(Red, Green, Blue, 0.5);
var Light = colorShade(Red, Green, Blue, 1);
var darkTw = colorShade(0, 132, 180, 1.5);
var LightTw = colorShade(Red, Green, Blue, 0.8);
$('body').css({
    backgroundColor: Light
});
button.css({
    background: Dark,
    color: "white"
});
tweet.children().css({
    color: LightTw,
    cursor: "default"
});

var oldLight = "";
button.on('click', function () {
    var red = getRandomInt(0, 256); //uses the 'getRandomInt function to get a randomSix 'integer' between 0 and 266 inclusive
    var green = getRandomInt(0, 256);
    var blue = getRandomInt(0, 256);
    var dark = colorShade(red, green, blue, 0.5);
    var light = colorShade(red, green, blue, 1);
    var lightTw = colorShade(red, green, blue, 0.9);
    var hsl = contrast(rgbToHsl(red, green, blue));
    button.css({
        // boxShadow: "inset 35px 0 0px "+ oldLight+", inset -35px 0 0px "+ oldLight,
        width: "20%",
        borderRadius: "10px 10px 10px 10px",
        color: "transparent",
        transition: "1000ms"
    });
    setTimeout(function () {
        button.css({
            // boxShadow: "inset 35px 0 0px "+ oldLight+", inset -35px 0 0px "+ oldLight,
            width: "40%",
            borderRadius: "40px 10px 40px 10px",
            color: "white",
            background: dark,
            transition: "1000ms"
        });
    },1000);
    quote.addClass("fade-out").removeClass("fade-in quote-style");
    author.addClass("fade-out").removeClass("fade-in");
    quote.css({
        borderLeft: ("10px solid " + dark),
        borderRight: ("10px solid " + dark),
        color: hsl,
    });
    author.css({
        color: hsl
    });
    // ---------------
    ajaxRequest();
    // ---------------
    setTimeout(function () {
        quote.addClass("fade-in quote-style").removeClass("fade-out");
        author.addClass("fade-in").removeClass("fade-out");
        $('body').css({
            backgroundColor: light,
            transition: "background-color 700ms"
        });
        button.css({

            transition: "600ms"
        });
        tweet.children().css({
            color: lightTw,
            cursor: "pointer",
            transition: "600ms"
        });
    }, 1100);
    tweet.hover(function () {
        $('#tw').removeClass('white').addClass('white-press').css({
            color: darkTw
        });
        // console.log("hh");
    }, function () {
        $('#tw').removeClass('white-press').addClass('white').css({
            color: lightTw
        });
    });
    oldLight = colorShade(red, green, blue, 1);
});



// JSON and AJAX

function ajaxRequest() {
    var request = new XMLHttpRequest();
    request.open('GET', "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies");
    request.setRequestHeader("X-Mashape-Key", "Ry9j81Rdgtmsh2bzisdgOIAWf8d4p1U1T0Hjsnz82pM3Uwp2Kv");
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            var data = JSON.parse(request.responseText);
            var myQuote = data.quote;
            var myAuthor = data.author;
            quote.html(myQuote);
            author.html("&mdash; " + myAuthor);
            $('#tweet').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&text='
                + encodeURIComponent('"' + myQuote + '"  --- ' + myAuthor));
        }
    };
    request.send();
}

//copied it from MDN. This gives a randomSix integer between min and max, max exclusive.
function getRandomInt(min, max) {
    min = Math.ceil(min); //returns the smallest number greater than or equal to the number
    max = Math.floor(max); //returns the greatest number lesser than or equal to the number
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


//generates an rgb string of the correct format, spaces and all, which are randomSix r,g and b values along with an opacity value.
function colorShade(Red, Green, Blue, factor) {
    var red = Math.floor(Red * factor);
    var green = Math.floor(Green * factor);
    var blue = Math.floor(Blue * factor);
    return "rgb(" + red + ", " + green + ", " + blue + ")"; //returns this string, which is added as a value to the array.
}


function contrast(hsl) {
    return "hsl(" + 0 + ", " + 0 + "%, " + hsl + "%)";
}

// --- from mjackson. url: https://gist.github.com/mjackson/5311256 ---

function rgbToHsl(r, g, b) {
    var r1 = r / 255;
    var g1 = g / 255;
    var b1 = b / 255;

    var maxColor = Math.max(r1, g1, b1);
    var minColor = Math.min(r1, g1, b1);
    //Calculate L:
    var L = (maxColor + minColor) / 2;
    var S = 0;
    var H = 0;
    if (maxColor !== minColor) {
        //Calculate S:
        if (L < 0.5) {
            S = (maxColor - minColor) / (maxColor + minColor);
        } else {
            S = (maxColor - minColor) / (2.0 - maxColor - minColor);
        }
        //Calculate H:
        if (r1 === maxColor) {
            H = (g1 - b1) / (maxColor - minColor);
        } else if (g1 === maxColor) {
            H = 2.0 + (b1 - r1) / (maxColor - minColor);
        } else {
            H = 4.0 + (r1 - g1) / (maxColor - minColor);
        }
    }

    L = L * 100;
    S = S * 100;
    H = H * 60;
    if (H < 0) {
        H += 360;
    }
    if (L > 50) {
        return 0;
    }
    else {
        return 100;
    }
}

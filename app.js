

(function ()
{


    function wrapAllVictims()
    {
        var node = document.querySelector('body');

        var textNodes = [], nonWhitespaceMatcher = /\S/;

        function getTextNodes(node)
        {
            if (node.nodeType == 3)
            {
                if (nonWhitespaceMatcher.test(node.nodeValue))
                {
                    textNodes.push(node);
                }
            }
            else
            {
                for (var i = 0, len = node.childNodes.length; i < len; ++i)
                {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }

        getTextNodes(node);


        for (var i = 0; i < textNodes.length; ++i)
        {
            var n = textNodes[i];
            if (n.parentNode.tagName !== 'rabbitrobbervictim')
            {
                var vel = document.createElement('rabbitrobbervictim');
                n.parentNode.insertBefore(vel, n);
                vel.appendChild(n);
            }
        }
    }







    window.RabbitRobber = function ()
    {
        var ct = this.elCt = document.createElement('div');
        ct.className = 'rabbit-ct';
        document.body.appendChild(ct);


        var r = this.el = document.createElement('div');
        r.className = 'rabbit';
        ct.appendChild(r);


        setTimeout(this.selectVictim.bind(this), 200);
    };


    window.RabbitRobber.prototype.getRandomEl = function getRandomEl(items)
    {
        var r = Math.floor(Math.random() * items.length);
        return items[r];
    }


    window.RabbitRobber.prototype.isElementInViewport = function isElementInViewport(el)
    {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }


    window.RabbitRobber.prototype.selectVictim = function selectVictim()
    {
        var els = document.querySelectorAll('rabbitrobbervictim');

        var el,
            tries = 0;

        if (els.length)
        {
            do
            {
                var el = this.getRandomEl(els);
                ++tries;
            }
            while ((!el || !el.innerText.length || !this.isElementInViewport(el)) && tries < 200);
        }

        if (tries < 200 && el)
        {
            this.move(el);
        }
        else
        {
            setTimeout(this.selectVictim.bind(this), 3000);
        }
    }


    window.RabbitRobber.prototype.move = function move(victim)
    {
        var bounds = victim.getBoundingClientRect();

        this.elCt.style.left = (bounds.left - 60 + (Math.random() - 0.5) * 10) + 'px';
        this.elCt.style.top = (bounds.top - 25 + (Math.random() - 0.5) * 5) + 'px';

        setTimeout(this.rob.bind(this, victim), 1500);
    }


    window.RabbitRobber.prototype.rob = function rob(victim)
    {
        if (!this.el.classList.contains('eaten'))
        {
            this.el.classList.add('eaten');
        }

        victim.textContent = victim.textContent.substr(1);
        victim.count = (victim.count || 0) + 1;

        if (victim.count >= 10 || !victim.textContent.length)
        {
            this.el.classList.remove('eaten');
            setTimeout(this.selectVictim.bind(this), 300);
        }
        else
        {
            setTimeout(this.rob.bind(this, victim), 200);
        }
    }






    wrapAllVictims();
    setInterval(wrapAllVictims, 5000);


    new RabbitRobber();





    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '\
    .rabbit-ct {\
        width: 100px;\
        height: 60px;\
        left: 300px;\
        top: 300px;\
        position: fixed;\
        z-index: 1000000;\
        transition: left 0.7s ease-in-out 0.3s, top 0.7s ease-in-out 0.3s\
    }\
    \
    .rabbit {\
        width: 100px;\
        height: 60px;\
        background: #ddd;\
        border-radius: 70% 90% 60% 50%;\
        position: relative;\
        -moz-transform: rotate(0deg) translate(-40px, 0);\
        -ms-transform: rotate(0deg) translate(-40px, 0);\
        -webkit-transform: rotate(0deg) translate(-40px, 0);\
        transform: rotate(0deg) translate(-40px, 0);\
        z-index: 1;\
        box-shadow: 0 0 4px rgba(150,150,150,0.5);\
    }\
    \
    .rabbit:before {\
        content: "";\
        position: absolute;\
        width: 20px;\
        height: 20px;\
        background: #ddd;\
        border-radius: 100%;\
        top: 10px;\
        left: -6px;\
        box-shadow: 80px 8px 0 -8px #3f3334,    92px 20px 0 -9px #888, 93px 21px 0 -9px #888, 94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    \
    .rabbit:after {\
        content: "";\
        position: absolute;\
        width: 15px;\
        height: 40px;\
        background: #ddd;\
        border-radius: 50% 100% 0 0;\
        -moz-transform: rotate(-30deg);\
        -ms-transform: rotate(-30deg);\
        -webkit-transform: rotate(-30deg);\
        transform: rotate(-30deg);\
        right: 10px;\
        top: -25px;\
        border-top: 1px solid #f7f5f4;\
        border-left: 1px solid #f7f5f4;\
        box-shadow: -10px 0 0 -2px #ddd;\
        transform-origin: 80% 100%;\
    }\
    \
    .rabbit.eaten:after {\
        -moz-animation: ears 0.5s infinite linear forwards;\
        -ms-animation: ears 0.5s infinite linear forwards;\
        -webkit-animation: ears 0.3s infinite linear forwards;\
        animation: ears 0.3s infinite linear forwards;\
    }\
    .rabbit.eaten:before {\
        -moz-animation: mouth 0.3s infinite linear forwards;\
        -ms-animation: mouth 0.3s infinite linear forwards;\
        -webkit-animation: mouth 0.3s infinite linear forwards;\
        animation: mouth 0.3s infinite linear forwards;\
    }\
    \
    @-webkit-keyframes ears {\
    0% {\
        -moz-transform: rotate(-35deg);\
        -ms-transform: rotate(-35deg);\
        -webkit-transform: rotate(-35deg);\
        transform: rotate(-35deg);\
    }\
    50% {\
        -moz-transform: rotate(-20deg);\
        -ms-transform: rotate(-20deg);\
        -webkit-transform: rotate(-20deg);\
        transform: rotate(-20deg);\
    }\
    }\
    \
    @keyframes ears {\
    0% {\
        -moz-transform: rotate(-35deg);\
        -ms-transform: rotate(-35deg);\
        -webkit-transform: rotate(-35deg);\
        transform: rotate(-35deg);\
    }\
    50% {\
        -moz-transform: rotate(-20deg);\
        -ms-transform: rotate(-20deg);\
        -webkit-transform: rotate(-20deg);\
        transform: rotate(-20deg);\
    }\
    }\
    \
    @-webkit-keyframes mouth {\
    0% {\
        box-shadow: 80px 8px 0 -8px #3f3334,    92px 20px 0 -9px #888,  93px 21px 0 -9px #888,  94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    50% {\
        box-shadow: 80px 8px 0 -8px #3f3334,    92px 20px 0 -10px #888, 93px 21px 0 -10px #888, 94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    }\
    \
    @keyframes mouth {\
    0% {\
        box-shadow: 80px 8px 0 -8px #3f3334,    92px 20px 0 -9px #888,  93px 21px 0 -9px #888,  94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    50% {\
        box-shadow: 80px 8px 0 -8px #3f3334,    92px 20px 0 -10px #888, 93px 21px 0 -10px #888, 94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    }\
    \
';
    document.getElementsByTagName('head')[0].appendChild(style);


})();





(function ()
{
    var RADIUS = 25;


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
                    if (node.childNodes[i].tagName != 'STYLE' &&
                        node.childNodes[i].tagName != 'SCRIPT' &&
                        node.childNodes[i].tagName != 'SCRIPT' &&
                        node.childNodes[i].tagName != 'RABBITROBBERVICTIM' &&
                        node.childNodes[i].tagName != 'RABBITROBBERHEAP')
                    {
                        getTextNodes(node.childNodes[i]);
                    }
                }
            }
        }

        getTextNodes(node);


        for (var i = 0; i < textNodes.length; ++i)
        {
            var n = textNodes[i];
            if (n.parentNode.tagName !== 'RABBITROBBERVICTIM')
            {
                var vel = document.createElement('rabbitrobbervictim');
                n.parentNode.insertBefore(vel, n);
                vel.appendChild(n);
            }
        }
    }


    function replaceAllImages()
    {
        var images = document.querySelectorAll('img');
        for (var i = 0 ; i < images.length; ++i)
        {
            var img = images[i];

            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            img.parentNode.insertBefore(canvas, img.nextSibling);

            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);

            img.remove();
        }
    }








    window.RabbitRobber = function ()
    {
        this.stolen = [];


        var ct = this.elCt = document.createElement('div');
        ct.className = 'rabbit-ct';
        document.body.appendChild(ct);


        var r = this.el = document.createElement('div');
        r.className = 'rabbit';
        ct.appendChild(r);

        var self = this;
        setTimeout(function ()
        {
            self.selectVictim();
        }, 200);
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
            (rect.left > 0 || rect.top > 0) &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }


    window.RabbitRobber.prototype.selectVictim = function selectVictim()
    {
        var el,
            els,
            tries = 0;

        if (Math.random() < 0.5)
        {
            els = document.querySelectorAll('rabbitrobbervictim')

            if (els.length)
            {
                do
                {
                    el = this.getRandomEl(els);
                    ++tries;
                }
                while ((!el || !el.textContent || !el.textContent.length || !this.isElementInViewport(el)) && tries < 200);
            }

        }
        else
        {
            els = document.querySelectorAll('canvas');

            if (els.length)
            {
                do
                {
                    el = this.getRandomEl(els);
                    ++tries;
                }
                while ((!el || !this.isElementInViewport(el)) && tries < 200);
            }
        }

        if (tries == 200)
        {
            el = null;
        }

        if (el)
        {
            this.move(el);
        }
        else
        {
            var self = this;
            setTimeout(function ()
            {
                self.selectVictim();
            }, 1000);
        }
    };

    window.RabbitRobber.prototype.selectPositionAtCanvas = function selectPositionAtCanvas(canvas)
    {
        var ctx = canvas.getContext("2d");

        var x = 0,
            y = null;

        while (y == null && canvas.width != 0 && canvas.height != 0)
        {
            var imageData = ctx.getImageData(0, 0, 1, canvas.height);
            var data = imageData.data;
            var candidates = [];

            for (i = 0; i < data.length; i += RADIUS * 4)
            {
                if (data[i + 3] > 0)
                {
                    candidates.push(i / 4);
                }
            }

            if (candidates.length)
            {
                y = this.getRandomEl(candidates);
            }
            else
            {
                break;
            }
        }

        if (y !== null)
        {
            canvas.RABBITROBBER_Y = y;

            return {
                x: x,
                y: y
            };
        }
    };


    window.RabbitRobber.prototype.move = function move(victim)
    {
        var bounds = victim.getBoundingClientRect(),
            x = bounds.left,
            y = bounds.top;

        if (victim.nodeName == 'CANVAS')
        {
            var p = this.selectPositionAtCanvas(victim);
            if (p)
            {
                x += p.x;
                y += p.y;
            }
            else
            {
                victim.remove();
                this.selectVictim();
                return;
            }
        }

        this.elCt.style.left = (x - 60 + (Math.random() - 0.5) * 10) + 'px';
        this.elCt.style.top = (y - 25 + (Math.random() - 0.5) * 5) + 'px';

        victim.countStolen = 0;

        var self = this;
        setTimeout(function ()
        {
            self.rob(victim);
        }, 1500);
    }



    window.RabbitRobber.prototype.rob = function rob(victim)
    {
        if (!this.el.classList.contains('eaten'))
        {
            this.el.classList.add('eaten');
        }

        var empty = false;
        var count = 5 + Math.random() * 5;

        if (victim.nodeName == 'CANVAS')
        {
            var ctx = victim.getContext("2d");
            ctx.putImageData(ctx.getImageData(RADIUS, victim.RABBITROBBER_Y, victim.width, RADIUS), 0, victim.RABBITROBBER_Y);
        }
        else
        {
            this.stolen.push(victim.textContent[0]);
            victim.textContent = victim.textContent.substr(1);
            if (!victim.textContent.length)
            {
                empty = true;
                victim.remove();
            }
        }

        victim.countStolen = (victim.countStolen || 0) + 1;

        var self = this;

        if (victim.countStolen >= count || empty)
        {
            this.el.classList.remove('eaten');
            if (this.stolen.length && Math.random() > 0.7)
            {
                setTimeout(function ()
                {
                    self.moveToHeap();
                }, 300);
            }
            else
            {
                setTimeout(function ()
                {
                    self.selectVictim();
                }, 300);
            }
        }
        else
        {
            setTimeout(function ()
            {
                self.rob(victim);
            }, 200);
        }
    }

    window.RabbitRobber.prototype.moveToHeap = function moveToHeap()
    {
        var bounds = heap.getBoundingClientRect();

        this.elCt.style.left = (bounds.left + 70 + (Math.random() - 0.5) * 20) + 'px';
        this.elCt.style.top = (bounds.top - 35 + (Math.random() - 0.5) * 10) + 'px';

        var self = this;
        setTimeout(function ()
        {
            self.dump();
        }, 1500);
    }

    window.RabbitRobber.prototype.dump = function dump()
    {
        for (var i = 0; i < 5 && i < this.stolen.length; ++i)
        {
            var span = document.createElement('span');
            span.textContent = this.stolen[i];
            heap.appendChild(span);

            (function (span, i)
            {
                setTimeout(function ()
                {
                    ++heap.countDumped;
                    span.style.left = (50 + (Math.random() - 0.5) * (heap.countDumped < 200 ? heap.countDumped : 200)) + 'px';
                    span.style.bottom = ((Math.random()) * (heap.countDumped < 500 ? heap.countDumped / 5 : 100)) + 'px';
                }, 50 * i);
            })(span, i);

        }

        this.stolen = [];

        var self = this;
        setTimeout(function ()
        {
            self.selectVictim();
        }, 300);
    }






    var heapct = document.createElement('rabbitrobberheapct');
    document.body.appendChild(heapct);

    var heap = document.createElement('rabbitrobberheap');
    heapct.appendChild(heap);
    heap.countDumped = 0;


    var start = function ()
    {
        wrapAllVictims();
        setInterval(wrapAllVictims, 5000);

        replaceAllImages();

        new RabbitRobber();

    };

    if (document.readyState == 'complete')
    {
        start();
    }
    else
    {
        window.addEventListener('load', start);
    }



    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '\
    rabbitrobbervictim {\
        display: inline;\
    }\
    \
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
        box-shadow: 80px 8px 0 -7.5px #3f3334,    92px 20px 0 -9px #888, 93px 21px 0 -9px #888, 94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
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
        box-shadow: 80px 8px 0 -7.5px #3f3334,    92px 20px 0 -9px #888,  93px 21px 0 -9px #888,  94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    50% {\
        box-shadow: 80px 8px 0 -7.5px #3f3334,    92px 20px 0 -10px #888, 93px 21px 0 -10px #888, 94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    }\
    \
    @keyframes mouth {\
    0% {\
        box-shadow: 80px 8px 0 -7.5px #3f3334,    92px 20px 0 -9px #888,  93px 21px 0 -9px #888,  94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    50% {\
        box-shadow: 80px 8px 0 -7.5px #3f3334,    92px 20px 0 -10px #888, 93px 21px 0 -10px #888, 94px 21px 0 -9px #888, 95px 21px 0 -9px #888,     10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
    }\
    }\
    \
    rabbitrobberheapct {\
        display: block;\
        position: fixed;\
        left: 0;\
        bottom: 0;\
        width: 200px;\
        height: 100px;\
        z-index: 1000000;\
    }\
    rabbitrobberheap {\
        display: block;\
        position: relative;\
        left: 0;\
        bottom: 0;\
        width: 200px;\
        height: 100px;\
    }\
    rabbitrobberheap span{\
        font-size: 10px;\
        font-weight: bold;\
        display: block;\
        position: absolute;\
        left: 25%;\
        bottom: 50%;\
        transition: left 0.7s ease-in 0.3s, bottom 0.7s ease-in 0.3s\
    }\
';
    document.getElementsByTagName('head')[0].appendChild(style);



})();



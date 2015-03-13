
(function ()
{

    function getRandomEl(items)
    {
        var r = Math.floor(Math.random() * items.length);
        return items[r];
    }


    function getTextNodesIn(node, includeWhitespaceNodes)
    {
        var textNodes = [], nonWhitespaceMatcher = /\S/;

        function getTextNodes(node)
        {
            if (node.nodeType == 3)
            {
                if (includeWhitespaceNodes || nonWhitespaceMatcher.test(node.nodeValue))
                {
                    textNodes.push(node);
                }
            } else
            {
                for (var i = 0, len = node.childNodes.length; i < len; ++i)
                {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }

        getTextNodes(node);
        return textNodes;
    }





    function isElementInViewport(el)
    {
        var rect = el.getBoundingClientRect();

        return (
            rect.top > 0 &&
            rect.left > 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }




    function selectVictim()
    {
        var els = document.querySelectorAll('* *:not(title)');

        var tries = 0;
        do
        {
            do
            {
                var el = getRandomEl(els);
                var s = el.innerText;
                ++tries;
            }
            while ((!s || !s.length || !isElementInViewport(el)) && tries < 1000);

            var nodes = getTextNodesIn(el);
        }
        while (!nodes.length && tries < 1000)

        if (tries < 1000)
        {
            var n = getRandomEl(nodes);

            moveChicken({
                el: el,
                textNode: n
            });
        }
        else
        {
            setTimeout(selectVictim, 3000);
        }
    }





    function moveChicken(victim)
    {
        var bounds = victim.el.getBoundingClientRect();

        div.style.left = (bounds.left - 60 + (Math.random() - 0.5) * 10) + 'px';
        div.style.top = (bounds.top - 25 + (Math.random() - 0.5) * 5) + 'px';

        setTimeout(thieveChair.bind(this, victim), 1500);
    }


    function thieveChair(victim)
    {
        if (!chicken.classList.contains('eaten'))
        {
            chicken.classList.add('eaten');
        }

        victim.textNode.textContent = victim.textNode.textContent.substr(1);
        victim.count = (victim.count || 0) + 1;

        if (victim.count >= 10 || !victim.textNode.textContent.length)
        {
            chicken.classList.remove('eaten');
            setTimeout(selectVictim, 300);
        }
        else
        {
            setTimeout(thieveChair.bind(this, victim), 200);
        }
    }






    var div = document.createElement('div');
    div.className = 'rabbit-ct';
    document.body.appendChild(div);

    var chicken = document.createElement('div');
    chicken.className = 'rabbit';
    div.appendChild(chicken);


    setTimeout(selectVictim, 200);






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
        box-shadow: 80px 8px 0 -8px #3f3334, 10px 40px 0 #ddd, 80px 35px 0 -6px #ddd, 4px 35px 0 -4px #ddd, 88px 38px 0 -4px #ddd;\
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
        -webkit-box-shadow: -10px 0 0 -2px #ddd;\
        box-shadow: -10px 0 0 -2px #ddd;\
        transform-origin: 80% 100%;\
    }\
    \
    .rabbit.eaten:after {\
        -moz-animation: eat 0.5s infinite linear forwards;\
        -ms-animation: eat 0.5s infinite linear forwards;\
        -webkit-animation: eat 0.3s infinite linear forwards;\
        animation: eat 0.3s infinite linear forwards;\
    }\
    \
    @-webkit-keyframes eat {\
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
    @keyframes eat {\
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
';
    document.getElementsByTagName('head')[0].appendChild(style);


})();


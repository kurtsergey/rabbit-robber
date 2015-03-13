# rabbit-robber

Добавьте в закладки Bookmarklet, представленный ниже, откройте какой-либо сайт и запустите закладку.

Можно запустить несколько раз, но пока создаваемый зверь требователен к ресурсам компьютера.

Может не работать на сайтах с жесткой Content Security Policy, таких как GitHub.

Прототип CSS-кролика позаимствован на [codepen.io](http://codepen.io/katydecorah/pen/uIEFy)


```javascript
javascript: 
(function (src){
if (!window.RabbitRobberScript)
{
var s = window.RabbitRobberScript = document.createElement('script'); 
s.type = "text/javascript"; 
s.src = src; 
document.body.appendChild(s);
}
else if (window.RabbitRobber)
{
new RabbitRobber();
}
})('https://rawgit.com/kurtsergey/rabbit-robber/master/app.js');
```

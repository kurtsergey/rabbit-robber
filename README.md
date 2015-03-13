# chicken-thief

Добавьте в закладки Bookmarklet, представленный ниже, откройте какой-либо сайт и запустите закладку.

Можно запустить несколько раз, но пока создаваемый зверёк немного требователен к ресурсам компьютера.

Может не работать на сайтах с жесткой Content Security Policy.

Прототип CSS-кролика позаимствован на [codepen.io](http://codepen.io/katydecorah/pen/uIEFy)


```javascript
javascript: 
(function (){
var s = document.createElement('script'); 
s.type = "text/javascript"; 
s.src = 'https://rawgit.com/kurtsergey/chicken-thief/master/app.js'; 
document.body.appendChild(s);
})();
```

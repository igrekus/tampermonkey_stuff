// ==UserScript==
// @name         Bash.im comic text on popup.
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Load quote text to a pop-up on a comic strip info div.
// @author       igrekus
// @match        https://bash.im/strips/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
/*
    var sheet = window.document.styleSheets[0];
    sheet.insertRule(`
       .quote__footer:hover .popup {
          display: block;
       }
       .popup {
          display: none;
          background: #C8C8C8;
          margin-left: 28px;
          padding: 10px;
          position: absolute;
          z-index: 1000;
          width:100%;
          bottom: -10%;
          height:40%;
       }
       .quote__footer {
          margin:100px;
       }`, sheet.cssRules.length);
*/
    let quotes = document.getElementsByClassName('quote__author');
    for (let i = 0; i < quotes.length; ++i) {
        let item = quotes[i];
        let link = item.children[2].href;
        let quote = '';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, false);
        // https://bash.im/quote/437755
        xhr.send();
        if (xhr.status != 200) {
            console.log(xhr)
        } else {
            let t = xhr.responseText;
            let start = t.search('<div class="quote__body">');
            let end = t.search('<div class="quote__strips" data-debug="1">');
            quote = t.substring(start + 25, end).trim();
        }

        let parent = item.parentNode.parentNode;
        let span = document.createElement('div');
        span.innerHTML = quote;
        span.id = 'popup' + i;
        span.classList.add('popup');
        span.style = {
            visibility: 'hidden',
            //display: 'none',
            position: 'absolute',
            background: 'white',
            heignt: '40%',
            width: '100%',
            bottom: '-10%'
        }
        parent.appendChild(span);
        parent.onmouseover = function() {
            let el = document.getElementById('popup' + i);
            el.style.display = 'block';
            el.style.visibility = 'visible';
        }
        parent.onmouseout = function() {
            let el = document.getElementById('popup' + i);
            el.style.display = 'none';
            el.style.visibility = 'hidden';
        }
    }
})();

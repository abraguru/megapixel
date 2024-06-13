// ==UserScript==
// @name         VOFL | Kopírování emailů
// @namespace    http://tampermonkey.net/
// @version      2024-06-13
// @description  VOFL | Kopírování emailů
// @author       Vojta Florian
// @match        https://www.megapixel.cz/pdp/*
// @match        megapixel.cz/*
// @match        *megapixel2012.peckadesign.com/*
// @match        https://cdp.megapixel.meiro.io/*
// @match        https://app.smartemailing.cz/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=megapixel.cz
// @downloadURL  https://www.megapixel.cz/data/script/email_copy.js
// @updateURL    https://www.megapixel.cz/data/script/email_copy.js
// @grant        none
// ==/UserScript==


(function () {
    'use strict';
//    console.log("VOFL | Kopírování emailů: Aktuální URL: " + window.location.href);
    // Kopírování emailů
    //     Předpokládejme, že tato funkce je volána po úspěšném zkopírování textu
    function showToast(message) {
        // Vytvoření toast elementu, pokud ještě neexistuje
        let toast = document.getElementById('copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-toast';
            document.body.appendChild(toast);
            // Základní styly pro toast
            Object.assign(toast.style, {
                position: 'fixed',
                top: '100px',
                right: '100px',
                backgroundColor: 'rgba(60,60,60,0.9)',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                zIndex: 10000,
                display: 'none',
                fontSize: '14px',
            });
        }

        // Nastavení zprávy a zobrazení toastu
        toast.textContent = message;
        toast.style.display = 'block';

        // Skrytí toastu po 1 sekundách
        setTimeout(() => {
            toast.style.display = 'none';
        }, 1000);
    }
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Megapixel | Kopírování emailů: Email byl zkopírován do schránky: ' + text);
            showToast('Email byl zkopírován do schránky'); // Zobrazení toast zprávy místo alertu
        }).catch(err => {
            console.error('VOFL | Kopírování emailů: Nepodařilo se zkopírovat email do schránky', err);
        });
    }


    // Přidání posluchače události ke celému dokumentu
    document.body.addEventListener('click', function(e) {
        // Regex pro detekci e-mailové adresy
        const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;
        // Získání textu z cílového elementu
        const textContent = e.target.textContent || e.target.innerText;

        // Kontrola, zda text obsahuje e-mailovou adresu
        if (emailRegex.test(textContent)) {
            const emailMatch = textContent.match(emailRegex);
            if (emailMatch && emailMatch.length > 0) {
                const email = emailMatch[0];
                copyToClipboard(email);
            }
        }
    });
})();
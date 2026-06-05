// ==UserScript==
// @name         Menacing Horse
// @namespace    http://tampermonkey.net/
// @version      2026-06-05
// @description  Feed it or suffer the consequences
// @author       I was controled by the horse so it was not made by me
// @match        https://danbooru.donmai.us/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=donmai.us
// @grant        none
// ==/UserScript==

(function()
    {
    const HorsesDeadlyGazeTimer = 5 * 60 * 1000;
    const HorsesPerilousVictim = document.querySelector('#subnav-favorites').href.split('ordfav%3A')[1];
    if (!HorsesPerilousVictim) return; //The Horse knows mercy only to the woefully oblivious who know not their position in life.
    
    
    }
)();

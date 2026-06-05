// ==UserScript==
// @name         Peter The Horse Is Here
// @namespace    http://tampermonkey.net/
// @version      2026-06-05
// @description  Feed it or suffer the consequences
// @author       I was controled by the horse so it was not made by me
// @match        https://danbooru.donmai.us/*
// @resource     TheHorse https://github.com/Kawakijin/danbooru-userscripts/blob/main/HorseAssistedUploading/__platinum_arknights_drawn_by_okita__fd7202c44752af8d9b3d5348fb30b561.jpg?raw=true
// @grant        GM_getResourceURL
// ==/UserScript==

(function()
{
  const HorsesDeadlyGazeTimer = 3 * 60 * 1000;
  const HorsesPerilousVictim = document.body.dataset.currentUserName;
  if (!HorsesPerilousVictim) return; //The Horse grants mercy only to the woefully oblivious who know not their position in life.
  let LastFeedingTime = Number(localStorage.getItem('LastFeedingTime')) || Date.now();

  const PeterTheHorseIsHere = document.createElement('img');
  PeterTheHorseIsHere.src = GM_getResourceURL('TheHorse');
  Object.assign(PeterTheHorseIsHere.style,
                {
                  position: 'fixed',
                  inset: '0',
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  zIndex: '9001',
                  opacity: '0',
                  pointerEvents: 'none',
                });
  document.body.appendChild(PeterTheHorseIsHere);

  async function LastMeal()
  {
    const Bowl = await fetch(`/posts.json?tags=user:${HorsesPerilousVictim}&limit=1`);
    const Food = await Bowl.json();
    if (Food.length)
    {
      LastFeedingTime = new Date(Food[0].created_at).getTime();
      localStorage.setItem('LastFeedingTime', LastFeedingTime);
    }
  }

  function update()
  {
    const TimeSinceFeeding = Date.now() - LastFeedingTime;
    const HorseOpacity = Math.min(1, TimeSinceFeeding / HorsesDeadlyGazeTimer);
    PeterTheHorseIsHere.style.opacity = HorseOpacity;
    if (HorseOpacity >= 1)
    {
      const Neigh = new Audio('https://github.com/Kawakijin/danbooru-userscripts/raw/refs/heads/main/HorseAssistedUploading/TheHorsesArdentCry.mp3');
      Neigh.play();
    }
  }

  LastMeal().then(update);
  setInterval(async () =>
  {
    await LastMeal();
    update();
  },60 * 1000);
  setInterval(update, 5000);
})();

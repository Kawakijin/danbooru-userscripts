// ==UserScript==
// @name         Copy Asset Link Simple
// @version      2026-11-24
// @author       Kawakijin
// @description  Copy asset links from the uploads page
// @homepageURL  https://github.com/Kawakijin/danbooru-userscripts
// @supportURL   https://github.com/Kawakijin/danbooru-userscripts/issues
// @updateURL    https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/dist/CopyAssetLinkSimple.user.js
// @downloadURL  https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/dist/CopyAssetLinkSimple.user.js
// @match        https://danbooru.donmai.us/users/*/uploads*
// @match        https://cos.lycore.co/users/*/uploads*
// @icon         https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/resources/danbooru.svg
// @resource     CopySVG https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/resources/Copy.svg
// @grant        GM_getResourceURL
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle('.xt-button { opacity: 0.7;'
          + ' cursor: pointer;'
          + ' transition: opacity 0.15s, transform 0.1s, filter 0.1s; }'
          + ' .xt-button:hover { opacity: 1; }'
          + ' .xt-button:active { transform: scale(0.9);'
          + ' filter: brightness(0.7); }');

const CopySVG = GM_getResourceURL('CopySVG');

document.querySelectorAll('a[href*="/uploads/"]:has(img)').forEach(AssetLink =>
{
    AssetLink.style.position = 'relative';

    const CopyButton = document.createElement('img');
    CopyButton.src = CopySVG;
    CopyButton.className = 'xt-button';
    Object.assign(CopyButton.style,
    {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        width: '28px',
        height: '28px',
        zIndex: '100',
        padding: '3px',
        background: 'rgba(255, 255, 255, 0.25)',
        borderRadius: '3px',
    });

    CopyButton.onclick = async e =>
    {
        e.preventDefault();
        e.stopPropagation();

        const json = await (await fetch(`${AssetLink.pathname}.json?only=upload_media_assets[media_asset_id]`)).json();
        const id = json.upload_media_assets?.[0]?.media_asset_id;
        if (id)
        {
            GM_setClipboard(`${location.origin}/media_assets/${id}`, 'text');
        }
    };

    AssetLink.appendChild(CopyButton);
});

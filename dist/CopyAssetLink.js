// ==UserScript==
// @name         Copy Asset Link
// @version      2026-11-24
// @author       Kawakijin
// @description  Copy asset links from the uploads page
// @homepageURL  https://github.com/Kawakijin/danbooru-userscripts
// @supportURL   https://github.com/Kawakijin/danbooru-userscripts/issues
// @updateURL    https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/dist/CopyAssetLink.js
// @downloadURL  https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/dist/CopyAssetLink.js
// @match        https://danbooru.donmai.us/users/*/uploads*
// @match        https://cos.lycore.co/users/*/uploads*
// @icon         https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/resources/danbooru.svg
// @resource     AngelinaPog https://raw.githubusercontent.com/Kawakijin/danbooru-userscripts/refs/heads/main/resources/AngelinaPog.png
// @grant        GM_getResourceURL
// @grant        GM_setClipboard
// ==/UserScript==

const CopyButtonImage = GM_getResourceURL('AngelinaPog');
const Squishy = { transform: ['none', 'scale(1.2, 0.5)', 'none'] };

document.querySelectorAll('a[href*="/uploads/"]:has(img)').forEach(AssetLink =>
{
    AssetLink.style.position = 'relative';

    const CopyButton = document.createElement('img');
    CopyButton.src = CopyButtonImage;
    Object.assign(CopyButton.style,
                  {
                      position: 'absolute',
                      bottom: '1px',
                      right: '1px',
                      width: '32px',
                      height: '32px',
                      zIndex: '100',
                      cursor: 'pointer',
                      filter:
                      [
                          'drop-shadow(1px 0 0 #000)',
                          'drop-shadow(-1px 0 0 #000)',
                          'drop-shadow(0 1px 0 #000)',
                          'drop-shadow(0 -1px 0 #000)',
                         'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.6))',
                      ].join(' '),
                  transformOrigin: 'bottom center',
                  });

    CopyButton.onclick = async e =>
    {
        e.preventDefault();
        e.stopPropagation();

        const json = await (await fetch(`${AssetLink.pathname}.json?only=upload_media_assets[media_asset_id]`)).json();
        const id = json.upload_media_assets?.[0]?.media_asset_id;
        if (id)
        {
            GM_setClipboard(`${location.origin}/media_assets/${id}`, 'text',
                            () => CopyButton.animate(Squishy, 250));
        }
    };

    AssetLink.appendChild(CopyButton);
});

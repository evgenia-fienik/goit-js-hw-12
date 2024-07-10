import{S as d,i as m}from"./assets/vendor-0fc460d7.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const h="https://pixabay.com/api/",p="44774351-929c2aa0766411c652402d8c1";function g(n,t=1,o=12){const i=`${h}?key=${p}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&perPage=${o}`;return fetch(i).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).catch(e=>{throw console.error(e),e})}let c;function y(n){const t=document.querySelector(".gallery"),o=n.map(i=>b(i)).join("");t.innerHTML=o,c?c.refresh():c=new d(".gallery a")}function b({webformatURL:n,largeImageURL:t,tags:o,likes:i,views:e,comments:r,downloads:s}){return`
  <div class="photo-card">
  <a href="${t}">
    <img cass="img" src="${n}" alt="${o}" loading="lazy"/>
    </a>
      <div class="info">
        <p class="info-item"><b>Likes </b>${i}</p>
        <p  class="info-item"><b>Views </b>${e}</p>
        <p class="info-item"><b>Comments </b>${r}</p>
        <p class="info-item"><b>Downloads </b>${s}</p>
      </div>
</div>`}function a(n,t="info"){m[t]({title:"",message:n,position:"topRight"})}function L(){document.querySelector(".gallery").innerHTML=""}const $=document.querySelector(".search-form"),l=document.querySelector("#search-input"),f=document.querySelector(".loader");$.addEventListener("submit",n=>{n.preventDefault();const t=l.value.trim();if(!t){a("Please enter a search query.","warning");return}L(),v(),l.value="",g(t).then(o=>{if(u(),o.hits.length===0){a("Sorry, there are no images matching your search query. Please try again!","error");return}y(o.hits)}).catch(o=>{u(),a("Error: "+o.message)})});function v(){f.classList.remove("hidden")}function u(){f.classList.add("hidden")}
//# sourceMappingURL=commonHelpers.js.map

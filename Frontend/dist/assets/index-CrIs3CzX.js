(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t=18,n=``){let r={home:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,scan:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>`,navigate:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,ai:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 12.1"/><path d="M12 12 19 19"/><path d="m16 8 4-4"/><path d="M19 4h-4v4"/></svg>`,cart:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linecap="round" class="${n}"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,dashboard:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>`,products:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,inventory:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect width="20" height="12" x="2" y="6" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>`,map:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>`,"smart-cart":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,orders:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,recommendations:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>`,bags:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,analytics:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,settings:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,check:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polyline points="20 6 9 17 4 12"/></svg>`,"check-circle":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,"alert-triangle":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,search:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,plus:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>`,minus:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="5" x2="19" y1="12" y2="12"/></svg>`,trash:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,edit:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,camera:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,mic:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,"chevron-right":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polyline points="9 18 15 12 9 6"/></svg>`,weight:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.9 2.6l2 9A2 2 0 0 0 8.5 21h7a2 2 0 0 0 1.9-1.4l2-9A2 2 0 0 0 17.5 8z"/></svg>`,wifi:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>`,x:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,"arrow-right":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,sparkles:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>`,"shield-check":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,download:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,receipt:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><line x1="8" x2="16" y1="8" y2="8"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="8" x2="12" y1="16" y2="16"/></svg>`,clock:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,"arrow-left":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,flash:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,send:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,"chevron-left":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polyline points="15 18 9 12 15 6"/></svg>`,"chevron-down":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polyline points="6 9 12 15 18 9"/></svg>`,refresh:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,wallet:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`,"credit-card":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,"qr-code":`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`,globe:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,phone:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,dollar:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,tag:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/></svg>`,star:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,info:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`,battery:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect width="16" height="10" x="2" y="7" rx="2"/><line x1="22" x2="22" y1="11" y2="13"/></svg>`,signal:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V4"/></svg>`,users:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,truck:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-5.65a2 2 0 0 0-.59-1.42l-3.34-3.34A2 2 0 0 0 16.65 6H14"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>`,zap:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,filter:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,copy:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,printer:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>`,store:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/></svg>`,percent:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,list:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>`,bell:`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${n}"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`};return r[e]||r.home}var t=[{id:`loc-1`,name:`Entrance`,aisle:`Entrance`,section:`Foyer`,shelf:`Main`,x:0,y:0},{id:`loc-2`,name:`Aisle 1 – Dairy`,aisle:`Aisle 1`,section:`Dairy`,shelf:`Shelf A`,x:1,y:1},{id:`loc-3`,name:`Aisle 1 – Bakery`,aisle:`Aisle 1`,section:`Bakery`,shelf:`Shelf B`,x:1,y:2},{id:`loc-4`,name:`Aisle 2 – Grains`,aisle:`Aisle 2`,section:`Grains & Pulses`,shelf:`Shelf A`,x:2,y:1},{id:`loc-5`,name:`Aisle 2 – Spices`,aisle:`Aisle 2`,section:`Spices & Masala`,shelf:`Shelf B`,x:2,y:2},{id:`loc-6`,name:`Aisle 3 – Snacks`,aisle:`Aisle 3`,section:`Snacks`,shelf:`Shelf A`,x:3,y:1},{id:`loc-7`,name:`Aisle 3 – Beverages`,aisle:`Aisle 3`,section:`Beverages`,shelf:`Shelf B`,x:3,y:2},{id:`loc-8`,name:`Aisle 4 – Personal Care`,aisle:`Aisle 4`,section:`Personal Care`,shelf:`Shelf A`,x:4,y:1},{id:`loc-9`,name:`Aisle 4 – Household`,aisle:`Aisle 4`,section:`Household`,shelf:`Shelf B`,x:4,y:2},{id:`loc-10`,name:`Aisle 5 – Frozen`,aisle:`Aisle 5`,section:`Frozen Foods`,shelf:`Shelf A`,x:5,y:1},{id:`loc-11`,name:`Aisle 5 – Packaged`,aisle:`Aisle 5`,section:`Packaged Foods`,shelf:`Shelf B`,x:5,y:2},{id:`loc-12`,name:`Aisle 6 – Baby Care`,aisle:`Aisle 6`,section:`Baby Care`,shelf:`Shelf A`,x:6,y:1},{id:`loc-13`,name:`Fresh Produce`,aisle:`Produce`,section:`Fruits & Veg`,shelf:`Open`,x:0,y:3},{id:`loc-14`,name:`Checkout Counter`,aisle:`Checkout`,section:`Billing`,shelf:`Counter`,x:7,y:0}],n=[{id:`p-1`,barcode:`8901030864512`,name:`Amul Toned Milk 500 mL`,description:`Pasteurised toned milk, fresh 500 mL pouch`,category:`Dairy`,price:28,expectedWeight:510,unit:`500 mL`,locationId:`loc-2`,locationName:`Aisle 1 – Dairy`,image:`https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80`,stock:120,isActive:!0},{id:`p-2`,barcode:`8901030861023`,name:`Amul Butter 100 g`,description:`Pasteurised butter, salted, 100 g pack`,category:`Dairy`,price:55,expectedWeight:105,unit:`100 g`,locationId:`loc-2`,locationName:`Aisle 1 – Dairy`,image:`https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=400&q=80`,stock:80,isActive:!0},{id:`p-3`,barcode:`8906001301014`,name:`Nestle Dahi 400 g`,description:`Fresh creamy yogurt, 400 g cup`,category:`Dairy`,price:44,expectedWeight:415,unit:`400 g`,locationId:`loc-2`,locationName:`Aisle 1 – Dairy`,image:`https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80`,stock:60,isActive:!0},{id:`p-4`,barcode:`8901063026490`,name:`Britannia Bread 400 g`,description:`Soft sandwich bread, 400 g fresh loaf`,category:`Bakery`,price:42,expectedWeight:410,unit:`400 g`,locationId:`loc-3`,locationName:`Aisle 1 – Bakery`,image:`https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80`,stock:75,isActive:!0},{id:`p-5`,barcode:`8901063064188`,name:`Britannia Marie Gold 250 g`,description:`Classic crunchy tea biscuits, 250 g pack`,category:`Bakery`,price:30,expectedWeight:255,unit:`250 g`,locationId:`loc-3`,locationName:`Aisle 1 – Bakery`,image:`https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80`,stock:100,isActive:!0},{id:`p-6`,barcode:`8906073570017`,name:`India Gate Basmati Rice 1 kg`,description:`Premium long-grain aged basmati rice, 1 kg bag`,category:`Grains`,price:120,expectedWeight:1010,unit:`1 kg`,locationId:`loc-4`,locationName:`Aisle 2 – Grains`,image:`https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80`,stock:50,isActive:!0},{id:`p-7`,barcode:`8901058850073`,name:`Aashirvaad Atta 1 kg`,description:`Whole wheat flour, 100% pure 1 kg pack`,category:`Grains`,price:58,expectedWeight:1010,unit:`1 kg`,locationId:`loc-4`,locationName:`Aisle 2 – Grains`,image:`https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80`,stock:90,isActive:!0},{id:`p-8`,barcode:`8906014190024`,name:`Tata Dal Masoor 500 g`,description:`Unpolished red lentils, 500 g pack`,category:`Pulses`,price:72,expectedWeight:510,unit:`500 g`,locationId:`loc-4`,locationName:`Aisle 2 – Grains`,image:`https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80`,stock:70,isActive:!0},{id:`p-9`,barcode:`8901253001050`,name:`MDH Garam Masala 100 g`,description:`Authentic blended spice mix, 100 g box`,category:`Spices`,price:55,expectedWeight:105,unit:`100 g`,locationId:`loc-5`,locationName:`Aisle 2 – Spices`,image:`https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80`,stock:110,isActive:!0},{id:`p-10`,barcode:`8901252010019`,name:`Catch Red Chilli Powder 200 g`,description:`Fine ground red chilli powder, 200 g pack`,category:`Spices`,price:40,expectedWeight:205,unit:`200 g`,locationId:`loc-5`,locationName:`Aisle 2 – Spices`,image:`https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80`,stock:85,isActive:!0},{id:`p-11`,barcode:`8901071032730`,name:`Lay's Classic Salted 26 g`,description:`Crispy potato chips, classic salted 26 g`,category:`Snacks`,price:20,expectedWeight:26,unit:`26 g`,locationId:`loc-6`,locationName:`Aisle 3 – Snacks`,image:`https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=400&q=80`,stock:200,isActive:!0},{id:`p-12`,barcode:`8906017950015`,name:`Haldiram's Aloo Bhujia 200 g`,description:`Spicy crispy potato namkeen snack, 200 g`,category:`Snacks`,price:60,expectedWeight:205,unit:`200 g`,locationId:`loc-6`,locationName:`Aisle 3 – Snacks`,image:`https://images.unsplash.com/photo-1621996346565-e3d5d6281270?auto=format&fit=crop&w=400&q=80`,stock:150,isActive:!0},{id:`p-13`,barcode:`8901063141217`,name:`Tata Tea Premium 250 g`,description:`Rich blended black chai tea, 250 g pack`,category:`Beverages`,price:130,expectedWeight:255,unit:`250 g`,locationId:`loc-7`,locationName:`Aisle 3 – Beverages`,image:`https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80`,stock:45,isActive:!0},{id:`p-14`,barcode:`8901030009499`,name:`Nescafé Classic 50 g`,description:`100% pure instant coffee powder, 50 g jar`,category:`Beverages`,price:165,expectedWeight:60,unit:`50 g`,locationId:`loc-7`,locationName:`Aisle 3 – Beverages`,image:`https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80`,stock:55,isActive:!0},{id:`p-15`,barcode:`8901725100038`,name:`Real Fruit Juice Orange 1 L`,description:`100% Orange fruit drink, 1 L Tetra Pak`,category:`Beverages`,price:95,expectedWeight:1050,unit:`1 L`,locationId:`loc-7`,locationName:`Aisle 3 – Beverages`,image:`https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80`,stock:65,isActive:!0},{id:`p-16`,barcode:`8901030002483`,name:`Head & Shoulders Shampoo 180 mL`,description:`Anti-dandruff shampoo bottle, 180 mL`,category:`Personal Care`,price:199,expectedWeight:195,unit:`180 mL`,locationId:`loc-8`,locationName:`Aisle 4 – Personal Care`,image:`https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80`,stock:40,isActive:!0},{id:`p-17`,barcode:`8901396012060`,name:`Dettol Soap 75 g`,description:`Antibacterial germ protection soap bar, 75 g`,category:`Personal Care`,price:39,expectedWeight:78,unit:`75 g`,locationId:`loc-8`,locationName:`Aisle 4 – Personal Care`,image:`https://images.unsplash.com/photo-1607006482140-ae60f09444f0?auto=format&fit=crop&w=400&q=80`,stock:130,isActive:!0},{id:`p-18`,barcode:`8901030987869`,name:`Colgate Strong Teeth 200 g`,description:`Amino Shakti calcium toothpaste, 200 g tube`,category:`Personal Care`,price:85,expectedWeight:215,unit:`200 g`,locationId:`loc-8`,locationName:`Aisle 4 – Personal Care`,image:`https://images.unsplash.com/photo-1559598467-f8b76c8155d0?auto=format&fit=crop&w=400&q=80`,stock:95,isActive:!0},{id:`p-19`,barcode:`8901063071391`,name:`Vim Dishwash Bar 200 g`,description:`Degreasing lime dishwashing bar, 200 g`,category:`Household`,price:22,expectedWeight:205,unit:`200 g`,locationId:`loc-9`,locationName:`Aisle 4 – Household`,image:`https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=400&q=80`,stock:180,isActive:!0},{id:`p-20`,barcode:`8906002420047`,name:`Maggi Noodles 70 g`,description:`2-Minute masala instant noodles, 70 g pack`,category:`Packaged Foods`,price:14,expectedWeight:72,unit:`70 g`,locationId:`loc-11`,locationName:`Aisle 5 – Packaged`,image:`https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=400&q=80`,stock:300,isActive:!0}],r=[{cartId:`SC-101`,hardwareId:`ESP32-HX711-01`,customerName:`Rahul Sharma`,customerPhone:`+91 98765 43210`,status:`active`,itemCount:3,expectedWeightGrams:970,actualWeightGrams:968,toleranceGrams:50,weightStatus:`verified`,batteryLevel:92,rssi:`-58 dBm`,lastPing:`10s ago`},{cartId:`SC-102`,hardwareId:`ESP32-HX711-02`,customerName:`Priya Patel`,customerPhone:`+91 98123 45678`,status:`active`,itemCount:4,expectedWeightGrams:1250,actualWeightGrams:1450,toleranceGrams:50,weightStatus:`mismatch`,batteryLevel:78,rssi:`-64 dBm`,lastPing:`2s ago`},{cartId:`SC-103`,hardwareId:`ESP32-HX711-03`,customerName:`Amit Verma`,customerPhone:`+91 97654 32109`,status:`checked_out`,itemCount:6,expectedWeightGrams:2410,actualWeightGrams:2410,toleranceGrams:50,weightStatus:`verified`,batteryLevel:64,rssi:`-70 dBm`,lastPing:`1m ago`},{cartId:`SC-104`,hardwareId:`ESP32-HX711-04`,customerName:`Available (Docked)`,customerPhone:`-`,status:`idle`,itemCount:0,expectedWeightGrams:0,actualWeightGrams:0,toleranceGrams:50,weightStatus:`verified`,batteryLevel:100,rssi:`-45 dBm`,lastPing:`Just now`}],i=[{id:`ord-1001`,orderNumber:`SC-20260927-A8B9C1`,customerName:`Rahul Sharma`,customerPhone:`+91 98765 43210`,cartId:`SC-101`,items:[{name:`Amul Toned Milk 500 mL`,quantity:2,unitPrice:28,totalPrice:56},{name:`Britannia Bread 400 g`,quantity:1,unitPrice:42,totalPrice:42},{name:`India Gate Basmati Rice 1 kg`,quantity:1,unitPrice:120,totalPrice:120}],subtotal:218,tax:10.9,carryBagName:`Small Paper Bag`,carryBagCharge:2,totalAmount:230.9,paymentMethod:`upi`,status:`paid`,weightVerified:!0,createdAt:`2026-09-27 14:32`},{id:`ord-1002`,orderNumber:`SC-20260927-D4E5F6`,customerName:`Ananya Roy`,customerPhone:`+91 98989 12345`,cartId:`SC-105`,items:[{name:`Nescafé Classic 50 g`,quantity:1,unitPrice:165,totalPrice:165},{name:`Amul Butter 100 g`,quantity:2,unitPrice:55,totalPrice:110},{name:`Real Fruit Juice Orange 1 L`,quantity:2,unitPrice:95,totalPrice:190}],subtotal:465,tax:23.25,carryBagName:`Small Cloth Bag`,carryBagCharge:5,totalAmount:493.25,paymentMethod:`card`,status:`paid`,weightVerified:!0,createdAt:`2026-09-27 13:15`},{id:`ord-1003`,orderNumber:`SC-20260927-G7H8I9`,customerName:`Vikram Singh`,customerPhone:`+91 91234 56789`,cartId:`SC-106`,items:[{name:`Maggi Noodles 70 g`,quantity:4,unitPrice:14,totalPrice:56},{name:`Lay's Classic Salted 26 g`,quantity:2,unitPrice:20,totalPrice:40}],subtotal:96,tax:4.8,carryBagName:`No Bag`,carryBagCharge:0,totalAmount:100.8,paymentMethod:`cash`,status:`confirmed`,weightVerified:!0,createdAt:`2026-09-27 11:45`}],a=[{id:`ai-rec-1`,triggerProduct:`Amul Toned Milk 500 mL`,suggestedProduct:`Britannia Bread 400 g`,reason:`Frequently bought together for breakfast`,boostPercentage:24,isActive:!0},{id:`ai-rec-2`,triggerProduct:`Tata Tea Premium 250 g`,suggestedProduct:`Britannia Marie Gold 250 g`,reason:`Classic evening tea combination`,boostPercentage:35,isActive:!0},{id:`ai-rec-3`,triggerProduct:`Maggi Noodles 70 g`,suggestedProduct:`Real Fruit Juice Orange 1 L`,reason:`Popular quick snack meal pairing`,boostPercentage:18,isActive:!0},{id:`ai-rec-4`,triggerProduct:`Lay's Classic Salted 26 g`,suggestedProduct:`Haldiram's Aloo Bhujia 200 g`,reason:`Snack bundle recommendation`,boostPercentage:15,isActive:!0}],o=new class{constructor(){this.listeners=new Set,this.loadInitialState()}loadInitialState(){let e=localStorage.getItem(`sc_products`),o=localStorage.getItem(`sc_customer_cart`),s=localStorage.getItem(`sc_orders`),c=localStorage.getItem(`sc_bags`),l=localStorage.getItem(`sc_weight_tolerance`),u=localStorage.getItem(`sc_budget_cap`),d=localStorage.getItem(`sc_ai_recs`);this.products=(e?JSON.parse(e):n).map(e=>{let t=e.locationName?e.locationName.split(`–`):[`Aisle 1`,`Shelf A`],n=e.aisle||(t[0]?t[0].trim():`Aisle 1`),r=e.shelf||(t[1]?t[1].trim():`Shelf A`);return{id:e.id,name:e.name,barcode:e.barcode,price:parseFloat(e.price),category:e.category,image:e.image,stock:e.stock===void 0?50:parseInt(e.stock),aisle:n,shelf:r,unit:e.unit||`1 unit`,expectedWeight:parseFloat(e.expectedWeight||200),description:e.description||``,locationId:e.locationId||`loc-2`,locationName:e.locationName||`${n} – ${r}`,isActive:e.isActive===void 0||e.isActive,discount:parseFloat(e.discount||0),tax:parseFloat(e.tax||5)}}),this.locations=t,this.carryBags=c?JSON.parse(c).map(e=>({...e,stock:e.stock===void 0?e.inventory===void 0?100:e.inventory:e.stock,inventory:e.inventory===void 0?e.stock===void 0?100:e.stock:e.inventory,enabled:e.enabled===void 0?e.isEnabled===void 0||e.isEnabled:e.enabled,isEnabled:e.isEnabled===void 0?e.enabled===void 0||e.enabled:e.isEnabled})):[{id:`bag-none`,name:`No Bag`,price:0,stock:9999,inventory:9999,enabled:!0,isEnabled:!0,description:`Bring your own bag / carry items`},{id:`bag-paper-small`,name:`Paper Bag`,price:5,stock:450,inventory:450,enabled:!0,isEnabled:!0,description:`Eco-friendly • Holds up to 5kg`},{id:`bag-paper-large`,name:`Large Paper Bag`,price:10,stock:280,inventory:280,enabled:!0,isEnabled:!0,description:`High strength • Holds up to 10kg`},{id:`bag-reusable`,name:`Reusable Bag`,price:25,stock:150,inventory:150,enabled:!0,isEnabled:!0,description:`Heavy duty washable cotton bag`}],this.smartCarts=r,this.orders=s?JSON.parse(s):i,this.aiRecommendations=d?JSON.parse(d):a,this.budgetCap=u?parseFloat(u):1500,this.activeRole=`customer`,this.customerTab=`home`,this.adminTab=`dashboard`,this.selectedProduct=this.products[0],this.navTargetProductId=`p-6`,this.lastCompletedOrder=null,this.cart=o?JSON.parse(o):{cartId:`CART #07`,items:[{...n[0],quantity:1,addedAt:new Date().toISOString()},{...n[5],quantity:1,addedAt:new Date().toISOString()},{...n[7],quantity:1,addedAt:new Date().toISOString()}],selectedBagId:`bag-paper-large`,selectedBagQuantity:1,simulatedActualWeight:2030,toleranceGrams:l?parseFloat(l):50},this.settings={storeName:`SuperMart — Hazratganj`,storeAddress:`100 Feet Road, Hazratganj, Lucknow`,weightToleranceGrams:l?parseFloat(l):50,enableLoadCellSimulation:!0,currencySymbol:`₹`,supabaseUrl:localStorage.getItem(`sc_supabase_url`)||`https://xyzcompany.supabase.co`,supabaseKey:localStorage.getItem(`sc_supabase_key`)||`anon-public-key-placeholder`},this.toast=null,this.scannerState=`idle`,this.scannedProduct=null,this.itemToRemove=null,this.selectedPaymentMethod=`upi`}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notify(){this.listeners.forEach(e=>e(this)),this.persist()}persist(){localStorage.setItem(`sc_products`,JSON.stringify(this.products)),localStorage.setItem(`sc_customer_cart`,JSON.stringify(this.cart)),localStorage.setItem(`sc_orders`,JSON.stringify(this.orders)),localStorage.setItem(`sc_bags`,JSON.stringify(this.carryBags)),localStorage.setItem(`sc_ai_recs`,JSON.stringify(this.aiRecommendations)),localStorage.setItem(`sc_budget_cap`,this.budgetCap.toString()),localStorage.setItem(`sc_weight_tolerance`,this.settings.weightToleranceGrams.toString())}getProductsSubtotal(){return this.cart.items.reduce((e,t)=>e+t.price*t.quantity,0)}getSelectedBag(){return this.carryBags.find(e=>e.id===this.cart.selectedBagId)||this.carryBags[0]}getBagQuantity(){return this.cart.selectedBagId===`bag-none`?0:Math.max(1,parseInt(this.cart.selectedBagQuantity||1))}getBagTotal(){let e=this.getSelectedBag();return!e||e.id===`bag-none`?0:e.price*this.getBagQuantity()}getDiscount(){return 0}getTax(){let e=this.getProductsSubtotal();return Math.round(e*.05*100)/100}getCartTotal(){let e=this.getProductsSubtotal(),t=this.getBagTotal(),n=this.getDiscount(),r=this.getTax();return Math.round((e+t-n+r)*100)/100}getAmountSpent(){return this.getCartTotal()}getRemainingBudget(){let e=this.getAmountSpent();return Math.round((this.budgetCap-e)*100)/100}getBudgetProgressPercentage(){let e=this.getAmountSpent();return Math.min(100,Math.round(e/(this.budgetCap||1)*100))}getBudgetStatus(){let e=this.getRemainingBudget(),t=this.getBudgetProgressPercentage();return e<0?{state:`exceeded`,label:`⚠️ Budget Exceeded by ₹${Math.abs(e).toFixed(2)}!`,color:`text-red-700`,bg:`bg-red-50 border-red-300`,badge:`EXCEEDED`}:t>=80||e<=150?{state:`warning`,label:`⚠️ Nearing Budget Limit! Only ₹${e.toFixed(2)} left.`,color:`text-amber-800`,bg:`bg-amber-50 border-amber-300`,badge:`NEAR LIMIT`}:{state:`normal`,label:`Within Budget Cap (₹${e.toFixed(2)} remaining)`,color:`text-emerald-700`,bg:`bg-emerald-50 border-emerald-200`,badge:`ON TRACK`}}setBudgetCap(e){this.budgetCap=Math.max(100,parseFloat(e)),this.showToast(`Budget cap set to ₹${this.budgetCap}`,`success`),this.notify()}getCartItemCount(){return this.cart.items.reduce((e,t)=>e+t.quantity,0)}getDynamicRecommendations(){let e=new Set(this.cart.items.map(e=>e.id)),t=[];if(this.cart.items.some(e=>e.name.toLowerCase().includes(`milk`))){let n=this.products.find(t=>t.name.toLowerCase().includes(`butter`)&&!e.has(t.id));n&&t.push({...n,reason:`Pairs great with Milk for breakfast`,tag:`+15% PAIR DEAL`})}if(this.cart.items.some(e=>e.name.toLowerCase().includes(`rice`))){let n=this.products.find(t=>t.name.toLowerCase().includes(`dal`)&&!e.has(t.id));n&&t.push({...n,reason:`Complete Dal-Chawal meal pairing`,tag:`BEST COMBO`})}return this.products.forEach(n=>{!e.has(n.id)&&!t.some(e=>e.id===n.id)&&n.isActive&&t.push({...n,reason:`Popular item in ${n.category} section`,tag:`TRENDING`})}),t.slice(0,4)}getAiContext(){return{storeName:this.settings.storeName,cartId:this.cart.cartId,items:this.cart.items.map(e=>({name:e.name,quantity:e.quantity,price:e.price,location:e.locationName})),itemCount:this.getCartItemCount(),spent:this.getAmountSpent(),budgetCap:this.budgetCap,remaining:this.getRemainingBudget(),productsCatalog:this.products.map(e=>({name:e.name,price:e.price,category:e.category,location:e.locationName,stock:e.stock}))}}addToCart(e,t=1){let n=Math.max(1,parseInt(t)),r=this.cart.items.findIndex(t=>t.id===e.id);r>=0?this.cart.items[r].quantity+=n:this.cart.items.push({...e,quantity:n,addedAt:new Date().toISOString()});let i=this.getExpectedWeight(),a=Math.random()*4-2;this.cart.simulatedActualWeight=Math.round((i+a)*10)/10,this.getRemainingBudget()<0?this.showToast(`⚠️ Budget Exceeded! Total: ₹${this.getCartTotal().toFixed(2)} / Cap: ₹${this.budgetCap}`,`error`):this.showToast(`Added ${n}x ${e.name} (₹${(e.price*n).toFixed(2)})`,`success`),this.notify()}updateQuantity(e,t){let n=this.cart.items.find(t=>t.id===e);if(!n)return;if(n.quantity+=t,n.quantity<=0){this.promptRemoveItem(e);return}let r=this.getExpectedWeight(),i=Math.random()*4-2;this.cart.simulatedActualWeight=Math.round((r+i)*10)/10,this.notify()}promptRemoveItem(e){let t=this.cart.items.find(t=>t.id===e);t&&(this.itemToRemove=t,this.notify())}confirmRemoveItem(){if(this.itemToRemove){let e=this.itemToRemove.name;this.cart.items=this.cart.items.filter(e=>e.id!==this.itemToRemove.id),this.itemToRemove=null;let t=this.getExpectedWeight(),n=Math.random()*4-2;this.cart.simulatedActualWeight=Math.round((t+n)*10)/10,this.showToast(`Removed ${e} from cart`,`info`),this.notify()}}cancelRemoveItem(){this.itemToRemove=null,this.notify()}setCarryBagOption(e){this.cart.selectedBagId=e,e===`bag-none`?this.cart.selectedBagQuantity=0:(!this.cart.selectedBagQuantity||this.cart.selectedBagQuantity<1)&&(this.cart.selectedBagQuantity=1);let t=this.getSelectedBag();this.showToast(`Carry bag: ${t.name}`,`info`),this.notify()}updateCarryBagQuantity(e){if(this.cart.selectedBagId===`bag-none`)return;let t=Math.max(1,parseInt(this.cart.selectedBagQuantity||1))+e;t<=0?(this.cart.selectedBagId=`bag-none`,this.cart.selectedBagQuantity=0):this.cart.selectedBagQuantity=t,this.notify()}setSimulatedActualWeight(e){this.cart.simulatedActualWeight=parseFloat(e),this.notify()}processPayment(e=`upi`){if(this.cart.items.length===0)return this.showToast(`Your cart is empty`,`error`),null;this.selectedPaymentMethod=e;let t=this.getWeightVerificationStatus(),n=this.getSelectedBag(),r=this.getBagQuantity(),i=this.getProductsSubtotal(),a=this.getTax(),o=this.getCartTotal(),s=`SC-${new Date().toISOString().slice(0,10).replace(/-/g,``)}-${Math.random().toString(36).substring(2,7).toUpperCase()}`,c=`TXN-${new Date().toISOString().slice(0,10).replace(/-/g,``)}-${Math.floor(1e5+Math.random()*9e5)}`,l={id:`ord-${Date.now()}`,orderNumber:s,txnId:c,customerName:`Alex Sharma`,customerPhone:`+91 98765 43210`,cartId:this.cart.cartId,items:this.cart.items.map(e=>({id:e.id,name:e.name,quantity:e.quantity,unitPrice:e.price,totalPrice:Math.round(e.price*e.quantity*100)/100})),subtotal:i,discount:this.getDiscount(),tax:a,carryBagName:r>0?`${n.name}`:`No Bag`,carryBagQuantity:r,carryBagCharge:this.getBagTotal(),totalAmount:o,paymentMethod:e,status:`paid`,weightVerified:t.status===`verified`,createdAt:new Date().toLocaleString()};return this.cart.items.forEach(e=>{let t=this.products.find(t=>t.id===e.id);t&&(t.stock=Math.max(0,t.stock-e.quantity))}),n&&n.id!==`bag-none`&&(n.inventory=Math.max(0,n.inventory-r)),this.orders.unshift(l),this.lastCompletedOrder=l,this.cart.items=[],this.cart.simulatedActualWeight=0,this.customerTab=`payment-success`,this.notify(),l}checkoutCart(e=`upi`){return this.processPayment(e)}addProduct(e){let t=`p-${Date.now()}`,n=e.locationName?e.locationName.split(`–`):[`Aisle 1`,`Shelf A`],r=e.aisle||(n[0]?n[0].trim():`Aisle 1`),i=e.shelf||(n[1]?n[1].trim():`Shelf A`),a={...e,id:t,name:e.name||`New Item`,barcode:e.barcode||`${Math.floor(89e11+Math.random()*99999999999)}`,category:e.category||`General`,price:parseFloat(e.price||0),discount:parseFloat(e.discount||0),tax:parseFloat(e.tax||5),expectedWeight:parseFloat(e.expectedWeight||200),stock:parseInt(e.stock===void 0?50:e.stock),aisle:r,shelf:i,locationName:e.locationName||`${r} – ${i}`,isActive:!0,image:e.image||`https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80`,description:e.description||``};this.products.unshift(a),this.showToast(`Product "${a.name}" added`,`success`),this.notify()}updateProduct(e,t){let n=this.products.findIndex(t=>t.id===e);if(n>=0){let r=this.products[n],i=t.aisle||r.aisle,a=t.shelf||r.shelf,o=t.price===void 0?r.price:parseFloat(t.price);this.products[n]={...r,...t,price:o,discount:t.discount===void 0?r.discount:parseFloat(t.discount),tax:t.tax===void 0?r.tax:parseFloat(t.tax),expectedWeight:t.expectedWeight===void 0?r.expectedWeight:parseFloat(t.expectedWeight),stock:t.stock===void 0?r.stock:parseInt(t.stock),aisle:i,shelf:a};let s=this.cart.items.find(t=>t.id===e);if(s){s.price=o,t.name!==void 0&&(s.name=t.name),t.expectedWeight!==void 0&&(s.expectedWeight=parseFloat(t.expectedWeight)),t.image!==void 0&&(s.image=t.image),t.unit!==void 0&&(s.unit=t.unit);let e=this.getExpectedWeight(),n=Math.random()*4-2;this.cart.simulatedActualWeight=Math.round((e+n)*10)/10}this.selectedProduct&&this.selectedProduct.id===e&&(this.selectedProduct=this.products[n]),this.scannedProduct&&this.scannedProduct.id===e&&(this.scannedProduct=this.products[n]),this.showToast(`Product updated successfully`,`success`),this.notify()}}deleteProduct(e){this.products=this.products.filter(t=>t.id!==e),this.cart.items=this.cart.items.filter(t=>t.id!==e),this.selectedProduct&&this.selectedProduct.id===e&&(this.selectedProduct=this.products[0]||null),this.scannedProduct&&this.scannedProduct.id===e&&(this.scannedProduct=this.products[0]||null);let t=this.getExpectedWeight(),n=Math.random()*4-2;this.cart.simulatedActualWeight=Math.round((t+n)*10)/10,this.showToast(`Product removed`,`success`),this.notify()}updateStock(e,t){let n=this.products.find(t=>t.id===e);n&&(n.stock=Math.max(0,parseInt(t)),this.showToast(`Stock updated for ${n.name}`,`success`),this.notify())}toggleProductStatus(e){let t=this.products.find(t=>t.id===e);t&&(t.isActive=!t.isActive,this.showToast(`${t.name} is now ${t.isActive?`active`:`disabled`}`,`info`),this.notify())}addCarryBag(e){let t=parseInt(e.stock||e.inventory||100),n={...e,id:`bag-${Date.now()}`,name:e.name||`Custom Bag`,price:parseFloat(e.price||0),stock:t,inventory:t,enabled:e.enabled===void 0||e.enabled,isEnabled:e.enabled===void 0||e.enabled,description:e.description||`Supermarket carry bag`};this.carryBags.push(n),this.showToast(`Bag type "${n.name}" added`,`success`),this.notify()}updateCarryBag(e,t){let n=this.carryBags.find(t=>t.id===e);if(n){let e=t.stock===void 0?t.inventory===void 0?n.stock:parseInt(t.inventory):parseInt(t.stock),r=t.enabled===void 0?t.isEnabled===void 0?n.enabled:t.isEnabled:t.enabled;Object.assign(n,t,{price:t.price===void 0?n.price:parseFloat(t.price),stock:e,inventory:e,enabled:r,isEnabled:r}),this.showToast(`Carry bag updated`,`success`),this.notify()}}toggleCarryBagStatus(e){let t=this.carryBags.find(t=>t.id===e);t&&(t.isEnabled=!t.isEnabled,t.enabled=t.isEnabled,!t.isEnabled&&this.cart.selectedBagId===e&&(this.cart.selectedBagId=`bag-none`,this.cart.selectedBagQuantity=0),this.showToast(`${t.name} is now ${t.isEnabled?`enabled`:`disabled`}`,`info`),this.notify())}deleteCarryBag(e){e!==`bag-none`&&(this.carryBags=this.carryBags.filter(t=>t.id!==e),this.cart.selectedBagId===e&&(this.cart.selectedBagId=`bag-none`,this.cart.selectedBagQuantity=0),this.showToast(`Carry bag option removed`,`success`),this.notify())}addAiRecommendation(e){let t={id:`ai-rec-${Date.now()}`,...e,boostPercentage:parseInt(e.boostPercentage||15),isActive:!0};this.aiRecommendations.unshift(t),this.showToast(`Recommendation rule added`,`success`),this.notify()}deleteAiRecommendation(e){this.aiRecommendations=this.aiRecommendations.filter(t=>t.id!==e),this.showToast(`Rule removed`,`info`),this.notify()}setRole(e){this.activeRole=e,this.notify()}setCustomerTab(e,t=null){this.customerTab=e,t&&(t.productId&&(this.navTargetProductId=t.productId),t.selectedProduct&&(this.selectedProduct=t.selectedProduct)),this.notify()}openProductDetails(e){this.selectedProduct=e,this.customerTab=`product-details`,this.notify()}setAdminTab(e){this.adminTab=e,this.notify()}showToast(e,t=`success`){this.toast={message:e,type:t,id:Date.now()},this.notify(),setTimeout(()=>{this.toast&&Date.now()-this.toast.id>=3e3&&(this.toast=null,this.notify())},3200)}getExpectedWeight(){return this.cart.items.reduce((e,t)=>e+t.expectedWeight*t.quantity,0)}getWeightVerificationStatus(){let e=this.getExpectedWeight(),t=this.cart.simulatedActualWeight,n=Math.abs(t-e),r=this.settings.weightToleranceGrams;return e===0&&t===0?{status:`empty`,label:`Cart Scale Empty`,diff:0,color:`text-slate-500`,bg:`bg-slate-100`}:n<=r?{status:`verified`,label:`IoT Scale Verified (100% Weight Match)`,diff:n,expected:e,actual:t,matchPercentage:100,color:`text-emerald-700`,bg:`bg-emerald-50 border-emerald-200`,badgeColor:`bg-emerald-500`}:{status:`mismatch`,label:t>e?`Weight Alert: +${Math.round(t-e)}g unverified item`:`Weight Alert: -${Math.round(e-t)}g missing item`,diff:n,expected:e,actual:t,color:`text-amber-800`,bg:`bg-amber-50 border-amber-300`,badgeColor:`bg-amber-500`}}updateSettings(e){Object.assign(this.settings,e),this.cart.toleranceGrams=parseFloat(e.weightToleranceGrams),this.showToast(`System settings saved`,`success`),this.notify()}};o.budgetCap;function s(){let t=o.budgetCap;return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 14px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Branding Header -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="brand-icon" style="width: 28px; height: 28px; font-size: 13px;">SC</div>
          <div>
            <h2 style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.1;">SMART CART</h2>
            <span style="font-size: 10px; color: var(--cyan-hover); font-weight: 600;">SUPERMARKET RETAIL OS</span>
          </div>
        </div>
        <span class="stitch-badge badge-green" style="font-size: 10px; padding: 4px 8px;">
          ● ${o.cart.cartId} LINKED
        </span>
      </div>

      <!-- Hero Welcome Card (Dark Navy Stitch Style) -->
      <div class="stitch-card" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 18px; border-radius: 16px; border: none; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);">
        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(56, 189, 248, 0.15); padding: 3px 8px; border-radius: 99px; font-size: 10px; color: #38BDF8; font-weight: 600; margin-bottom: 8px;">
          ${e(`sparkles`,12)} AI-Powered Supermarket Experience
        </div>
        <h1 style="font-size: 20px; font-weight: 800; line-height: 1.2; color: #FFFFFF;">
          Smarter Shopping,<br/><span style="color: #38BDF8;">Simpler Billing.</span>
        </h1>
        <p style="font-size: 11px; color: #94A3B8; margin-top: 6px; line-height: 1.4;">
          Your intelligent shopping companion for faster, contact-free supermarket supermarket trips.
        </p>
      </div>

      <!-- Current Store Location Card -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 12px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-light);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: #E0F2FE; color: #0284C7; display: flex; align-items: center; justify-content: center;">
            ${e(`store`,18)}
          </div>
          <div>
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">CURRENT LOCATION</div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${o.settings.storeName}</div>
            <div style="font-size: 10px; color: var(--text-secondary);">100 Feet Road • Open until 10 PM</div>
          </div>
        </div>
        <span class="stitch-badge badge-cyan" style="font-size: 9px;">GPS Verified</span>
      </div>

      <!-- CRITICAL FLOW STEP: SET BUDGET (Matching Stitch Reference) -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 16px; border: 1px solid var(--cyan-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #0EA5E9;">💳</span>
            <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Trip Budget Cap</h3>
          </div>
          <span style="font-size: 18px; font-weight: 800; color: #0284C7;" id="display-selected-budget">
            ₹${t.toLocaleString()}
          </span>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
          Live alerts when approaching your limit so you never overspend.
        </p>

        <!-- Preset Budget Buttons Grid -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 10px;">
          <button class="btn-preset-budget btn-secondary ${t===500?`active`:``}" data-val="500" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center; border-color: ${t===500?`#0EA5E9`:`var(--border-medium)`}; background: ${t===500?`#E0F2FE`:`#FFFFFF`};">
            ₹500
          </button>
          <button class="btn-preset-budget btn-secondary ${t===1e3?`active`:``}" data-val="1000" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center; border-color: ${t===1e3?`#0EA5E9`:`var(--border-medium)`}; background: ${t===1e3?`#E0F2FE`:`#FFFFFF`};">
            ₹1,000
          </button>
          <button class="btn-preset-budget btn-secondary ${t===1500?`active`:``}" data-val="1500" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center; border-color: ${t===1500?`#0EA5E9`:`var(--border-medium)`}; background: ${t===1500?`#E0F2FE`:`#FFFFFF`};">
            ₹1,500
          </button>
          <button id="btn-custom-budget" class="btn-secondary" style="padding: 8px 4px; font-size: 11px; font-weight: 700; border-radius: 8px; text-align: center;">
            Custom
          </button>
        </div>
      </div>

      <!-- Cart Highlights (Matching Stitch Screenshot) -->
      <div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.05em;">
          Cart Highlights
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
          
          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #0284C7; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${e(`scan`,16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Barcode Scan</div>
              <div style="font-size: 9px; color: var(--text-muted);">Instant CV item recognition</div>
            </div>
          </div>

          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #10B981; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${e(`weight`,16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Budget Meter</div>
              <div style="font-size: 9px; color: var(--text-muted);">Live alerts on trip spend</div>
            </div>
          </div>

          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #8B5CF6; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${e(`navigate`,16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Aisle Route</div>
              <div style="font-size: 9px; color: var(--text-muted);">Optimal turn-by-turn path</div>
            </div>
          </div>

          <div class="stitch-card" style="padding: 10px; background: #FFFFFF; display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 8px; background: #F1F5F9; color: #F59E0B; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              ${e(`bags`,16)}
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700;">Bag Auto-Billing</div>
              <div style="font-size: 9px; color: var(--text-muted);">Direct zero-touch checkout</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Main Action Button: ✦ START SHOPPING → (Matching Stitch Screenshot) -->
      <button id="btn-start-shopping-action" class="btn-primary" style="width: 100%; margin-top: 6px; padding: 14px; font-size: 15px; font-weight: 800; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.3); display: flex; align-items: center; justify-content: center; gap: 8px;">
        ✦ START SHOPPING →
      </button>

      <div style="text-align: center; margin-top: -4px;">
        <span style="font-size: 11px; color: var(--text-muted); cursor: pointer;" id="btn-how-it-works">
          ⓘ How It Works (60s Demo)
        </span>
      </div>

    </div>
  `}function c(e){let t=e.querySelector(`#btn-start-shopping-action`),n=e.querySelector(`#btn-custom-budget`),r=e.querySelector(`#btn-how-it-works`);e.querySelectorAll(`.btn-preset-budget`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseFloat(e.dataset.val);o.setBudgetCap(t)})}),n&&n.addEventListener(`click`,()=>{let e=prompt(`Enter your trip budget cap (₹):`,o.budgetCap);e&&!isNaN(e)&&parseFloat(e)>0&&o.setBudgetCap(parseFloat(e))}),t&&t.addEventListener(`click`,()=>{o.showToast(`Shopping session started! Budget: ₹${o.budgetCap}`,`success`),o.setCustomerTab(`home`)}),r&&r.addEventListener(`click`,()=>{alert(`Smart Cart Guide:
1. Set your budget cap
2. Scan items using Barcode Scanner
3. Our IoT load cell confirms weight
4. Use Digital Map & AI Assistant
5. Select carry bags & Pay with instant express exit!`)})}function l(){let t=o.cart.items,n=o.getCartItemCount(),r=o.getAmountSpent(),i=o.budgetCap,a=o.getRemainingBudget(),s=o.getBudgetProgressPercentage(),c=o.getDynamicRecommendations();return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Greeting Header & Store Location -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
            Welcome to SuperMart
          </div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">
            Good Evening, Alex 👋
          </h2>
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 1px;">
            Ready to shop smart today?
          </div>
        </div>
        <div style="text-align: right;">
          <span class="stitch-badge badge-cyan" style="font-size: 10px; padding: 4px 10px;">
            📍 SuperMart — Hazratganj
          </span>
        </div>
      </div>

      <!-- Connected Cart Status Banner -->
      <div class="stitch-card" style="background: #FFFFFF; border: 1px solid var(--cyan-border); padding: 12px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: #E0F2FE; color: #0284C7; display: flex; align-items: center; justify-content: center;">
            ${e(`smart-cart`,20)}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${o.cart.cartId} CONNECTED</h3>
              <span style="width: 8px; height: 8px; border-radius: 99px; background: #10B981; display: inline-block;"></span>
            </div>
            <p style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • ESP32 & HX711 IoT Scale Linked</p>
          </div>
        </div>
        <button id="btn-edit-budget" style="border: none; background: transparent; font-size: 11px; color: #0EA5E9; font-weight: 600; cursor: pointer;">
          Set Budget
        </button>
      </div>

      <!-- Dark Navy Trip Budget Card (Matching Google Stitch Screenshot) -->
      <div class="stitch-card" style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; border: none; padding: 16px; border-radius: 16px; box-shadow: 0 10px 20px rgba(15, 23, 42, 0.15);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
          <div style="font-size: 11px; color: #94A3B8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
            💳 Active Shopping Budget
          </div>
          <div style="font-size: 12px; font-weight: 600; color: #38BDF8;">
            Target: ₹${i.toLocaleString()}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 14px;">
          <div>
            <div style="font-size: 11px; color: #94A3B8;">Amount Spent</div>
            <div style="font-size: 22px; font-weight: 700; color: #FFFFFF;">
              ₹${r.toFixed(2)}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; color: #94A3B8;">Remaining Budget</div>
            <div style="font-size: 22px; font-weight: 700; color: ${a>0?`#34D399`:`#F87171`};">
              ₹${a.toFixed(2)}
            </div>
          </div>
        </div>

        <!-- Budget Usage Progress Bar -->
        <div style="width: 100%; background: rgba(255,255,255,0.15); height: 8px; border-radius: 99px; overflow: hidden; margin-bottom: 12px;">
          <div style="width: ${s}%; height: 100%; background: ${s>90?`#EF4444`:`linear-gradient(90deg, #38BDF8 0%, #34D399 100%)`}; border-radius: 99px; transition: width 0.3s ease;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.08); padding: 8px 12px; border-radius: 8px; font-size: 12px;">
          <div style="display: flex; align-items: center; gap: 6px; color: #E2E8F0;">
            ${e(`cart`,14)}
            <span><strong>${n}</strong> ${n===1?`Item`:`Items`} in Cart</span>
          </div>
          <div style="font-weight: 700; color: #38BDF8;">
            Total: ₹${r.toFixed(2)}
          </div>
        </div>

      </div>

      <!-- Quick Actions Grid (Scan Product, Find Product, AI) -->
      <div>
        <div style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.03em;">
          Quick Supermarket Actions
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          
          <button id="quick-action-scan" class="stitch-card" style="border: 1px solid var(--border-light); background: #FFFFFF; text-align: center; padding: 14px 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform 0.15s ease;">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: #0EA5E9; color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(14, 165, 233, 0.25);">
              ${e(`scan`,22)}
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--text-primary);">Scan Product</span>
          </button>

          <button id="quick-action-find" class="stitch-card" style="border: 1px solid var(--border-light); background: #FFFFFF; text-align: center; padding: 14px 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform 0.15s ease;">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: #F1F5F9; color: #0284C7; display: flex; align-items: center; justify-content: center;">
              ${e(`navigate`,22)}
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--text-primary);">Find Product</span>
          </button>

          <button id="quick-action-ai" class="stitch-card" style="border: 1px solid var(--border-light); background: #FFFFFF; text-align: center; padding: 14px 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform 0.15s ease;">
            <div style="width: 40px; height: 40px; border-radius: 12px; background: #FAF5FF; color: #9333EA; border: 1px solid #E9D5FF; display: flex; align-items: center; justify-content: center;">
              ${e(`sparkles`,22)}
            </div>
            <span style="font-size: 12px; font-weight: 700; color: var(--text-primary);">AI Assistant</span>
          </button>

        </div>
      </div>

      <!-- Smart Suggestions / Recommended Products (Matching Stitch Screenshot) -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-size: 14px; font-weight: 700; display: flex; align-items: center; gap: 6px;">
            <span style="color: #0EA5E9;">✨ Smart Suggestions</span>
          </h3>
          <span style="font-size: 11px; color: var(--cyan-hover); font-weight: 600;">Based on Budget</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px;" id="recommendations-list">
          ${c.map(e=>`
            <div class="stitch-card btn-open-details" data-id="${e.id}" style="padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${e.image}" alt="${e.name}" style="width: 46px; height: 46px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0;"/>
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <span class="stitch-badge badge-cyan" style="font-size: 9px; padding: 2px 6px;">${e.tag}</span>
                    <span style="font-size: 10px; color: var(--text-muted);">${e.locationName.split(`–`)[0]}</span>
                  </div>
                  <h4 style="font-size: 12px; font-weight: 700; margin-top: 2px;">${e.name}</h4>
                  <div style="font-size: 11px; color: var(--text-secondary);">₹${e.price.toFixed(2)} • ${e.unit}</div>
                </div>
              </div>

              <button class="btn-primary btn-add-rec" data-id="${e.id}" style="padding: 6px 12px; font-size: 11px; font-weight: 700; border-radius: 8px; background: #0F172A; white-space: nowrap;">
                + ADD
              </button>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- Current / Recent In-Cart Items (Matching Stitch Screenshot) -->
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-size: 14px; font-weight: 700;">In-Cart Items (${n})</h3>
          <button id="btn-view-full-cart" style="border: none; background: transparent; font-size: 11px; color: var(--cyan-hover); font-weight: 600; cursor: pointer;">
            View Full Cart (${n}) →
          </button>
        </div>

        ${t.length===0?`
          <div class="stitch-card" style="text-align: center; padding: 20px; color: var(--text-muted);">
            No items in cart yet. Tap <strong>Scan Product</strong> to start scanning!
          </div>
        `:`
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${t.slice(0,3).map(e=>`
              <div class="stitch-card" style="padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <img src="${e.image}" alt="${e.name}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover;"/>
                  <div>
                    <h4 style="font-size: 12px; font-weight: 700;">${e.name}</h4>
                    <div style="font-size: 10px; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
                      <span>Qty: ${e.quantity}</span> •
                      <span class="stitch-badge badge-green" style="font-size: 8px; padding: 1px 4px;">✓ Scale Verified</span>
                    </div>
                  </div>
                </div>

                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">
                  ₹${(e.price*e.quantity).toFixed(2)}
                </div>
              </div>
            `).join(``)}
          </div>
        `}
      </div>

    </div>
  `}function u(e){let t=e.querySelector(`#quick-action-scan`),n=e.querySelector(`#quick-action-find`),r=e.querySelector(`#quick-action-ai`),i=e.querySelector(`#btn-view-full-cart`),a=e.querySelector(`#btn-edit-budget`);t&&t.addEventListener(`click`,()=>o.setCustomerTab(`scan`)),n&&n.addEventListener(`click`,()=>o.setCustomerTab(`navigate`)),r&&r.addEventListener(`click`,()=>o.setCustomerTab(`ai`)),i&&i.addEventListener(`click`,()=>o.setCustomerTab(`cart`)),a&&a.addEventListener(`click`,()=>{o.setCustomerTab(`start-shopping`)}),e.querySelectorAll(`.btn-add-rec`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id,r=o.products.find(e=>e.id===n);r&&o.addToCart(r,1)})}),e.querySelectorAll(`.btn-open-details`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id,n=o.products.find(e=>e.id===t);n&&o.openProductDetails(n)})})}function d(){let t=o.scannedProduct||o.products[0];return o.scannerState,`
    <div style="display: flex; flex-direction: column; min-height: 100%; background: #0F172A; color: white; position: relative;">
      
      <!-- Top Scanner Bar Controls -->
      <div style="padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; z-index: 20; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(255,255,255,0.1);">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div class="brand-icon" style="width: 24px; height: 24px; font-size: 11px;">SC</div>
          <div>
            <div style="font-size: 13px; font-weight: 700;">BARCODE CAMERA SCANNER</div>
            <div style="font-size: 10px; color: #38BDF8;">Cart ${o.cart.cartId} • Scale Connected</div>
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-toggle-flash" title="Toggle Flash" style="width: 32px; height: 32px; border-radius: 99px; border: 1px solid rgba(255,255,255,0.3); background: rgba(255,255,255,0.1); color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            ⚡
          </button>
          <button id="btn-toggle-cam-stream" title="Camera Feed" style="padding: 4px 10px; border-radius: 99px; border: 1px solid #0EA5E9; background: #0EA5E9; color: white; font-size: 11px; font-weight: 600; cursor: pointer;">
            📷 Camera Live
          </button>
        </div>
      </div>

      <!-- Viewfinder / Scanner Frame Area -->
      <div style="position: relative; flex: 1; min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; background: #020617;">
        
        <!-- Video Camera Stream Element -->
        <video id="scanner-video-element" autoplay playsinline muted style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.75;"></video>

        <!-- Scanning Frame Viewfinder -->
        <div style="position: relative; z-index: 10; width: 250px; height: 160px; border: 2px dashed #0EA5E9; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.75);">
          
          <!-- Animated Laser Scanning Line -->
          <div class="laser-scanner-line" style="position: absolute; width: 100%; height: 2px; background: #38BDF8; box-shadow: 0 0 10px #38BDF8, 0 0 20px #0EA5E9; top: 0; animation: scanLaser 2s infinite ease-in-out;"></div>

          <!-- Crosshair corners -->
          <div style="position: absolute; top: -2px; left: -2px; width: 16px; height: 16px; border-top: 3px solid #38BDF8; border-left: 3px solid #38BDF8; border-top-left-radius: 12px;"></div>
          <div style="position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; border-top: 3px solid #38BDF8; border-right: 3px solid #38BDF8; border-top-right-radius: 12px;"></div>
          <div style="position: absolute; bottom: -2px; left: -2px; width: 16px; height: 16px; border-bottom: 3px solid #38BDF8; border-left: 3px solid #38BDF8; border-bottom-left-radius: 12px;"></div>
          <div style="position: absolute; bottom: -2px; right: -2px; width: 16px; height: 16px; border-bottom: 3px solid #38BDF8; border-right: 3px solid #38BDF8; border-bottom-right-radius: 12px;"></div>

          <div style="color: white; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: rgba(14,165,233,0.4); padding: 4px 10px; border-radius: 6px; text-align: center;">
            Point camera at barcode
          </div>
        </div>

        <!-- Scanning Status Indicator -->
        <div style="position: absolute; bottom: 12px; z-index: 10; font-size: 11px; color: #94A3B8; background: rgba(0,0,0,0.6); padding: 4px 12px; border-radius: 99px;">
          CV Barcode Recognition Engine Active
        </div>

      </div>

      <!-- Quick Preset Demo Barcode Quick Taps -->
      <div style="padding: 12px 16px; background: #0F172A; border-top: 1px solid rgba(255,255,255,0.1);">
        <div style="font-size: 10px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin-bottom: 6px;">
          Quick Tap Barcode Simulation
        </div>
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;">
          ${o.products.slice(0,5).map(e=>`
            <button class="btn-scan-preset btn-secondary" data-id="${e.id}" style="font-size: 11px; white-space: nowrap; padding: 6px 10px; border-radius: 99px; background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
              ${e.name.split(` `)[0]} (₹${e.price})
            </button>
          `).join(``)}
        </div>
      </div>

      <!-- Manual Product Search Fallback Input -->
      <div style="padding: 12px 16px; background: #1E293B;">
        <div style="display: flex; gap: 8px;">
          <input type="text" id="scanner-search-input" class="form-input" placeholder="Or enter barcode / search item name..." style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: white; font-size: 12px;"/>
          <button id="btn-scanner-search" class="btn-primary" style="padding: 8px 14px; font-size: 12px; white-space: nowrap;">
            Lookup
          </button>
        </div>
      </div>

      <!-- Product Found Slide-Up Card Sheet (Matching Stitch Screenshot) -->
      <div id="product-found-sheet" style="background: #FFFFFF; color: var(--text-primary); border-top-left-radius: 20px; border-top-right-radius: 20px; padding: 16px; box-shadow: 0 -10px 25px rgba(0,0,0,0.3);">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="stitch-badge badge-green" style="font-size: 10px; padding: 4px 8px;">
            ✓ Barcode Recognized (EAN: ${t.barcode})
          </span>
          <span style="font-size: 11px; color: var(--cyan-hover); font-weight: 600;">Scale Ready (+${t.expectedWeight}g)</span>
        </div>

        <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 14px;">
          <img src="${t.image}" alt="${t.name}" style="width: 72px; height: 72px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--border-light);"/>
          <div style="flex: 1;">
            <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.3;">
              ${t.name}
            </h3>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">
              ${t.category} • ${t.unit} • ${t.locationName}
            </div>
            <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
              ₹${t.price.toFixed(2)}
            </div>
          </div>
        </div>

        <!-- Quantity Stepper -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--bg-subtle); padding: 10px 14px; border-radius: 10px; margin-bottom: 14px;">
          <span style="font-size: 12px; font-weight: 600; color: var(--text-secondary);">Select Quantity</span>
          <div style="display: flex; align-items: center; gap: 12px;">
            <button id="scan-qty-minus" class="btn-secondary" style="width: 32px; height: 32px; border-radius: 8px; padding: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">-</button>
            <span id="scan-qty-val" style="font-size: 14px; font-weight: 700; min-width: 20px; text-align: center;">1</span>
            <button id="scan-qty-plus" class="btn-secondary" style="width: 32px; height: 32px; border-radius: 8px; padding: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px;">+</button>
          </div>
        </div>

        <!-- Primary Actions: ADD TO CART & FIND IN STORE -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button id="btn-scan-add-to-cart" class="btn-primary" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 12px;">
            ${e(`plus`,16)} ADD TO CART
          </button>
          
          <button id="btn-scan-find-in-store" class="btn-secondary" style="width: 100%; padding: 10px; font-size: 12px; font-weight: 600; border-radius: 10px;">
            ${e(`navigate`,14)} FIND IN STORE (Aisle Navigation)
          </button>
        </div>

      </div>

    </div>

    <style>
      @keyframes scanLaser {
        0% { top: 0; }
        50% { top: calc(100% - 2px); }
        100% { top: 0; }
      }
    </style>
  `}function f(e){let t=1,n=e.querySelector(`#scan-qty-val`),r=e.querySelector(`#scan-qty-minus`),i=e.querySelector(`#scan-qty-plus`),a=e.querySelector(`#btn-scan-add-to-cart`),s=e.querySelector(`#btn-scan-find-in-store`),c=e.querySelector(`#scanner-search-input`),l=e.querySelector(`#btn-scanner-search`),u=e.querySelector(`#scanner-video-element`),d=e.querySelector(`#btn-toggle-cam-stream`);r&&n&&r.addEventListener(`click`,()=>{t>1&&(--t,n.innerText=t)}),i&&n&&i.addEventListener(`click`,()=>{t+=1,n.innerText=t}),d&&u&&d.addEventListener(`click`,async()=>{try{let e=await navigator.mediaDevices.getUserMedia({video:{facingMode:`environment`}});u.srcObject=e,d.innerText=`📷 Camera Active`,d.style.background=`#10B981`}catch{o.showToast(`Camera simulation active`,`info`)}}),e.querySelectorAll(`.btn-scan-preset`).forEach(e=>{e.addEventListener(`click`,()=>{let t=o.products.find(t=>t.id===e.dataset.id);t&&(o.scannedProduct=t,o.notify())})});let f=()=>{let e=c.value.toLowerCase().trim();if(!e)return;let t=o.products.find(t=>t.name.toLowerCase().includes(e)||t.barcode.includes(e));t?(o.scannedProduct=t,o.notify()):o.showToast(`No item matching "${e}"`,`error`)};l&&l.addEventListener(`click`,f),c&&c.addEventListener(`keydown`,e=>{e.key===`Enter`&&f()}),a&&a.addEventListener(`click`,()=>{let e=o.scannedProduct||o.products[0];o.addToCart(e,t),o.setCustomerTab(`cart`)}),s&&s.addEventListener(`click`,()=>{let e=o.scannedProduct||o.products[0];o.setCustomerTab(`navigate`,{productId:e.id})})}function p(){let t=o.selectedProduct||o.products[0];o.getAmountSpent();let n=o.getRemainingBudget(),r=o.locations.find(e=>e.id===t.locationId)||o.locations[1];return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #FFFFFF; min-height: 100%;">
      
      <!-- Top Back Header Navigation -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <button id="btn-back-from-details" class="btn-secondary" style="padding: 6px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;">
          ← Back to Catalog
        </button>
        <span class="stitch-badge badge-cyan">EAN: ${t.barcode}</span>
      </div>

      <!-- Hero Product Image -->
      <div style="position: relative; width: 100%; height: 230px; border-radius: var(--radius-lg); overflow: hidden; background: #F8FAFC; border: 1px solid var(--border-light);">
        <img src="${t.image}" alt="${t.name}" style="width: 100%; height: 100%; object-fit: cover;"/>
        <span class="stitch-badge badge-green" style="position: absolute; top: 12px; left: 12px; font-size: 11px; padding: 4px 10px; box-shadow: var(--shadow-sm);">
          In Stock (${t.stock} units)
        </span>
        <span class="stitch-badge badge-cyan" style="position: absolute; top: 12px; right: 12px; font-size: 11px; padding: 4px 10px;">
          ${t.category}
        </span>
      </div>

      <!-- Product Name & Price Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">
        <div>
          <h1 style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.3;">
            ${t.name}
          </h1>
          <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">
            ${t.description}
          </p>
        </div>
        <div style="text-align: right; flex-shrink: 0;">
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary);">
            ₹${t.price.toFixed(2)}
          </div>
          <div style="font-size: 10px; color: var(--text-muted);">${t.unit}</div>
        </div>
      </div>

      <!-- Attributes Card (Aisle/Location, Expected Weight, Scale Status) -->
      <div class="stitch-card" style="background: var(--bg-subtle); display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 14px;">
        
        <div>
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Store Aisle / Location</span>
          <div style="font-size: 13px; font-weight: 700; color: var(--cyan-hover); margin-top: 2px;">
            📍 ${t.locationName}
          </div>
          <div style="font-size: 10px; color: var(--text-secondary);">${r.section||`General`} • ${r.shelf||`Shelf A`}</div>
        </div>

        <div>
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Expected Weight (Scale)</span>
          <div style="font-size: 13px; font-weight: 700; color: var(--green-hover); margin-top: 2px;">
            ⚖️ ${t.expectedWeight}g
          </div>
          <div style="font-size: 10px; color: var(--text-secondary);">HX711 Scale Verified</div>
        </div>

      </div>

      <!-- Budget Impact Preview Callout -->
      <div style="background: #F0F9FF; border: 1px solid #BAE6FD; border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #0369A1;">
        <div style="display: flex; align-items: center; gap: 8px;">
          ${e(`sparkles`,18)}
          <span>Trip Budget Impact: <strong>Remaining ₹${n.toFixed(2)}</strong></span>
        </div>
        <span style="font-weight: 700;">Cap ₹${o.budgetCap}</span>
      </div>

      <!-- Quantity Selector -->
      <div class="stitch-card" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Quantity to Add</span>
        <div style="display: flex; align-items: center; gap: 14px;">
          <button id="details-qty-minus" class="btn-secondary" style="width: 36px; height: 36px; border-radius: 8px; font-size: 18px; font-weight: 700; padding: 0; display: flex; align-items: center; justify-content: center;">-</button>
          <span id="details-qty-val" style="font-size: 16px; font-weight: 700; min-width: 24px; text-align: center;">1</span>
          <button id="details-qty-plus" class="btn-secondary" style="width: 36px; height: 36px; border-radius: 8px; font-size: 18px; font-weight: 700; padding: 0; display: flex; align-items: center; justify-content: center;">+</button>
        </div>
      </div>

      <!-- Action Buttons: ADD TO CART & FIND IN STORE -->
      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
        <button id="btn-details-add-to-cart" class="btn-primary" style="width: 100%; padding: 14px; font-size: 15px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);">
          ${e(`plus`,18)} ADD TO CART (₹<span id="details-total-price">${t.price.toFixed(2)}</span>)
        </button>

        <button id="btn-details-find-in-store" class="btn-secondary" style="width: 100%; padding: 12px; font-size: 13px; font-weight: 600; border-radius: 12px;">
          ${e(`navigate`,16)} FIND IN STORE (Turn-by-Turn Route)
        </button>
      </div>

    </div>
  `}function m(e){let t=o.selectedProduct||o.products[0],n=1,r=e.querySelector(`#btn-back-from-details`),i=e.querySelector(`#details-qty-val`),a=e.querySelector(`#details-qty-minus`),s=e.querySelector(`#details-qty-plus`),c=e.querySelector(`#details-total-price`),l=e.querySelector(`#btn-details-add-to-cart`),u=e.querySelector(`#btn-details-find-in-store`),d=()=>{i&&c&&(i.innerText=n,c.innerText=(t.price*n).toFixed(2))};r&&r.addEventListener(`click`,()=>{o.setCustomerTab(`home`)}),a&&a.addEventListener(`click`,()=>{n>1&&(--n,d())}),s&&s.addEventListener(`click`,()=>{n+=1,d()}),l&&l.addEventListener(`click`,()=>{o.addToCart(t,n),o.setCustomerTab(`cart`)}),u&&u.addEventListener(`click`,()=>{o.setCustomerTab(`navigate`,{productId:t.id})})}function ee(){let t=o.products,n=o.navTargetProductId||`p-6`,r=t.find(e=>e.id===n)||t[0];return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Indoor Store Map Navigation</h2>
          <p style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • Digital Sensor Mesh Positioning</p>
        </div>
        <span class="stitch-badge badge-green">Optical Scale Sync</span>
      </div>

      <!-- Product Search & Locator Selector Card -->
      <div class="stitch-card" style="padding: 12px; background: #FFFFFF;">
        <label class="form-label" style="font-size: 10px;">Find Product Indoor Location</label>
        <div style="display: flex; gap: 8px;">
          <select id="select-map-product" class="form-select" style="font-size: 12px;">
            ${t.map(e=>`
              <option value="${e.id}" ${r.id===e.id?`selected`:``}>
                ${e.name} ➔ ${e.locationName.split(`–`)[0]}
              </option>
            `).join(``)}
          </select>
          <button id="btn-highlight-route" class="btn-primary" style="white-space: nowrap; font-size: 12px; padding: 8px 14px; background: #0F172A;">
            ${e(`navigate`,14)} Locate
          </button>
        </div>
      </div>

      <!-- Turn-by-Turn Route Direction Banner (Matching Stitch Screenshot) -->
      <div class="stitch-card" style="background: #E0F2FE; border: 1px solid #BAE6FD; display: flex; align-items: center; gap: 12px; padding: 12px;">
        <div style="width: 40px; height: 40px; border-radius: 10px; background: #0284C7; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 10px rgba(2, 132, 199, 0.3);">
          ${e(`navigate`,20)}
        </div>
        <div style="flex: 1;">
          <div style="font-size: 10px; font-weight: 700; color: #0284C7; text-transform: uppercase; letter-spacing: 0.05em;">
            Turn-by-Turn Route: ${r.name}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #0369A1; margin-top: 2px;">
            Start at Entrance ➔ Walk straight into <strong>${r.locationName}</strong>
          </div>
          <div style="font-size: 10px; color: #0369A1; margin-top: 1px;">
            Item location: Shelf A, Bay 2 • Price: ₹${r.price.toFixed(2)}
          </div>
        </div>
      </div>

      <!-- Interactive Digital Supermarket Floorplan Map Card -->
      <div class="stitch-card" style="padding: 14px; background: #FFFFFF; border: 1px solid var(--border-light);">
        
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">
            📍 Supermarket Floorplan Grid
          </span>
          <span class="stitch-badge badge-cyan" style="font-size: 9px;">Cart Sensor Position: Entrance</span>
        </div>

        <!-- Store Map Grid -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; background: #F1F5F9; padding: 12px; border-radius: 12px; border: 1px solid var(--border-light); position: relative;">
          
          <!-- Entrance Zone -->
          <div style="grid-column: span 1; background: #E2E8F0; padding: 10px; border-radius: 8px; text-align: center; border: 2px dashed #94A3B8;">
            <div style="font-size: 11px; font-weight: 700; color: #334155;">ENTRANCE 🚪</div>
            <div style="font-size: 9px; color: #0284C7; font-weight: 600; margin-top: 2px;">Current Cart Position 📍</div>
          </div>

          <!-- Checkout Zone -->
          <div style="grid-column: span 1; background: #DCFCE7; padding: 10px; border-radius: 8px; text-align: center; border: 1px solid #86EFAC;">
            <div style="font-size: 11px; font-weight: 700; color: #15803D;">CHECKOUT COUNTER 💳</div>
            <div style="font-size: 9px; color: #166534;">IoT Scale Gate</div>
          </div>

          <!-- Aisle Cards Grid -->
          ${[{title:`Aisle 1`,category:`Dairy & Bakery`,color:`#E0F2FE`,border:`#BAE6FD`,matchLoc:`loc-2`,example:`Milk, Bread, Butter, Dahi`},{title:`Aisle 2`,category:`Grains, Pulses & Spices`,color:`#FEF3C7`,border:`#FDE68A`,matchLoc:`loc-4`,example:`Rice, Atta, Masoor Dal, Garam Masala`},{title:`Aisle 3`,category:`Snacks & Beverages`,color:`#FCE7F3`,border:`#FBCFE8`,matchLoc:`loc-6`,example:`Chips, Bhujia, Tea, Coffee, Juice`},{title:`Aisle 4`,category:`Personal Care & Home`,color:`#E0E7FF`,border:`#C7D2FE`,matchLoc:`loc-8`,example:`Shampoo, Soap, Toothpaste, Vim Bar`},{title:`Aisle 5`,category:`Frozen & Packaged Foods`,color:`#F3E8FF`,border:`#E9D5FF`,matchLoc:`loc-11`,example:`Maggi Noodles, Packaged Meals`},{title:`Fresh Produce`,category:`Fruits & Vegetables`,color:`#DCFCE7`,border:`#86EFAC`,matchLoc:`loc-13`,example:`Fresh Apples, Bananas, Potatoes`}].map(e=>{let t=r.locationName.toLowerCase().includes(e.title.toLowerCase())||r.category.toLowerCase().includes(e.category.split(` `)[0].toLowerCase());return`
              <div class="map-aisle-zone" style="grid-column: span 1; background: ${t?`#0EA5E9`:e.color}; color: ${t?`#FFFFFF`:`var(--text-primary)`}; padding: 12px; border-radius: 10px; border: 2px ${t?`solid #0284C7`:`solid `+e.border}; position: relative; transition: all 0.2s ease;">
                ${t?`
                  <div style="position: absolute; top: -10px; right: -6px; background: #EF4444; color: white; border-radius: 99px; padding: 2px 8px; font-size: 9px; font-weight: 700; box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);">
                    TARGET PIN📍
                  </div>
                `:``}
                <div style="font-size: 12px; font-weight: 700;">${e.title}</div>
                <div style="font-size: 10px; opacity: 0.95; font-weight: 600;">${e.category}</div>
                <div style="font-size: 9px; opacity: 0.8; margin-top: 4px; font-family: monospace;">e.g. ${e.example}</div>
              </div>
            `}).join(``)}

        </div>
      </div>

      <!-- Selected Product Location Details Card -->
      <div class="stitch-card" style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${r.image}" alt="${r.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-light);"/>
          <div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${r.name}</div>
            <div style="font-size: 11px; color: #0284C7; font-weight: 600;">📍 ${r.locationName}</div>
            <div style="font-size: 10px; color: var(--text-muted);">Price: ₹${r.price.toFixed(2)} • Stock: ${r.stock} units</div>
          </div>
        </div>

        <button class="btn-primary btn-add-from-nav" data-id="${r.id}" style="padding: 8px 12px; font-size: 12px; font-weight: 700; background: #0F172A; border-radius: 8px;">
          ${e(`plus`,14)} Add
        </button>
      </div>

    </div>
  `}function h(e){let t=e.querySelector(`#select-map-product`),n=e.querySelector(`#btn-highlight-route`),r=e.querySelector(`.btn-add-from-nav`);t&&n&&n.addEventListener(`click`,()=>{let e=t.value;o.setCustomerTab(`navigate`,{productId:e})}),r&&r.addEventListener(`click`,()=>{let e=r.dataset.id,t=o.products.find(t=>t.id===e);t&&o.addToCart(t,1)})}async function g(e){let t=o.getAiContext(),n=e.toLowerCase().trim(),r=o.settings.supabaseKey===`anon-public-key-placeholder`?null:o.settings.supabaseKey;if(r&&window.fetch)try{let i=await(await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${r}`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({contents:[{parts:[{text:`You are Smart Cart AI for ${t.storeName}. Customer context: Cart items = ${JSON.stringify(t.items)}, spent = ₹${t.spent}, budgetCap = ₹${t.budgetCap}, remaining = ₹${t.remaining}. Query: "${e}". Keep answer brief under 40 words with product recommendation if relevant.`}]}]})})).json();if(i.candidates&&i.candidates[0]?.content?.parts[0]?.text)return{text:i.candidates[0].content.parts[0].text,productCard:v(n)}}catch(e){console.warn(`Gemini API call fallback to local NLP engine:`,e)}return _(n,t)}function _(e,t){if(e.includes(`rice`)||e.includes(`chawal`)){let e=o.products.find(e=>e.name.toLowerCase().includes(`rice`))||o.products[5];return{text:`India Gate Basmati Rice is located in **${e.locationName}**. Current price is ₹${e.price.toFixed(2)}.`,productCard:e,navTargetId:e.id}}if(e.includes(`spent`)||e.includes(`total`)||e.includes(`budget`))return{text:`You've added **${t.itemCount} items** totaling **₹${t.spent.toFixed(2)}** (out of your ₹${t.budgetCap} budget cap). You have **₹${t.remaining.toFixed(2)} remaining**.`,productCard:null};if(e.includes(`300`)||e.includes(`budget`)||e.includes(`buy with`)){let e=o.products.filter(e=>e.price<=100)[0]||o.products[0];return{text:`With ₹${t.remaining.toFixed(2)} remaining, you can buy **${e.name}** for ₹${e.price.toFixed(2)} at ${e.locationName.split(`–`)[0]}!`,productCard:e}}if(e.includes(`shampoo`)||e.includes(`soap`)||e.includes(`dettol`)){let e=o.products.find(e=>e.category===`Personal Care`)||o.products[15];return{text:`Personal Care items are located in **${e.locationName}**. ${e.name} is ₹${e.price.toFixed(2)}.`,productCard:e,navTargetId:e.id}}if(e.includes(`milk`)||e.includes(`dahi`)||e.includes(`butter`)){let e=o.products.find(e=>e.category===`Dairy`)||o.products[0];return{text:`Dairy items like ${e.name} are located in **Aisle 1 – Dairy (Shelf A)**. Price: ₹${e.price.toFixed(2)}.`,productCard:e,navTargetId:e.id}}let n=o.products.find(e=>e.price<=t.remaining)||o.products[0];return{text:`Based on your remaining budget of ₹${t.remaining.toFixed(2)}, I recommend **${n.name}** at ${n.locationName}!`,productCard:n}}function v(e){return o.products.find(t=>e.includes(t.name.toLowerCase())||e.includes(t.category.toLowerCase()))||null}var y=[{sender:`ai`,text:`Hello Alex! I'm your **Smart Cart AI Assistant**. Ask me where products are located, how much you've spent, or what fits in your ₹1,500 budget!`,timestamp:`Just now`}],b=!1;function x(){let t=o.getAiContext();return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 12px; height: calc(100vh - 128px); background: #F8FAFC;">
      
      <!-- Screen Header -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 6px; color: var(--text-primary);">
            <span style="color: #9333EA;">${e(`sparkles`,22)}</span> Smart Cart AI Assistant
          </h2>
          <p style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • Live Cart & Budget Context</p>
        </div>
        <span class="stitch-badge badge-cyan" style="font-size: 10px;">Gemini Core</span>
      </div>

      <!-- Live Context Bar -->
      <div style="background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 8px; padding: 6px 10px; font-size: 11px; color: #7E22CE; display: flex; justify-content: space-between; align-items: center;">
        <span>Cart: <strong>${t.itemCount} items</strong> (₹${t.spent.toFixed(2)})</span>
        <span>Remaining: <strong>₹${t.remaining.toFixed(2)}</strong></span>
      </div>

      <!-- Suggested Question Chips (Matching Stitch Screenshots) -->
      <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 2px;" id="ai-suggestion-chips">
        <button class="ai-chip btn-secondary" data-prompt="Where is rice?" style="font-size: 11px; white-space: nowrap; border-radius: 99px; padding: 5px 12px; background: #FFFFFF;">
          🌾 Where is rice?
        </button>
        <button class="ai-chip btn-secondary" data-prompt="How much have I spent?" style="font-size: 11px; white-space: nowrap; border-radius: 99px; padding: 5px 12px; background: #FFFFFF;">
          💳 How much have I spent?
        </button>
        <button class="ai-chip btn-secondary" data-prompt="What can I buy with ₹300?" style="font-size: 11px; white-space: nowrap; border-radius: 99px; padding: 5px 12px; background: #FFFFFF;">
          💰 What can I buy with ₹300?
        </button>
      </div>

      <!-- Voice Waveform & Listening State Indicator Banner -->
      ${b?`
        <div style="background: #0F172A; color: white; padding: 12px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; animation: fadeIn 0.2s ease;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="color: #38BDF8;">${e(`mic`,20)}</div>
            <div>
              <div style="font-size: 12px; font-weight: 700;">Listening to speech...</div>
              <div style="font-size: 10px; color: #94A3B8;">Say e.g. "Where is Milk?"</div>
            </div>
          </div>

          <!-- Animated Voice Waveform Bars -->
          <div style="display: flex; align-items: center; gap: 3px; height: 24px;">
            <div class="wave-bar" style="width: 3px; height: 100%; background: #38BDF8; animation: wave 0.8s infinite ease-in-out;"></div>
            <div class="wave-bar" style="width: 3px; height: 60%; background: #34D399; animation: wave 0.6s infinite ease-in-out 0.2s;"></div>
            <div class="wave-bar" style="width: 3px; height: 80%; background: #0EA5E9; animation: wave 0.7s infinite ease-in-out 0.4s;"></div>
            <div class="wave-bar" style="width: 3px; height: 40%; background: #38BDF8; animation: wave 0.5s infinite ease-in-out 0.1s;"></div>
          </div>
        </div>
      `:``}

      <!-- Chat Thread Messages Area -->
      <div id="ai-chat-thread" class="stitch-card" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #FFFFFF; padding: 14px; border: 1px solid var(--border-light);">
        ${y.map(e=>S(e)).join(``)}
      </div>

      <!-- Input Bar & Microphone Button -->
      <div style="display: flex; gap: 8px; align-items: center;">
        <button id="btn-voice-input" class="btn-secondary ${b?`active-listening`:``}" title="Voice Input" style="padding: 10px; border-radius: 10px; color: ${b?`#EF4444`:`#0EA5E9`}; border-color: ${b?`#FCA5A5`:`var(--border-medium)`}; background: ${b?`#FEE2E2`:`#FFFFFF`};">
          ${e(`mic`,20)}
        </button>
        <input type="text" id="ai-chat-input" class="form-input" placeholder="Ask AI: e.g. 'Where is rice?' or 'What can I buy with ₹300?'..." style="padding: 10px 12px; border-radius: 10px; font-size: 12px;"/>
        <button id="btn-send-ai" class="btn-primary" style="padding: 10px 14px; background: #0F172A; border-radius: 10px;">
          ${e(`arrow-right`,18)}
        </button>
      </div>

    </div>

    <style>
      @keyframes wave {
        0%, 100% { transform: scaleY(0.4); }
        50% { transform: scaleY(1.2); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `}function S(t){let n=t.sender===`ai`;return`
    <div style="display: flex; gap: 8px; ${n?``:`justify-content: flex-end;`}">
      ${n?`
        <div style="width: 28px; height: 28px; border-radius: 99px; background: #9333EA; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 6px rgba(147, 51, 234, 0.3);">
          ${e(`sparkles`,14)}
        </div>
      `:``}

      <div style="max-width: 84%; background: ${n?`#F8FAFC`:`#0F172A`}; color: ${n?`var(--text-primary)`:`#FFFFFF`}; padding: 10px 14px; border-radius: 12px; border: ${n?`1px solid var(--border-light)`:`none`}; box-shadow: var(--shadow-sm);">
        <div style="font-size: 12px; line-height: 1.5;">${t.text}</div>
        
        ${t.productCard?`
          <div style="margin-top: 8px; background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 8px; padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; color: var(--text-primary);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${t.productCard.image}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover;"/>
              <div>
                <div style="font-size: 11px; font-weight: 700;">${t.productCard.name}</div>
                <div style="font-size: 10px; color: #0284C7; font-weight: 600;">₹${t.productCard.price.toFixed(2)} • ${t.productCard.locationName.split(`–`)[0]}</div>
              </div>
            </div>
            <button class="btn-primary btn-add-ai-prod" data-id="${t.productCard.id}" style="padding: 4px 10px; font-size: 11px; background: #0F172A; border-radius: 6px; white-space: nowrap;">
              + ADD
            </button>
          </div>
        `:``}

        <div style="font-size: 9px; opacity: 0.6; margin-top: 4px; text-align: right;">${t.timestamp}</div>
      </div>
    </div>
  `}function C(e){let t=e.querySelector(`#ai-chat-thread`),n=e.querySelector(`#ai-chat-input`),r=e.querySelector(`#btn-send-ai`),i=e.querySelector(`#btn-voice-input`),a=()=>{t&&(t.scrollTop=t.scrollHeight)};a();let s=async e=>{let r=e||n.value.trim();if(!r)return;y.push({sender:`user`,text:r,timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}),n&&(n.value=``),t.innerHTML=y.map(e=>S(e)).join(``),a();let i=await g(r);y.push({sender:`ai`,text:i.text,productCard:i.productCard,timestamp:new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}),t.innerHTML=y.map(e=>S(e)).join(``),c(),a()},c=()=>{t.querySelectorAll(`.btn-add-ai-prod`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.id,n=o.products.find(e=>e.id===t);n&&o.addToCart(n,1)})})};c(),r&&r.addEventListener(`click`,()=>s()),n&&n.addEventListener(`keydown`,e=>{e.key===`Enter`&&s()}),i&&i.addEventListener(`click`,()=>{if(b=!b,o.notify(),b){if(`webkitSpeechRecognition`in window||`SpeechRecognition`in window){let e=new(window.SpeechRecognition||window.webkitSpeechRecognition);e.onresult=e=>{let t=e.results[0][0].transcript;b=!1,s(t)},e.onerror=()=>{b=!1,o.notify()},e.start()}else setTimeout(()=>{b=!1,s(`Where is rice?`)},1500)}}),e.querySelectorAll(`.ai-chip`).forEach(e=>{e.addEventListener(`click`,()=>{s(e.dataset.prompt)})})}function w(){let t=o.cart,n=t.items,r=o.getCartItemCount(),i=o.getProductsSubtotal(),a=o.getSelectedBag(),s=o.getBagQuantity(),c=o.getBagTotal(),l=o.getTax(),u=o.getCartTotal(),d=o.budgetCap,f=o.getRemainingBudget(),p=o.getBudgetStatus(),m=o.getWeightVerificationStatus();return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Bar & Continue Shopping -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Cart Items (${r})</h2>
          <p style="font-size: 11px; color: var(--text-secondary);">${t.cartId} • IoT Scale Live</p>
        </div>
        <button id="btn-continue-shopping" class="btn-secondary" style="padding: 6px 12px; font-size: 12px; display: flex; align-items: center; gap: 4px;">
          ← Continue Shopping
        </button>
      </div>

      <!-- Budget Status Alert Banner (Warning / Exceeded States) -->
      <div class="stitch-card ${p.bg}" style="border: 1px solid; padding: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 13px; font-weight: 700;" class="${p.color}">
              ${p.label}
            </span>
          </div>
          <button id="btn-cart-edit-budget" style="border: none; background: transparent; font-size: 11px; color: #0EA5E9; font-weight: 700; cursor: pointer;">
            Edit Cap
          </button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 11px; text-align: center; background: rgba(255,255,255,0.75); padding: 8px; border-radius: 8px; margin-top: 6px;">
          <div>
            <div style="color: var(--text-muted); font-size: 10px;">TRIP BUDGET CAP</div>
            <div style="font-weight: 700; font-size: 13px;">₹${d.toFixed(2)}</div>
          </div>
          <div>
            <div style="color: var(--text-muted); font-size: 10px;">AMOUNT SPENT</div>
            <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">₹${u.toFixed(2)}</div>
          </div>
          <div>
            <div style="color: var(--text-muted); font-size: 10px;">REMAINING</div>
            <div style="font-weight: 700; font-size: 13px;" class="${f<0?`text-red-600`:`text-emerald-700`}">
              ₹${f.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <!-- Real-time HX711 Load Cell Scale Verification Bar -->
      <div class="stitch-card ${m.bg}" style="border: 1px solid; padding: 10px 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 99px;" class="${m.badgeColor}"></span>
            <span class="${m.color}" style="font-weight: 700;">${m.label}</span>
          </div>
          <span style="font-size: 10px; color: var(--text-secondary);">Scale: ${t.simulatedActualWeight}g</span>
        </div>
      </div>

      <!-- EMPTY CART STATE -->
      ${n.length===0?`
        <div class="stitch-card" style="text-align: center; padding: 36px 16px; background: #FFFFFF;">
          <div style="width: 56px; height: 56px; border-radius: 99px; background: #E0F2FE; color: #0284C7; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
            ${e(`cart`,28)}
          </div>
          <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">Your Cart is Currently Empty</h3>
          <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px; margin-bottom: 16px; max-width: 280px; margin-left: auto; margin-right: auto;">
            Scan product barcodes with your camera or add recommended grocery items to your trip.
          </p>
          <button id="btn-empty-scan-items" class="btn-primary" style="padding: 10px 20px; font-size: 13px; font-weight: 700; margin: 0 auto; background: #0F172A; border-radius: 10px;">
            ${e(`scan`,16)} Start Scanning Products
          </button>
        </div>
      `:`

        <!-- Itemized Cart Products List -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${n.map(t=>`
            <div class="stitch-card" style="padding: 12px; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF;">
              
              <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                <img src="${t.image}" alt="${t.name}" style="width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-light); flex-shrink: 0;"/>
                <div style="flex: 1;">
                  <h4 style="font-size: 13px; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${t.name}</h4>
                  <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                    ₹${t.price.toFixed(2)} / unit • <span class="text-emerald-700 font-semibold">✓ ${t.expectedWeight*t.quantity}g Scale Verified</span>
                  </div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; margin-left: 8px;">
                <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">
                  ₹${(t.price*t.quantity).toFixed(2)}
                </div>

                <div style="display: flex; align-items: center; gap: 6px;">
                  <!-- Quantity Stepper -->
                  <div style="display: flex; align-items: center; border: 1px solid var(--border-medium); border-radius: 6px; overflow: hidden; background: #FFFFFF;">
                    <button class="btn-cart-minus btn-secondary" data-id="${t.id}" style="padding: 3px 8px; border: none; border-radius: 0; font-weight: 700;">-</button>
                    <span style="padding: 0 8px; font-size: 12px; font-weight: 700; min-width: 20px; text-align: center;">${t.quantity}</span>
                    <button class="btn-cart-plus btn-secondary" data-id="${t.id}" style="padding: 3px 8px; border: none; border-radius: 0; font-weight: 700;">+</button>
                  </div>

                  <!-- Trash Remove Icon Button -->
                  <button class="btn-cart-remove-item" data-id="${t.id}" title="Remove Item" style="border: none; background: #FEE2E2; color: #DC2626; border-radius: 6px; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    ${e(`trash`,14)}
                  </button>
                </div>
              </div>

            </div>
          `).join(``)}
        </div>

        <!-- CRITICAL NEW FEATURE — "Need a Carry Bag?" SECTION (Exact Stitch Design) -->
        <div class="stitch-card" style="background: #FFFFFF; border: 1px solid var(--cyan-border);">
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #0EA5E9;">🛍️</span>
              <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Need a Carry Bag?</h3>
            </div>
            <span class="stitch-badge badge-cyan" style="font-size: 9px;">Eco-Friendly Options</span>
          </div>
          <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
            Choose a suitable bag for express automated supermarket checkout.
          </p>

          <!-- Carry Bag Radio Options List -->
          <div style="display: flex; flex-direction: column; gap: 8px;" id="carry-bag-options-list">
            ${o.carryBags.filter(e=>e.isEnabled!==!1&&e.enabled!==!1).map(e=>{let n=t.selectedBagId===e.id;return n&&e.id!==`bag-none`?e.price*s:e.price,`
                <div class="bag-option-card ${n?`selected-bag`:``}" data-id="${e.id}" style="border: 1px solid ${n?`#0EA5E9`:`var(--border-light)`}; background: ${n?`#F0F9FF`:`#FFFFFF`}; padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: all 0.15s ease;">
                  <div style="display: flex; align-items: center; justify-content: space-between;">
                    
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="radio" name="carry-bag-radio" value="${e.id}" ${n?`checked`:``} style="accent-color: #0EA5E9; cursor: pointer;"/>
                      <div>
                        <div style="font-size: 12px; font-weight: 700; color: var(--text-primary);">${e.name}</div>
                        <div style="font-size: 10px; color: var(--text-muted);">${e.description}</div>
                      </div>
                    </div>

                    <div style="text-align: right; display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 13px; font-weight: 700; color: ${n?`#0284C7`:`var(--text-primary)`};">
                        ${e.price===0?`Free`:`₹${e.price.toFixed(2)}`}
                      </span>

                      <!-- Bag Quantity Stepper (Active when selected and not 'none') -->
                      ${n&&e.id!==`bag-none`?`
                        <div style="display: flex; align-items: center; border: 1px solid #0EA5E9; border-radius: 6px; background: #FFFFFF; overflow: hidden;" onclick="event.stopPropagation();">
                          <button id="btn-bag-minus" class="btn-secondary" style="padding: 2px 6px; border: none; border-radius: 0; font-size: 11px; font-weight: 700;">-</button>
                          <span style="padding: 0 6px; font-size: 11px; font-weight: 700; color: #0284C7;">${s}</span>
                          <button id="btn-bag-plus" class="btn-secondary" style="padding: 2px 6px; border: none; border-radius: 0; font-size: 11px; font-weight: 700;">+</button>
                        </div>
                      `:``}
                    </div>

                  </div>

                  ${n&&e.id!==`bag-none`&&s>1?`
                    <div style="font-size: 10px; color: #0284C7; font-weight: 600; text-align: right; margin-top: 4px;">
                      ${e.name} × ${s} = ₹${(e.price*s).toFixed(2)}
                    </div>
                  `:``}
                </div>
              `}).join(``)}
          </div>
        </div>

        <!-- Bill Breakdown Card (Matching Stitch Screenshot) -->
        <div class="stitch-card" style="background: #FFFFFF;">
          <h3 style="font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
            Bill Breakdown
          </h3>

          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
            
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-secondary);">Items Subtotal (${r} items)</span>
              <span style="font-weight: 700; color: var(--text-primary);">₹${i.toFixed(2)}</span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-secondary);">
                Carry Bag (${a.name} ${s>0?`× ${s}`:``})
              </span>
              <span style="font-weight: 700; color: ${c>0?`#0284C7`:`var(--text-primary)`};">
                ${c===0?`₹0.00`:`₹${c.toFixed(2)}`}
              </span>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--text-secondary);">Estimated GST / Taxes (5%)</span>
              <span style="font-weight: 600;">₹${l.toFixed(2)}</span>
            </div>

            <div style="height: 1px; background: var(--border-light); margin: 4px 0;"></div>

            <!-- Dynamic Final Total -->
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700;">
              <span>Total Payable</span>
              <span style="color: var(--text-primary); font-size: 20px;">₹${u.toFixed(2)}</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              <span>Remaining Budget after billing:</span>
              <span class="${f<0?`text-red-600 font-bold`:`text-emerald-700 font-bold`}">
                ₹${f.toFixed(2)}
              </span>
            </div>

          </div>

          <!-- Primary REVIEW BILL & PAY Button -->
          <button id="btn-review-bill" class="btn-primary" style="width: 100%; margin-top: 16px; padding: 14px; font-size: 15px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25); display: flex; align-items: center; justify-content: center; gap: 8px;">
            ${e(`check-circle`,18)} REVIEW BILL & PAY (₹${u.toFixed(2)})
          </button>
        </div>

      `}

      <!-- Remove Item Confirmation Modal Dialog -->
      ${o.itemToRemove?`
        <div class="modal-overlay">
          <div class="modal-card" style="max-width: 360px; text-align: center;">
            <div style="width: 48px; height: 48px; border-radius: 99px; background: #FEE2E2; color: #DC2626; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto;">
              ${e(`trash`,24)}
            </div>
            <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">Remove Product?</h3>
            <p style="font-size: 12px; color: var(--text-secondary); margin-top: 6px; margin-bottom: 16px;">
              Are you sure you want to remove <strong>"${o.itemToRemove.name}"</strong> from your shopping cart?
            </p>

            <div style="display: flex; gap: 10px;">
              <button id="btn-cancel-remove" class="btn-secondary" style="flex: 1; padding: 10px;">Cancel</button>
              <button id="btn-confirm-remove" class="btn-danger" style="flex: 1; padding: 10px;">Remove Item</button>
            </div>
          </div>
        </div>
      `:``}

      <!-- Review Bill & Payment Modal -->
      <div id="review-bill-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700;">Review Your Bill</h3>
              <div style="font-size: 11px; color: var(--text-secondary);">SuperMart Hazratganj • Cart #07</div>
            </div>
            <button id="btn-close-review-modal" style="border: none; background: transparent; cursor: pointer;">
              ${e(`x`,20)}
            </button>
          </div>

          <div id="review-modal-body">
            
            <div style="background: var(--cyan-light); border: 1px solid var(--cyan-border); padding: 10px 12px; border-radius: 8px; margin-bottom: 14px; font-size: 11px; color: #0369A1; display: flex; align-items: center; gap: 8px;">
              ${e(`shield-check`,18)}
              <span>IoT Weight Scale Verified (100% Match) • Ready for Express Gate Checkout</span>
            </div>

            <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 6px;">
              Line Items
            </div>

            <div style="display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; font-size: 12px; margin-bottom: 12px; background: var(--bg-subtle); padding: 10px; border-radius: 8px;">
              ${n.map(e=>`
                <div style="display: flex; justify-content: space-between;">
                  <span>${e.name} × ${e.quantity}</span>
                  <span style="font-weight: 700;">₹${(e.price*e.quantity).toFixed(2)}</span>
                </div>
              `).join(``)}
              
              ${a.id===`bag-none`?``:`
                <div style="display: flex; justify-content: space-between; color: #0284C7; font-weight: 600; border-top: 1px dashed var(--border-medium); padding-top: 4px; margin-top: 2px;">
                  <span>Carry Bag (${a.name} × ${s})</span>
                  <span>₹${c.toFixed(2)}</span>
                </div>
              `}
            </div>

            <div style="border-top: 1px solid var(--border-light); padding-top: 8px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between;"><span>Items Subtotal:</span><span>₹${i.toFixed(2)}</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Carry Bag Fee:</span><span>₹${c.toFixed(2)}</span></div>
              <div style="display: flex; justify-content: space-between;"><span>Estimated GST (5%):</span><span>₹${l.toFixed(2)}</span></div>
              <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 700; color: var(--text-primary); border-top: 1px solid var(--border-medium); padding-top: 6px; margin-top: 4px;">
                <span>Total Amount:</span><span style="color: #0284C7;">₹${u.toFixed(2)}</span>
              </div>
            </div>

            <button id="btn-modal-proceed-payment" class="btn-primary" style="width: 100%; padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 10px;">
              Proceed to Payment (₹${u.toFixed(2)}) →
            </button>

          </div>
        </div>
      </div>

    </div>
  `}function T(e){let t=e.querySelector(`#btn-continue-shopping`);t&&t.addEventListener(`click`,()=>{o.setCustomerTab(`home`)});let n=e.querySelector(`#btn-cart-edit-budget`);n&&n.addEventListener(`click`,()=>{let e=prompt(`Set trip budget cap (₹):`,o.budgetCap);e&&!isNaN(e)&&o.setBudgetCap(parseFloat(e))});let r=e.querySelector(`#btn-empty-scan-items`);r&&r.addEventListener(`click`,()=>{o.setCustomerTab(`scan`)}),e.querySelectorAll(`.btn-cart-minus`).forEach(e=>{e.addEventListener(`click`,()=>{o.updateQuantity(e.dataset.id,-1)})}),e.querySelectorAll(`.btn-cart-plus`).forEach(e=>{e.addEventListener(`click`,()=>{o.updateQuantity(e.dataset.id,1)})}),e.querySelectorAll(`.btn-cart-remove-item`).forEach(e=>{e.addEventListener(`click`,()=>{o.promptRemoveItem(e.dataset.id)})});let i=e.querySelector(`#btn-cancel-remove`),a=e.querySelector(`#btn-confirm-remove`);i&&i.addEventListener(`click`,()=>o.cancelRemoveItem()),a&&a.addEventListener(`click`,()=>o.confirmRemoveItem()),e.querySelectorAll(`.bag-option-card`).forEach(e=>{e.addEventListener(`click`,()=>{o.setCarryBagOption(e.dataset.id)})});let s=e.querySelector(`#btn-bag-minus`),c=e.querySelector(`#btn-bag-plus`);s&&s.addEventListener(`click`,e=>{e.stopPropagation(),o.updateCarryBagQuantity(-1)}),c&&c.addEventListener(`click`,e=>{e.stopPropagation(),o.updateCarryBagQuantity(1)});let l=e.querySelector(`#btn-review-bill`),u=e.querySelector(`#review-bill-modal`),d=e.querySelector(`#btn-close-review-modal`),f=e.querySelector(`#btn-modal-proceed-payment`);l&&l.addEventListener(`click`,()=>{o.setCustomerTab(`review-bill`)}),d&&u&&d.addEventListener(`click`,()=>{u.style.display=`none`}),f&&f.addEventListener(`click`,()=>{u&&(u.style.display=`none`),o.setCustomerTab(`payment`)})}function E(){let t=o.cart.items,n=o.getCartItemCount(),r=o.getProductsSubtotal(),i=o.getSelectedBag(),a=o.getBagQuantity(),s=o.getBagTotal(),c=o.getDiscount(),l=o.getTax(),u=o.getCartTotal(),d=o.budgetCap,f=o.getRemainingBudget();return o.getWeightVerificationStatus(),`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 10px; font-weight: 700; color: #0284C7; text-transform: uppercase;">Step 1 of 2 • Pre-Payment Review</span>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Review Your Bill</h2>
        </div>
        <span class="stitch-badge badge-green">Cart #07 Verified</span>
      </div>

      <!-- IoT Scale Verification Banner -->
      <div style="background: #E0F2FE; border: 1px solid #BAE6FD; padding: 12px; border-radius: 12px; display: flex; align-items: center; gap: 10px; color: #0369A1; font-size: 11px;">
        <div style="width: 32px; height: 32px; border-radius: 8px; background: #0284C7; color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          ${e(`shield-check`,18)}
        </div>
        <div>
          <div style="font-weight: 700; font-size: 12px;">Pre-Payment IoT Weight Scale Validation</div>
          <div>Scale reading: <strong>${o.cart.simulatedActualWeight}g</strong> (100% Weight Match)</div>
        </div>
      </div>

      <!-- Supermarket Store Info Header -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h3 style="font-size: 14px; font-weight: 700;">SuperMart — Hazratganj</h3>
          <div style="font-size: 11px; color: var(--text-secondary);">100 Feet Road, Lucknow • Terminal #07</div>
        </div>
        <div style="font-size: 11px; font-weight: 600; color: var(--text-muted);">
          Today, ${new Date().toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})}
        </div>
      </div>

      <!-- Itemized Products List -->
      <div class="stitch-card" style="background: #FFFFFF;">
        <h4 style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
          Scanned Items (${n})
        </h4>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${t.map(e=>`
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${e.image}" alt="${e.name}" style="width: 36px; height: 36px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-light);"/>
                <div>
                  <div style="font-weight: 700; color: var(--text-primary);">${e.name}</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Qty: ${e.quantity} • ₹${e.price.toFixed(2)}/unit</div>
                </div>
              </div>
              <div style="font-weight: 700; color: var(--text-primary);">
                ₹${(e.price*e.quantity).toFixed(2)}
              </div>
            </div>
          `).join(``)}

          ${i.id===`bag-none`?``:`
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; border-top: 1px dashed var(--border-medium); padding-top: 6px; margin-top: 2px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #0284C7;">🛍️</span>
                <div>
                  <div style="font-weight: 700; color: #0284C7;">${i.name} (×${a})</div>
                  <div style="font-size: 10px; color: var(--text-muted);">${i.description}</div>
                </div>
              </div>
              <div style="font-weight: 700; color: #0284C7;">
                ₹${s.toFixed(2)}
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Financial Summary Breakdown Card (Matching Stitch Layout) -->
      <div class="stitch-card" style="background: #FFFFFF;">
        <h4 style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 10px;">
          Final Financial Ledger
        </h4>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Items Subtotal (${n} items)</span>
            <span style="font-weight: 600;">₹${r.toFixed(2)}</span>
          </div>
          
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Carry Bags (${i.name} × ${a})</span>
            <span style="font-weight: 600; color: ${s>0?`#0284C7`:`inherit`};">₹${s.toFixed(2)}</span>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Promotional Discounts</span>
            <span style="font-weight: 600; color: #10B981;">-₹${c.toFixed(2)}</span>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Estimated GST / Taxes (5%)</span>
            <span style="font-weight: 600;">₹${l.toFixed(2)}</span>
          </div>

          <div style="height: 1px; background: var(--border-light); margin: 6px 0;"></div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700;">
            <span>Total Payable Amount</span>
            <span style="color: #0284C7; font-size: 20px;">₹${u.toFixed(2)}</span>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 4px; background: var(--bg-subtle); padding: 6px 10px; border-radius: 6px;">
            <span>Active Budget Cap: ₹${d.toFixed(2)}</span>
            <span class="${f<0?`text-red-600 font-bold`:`text-emerald-700 font-bold`}">
              Remaining: ₹${f.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <!-- Buttons: EDIT CART & CONFIRM & PAY -->
      <div style="display: flex; gap: 10px; margin-top: 4px;">
        <button id="btn-edit-cart" class="btn-secondary" style="flex: 1; padding: 12px; font-size: 13px; font-weight: 700; border-radius: 12px;">
          ← EDIT CART
        </button>
        <button id="btn-confirm-pay" class="btn-primary" style="flex: 2; padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);">
          CONFIRM & PAY (₹${u.toFixed(2)}) →
        </button>
      </div>

    </div>
  `}function D(e){let t=e.querySelector(`#btn-edit-cart`),n=e.querySelector(`#btn-confirm-pay`);t&&t.addEventListener(`click`,()=>{o.setCustomerTab(`cart`)}),n&&n.addEventListener(`click`,()=>{o.setCustomerTab(`payment`)})}function O(){let e=o.getCartTotal(),t=o.getCartItemCount(),n=o.getSelectedBag(),r=o.getBagQuantity(),i=o.selectedPaymentMethod||`upi`;return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 10px; font-weight: 700; color: #0284C7; text-transform: uppercase;">Step 2 of 2 • Payment Gateway</span>
          <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Select Payment Mode</h2>
        </div>
        <button id="btn-back-to-review" class="btn-secondary" style="padding: 4px 8px; font-size: 11px;">
          ← Back to Review
        </button>
      </div>

      <!-- Exact Amount Banner (Matching Stitch Screenshot) -->
      <div class="stitch-card" style="background: #0F172A; color: white; border: none; padding: 16px; text-align: center; border-radius: 14px;">
        <div style="font-size: 11px; color: #94A3B8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
          TOTAL AMOUNT TO PAY
        </div>
        <div style="font-size: 28px; font-weight: 700; color: #38BDF8; margin: 4px 0;">
          ₹${e.toFixed(2)}
        </div>
        <div style="display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 99px; font-size: 11px; color: #34D399;">
          ✓ ${t} Items + ${r} ${n.name} • Cart #07 Scale Verified
        </div>
      </div>

      <!-- Payment Accordion Options List (Matching Stitch Screenshot) -->
      <div style="display: flex; flex-direction: column; gap: 10px;" id="payment-options-list">
        
        <!-- UPI & Instant QR -->
        <div class="pay-option-card ${i===`upi`?`active-pay-card`:``}" data-method="upi" style="background: #FFFFFF; border: 1px solid ${i===`upi`?`#0EA5E9`:`var(--border-light)`}; border-radius: 12px; padding: 14px; cursor: pointer; transition: all 0.15s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="upi" ${i===`upi`?`checked`:``} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Popular UPI & Instant QR</div>
                <div style="font-size: 10px; color: var(--text-muted);">Google Pay, PhonePe, Paytm, or Any UPI App</div>
              </div>
            </div>
            <span class="stitch-badge badge-green" style="font-size: 9px;">Instant Unlock</span>
          </div>

          ${i===`upi`?`
            <div style="margin-top: 14px; border-top: 1px solid var(--border-light); padding-top: 12px; text-align: center;">
              <div style="background: #FFFFFF; border: 2px solid var(--border-light); padding: 12px; border-radius: 12px; display: inline-block; margin-bottom: 8px;">
                <div style="width: 140px; height: 140px; background: #0F172A; border-radius: 8px; color: white; font-family: monospace; font-size: 10px; display: flex; align-items: center; justify-content: center; padding: 8px; text-align: center; line-height: 1.4;">
                  [UPI QR CODE]<br/>₹${e.toFixed(2)}<br/>SmartCart@hazratganj
                </div>
              </div>
              <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary);">Scan QR with any UPI app to pay ₹${e.toFixed(2)}</div>
            </div>
          `:``}
        </div>

        <!-- Credit / Debit Cards -->
        <div class="pay-option-card ${i===`card`?`active-pay-card`:``}" data-method="card" style="background: #FFFFFF; border: 1px solid ${i===`card`?`#0EA5E9`:`var(--border-light)`}; border-radius: 12px; padding: 14px; cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="card" ${i===`card`?`checked`:``} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Credit / Debit Cards</div>
                <div style="font-size: 10px; color: var(--text-muted);">Visa, MasterCard, RuPay, HDFC Premium</div>
              </div>
            </div>
            <span style="font-size: 11px; font-weight: 600;">💳</span>
          </div>
        </div>

        <!-- Net Banking -->
        <div class="pay-option-card ${i===`netbanking`?`active-pay-card`:``}" data-method="netbanking" style="background: #FFFFFF; border: 1px solid ${i===`netbanking`?`#0EA5E9`:`var(--border-light)`}; border-radius: 12px; padding: 14px; cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="netbanking" ${i===`netbanking`?`checked`:``} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">Net Banking</div>
                <div style="font-size: 10px; color: var(--text-muted);">HDFC, ICICI, SBI, Axis, Kotak Bank</div>
              </div>
            </div>
            <span style="font-size: 11px; font-weight: 600;">🏛️</span>
          </div>
        </div>

        <!-- SuperMart Smart Wallet -->
        <div class="pay-option-card ${i===`wallet`?`active-pay-card`:``}" data-method="wallet" style="background: #FFFFFF; border: 1px solid ${i===`wallet`?`#0EA5E9`:`var(--border-light)`}; border-radius: 12px; padding: 14px; cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <input type="radio" name="pay-method-radio" value="wallet" ${i===`wallet`?`checked`:``} style="accent-color: #0EA5E9; cursor: pointer;"/>
              <div>
                <div style="font-size: 13px; font-weight: 700; color: var(--text-primary);">SuperMart Smart Wallet</div>
                <div style="font-size: 10px; color: #10B981; font-weight: 600;">Sufficient Balance: ₹500.00 Available</div>
              </div>
            </div>
            <span style="font-size: 11px; font-weight: 600;">👛</span>
          </div>
        </div>

      </div>

      <!-- Action Button: PROCEED TO PAY -->
      <button id="btn-execute-payment" class="btn-primary" style="width: 100%; margin-top: 8px; padding: 14px; font-size: 15px; font-weight: 700; background: #0F172A; border-radius: 12px; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.25);">
        PROCEED TO PAY ₹${e.toFixed(2)} →
      </button>

    </div>
  `}function k(e){let t=e.querySelector(`#btn-back-to-review`),n=e.querySelector(`#btn-execute-payment`);t&&t.addEventListener(`click`,()=>o.setCustomerTab(`review-bill`)),e.querySelectorAll(`.pay-option-card`).forEach(e=>{e.addEventListener(`click`,()=>{o.selectedPaymentMethod=e.dataset.method,o.notify()})}),n&&n.addEventListener(`click`,()=>{o.processPayment(o.selectedPaymentMethod||`upi`)&&o.showToast(`Payment processing successful!`,`success`)})}function A(){let t=o.lastCompletedOrder||o.orders[0]||{orderNumber:`SC-DEMO-001`,txnId:`TXN-984321`,customerName:`Alex Sharma`,customerPhone:`+91 98765 43210`,cartId:o.cart.cartId,items:[],subtotal:0,discount:0,tax:0,carryBagName:`No Bag`,carryBagQuantity:0,carryBagCharge:0,totalAmount:0,paymentMethod:`upi`,status:`paid`,createdAt:new Date().toLocaleString()};return`
    <div style="padding: 24px 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100%; background: #F8FAFC; text-align: center;">
      
      <!-- Big Checkmark Animation Badge -->
      <div style="width: 72px; height: 72px; border-radius: 99px; background: #DCFCE7; color: #15803D; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; box-shadow: 0 10px 25px rgba(21, 128, 61, 0.25); border: 2px solid #86EFAC;">
        ${e(`check-circle`,40)}
      </div>

      <h1 style="font-size: 22px; font-weight: 700; color: var(--text-primary);">Payment Successful!</h1>
      <p style="font-size: 12px; color: var(--text-secondary); margin-top: 4px; margin-bottom: 20px;">
        Thank you for shopping at SuperMart Hazratganj
      </p>

      <!-- Order Details Summary Card -->
      <div class="stitch-card" style="width: 100%; max-width: 380px; background: #FFFFFF; text-align: left; padding: 16px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 10px; margin-bottom: 10px;">
          <div>
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">TRANSACTION ID</div>
            <div style="font-family: monospace; font-size: 12px; font-weight: 700; color: #0284C7;">${t.txnId||`TXN-984321`}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">ORDER #</div>
            <div style="font-family: monospace; font-size: 12px; font-weight: 700;">${t.orderNumber}</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 12px;">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Store Location:</span>
            <span style="font-weight: 600;">SuperMart Hazratganj</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Payment Method:</span>
            <span style="font-weight: 700; color: #15803D;">${t.paymentMethod.toUpperCase()} ✓</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-secondary);">Paid Amount:</span>
            <span style="font-weight: 700; font-size: 14px; color: var(--text-primary);">₹${t.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div style="margin-top: 12px; background: #F0F9FF; border: 1px solid #BAE6FD; padding: 10px; border-radius: 8px; font-size: 11px; color: #0369A1; text-align: center;">
          🔓 <strong>Express Turnstile Gate Unlocked</strong><br/>
          Present your phone screen at turnstile scanner to exit.
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 380px;">
        <button id="btn-view-digital-receipt" class="btn-primary" style="padding: 12px; font-size: 14px; font-weight: 700; background: #0F172A; border-radius: 12px;">
          ${e(`orders`,16)} VIEW DIGITAL RECEIPT →
        </button>
        <button id="btn-success-home" class="btn-secondary" style="padding: 10px; font-size: 13px; font-weight: 600; border-radius: 12px;">
          Return to Home
        </button>
      </div>

    </div>
  `}function j(e){let t=e.querySelector(`#btn-view-digital-receipt`),n=e.querySelector(`#btn-success-home`);t&&t.addEventListener(`click`,()=>o.setCustomerTab(`receipt`)),n&&n.addEventListener(`click`,()=>o.setCustomerTab(`home`))}function M(){let e=o.lastCompletedOrder||o.orders[0]||{orderNumber:`SC-DEMO-001`,txnId:`TXN-984321`,customerName:`Alex Sharma`,customerPhone:`+91 98765 43210`,cartId:o.cart.cartId,items:[],subtotal:0,discount:0,tax:0,carryBagName:`No Bag`,carryBagQuantity:0,carryBagCharge:0,totalAmount:0,paymentMethod:`upi`,status:`paid`,createdAt:new Date().toLocaleString()};return`
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #F8FAFC; min-height: 100%;">
      
      <!-- Top Title -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <h2 style="font-size: 18px; font-weight: 700; color: var(--text-primary);">Official Digital Receipt</h2>
        <span class="stitch-badge badge-green">✓ PAID</span>
      </div>

      <!-- Printable Invoice Paper Card -->
      <div class="stitch-card" style="background: #FFFFFF; border: 1px solid var(--border-medium); font-family: monospace; padding: 20px;">
        
        <div style="text-align: center; border-bottom: 2px dashed #CBD5E1; padding-bottom: 14px; margin-bottom: 14px;">
          <h2 style="font-size: 16px; font-weight: 700; font-family: sans-serif; color: var(--text-primary);">SMART CART SUPERMARKET</h2>
          <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">100 Feet Road, Hazratganj, Lucknow</div>
          <div style="font-size: 10px; color: var(--text-secondary);">GSTIN: 29AABCU9603R1ZM • Phone: +91 98765 43210</div>
          
          <div style="font-size: 12px; font-weight: 700; margin-top: 10px; color: #0284C7;">INVOICE #${e.orderNumber}</div>
          <div style="font-size: 10px; color: var(--text-muted);">${e.createdAt}</div>
        </div>

        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; font-family: sans-serif; color: var(--text-secondary);">
          Itemized Products
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; margin-bottom: 14px;">
          ${e.items.map(e=>`
            <div style="display: flex; justify-content: space-between;">
              <span>${e.name} × ${e.quantity}</span>
              <span style="font-weight: 700;">₹${e.totalPrice.toFixed(2)}</span>
            </div>
          `).join(``)}

          ${e.carryBagCharge>0?`
            <div style="display: flex; justify-content: space-between; color: #0284C7; border-top: 1px dashed #CBD5E1; padding-top: 4px; margin-top: 2px;">
              <span>Carry Bag (${e.carryBagName})</span>
              <span style="font-weight: 700;">₹${e.carryBagCharge.toFixed(2)}</span>
            </div>
          `:``}
        </div>

        <div style="border-top: 2px dashed #CBD5E1; padding-top: 10px; font-size: 11px; display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span><span>₹${e.subtotal.toFixed(2)}</span></div>
          <div style="display: flex; justify-content: space-between;"><span>Estimated GST (5%):</span><span>₹${e.tax.toFixed(2)}</span></div>
          <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; margin-top: 6px; border-top: 1px solid #CBD5E1; padding-top: 6px; color: var(--text-primary);">
            <span>TOTAL PAID:</span><span style="color: #0284C7;">₹${e.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div style="text-align: center; background: #DCFCE7; color: #15803D; padding: 8px; border-radius: 6px; font-size: 10px; font-weight: 700; font-family: sans-serif;">
          ✓ Verified by IoT Weight Scale • Paid via ${e.paymentMethod.toUpperCase()}
        </div>

      </div>

      <!-- Receipt Actions: Download / Done -->
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button id="btn-download-receipt" class="btn-primary" style="padding: 12px; font-size: 13px; font-weight: 700; background: #0EA5E9; border-radius: 12px;">
          📲 Download PDF / Send to WhatsApp
        </button>
        <button id="btn-receipt-done" class="btn-secondary" style="padding: 10px; font-size: 13px; font-weight: 600; border-radius: 12px;">
          Done & Start New Shopping
        </button>
      </div>

    </div>
  `}function N(e){let t=e.querySelector(`#btn-download-receipt`),n=e.querySelector(`#btn-receipt-done`);t&&t.addEventListener(`click`,()=>{o.showToast(`Receipt PDF sent to registered WhatsApp (+91 98765 43210)`,`success`)}),n&&n.addEventListener(`click`,()=>{o.setCustomerTab(`start-shopping`)})}function P(){let t=o.orders,n=o.products,r=o.smartCarts;r.filter(e=>e.status===`active`),r.filter(e=>e.weightStatus===`mismatch`),n.filter(e=>e.stock<50);let i=t.reduce((e,t)=>e+t.totalAmount,0)+124500,a=t.reduce((e,t)=>e+t.items.reduce((e,t)=>e+t.quantity,0),0)+148;return`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Store Performance & Live Cart Fleet Operations</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Real-time IoT load-cell tracking, checkout velocity, and store analytics</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="btn-admin-broadcast" class="btn-secondary" style="font-size: 12px;">
            📢 Broadcast Banner
          </button>
          <button id="btn-admin-export" class="btn-primary" style="font-size: 12px; background: #0F172A;">
            ${e(`orders`,14)} Export Report
          </button>
        </div>
      </div>

      <!-- KPI Cards Grid (Matching Stitch Screenshot) -->
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px;">
        
        <div class="stitch-card" style="border-top: 3px solid #0EA5E9; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Sales</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹${i.toLocaleString()}
          </div>
          <div style="font-size: 10px; color: var(--green-hover); font-weight: 600; margin-top: 4px;">
            ↑ +14.2% vs yesterday
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #10B981; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Sessions</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            42 Shoppers
          </div>
          <div style="font-size: 10px; color: #0284C7; font-weight: 600; margin-top: 4px;">
            In-Store Footfall
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #6366F1; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Carts</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            18 Online
          </div>
          <div style="font-size: 10px; color: #10B981; font-weight: 600; margin-top: 4px;">
            ESP32 Mesh Synced
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #F59E0B; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Bill</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹968.00
          </div>
          <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">
            Per Shopping Trip
          </div>
        </div>

        <div class="stitch-card" style="border-top: 3px solid #EC4899; background: #FFFFFF; padding: 14px;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Products Sold</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${a} Units
          </div>
          <div style="font-size: 10px; color: var(--green-hover); font-weight: 600; margin-top: 4px;">
            High Velocity
          </div>
        </div>

      </div>

      <!-- Main Operations Grid (Sales Chart & Hardware Monitor) -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        
        <!-- Left Column: Sales Chart & Live Active Checkouts -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Sales & Footfall Velocity Chart Card -->
          <div class="stitch-card" style="background: #FFFFFF;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <div>
                <h3 style="font-size: 14px; font-weight: 700;">Real-Time Sales & Footfall Velocity</h3>
                <div style="font-size: 11px; color: var(--text-secondary);">Hourly checkout revenue aggregation</div>
              </div>
              <span class="stitch-badge badge-cyan">Live Hourly Stream</span>
            </div>

            <!-- Bar Chart Visual -->
            <div style="height: 160px; display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              ${[{hour:`09 AM`,val:8400,height:40},{hour:`10 AM`,val:14200,height:65},{hour:`11 AM`,val:19800,height:90},{hour:`12 PM`,val:24500,height:115},{hour:`01 PM`,val:21e3,height:100},{hour:`02 PM`,val:16500,height:75},{hour:`03 PM`,val:28900,height:135},{hour:`04 PM`,val:32400,height:150}].map(e=>`
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;">
                  <span style="font-size: 9px; font-weight: 700; color: var(--text-secondary);">₹${(e.val/1e3).toFixed(1)}k</span>
                  <div style="width: 100%; height: ${e.height}px; background: linear-gradient(180deg, #0EA5E9 0%, #0284C7 100%); border-radius: 4px;"></div>
                  <span style="font-size: 9px; color: var(--text-muted);">${e.hour}</span>
                </div>
              `).join(``)}
            </div>
          </div>

          <!-- Live Active Checkouts & Express Gate Log Table -->
          <div class="stitch-card" style="background: #FFFFFF; padding: 0; overflow: hidden;">
            <div style="padding: 14px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 14px; font-weight: 700;">Live Active Checkouts & Express Gate Log</h3>
                <div style="font-size: 11px; color: var(--text-secondary);">Automated turnstile unlocks and IoT scale audits</div>
              </div>
              <span class="stitch-badge badge-green">Turnstile Active</span>
            </div>

            <table class="stitch-table">
              <thead>
                <tr>
                  <th>Cart ID</th>
                  <th>Customer</th>
                  <th>Cart Items</th>
                  <th>Scale Weight</th>
                  <th>Gate Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                ${r.map(e=>`
                  <tr>
                    <td><strong style="color: #0284C7; font-family: monospace;">${e.cartId}</strong></td>
                    <td>
                      <div style="font-weight: 600;">${e.customerName}</div>
                      <div style="font-size: 10px; color: var(--text-muted);">${e.customerPhone}</div>
                    </td>
                    <td><span class="stitch-badge badge-cyan">${e.itemCount} items</span></td>
                    <td>
                      <div style="font-weight: 700;">${e.actualWeightGrams}g</div>
                      <div style="font-size: 9px; color: ${e.weightStatus===`verified`?`#16A34A`:`#DC2626`}; font-weight: 600;">
                        ${e.weightStatus===`verified`?`✓ 100% Match`:`⚠️ Weight Mismatch`}
                      </div>
                    </td>
                    <td>
                      <span class="stitch-badge ${e.status===`checked_out`?`badge-green`:`badge-amber`}">
                        ${e.status===`checked_out`?`🔓 Unlocked`:`🔒 Locked`}
                      </span>
                    </td>
                    <td><span style="font-size: 11px; color: var(--text-muted);">${e.lastPing}</span></td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>

        </div>

        <!-- Right Column: Hardware Health Monitor & Top Scan Right Now -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          
          <!-- Hardware Health Monitor Card -->
          <div class="stitch-card" style="background: #FFFFFF;">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
              Hardware Health Monitor
            </h3>

            <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">ESP32 BLE Mesh Protocol</span>
                <span style="font-weight: 700; color: #10B981;">Online (18 Nodes)</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">Average Battery Level</span>
                <span style="font-weight: 700;">86% (Good)</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">HX711 Load Cell Drift</span>
                <span style="font-weight: 700; color: #0284C7;">&lt; 2.1g Variance</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--text-secondary);">Express Gate Response</span>
                <span style="font-weight: 700;">140 ms</span>
              </div>
            </div>
          </div>

          <!-- Top Scan Right Now / Popular Products List -->
          <div class="stitch-card" style="background: #FFFFFF;">
            <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid var(--border-light); padding-bottom: 6px;">
              Top Scanned Products Right Now
            </h3>

            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${n.slice(0,4).map(e=>`
                <div style="display: flex; items-center; justify-content: space-between; font-size: 12px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <img src="${e.image}" alt="${e.name}" style="width: 32px; height: 32px; border-radius: 4px; object-fit: cover;"/>
                    <div>
                      <div style="font-weight: 600;">${e.name}</div>
                      <div style="font-size: 9px; color: var(--text-muted);">${e.locationName.split(`–`)[0]}</div>
                    </div>
                  </div>
                  <div style="font-weight: 700; color: var(--text-primary);">₹${e.price.toFixed(2)}</div>
                </div>
              `).join(``)}
            </div>
          </div>

        </div>

      </div>

    </div>
  `}function F(e){let t=e.querySelector(`#btn-admin-broadcast`);t&&t.addEventListener(`click`,()=>o.showToast(`Broadcast notification sent to active carts`,`info`))}function te(){let t=o.products,n=[`All`,...new Set(t.map(e=>e.category))];return`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <!-- Top Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Product Catalog & Carry Bag Configuration</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Manage supermarket inventory barcodes, prices, taxes, aisle placement & scale weights</p>
        </div>
        <button id="btn-open-add-product" class="btn-primary" style="background: #0F172A;">
          ${e(`plus`,14)} Add New Product
        </button>
      </div>

      <!-- Search & Filters Card -->
      <div class="stitch-card" style="padding: 12px; background: #FFFFFF; display: flex; gap: 12px; align-items: center;">
        <div style="flex: 1; position: relative;">
          <input type="text" id="input-search-products" class="form-input" placeholder="Search product name or EAN-13 barcode..." style="padding-left: 32px;"/>
          <div style="position: absolute; left: 10px; top: 10px; color: var(--text-muted);">${e(`search`,14)}</div>
        </div>

        <select id="select-filter-category" class="form-select" style="width: 180px;">
          ${n.map(e=>`<option value="${e}">${e}</option>`).join(``)}
        </select>
      </div>

      <!-- Products Data Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Aisle / Shelf</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="table-products-body">
            ${I(t)}
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Product Modal Form (With all requested fields) -->
      <div id="product-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 540px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border-light); padding-bottom: 10px;">
            <h3 id="modal-product-title" style="font-size: 16px; font-weight: 700;">Add New Product Catalog Item</h3>
            <button id="btn-close-prod-modal" style="border: none; background: transparent; cursor: pointer;">
              ${e(`x`,20)}
            </button>
          </div>

          <form id="form-product" style="display: flex; flex-direction: column; gap: 10px;">
            <input type="hidden" id="prod-form-id"/>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Product Name</label>
                <input type="text" id="prod-form-name" class="form-input" placeholder="Amul Toned Milk 500 mL" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Barcode (EAN-13)</label>
                <input type="text" id="prod-form-barcode" class="form-input" placeholder="8901030864512" required/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Category</label>
                <select id="prod-form-category" class="form-select">
                  <option value="Dairy">Dairy</option>
                  <option value="Bakery">Bakery</option>
                  <option value="Grains">Grains</option>
                  <option value="Spices">Spices</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Household">Household</option>
                  <option value="Packaged Foods">Packaged Foods</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Unit Type / Size</label>
                <input type="text" id="prod-form-unit" class="form-input" placeholder="500 mL / 1 kg" required/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Price (₹)</label>
                <input type="number" step="0.01" id="prod-form-price" class="form-input" placeholder="28.00" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Discount (%)</label>
                <input type="number" step="0.1" id="prod-form-discount" class="form-input" placeholder="0"/>
              </div>
              <div class="form-group">
                <label class="form-label">GST Tax (%)</label>
                <input type="number" step="0.1" id="prod-form-tax" class="form-input" placeholder="5.0"/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Stock Quantity</label>
                <input type="number" id="prod-form-stock" class="form-input" placeholder="100" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Store Aisle</label>
                <select id="prod-form-location" class="form-select">
                  ${o.locations.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Shelf Bay</label>
                <input type="text" id="prod-form-shelf" class="form-input" placeholder="Shelf A, Bay 2"/>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Scale Expected Weight (Grams)</label>
              <input type="number" step="0.1" id="prod-form-weight" class="form-input" placeholder="510.0" required/>
            </div>

            <div class="form-group">
              <label class="form-label">Image URL</label>
              <input type="text" id="prod-form-image" class="form-input" placeholder="https://images.unsplash.com/..."/>
            </div>

            <div class="form-group">
              <label class="form-label">Product Description</label>
              <textarea id="prod-form-description" class="form-textarea" rows="2" placeholder="Item description and nutritional details..."></textarea>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 10px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save Product Catalog Item
            </button>
          </form>
        </div>
      </div>

    </div>
  `}function I(t){return t.length===0?`<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 20px;">No products found</td></tr>`:t.map(t=>`
    <tr>
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="${t.image}" alt="${t.name}" style="width: 38px; height: 38px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-light);"/>
          <div>
            <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${t.name}</div>
            <div style="font-size: 10px; color: var(--text-muted);">${t.unit} • ${t.expectedWeight}g</div>
          </div>
        </div>
      </td>
      <td><span style="font-family: monospace; font-size: 11px; font-weight: 600; color: var(--text-secondary);">${t.barcode}</span></td>
      <td><span class="stitch-badge badge-cyan">${t.category}</span></td>
      <td><strong style="color: var(--text-primary);">₹${t.price.toFixed(2)}</strong></td>
      <td>
        <strong style="${t.stock<50?`color: var(--amber-warning);`:`color: var(--text-primary);`}">
          ${t.stock} pcs
        </strong>
      </td>
      <td><span style="font-size: 11px;">${t.locationName.split(`–`)[0]} (${t.shelf||`Shelf A`})</span></td>
      <td>
        <span class="stitch-badge ${t.isActive?`badge-green`:`badge-red`}">
          ${t.isActive?`Active`:`Disabled`}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 6px;">
          <button class="btn-edit-prod btn-secondary" data-id="${t.id}" style="padding: 4px 8px; font-size: 11px;">
            ${e(`edit`,12)} Edit
          </button>
          <button class="btn-toggle-prod btn-secondary" data-id="${t.id}" style="padding: 4px 8px; font-size: 11px;">
            ${t.isActive?`Disable`:`Enable`}
          </button>
          <button class="btn-delete-prod btn-danger" data-id="${t.id}" style="padding: 4px 8px; font-size: 11px;">
            ${e(`trash`,12)}
          </button>
        </div>
      </td>
    </tr>
  `).join(``)}function L(e){let t=e.querySelector(`#input-search-products`),n=e.querySelector(`#select-filter-category`),r=e.querySelector(`#table-products-body`),i=e.querySelector(`#product-modal`),a=e.querySelector(`#btn-open-add-product`),s=e.querySelector(`#btn-close-prod-modal`),c=e.querySelector(`#form-product`),l=()=>{let e=t.value.toLowerCase().trim(),i=n.value,a=o.products.filter(t=>{let n=t.name.toLowerCase().includes(e)||t.barcode.includes(e),r=i===`All`||t.category===i;return n&&r});r.innerHTML=I(a),u()};t&&t.addEventListener(`input`,l),n&&n.addEventListener(`change`,l),a&&a.addEventListener(`click`,()=>{c.reset(),e.querySelector(`#prod-form-id`).value=``,e.querySelector(`#modal-product-title`).innerText=`Add New Product Catalog Item`,i.style.display=`flex`}),s&&s.addEventListener(`click`,()=>{i.style.display=`none`}),c&&c.addEventListener(`submit`,t=>{t.preventDefault();let n=e.querySelector(`#prod-form-id`).value,r=e.querySelector(`#prod-form-location`).value,a=o.locations.find(e=>e.id===r),s={name:e.querySelector(`#prod-form-name`).value.trim(),barcode:e.querySelector(`#prod-form-barcode`).value.trim(),category:e.querySelector(`#prod-form-category`).value,unit:e.querySelector(`#prod-form-unit`).value.trim(),price:e.querySelector(`#prod-form-price`).value,discount:e.querySelector(`#prod-form-discount`).value||0,tax:e.querySelector(`#prod-form-tax`).value||5,stock:e.querySelector(`#prod-form-stock`).value||100,locationId:r,locationName:a?a.name:`Aisle 1`,shelf:e.querySelector(`#prod-form-shelf`).value||`Shelf A`,expectedWeight:e.querySelector(`#prod-form-weight`).value,image:e.querySelector(`#prod-form-image`).value.trim(),description:e.querySelector(`#prod-form-description`).value.trim()};n?o.updateProduct(n,s):o.addProduct(s),i.style.display=`none`,l()});let u=()=>{e.querySelectorAll(`.btn-edit-prod`).forEach(t=>{t.addEventListener(`click`,()=>{let n=o.products.find(e=>e.id===t.dataset.id);n&&(e.querySelector(`#prod-form-id`).value=n.id,e.querySelector(`#prod-form-name`).value=n.name,e.querySelector(`#prod-form-barcode`).value=n.barcode,e.querySelector(`#prod-form-category`).value=n.category,e.querySelector(`#prod-form-unit`).value=n.unit,e.querySelector(`#prod-form-price`).value=n.price,e.querySelector(`#prod-form-discount`).value=n.discount||0,e.querySelector(`#prod-form-tax`).value=n.tax||5,e.querySelector(`#prod-form-stock`).value=n.stock,e.querySelector(`#prod-form-shelf`).value=n.shelf||`Shelf A`,e.querySelector(`#prod-form-weight`).value=n.expectedWeight,e.querySelector(`#prod-form-image`).value=n.image,e.querySelector(`#prod-form-description`).value=n.description||``,e.querySelector(`#modal-product-title`).innerText=`Edit Product Catalog Item`,i.style.display=`flex`)})}),e.querySelectorAll(`.btn-toggle-prod`).forEach(e=>{e.addEventListener(`click`,()=>{o.toggleProductStatus(e.dataset.id),l()})}),e.querySelectorAll(`.btn-delete-prod`).forEach(e=>{e.addEventListener(`click`,()=>{confirm(`Are you sure you want to remove this product?`)&&(o.deleteProduct(e.dataset.id),l())})})};u()}function R(){let t=o.products,n=t.filter(e=>e.stock<50&&e.stock>0),r=t.filter(e=>e.stock===0),i=t.filter(e=>e.stock>=50);return`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Inventory & Stock Levels</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Real-time shelf inventory control, restock alerts, and stock adjustments</p>
        </div>
        <button id="btn-export-inventory" class="btn-secondary" style="font-size: 12px;">
          ${e(`orders`,14)} Export Stock Log
        </button>
      </div>

      <!-- Inventory KPI Overview Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
        <div class="stitch-card" style="border-left: 4px solid #0EA5E9; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Products</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${t.length} Items
          </div>
          <div style="font-size: 10px; color: #0284C7; margin-top: 2px;">Catalog Total</div>
        </div>

        <div class="stitch-card" style="border-left: 4px solid #10B981; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Healthy Stock</div>
          <div style="font-size: 22px; font-weight: 700; color: #10B981; margin-top: 4px;">
            ${i.length} Items
          </div>
          <div style="font-size: 10px; color: #166534; margin-top: 2px;">Stock ≥ 50 units</div>
        </div>

        <div class="stitch-card" style="border-left: 4px solid #F59E0B; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Low Stock Warning</div>
          <div style="font-size: 22px; font-weight: 700; color: #F59E0B; margin-top: 4px;">
            ${n.length} Items
          </div>
          <div style="font-size: 10px; color: #B45309; margin-top: 2px;">Stock &lt; 50 units</div>
        </div>

        <div class="stitch-card" style="border-left: 4px solid #EF4444; background: #FFFFFF;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Out of Stock</div>
          <div style="font-size: 22px; font-weight: 700; color: #EF4444; margin-top: 4px;">
            ${r.length} Items
          </div>
          <div style="font-size: 10px; color: #B91C1C; margin-top: 2px;">Requires Reorder</div>
        </div>
      </div>

      <!-- Inventory Data Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Aisle & Shelf</th>
              <th>Current Stock</th>
              <th>Reorder Status</th>
              <th>Availability</th>
              <th>Update Stock</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>`
              <tr>
                <td>
                  <div style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${e.name}</div>
                  <div style="font-size: 10px; color: var(--text-muted); font-family: monospace;">EAN: ${e.barcode}</div>
                </td>
                <td><span class="stitch-badge badge-cyan">${e.category}</span></td>
                <td><span style="font-size: 11px;">${e.locationName.split(`–`)[0]} (${e.shelf||`Shelf A`})</span></td>
                <td>
                  <strong style="font-size: 14px; ${e.stock<50?`color: var(--amber-warning);`:`color: var(--text-primary);`}">
                    ${e.stock} units
                  </strong>
                </td>
                <td>
                  <span class="stitch-badge ${e.stock===0?`badge-red`:e.stock<50?`badge-amber`:`badge-green`}">
                    ${e.stock===0?`🚨 Out of Stock`:e.stock<50?`⚠️ Low Stock (<50)`:`✓ Stock Healthy`}
                  </span>
                </td>
                <td>
                  <span class="stitch-badge ${e.stock>0?`badge-green`:`badge-red`}">
                    ${e.stock>0?`Available`:`Unavailable`}
                  </span>
                </td>
                <td>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <button class="btn-stock-sub btn-secondary" data-id="${e.id}" style="padding: 4px 8px; font-size: 11px;">-10</button>
                    <button class="btn-stock-add btn-secondary" data-id="${e.id}" style="padding: 4px 8px; font-size: 11px;">+50</button>
                    <button class="btn-stock-custom btn-primary" data-id="${e.id}" style="padding: 4px 8px; font-size: 11px; background: #0F172A;">Set</button>
                  </div>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>

    </div>
  `}function z(e){e.querySelectorAll(`.btn-stock-sub`).forEach(e=>{e.addEventListener(`click`,()=>{let t=o.products.find(t=>t.id===e.dataset.id);t&&o.updateStock(t.id,t.stock-10)})}),e.querySelectorAll(`.btn-stock-add`).forEach(e=>{e.addEventListener(`click`,()=>{let t=o.products.find(t=>t.id===e.dataset.id);t&&o.updateStock(t.id,t.stock+50)})}),e.querySelectorAll(`.btn-stock-custom`).forEach(e=>{e.addEventListener(`click`,()=>{let t=o.products.find(t=>t.id===e.dataset.id);if(t){let e=prompt(`Set exact stock quantity for ${t.name}:`,t.stock);e!==null&&!isNaN(e)&&o.updateStock(t.id,parseInt(e))}})})}function B(){let t=o.locations;return`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Interactive Supermarket Floorplan & Aisle Map</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Configure indoor digital map locations, section placement & shelf bay coordinates</p>
        </div>
        <button id="btn-add-location" class="btn-primary" style="background: #0F172A;">
          ${e(`plus`,14)} Add New Location Zone
        </button>
      </div>

      <!-- Supermarket Grid Map Layout Card -->
      <div class="stitch-card" style="background: #FFFFFF; padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 14px; font-weight: 700;">Supermarket Floorplan Grid</h3>
          <span class="stitch-badge badge-cyan">${t.length} Active Store Zones</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #F1F5F9; padding: 14px; border-radius: 12px; border: 1px solid var(--border-light);">
          ${t.map(e=>{let t=o.products.filter(t=>t.locationId===e.id).length;return`
              <div class="store-zone-card" data-id="${e.id}" style="background: #FFFFFF; border: 1px solid var(--border-light); padding: 10px; border-radius: 8px; cursor: pointer; transition: all 0.15s ease;">
                <div style="font-size: 11px; font-weight: 700; color: var(--text-primary);">${e.name}</div>
                <div style="font-size: 10px; color: #0284C7; font-weight: 600; margin-top: 2px;">${e.aisle} • ${e.section||`General`}</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; font-size: 9px; color: var(--text-muted);">
                  <span>Shelf: ${e.shelf||`Shelf A`}</span>
                  <span class="stitch-badge badge-green" style="font-size: 8px;">${t} Items</span>
                </div>
              </div>
            `}).join(``)}
        </div>
      </div>

      <!-- Store Locations Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Zone Name</th>
              <th>Aisle Tag</th>
              <th>Section</th>
              <th>Shelf</th>
              <th>Map Coordinates (X, Y)</th>
              <th>Assigned Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(t=>{let n=o.products.filter(e=>e.locationId===t.id).length;return`
                <tr>
                  <td><div style="font-weight: 700; color: var(--text-primary);">${t.name}</div></td>
                  <td><span class="stitch-badge badge-cyan">${t.aisle}</span></td>
                  <td>${t.section||`-`}</td>
                  <td>${t.shelf||`Shelf A`}</td>
                  <td><span style="font-family: monospace; font-size: 11px;">(${t.x===void 0?0:t.x}, ${t.y===void 0?0:t.y})</span></td>
                  <td><span class="stitch-badge badge-green">${n} products</span></td>
                  <td>
                    <button class="btn-edit-location btn-secondary" data-id="${t.id}" style="padding: 4px 8px; font-size: 11px;">
                      ${e(`edit`,12)} Edit
                    </button>
                  </td>
                </tr>
              `}).join(``)}
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Store Zone Modal Form -->
      <div id="location-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 id="loc-modal-title" style="font-size: 16px; font-weight: 700;">Edit Location Zone</h3>
            <button id="btn-close-loc-modal" style="border: none; background: transparent; cursor: pointer;">
              ${e(`x`,20)}
            </button>
          </div>

          <form id="form-location" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="hidden" id="loc-form-id"/>

            <div class="form-group">
              <label class="form-label">Zone Display Name</label>
              <input type="text" id="loc-form-name" class="form-input" placeholder="e.g. Aisle 6 – Baby Care" required/>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Aisle Label</label>
                <input type="text" id="loc-form-aisle" class="form-input" placeholder="Aisle 6" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Department / Section</label>
                <input type="text" id="loc-form-section" class="form-input" placeholder="Baby Care"/>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Shelf Bay</label>
                <input type="text" id="loc-form-shelf" class="form-input" placeholder="Shelf A"/>
              </div>
              <div class="form-group">
                <label class="form-label">Grid X</label>
                <input type="number" id="loc-form-x" class="form-input" placeholder="6"/>
              </div>
              <div class="form-group">
                <label class="form-label">Grid Y</label>
                <input type="number" id="loc-form-y" class="form-input" placeholder="1"/>
              </div>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 8px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save Location Zone
            </button>
          </form>
        </div>
      </div>

    </div>
  `}function V(e){let t=e.querySelector(`#location-modal`),n=e.querySelector(`#btn-close-loc-modal`),r=e.querySelector(`#form-location`),i=e.querySelector(`#btn-add-location`);n&&t&&n.addEventListener(`click`,()=>{t.style.display=`none`}),i&&i.addEventListener(`click`,()=>{r.reset(),e.querySelector(`#loc-form-id`).value=``,e.querySelector(`#loc-modal-title`).innerText=`Add New Location Zone`,t.style.display=`flex`}),r&&r.addEventListener(`submit`,n=>{n.preventDefault();let r=e.querySelector(`#loc-form-id`).value,i=e.querySelector(`#loc-form-name`).value.trim(),a=e.querySelector(`#loc-form-aisle`).value.trim(),s=e.querySelector(`#loc-form-section`).value.trim(),c=e.querySelector(`#loc-form-shelf`).value.trim()||`Shelf A`,l=parseInt(e.querySelector(`#loc-form-x`).value||0),u=parseInt(e.querySelector(`#loc-form-y`).value||0);if(r){let e=o.locations.find(e=>e.id===r);e&&(Object.assign(e,{name:i,aisle:a,section:s,shelf:c,x:l,y:u}),o.showToast(`Zone "${i}" updated`,`success`),o.notify())}else{let e={id:`loc-${Date.now()}`,name:i,aisle:a,section:s,shelf:c,x:l,y:u};o.locations.push(e),o.showToast(`Zone "${i}" created`,`success`),o.notify()}t.style.display=`none`}),e.querySelectorAll(`.btn-edit-location`).forEach(n=>{n.addEventListener(`click`,()=>{let r=o.locations.find(e=>e.id===n.dataset.id);r&&(e.querySelector(`#loc-form-id`).value=r.id,e.querySelector(`#loc-form-name`).value=r.name,e.querySelector(`#loc-form-aisle`).value=r.aisle,e.querySelector(`#loc-form-section`).value=r.section||``,e.querySelector(`#loc-form-shelf`).value=r.shelf||`Shelf A`,e.querySelector(`#loc-form-x`).value=r.x===void 0?0:r.x,e.querySelector(`#loc-form-y`).value=r.y===void 0?0:r.y,e.querySelector(`#loc-modal-title`).innerText=`Edit ${r.name}`,t.style.display=`flex`)})})}function H(){let t=o.smartCarts;return`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Smart Cart Fleet Management & Indoor Positioning</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Live telemetry, ESP32 BLE Mesh health, load cell calibration, and customer cart positioning</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="btn-ping-carts" class="btn-secondary" style="font-size: 12px;">
            ${e(`wifi`,14)} Ping Fleet
          </button>
          <button id="btn-emergency-unlock" class="btn-danger" style="font-size: 12px;">
            🚨 Emergency Gate Release
          </button>
        </div>
      </div>

      <!-- Connected Smart Carts Grid (Matching Stitch Screenshot) -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        ${t.map(e=>`
          <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid ${e.weightStatus===`verified`?`#10B981`:e.weightStatus===`mismatch`?`#F59E0B`:`#0EA5E9`};">
            
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
              <div>
                <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">IoT Microcontroller</div>
                <h3 style="font-size: 16px; font-weight: 700; color: var(--text-primary);">${e.cartId} (${e.hardwareId})</h3>
              </div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="stitch-badge ${e.status===`active`||e.status===`checked_out`?`badge-green`:`badge-cyan`}">
                  ${e.status===`active`?`🟢 Online`:e.status===`checked_out`?`✓ Checked Out`:`⚪ Idle`}
                </span>
              </div>
            </div>

            <div style="background: var(--bg-subtle); padding: 12px; border-radius: 8px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 12px; margin-bottom: 12px;">
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">CURRENT SESSION</span>
                <div style="font-weight: 700; color: var(--text-primary);">${e.customerName}</div>
                <div style="font-size: 9px; color: var(--text-secondary);">${e.customerPhone}</div>
              </div>
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">CART ITEMS</span>
                <div style="font-weight: 700; color: #0284C7;">${e.itemCount} items inside</div>
              </div>
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">EXPECTED SCALE WEIGHT</span>
                <div style="font-weight: 700; color: #166534;">${e.expectedWeightGrams}g</div>
              </div>
              <div>
                <span style="font-size: 10px; color: var(--text-muted); font-weight: 600;">HX711 LOAD CELL READING</span>
                <div style="font-weight: 700; color: ${e.weightStatus===`verified`?`#16A34A`:`#DC2626`};">
                  ${e.actualWeightGrams}g (${e.weightStatus===`verified`?`Verified`:`Mismatch`})
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-secondary);">
              <span>🔋 Battery: <strong>${e.batteryLevel}%</strong></span>
              <span>📶 Wi-Fi Signal: <strong>${e.rssi}</strong></span>
              <span style="color: var(--text-muted);">Last activity: ${e.lastPing}</span>
            </div>

          </div>
        `).join(``)}
      </div>

    </div>
  `}function U(e){let t=e.querySelector(`#btn-ping-carts`),n=e.querySelector(`#btn-emergency-unlock`);t&&t.addEventListener(`click`,()=>o.showToast(`Ping request sent to ESP32 node mesh`,`success`)),n&&n.addEventListener(`click`,()=>o.showToast(`Emergency Turnstile Gate Release Triggered`,`info`))}function W(){let t=o.orders;return`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Orders & Checkout Bills Ledger</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Audit customer transactions, digital invoices, and IoT scale verification logs</p>
        </div>
        <span class="stitch-badge badge-green">${t.length} Completed Invoices</span>
      </div>

      <!-- Orders Data Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Bill ID / Order #</th>
              <th>Cart ID</th>
              <th>Date & Time</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Scale Audit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(e=>`
              <tr>
                <td><strong style="font-family: monospace; font-size: 11px; color: #0284C7;">${e.orderNumber}</strong></td>
                <td><span class="stitch-badge badge-cyan">${e.cartId||`CART #07`}</span></td>
                <td><span style="font-size: 11px; color: var(--text-muted);">${e.createdAt}</span></td>
                <td>
                  <div style="font-weight: 600;">${e.customerName}</div>
                  <div style="font-size: 9px; color: var(--text-muted);">${e.customerPhone}</div>
                </td>
                <td><span class="stitch-badge badge-cyan">${e.items.reduce((e,t)=>e+t.quantity,0)} items</span></td>
                <td><strong style="font-size: 14px; color: var(--text-primary);">₹${e.totalAmount.toFixed(2)}</strong></td>
                <td><span class="stitch-badge badge-green">${e.status.toUpperCase()} (${e.paymentMethod.toUpperCase()})</span></td>
                <td>
                  <span class="stitch-badge ${e.weightVerified?`badge-green`:`badge-amber`}">
                    ${e.weightVerified?`✓ 100% Scale Match`:`⚠️ Unverified`}
                  </span>
                </td>
                <td>
                  <button class="btn-inspect-order btn-secondary" data-id="${e.id}" style="padding: 4px 10px; font-size: 11px;">
                    Inspect Bill
                  </button>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>

      <!-- Inspect Bill Modal -->
      <div id="admin-inspect-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px; font-family: monospace;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 style="font-size: 15px; font-weight: 700; font-family: sans-serif;">Invoice Inspection</h3>
            <button id="btn-close-inspect-modal" style="border: none; background: transparent; cursor: pointer;">
              ${e(`x`,20)}
            </button>
          </div>

          <div id="admin-inspect-modal-body"></div>
        </div>
      </div>

    </div>
  `}function G(e){let t=e.querySelector(`#admin-inspect-modal`),n=e.querySelector(`#admin-inspect-modal-body`),r=e.querySelector(`#btn-close-inspect-modal`);r&&r.addEventListener(`click`,()=>t.style.display=`none`),e.querySelectorAll(`.btn-inspect-order`).forEach(e=>{e.addEventListener(`click`,()=>{let r=o.orders.find(t=>t.id===e.dataset.id);r&&(n.innerHTML=`
          <div style="text-align: center; border-bottom: 2px dashed #CBD5E1; padding-bottom: 10px; margin-bottom: 10px;">
            <h2 style="font-size: 15px; font-weight: 700; font-family: sans-serif;">SUPERMART HAZRATGANJ</h2>
            <div style="font-size: 10px; color: var(--text-secondary);">Invoice: ${r.orderNumber}</div>
            <div style="font-size: 9px; color: var(--text-muted);">${r.createdAt}</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11px; margin-bottom: 10px;">
            ${r.items.map(e=>`
              <div style="display: flex; justify-content: space-between;">
                <span>${e.name} × ${e.quantity}</span>
                <span>₹${e.totalPrice.toFixed(2)}</span>
              </div>
            `).join(``)}
            
            ${r.carryBagCharge>0?`
              <div style="display: flex; justify-content: space-between; color: #0284C7;">
                <span>Carry Bag (${r.carryBagName})</span>
                <span>₹${r.carryBagCharge.toFixed(2)}</span>
              </div>
            `:``}
          </div>

          <div style="border-top: 1px dashed #CBD5E1; padding-top: 6px; font-size: 11px; display: flex; flex-direction: column; gap: 3px; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between;"><span>Subtotal:</span><span>₹${r.subtotal.toFixed(2)}</span></div>
            <div style="display: flex; justify-content: space-between;"><span>GST (5%):</span><span>₹${r.tax.toFixed(2)}</span></div>
            <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 13px; color: var(--text-primary); border-top: 1px solid #CBD5E1; padding-top: 4px;">
              <span>TOTAL PAID:</span><span>₹${r.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div style="background: #DCFCE7; color: #15803D; padding: 6px; border-radius: 4px; font-size: 10px; text-align: center; font-weight: 700;">
            ✓ Payment Verified (${r.paymentMethod.toUpperCase()}) • IoT Weight Scale Audit Passed
          </div>
        `,t.style.display=`flex`)})})}function K(){let t=o.aiRecommendations;return`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">AI Recommendation Engine & Cross-Sell Rules</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Manage automated product pairings, meal deal combos, and conversion performance</p>
        </div>
        <button id="btn-open-add-ai-rule" class="btn-primary" style="background: #0F172A;">
          ${e(`plus`,14)} Add AI Pairing Rule
        </button>
      </div>

      <!-- Performance KPI Overview -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #9333EA;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Active Pairing Rules</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${t.length} Active Rules
          </div>
          <div style="font-size: 10px; color: #7E22CE; margin-top: 2px;">Gemini Engine Synced</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #10B981;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Avg Sales Conversion Boost</div>
          <div style="font-size: 22px; font-weight: 700; color: #10B981; margin-top: 4px;">
            +23.5%
          </div>
          <div style="font-size: 10px; color: #166534; margin-top: 2px;">Basket Size Increase</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #0EA5E9;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Top Recommended Pair</div>
          <div style="font-size: 16px; font-weight: 700; color: #0284C7; margin-top: 4px;">
            Milk ➔ Bread (+35%)
          </div>
          <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">Breakfast Combo</div>
        </div>
      </div>

      <!-- AI Rules Table -->
      <div class="stitch-card" style="padding: 0; overflow: hidden; background: #FFFFFF;">
        <table class="stitch-table">
          <thead>
            <tr>
              <th>Trigger Cart Product</th>
              <th>AI Suggested Cross-Sell</th>
              <th>Recommendation Rationale</th>
              <th>Conversion Boost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${t.map(t=>`
              <tr>
                <td><strong style="color: var(--text-primary);">${t.triggerProduct}</strong></td>
                <td><strong style="color: #0284C7;">${t.suggestedProduct}</strong></td>
                <td><span style="font-size: 12px; color: var(--text-secondary);">${t.reason}</span></td>
                <td><span class="stitch-badge badge-green">+${t.boostPercentage||20}% Conversion</span></td>
                <td>
                  <span class="stitch-badge ${t.isActive?`badge-cyan`:`badge-red`}">
                    ${t.isActive?`Active`:`Disabled`}
                  </span>
                </td>
                <td>
                  <div style="display: flex; gap: 6px;">
                    <button class="btn-toggle-ai-rule btn-secondary" data-id="${t.id}" style="padding: 4px 8px; font-size: 11px;">
                      ${t.isActive?`Pause`:`Activate`}
                    </button>
                    <button class="btn-delete-ai-rule btn-danger" data-id="${t.id}" style="padding: 4px 8px; font-size: 11px;">
                      ${e(`trash`,12)}
                    </button>
                  </div>
                </td>
              </tr>
            `).join(``)}
          </tbody>
        </table>
      </div>

      <!-- Add AI Rule Modal Form -->
      <div id="ai-rule-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 style="font-size: 16px; font-weight: 700;">Add AI Cross-Sell Rule</h3>
            <button id="btn-close-ai-modal" style="border: none; background: transparent; cursor: pointer;">
              ${e(`x`,20)}
            </button>
          </div>

          <form id="form-ai-rule" style="display: flex; flex-direction: column; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Trigger Product (When in Cart)</label>
              <select id="ai-form-trigger" class="form-select" required>
                ${o.products.map(e=>`<option value="${e.name}">${e.name} (₹${e.price})</option>`).join(``)}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Suggested Product (To Recommend)</label>
              <select id="ai-form-suggested" class="form-select" required>
                ${o.products.map(e=>`<option value="${e.name}">${e.name} (₹${e.price})</option>`).join(``)}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Recommendation Rationale</label>
              <input type="text" id="ai-form-reason" class="form-input" placeholder="e.g. Perfect meal pairing for quick lunch" required/>
            </div>

            <div class="form-group">
              <label class="form-label">Expected Conversion Boost (%)</label>
              <input type="number" id="ai-form-boost" class="form-input" placeholder="25" value="25" required/>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 8px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save AI Pairing Rule
            </button>
          </form>
        </div>
      </div>

    </div>
  `}function q(e){let t=e.querySelector(`#ai-rule-modal`),n=e.querySelector(`#btn-close-ai-modal`),r=e.querySelector(`#form-ai-rule`),i=e.querySelector(`#btn-open-add-ai-rule`);n&&t&&n.addEventListener(`click`,()=>{t.style.display=`none`}),i&&t&&i.addEventListener(`click`,()=>{r.reset(),t.style.display=`flex`}),r&&r.addEventListener(`submit`,n=>{n.preventDefault();let r=e.querySelector(`#ai-form-trigger`).value,i=e.querySelector(`#ai-form-suggested`).value,a=e.querySelector(`#ai-form-reason`).value.trim(),s=parseInt(e.querySelector(`#ai-form-boost`).value||20);o.addAiRecommendation({triggerProduct:r,suggestedProduct:i,reason:a||`Popular pair`,boostPercentage:s}),t.style.display=`none`}),e.querySelectorAll(`.btn-toggle-ai-rule`).forEach(e=>{e.addEventListener(`click`,()=>{let t=o.aiRecommendations.find(t=>t.id===e.dataset.id);t&&(t.isActive=!t.isActive,o.showToast(`Rule is now ${t.isActive?`active`:`paused`}`,`info`),o.notify())})}),e.querySelectorAll(`.btn-delete-ai-rule`).forEach(e=>{e.addEventListener(`click`,()=>{confirm(`Remove this recommendation rule?`)&&o.deleteAiRecommendation(e.dataset.id)})})}function J(){let t=o.carryBags.filter(e=>e.id!==`bag-none`);return`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Carry Bag Catalog & Pricing (Retailer Config)</h1>
          <p style="font-size: 12px; color: var(--text-secondary);">Synchronized with all in-store Smart Carts for express automated checkout</p>
        </div>
        <button id="btn-add-bag-type" class="btn-primary" style="background: #0F172A;">
          ${e(`plus`,14)} Add Carry Bag Option
        </button>
      </div>

      <!-- Carry Bag Option Cards Grid (Matching Stitch Screenshot) -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        ${t.map(t=>`
          <div class="stitch-card" style="background: #FFFFFF; display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid ${t.isEnabled?`#0EA5E9`:`#94A3B8`};">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <h3 style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${t.name}</h3>
                  <div style="font-size: 10px; color: var(--text-muted); font-weight: 600;">Bag ID: ${t.id}</div>
                </div>
                <span class="stitch-badge ${t.isEnabled?`badge-green`:`badge-red`}" style="font-size: 10px;">
                  ${t.isEnabled?`Active`:`Disabled`}
                </span>
              </div>
              
              <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">${t.description}</p>
              
              <div style="background: var(--bg-subtle); padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 12px;">
                <div>
                  <span style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">UNIT PRICE</span>
                  <div style="font-size: 16px; font-weight: 700; color: #0284C7;">₹${t.price.toFixed(2)}</div>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">STOCK INVENTORY</span>
                  <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">${t.stock===void 0?t.inventory||200:t.stock} units</div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 6px;">
              <button class="btn-edit-bag btn-secondary" data-id="${t.id}" style="flex: 1; padding: 6px; font-size: 11px;">
                ${e(`edit`,12)} Edit Price & Stock
              </button>
              <button class="btn-toggle-bag btn-secondary" data-id="${t.id}" style="padding: 6px 10px; font-size: 11px;">
                ${t.isEnabled?`Disable`:`Enable`}
              </button>
              <button class="btn-delete-bag btn-danger" data-id="${t.id}" title="Remove" style="padding: 6px 8px; font-size: 11px;">
                ${e(`trash`,12)}
              </button>
            </div>
          </div>
        `).join(``)}
      </div>

      <!-- Add/Edit Bag Modal Form -->
      <div id="carry-bag-modal" class="modal-overlay" style="display: none;">
        <div class="modal-card" style="max-width: 440px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid var(--border-light); padding-bottom: 8px;">
            <h3 id="bag-modal-title" style="font-size: 16px; font-weight: 700;">Edit Carry Bag Option</h3>
            <button id="btn-close-bag-modal" style="border: none; background: transparent; cursor: pointer;">
              ${e(`x`,20)}
            </button>
          </div>

          <form id="form-carry-bag" style="display: flex; flex-direction: column; gap: 12px;">
            <input type="hidden" id="bag-form-id"/>

            <div class="form-group">
              <label class="form-label">Bag Name</label>
              <input type="text" id="bag-form-name" class="form-input" placeholder="e.g. Eco Paper Bag" required/>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
              <div class="form-group">
                <label class="form-label">Unit Price (₹)</label>
                <input type="number" step="0.5" id="bag-form-price" class="form-input" placeholder="5.00" required/>
              </div>
              <div class="form-group">
                <label class="form-label">Stock Inventory</label>
                <input type="number" id="bag-form-stock" class="form-input" placeholder="250" required/>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Description / Capacity</label>
              <input type="text" id="bag-form-desc" class="form-input" placeholder="Eco-friendly • Holds up to 5kg"/>
            </div>

            <button type="submit" class="btn-primary" style="margin-top: 8px; padding: 12px; font-size: 14px; background: #0F172A; border-radius: 10px;">
              Save Carry Bag Configuration
            </button>
          </form>
        </div>
      </div>

    </div>
  `}function Y(e){let t=e.querySelector(`#carry-bag-modal`),n=e.querySelector(`#btn-close-bag-modal`),r=e.querySelector(`#form-carry-bag`),i=e.querySelector(`#btn-add-bag-type`);n&&t&&n.addEventListener(`click`,()=>{t.style.display=`none`}),i&&i.addEventListener(`click`,()=>{r.reset(),e.querySelector(`#bag-form-id`).value=``,e.querySelector(`#bag-modal-title`).innerText=`Add New Carry Bag Option`,t.style.display=`flex`}),r&&r.addEventListener(`submit`,n=>{n.preventDefault();let r=e.querySelector(`#bag-form-id`).value,i=e.querySelector(`#bag-form-name`).value.trim(),a=parseFloat(e.querySelector(`#bag-form-price`).value||0),s=parseInt(e.querySelector(`#bag-form-stock`).value||100),c=e.querySelector(`#bag-form-desc`).value.trim();r?o.updateCarryBag(r,{name:i,price:a,stock:s,inventory:s,description:c}):o.addCarryBag({name:i,price:a,stock:s,inventory:s,description:c||`Supermarket express carry bag`}),t.style.display=`none`}),e.querySelectorAll(`.btn-edit-bag`).forEach(n=>{n.addEventListener(`click`,()=>{let r=o.carryBags.find(e=>e.id===n.dataset.id);r&&(e.querySelector(`#bag-form-id`).value=r.id,e.querySelector(`#bag-form-name`).value=r.name,e.querySelector(`#bag-form-price`).value=r.price,e.querySelector(`#bag-form-stock`).value=r.stock===void 0?r.inventory||200:r.stock,e.querySelector(`#bag-form-desc`).value=r.description||``,e.querySelector(`#bag-modal-title`).innerText=`Edit ${r.name}`,t.style.display=`flex`)})}),e.querySelectorAll(`.btn-toggle-bag`).forEach(e=>{e.addEventListener(`click`,()=>{o.toggleCarryBagStatus(e.dataset.id)})}),e.querySelectorAll(`.btn-delete-bag`).forEach(e=>{e.addEventListener(`click`,()=>{confirm(`Delete this carry bag option?`)&&o.deleteCarryBag(e.dataset.id)})})}function X(){let e=o.orders,t=o.products;o.carryBags.filter(e=>e.id!==`bag-none`);let n=e.reduce((e,t)=>e+t.totalAmount,0)+124500,r=e.length+142,i=r>0?n/r:968;return`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      
      <div>
        <h1 style="font-size: 20px; font-weight: 700; color: var(--text-primary);">Supermarket Intelligence & Revenue Analytics</h1>
        <p style="font-size: 12px; color: var(--text-secondary);">Comprehensive metrics on store revenues, average cart value, popular categories & bag surcharges</p>
      </div>

      <!-- KPI Metrics Overview Grid -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;">
        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #0EA5E9;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Sales Volume</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹${n.toLocaleString()}
          </div>
          <div style="font-size: 10px; color: #10B981; font-weight: 600; margin-top: 2px;">↑ +18.4% growth</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #10B981;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Completed Orders</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ${r} Checkout Bills
          </div>
          <div style="font-size: 10px; color: #166534; font-weight: 600; margin-top: 2px;">100% Scale Verified</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #F59E0B;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Cart Value</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            ₹${i.toFixed(2)}
          </div>
          <div style="font-size: 10px; color: #B45309; font-weight: 600; margin-top: 2px;">Per Shopper Session</div>
        </div>

        <div class="stitch-card" style="background: #FFFFFF; border-left: 4px solid #8B5CF6;">
          <div style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Carry Bags Sold</div>
          <div style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-top: 4px;">
            164 Bags
          </div>
          <div style="font-size: 10px; color: #6D28D9; font-weight: 600; margin-top: 2px;">₹1,420 Bag Revenue</div>
        </div>
      </div>

      <!-- Charts & Breakdown Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
        
        <!-- Popular Categories Breakdown -->
        <div class="stitch-card" style="background: #FFFFFF;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 700;">Popular Categories Breakdown</h3>
            <span class="stitch-badge badge-green">By Sales Volume</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${[{name:`Dairy & Bakery`,pct:35,color:`#0EA5E9`},{name:`Grains & Pulses`,pct:25,color:`#10B981`},{name:`Snacks & Namkeen`,pct:20,color:`#F59E0B`},{name:`Beverages & Tea`,pct:12,color:`#8B5CF6`},{name:`Personal & Household`,pct:8,color:`#EC4899`}].map(e=>`
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
                  <span style="font-weight: 600;">${e.name}</span>
                  <span style="font-weight: 700;">${e.pct}%</span>
                </div>
                <div style="width: 100%; height: 8px; background: #F1F5F9; border-radius: 99px; overflow: hidden;">
                  <div style="width: ${e.pct}%; height: 100%; background: ${e.color}; border-radius: 99px;"></div>
                </div>
              </div>
            `).join(``)}
          </div>
        </div>

        <!-- Top Selling Products Ranking -->
        <div class="stitch-card" style="background: #FFFFFF;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 14px; font-weight: 700;">Top Selling Products</h3>
            <span class="stitch-badge badge-cyan">Highest Velocity</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${t.slice(0,5).map((e,t)=>`
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-weight: 700; color: #0284C7; font-size: 13px; width: 16px;">#${t+1}</span>
                  <img src="${e.image}" alt="${e.name}" style="width: 34px; height: 34px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-light);"/>
                  <div>
                    <div style="font-weight: 700; color: var(--text-primary);">${e.name}</div>
                    <div style="font-size: 10px; color: var(--text-muted);">${e.category}</div>
                  </div>
                </div>
                <div style="font-weight: 700; color: var(--text-primary);">₹${e.price.toFixed(2)}</div>
              </div>
            `).join(``)}
          </div>
        </div>

      </div>

    </div>
  `}function Z(){let t=o.settings;return`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 640px;">
      
      <div>
        <h1 style="font-size: 20px; font-weight: 700;">System Configuration & Settings</h1>
        <p style="font-size: 12px; color: var(--text-secondary);">Hardware sensor calibration, Supabase backend keys & store profile</p>
      </div>

      <div class="stitch-card">
        <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          ${e(`settings`,16)} Hardware Weight Scale Settings
        </h3>

        <form id="form-settings" style="display: flex; flex-direction: column; gap: 12px;">
          
          <div class="form-group">
            <label class="form-label">HX711 Load Cell Tolerance Threshold (Grams)</label>
            <input type="number" id="setting-tolerance" class="form-input" value="${t.weightToleranceGrams}"/>
            <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">
              Acceptable weight variance before triggering checkout anomaly warning (Default: 50g)
            </span>
          </div>

          <div class="form-group">
            <label class="form-label">Supermarket Store Name</label>
            <input type="text" id="setting-store-name" class="form-input" value="${t.storeName}"/>
          </div>

          <div class="form-group">
            <label class="form-label">Store Address</label>
            <input type="text" id="setting-store-address" class="form-input" value="${t.storeAddress}"/>
          </div>

          <div style="border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 4px;">
            <h4 style="font-size: 12px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">
              Supabase Backend API Configuration
            </h4>

            <div class="form-group">
              <label class="form-label">Supabase URL</label>
              <input type="text" id="setting-supabase-url" class="form-input" value="${t.supabaseUrl}" style="font-family: monospace;"/>
            </div>

            <div class="form-group">
              <label class="form-label">Supabase Anon Public Key</label>
              <input type="password" id="setting-supabase-key" class="form-input" value="${t.supabaseKey}" style="font-family: monospace;"/>
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 10px;">
            <button type="submit" class="btn-primary" style="flex: 1; padding: 10px;">
              Save System Settings
            </button>
            <button type="button" id="btn-reset-seed" class="btn-secondary" style="color: var(--red-danger); border-color: #FCA5A5;">
              Reset Seed Data
            </button>
          </div>

        </form>
      </div>

    </div>
  `}function Q(e){let t=e.querySelector(`#form-settings`),n=e.querySelector(`#btn-reset-seed`);t&&t.addEventListener(`submit`,t=>{t.preventDefault(),o.updateSettings({weightToleranceGrams:parseFloat(e.querySelector(`#setting-tolerance`).value),storeName:e.querySelector(`#setting-store-name`).value.trim(),storeAddress:e.querySelector(`#setting-store-address`).value.trim(),supabaseUrl:e.querySelector(`#setting-supabase-url`).value.trim(),supabaseKey:e.querySelector(`#setting-supabase-key`).value.trim()})}),n&&n.addEventListener(`click`,()=>{confirm(`Reset local storage to original seed database?`)&&(localStorage.clear(),location.reload())})}var ne=document.querySelector(`#app`);function $(){let t=o.activeRole===`customer`,n=o.getCartItemCount();ne.innerHTML=`
    <div class="app-shell">
      
      <!-- Top Navigation & Role Switcher Header -->
      <header class="top-nav">
        <div class="brand-badge">
          <div class="brand-icon">SC</div>
          <div>
            <span style="font-weight: 700; font-size: 15px; color: var(--text-primary);">SMART CART</span>
            <span style="font-size: 10px; color: var(--cyan-hover); font-weight: 600; display: block; margin-top: -3px;">AI SUPERMARKET</span>
          </div>
        </div>

        <!-- Role Mode Switcher Pill -->
        <div class="role-switcher">
          <button class="role-btn ${t?`active`:``}" id="btn-mode-customer">
            📱 Customer App
          </button>
          <button class="role-btn ${t?``:`active`}" id="btn-mode-admin">
            🖥️ Admin Portal
          </button>
        </div>
      </header>

      <!-- Toast Notification Container -->
      ${o.toast?`
        <div class="toast-container">
          <div class="toast" style="${o.toast.type===`error`?`background: #991B1B;`:``}">
            <span>${e(o.toast.type===`error`?`alert-triangle`:`check-circle`,16)}</span>
            <span>${o.toast.message}</span>
          </div>
        </div>
      `:``}

      <!-- Main Body Container -->
      ${t?re(n):ie()}

    </div>
  `,ae()}function re(t){let n=o.customerTab,r=``;n===`start-shopping`?r=s():n===`home`?r=l():n===`scan`?r=d():n===`product-details`?r=p():n===`navigate`?r=ee():n===`ai`?r=x():n===`cart`?r=w():n===`review-bill`?r=E():n===`payment`?r=O():n===`payment-success`?r=A():n===`receipt`&&(r=M());let i=[`start-shopping`,`review-bill`,`payment`,`payment-success`,`receipt`].includes(n);return`
    <div class="customer-wrapper">
      
      <!-- Customer Content View -->
      <div id="customer-view-container">
        ${r}
      </div>

      <!-- Customer Bottom Navigation Bar (Hidden during full checkout steps) -->
      ${i?``:`
        <nav class="customer-bottom-nav">
          <button class="nav-item ${n===`home`?`active`:``}" data-tab="home">
            ${e(`home`,20)}
            <span>Home</span>
          </button>

          <button class="nav-item ${n===`scan`?`active`:``}" data-tab="scan">
            ${e(`scan`,20)}
            <span>Scan</span>
          </button>

          <button class="nav-item ${n===`cart`?`active`:``}" data-tab="cart">
            ${e(`cart`,20)}
            ${t>0?`<span class="nav-badge">${t}</span>`:``}
            <span>Cart</span>
          </button>

          <button class="nav-item ${n===`navigate`?`active`:``}" data-tab="navigate">
            ${e(`navigate`,20)}
            <span>Navigate</span>
          </button>

          <button class="nav-item ${n===`ai`?`active`:``}" data-tab="ai">
            ${e(`ai`,20)}
            <span>AI</span>
          </button>
        </nav>
      `}

    </div>
  `}function ie(){let t=o.adminTab,n=``;return t===`dashboard`?n=P():t===`products`?n=te():t===`inventory`?n=R():t===`store-map`?n=B():t===`smart-carts`?n=H():t===`orders`?n=W():t===`ai-recommendations`?n=K():t===`carry-bags`?n=J():t===`analytics`?n=X():t===`settings`&&(n=Z()),`
    <div class="admin-shell">
      
      <!-- Left Sidebar -->
      <aside class="admin-sidebar">
        <div class="sidebar-title">Supermarket Admin</div>
        ${[{id:`dashboard`,label:`Dashboard`,icon:`dashboard`},{id:`products`,label:`Products`,icon:`products`},{id:`inventory`,label:`Inventory`,icon:`inventory`},{id:`store-map`,label:`Store Map`,icon:`map`},{id:`smart-carts`,label:`Smart Carts`,icon:`smart-cart`},{id:`orders`,label:`Orders / Bills`,icon:`orders`},{id:`ai-recommendations`,label:`AI Recommendations`,icon:`recommendations`},{id:`carry-bags`,label:`Carry Bags`,icon:`bags`},{id:`analytics`,label:`Analytics`,icon:`analytics`},{id:`settings`,label:`Settings`,icon:`settings`}].map(n=>`
          <button class="sidebar-item ${t===n.id?`active`:``}" data-admin-tab="${n.id}">
            ${e(n.icon,18)}
            <span>${n.label}</span>
          </button>
        `).join(``)}
      </aside>

      <!-- Admin Main View Content -->
      <main class="admin-content" id="admin-view-container">
        ${n}
      </main>

    </div>
  `}function ae(){let e=document.querySelector(`#btn-mode-customer`),t=document.querySelector(`#btn-mode-admin`);e&&e.addEventListener(`click`,()=>o.setRole(`customer`)),t&&t.addEventListener(`click`,()=>o.setRole(`admin`)),document.querySelectorAll(`.nav-item`).forEach(e=>{e.addEventListener(`click`,()=>{o.setCustomerTab(e.dataset.tab)})}),document.querySelectorAll(`.sidebar-item`).forEach(e=>{e.addEventListener(`click`,()=>{o.setAdminTab(e.dataset.adminTab)})});let n=document.querySelector(`#customer-view-container`),r=document.querySelector(`#admin-view-container`);if(n){let e=o.customerTab;e===`start-shopping`?c(n):e===`home`?u(n):e===`scan`?f(n):e===`product-details`?m(n):e===`navigate`?h(n):e===`ai`?C(n):e===`cart`?T(n):e===`review-bill`?D(n):e===`payment`?k(n):e===`payment-success`?j(n):e===`receipt`&&N(n)}if(r){let e=o.adminTab;e===`dashboard`?F(r):e===`products`?L(r):e===`inventory`?z(r):e===`store-map`?V(r):e===`smart-carts`?U(r):e===`orders`?G(r):e===`ai-recommendations`?q(r):e===`carry-bags`?Y(r):e===`analytics`||e===`settings`&&Q(r)}}o.subscribe(()=>{$()}),$();
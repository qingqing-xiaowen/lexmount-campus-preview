import {eventConfig} from './tech-event-config-20261008.js';
import {readSource,sourceLink,safeWebUrl} from './tech-source-core-20261008.mjs';

// 只暂存少量渠道代码，不保存表单、私人材料或账号凭据。
let previous={};
try{previous=JSON.parse(sessionStorage.getItem('lexmount-event-source')||'{}')}catch{}
const source=readSource(location.search,previous);
window.lexmountSource=Object.freeze(source);
try{sessionStorage.setItem('lexmount-event-source',JSON.stringify(source))}catch{}

for(const link of document.querySelectorAll('a[href]')){
  link.setAttribute('href',sourceLink(link.getAttribute('href'),source,location.href));
}
function configuredLinks(selector,value){
  const url=safeWebUrl(value);
  if(!url)return;
  for(const link of document.querySelectorAll(selector))if(link.tagName==='A'){
    link.href=url;
    link.rel='noopener noreferrer';
    link.hidden=false;
  }
}
configuredLinks('[data-event-help]',eventConfig.help.url);
configuredLinks('[data-event-register]',eventConfig.studentOffer.signupUrl);
if(safeWebUrl(eventConfig.studentOffer.signupUrl))for(const pending of document.querySelectorAll('[data-event-register-pending]'))pending.hidden=true;
for(const element of document.querySelectorAll('[data-reviewer-access]')){
  if(eventConfig.help.reviewerAccess)element.textContent=eventConfig.help.reviewerAccess;
}
for(const element of document.querySelectorAll('[data-event-contact]')){
  if(eventConfig.help.email)element.textContent=eventConfig.help.email;
}

const keys=['channel','utm_source','utm_medium','utm_campaign','utm_content','ref'];
const eventPages=new Set(['','current-20261008.html','register-current-20261008.html','submit-current-20261008.html','template-current-20261008.html','event-help-current-20261008.html']);
const validCode=value=>typeof value==='string' && /^[\p{L}\p{N}_.-]{1,80}$/u.test(value);

export function readSource(search,previous={}){
  const params=new URLSearchParams(search);
  const explicit=keys.some(key=>params.has(key));
  const source={};
  for(const key of keys){
    const value=explicit?params.get(key):previous?.[key];
    if(validCode(value))source[key]=value;
  }
  return source;
}

export function sourceLink(value,source,base){
  try{
    const url=new URL(value,base),current=new URL(base);
    if(url.origin!==current.origin || !eventPages.has(url.pathname.split('/').pop()) || value.startsWith('#'))return value;
    for(const [key,code] of Object.entries(readSource('',source)))if(!url.searchParams.has(key))url.searchParams.set(key,code);
    return url.href;
  }catch{return value}
}

export function safeWebUrl(value){
  try{const url=new URL(value);return ['http:','https:'].includes(url.protocol)&&!url.username&&!url.password?url.href:null}catch{return null}
}

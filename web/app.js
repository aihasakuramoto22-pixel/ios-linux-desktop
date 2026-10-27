const st=t=>document.getElementById('st').textContent=t;
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').then(()=>st('オフライン準備OK（初回はダウンロード中）'));
let emu,canvas=document.querySelector('canvas');
function start(state){
  if(emu)emu.destroy();
  emu=new V86({wasm_path:'v86/v86.wasm',memory_size:256*1024*1024,vga_memory_size:8*1024*1024,
    screen_container:document.getElementById('screen_container'),
    bios:{url:'v86/seabios.bin'},vga_bios:{url:'v86/vgabios.bin'},
    cdrom:{url:'img/linux.iso'},autostart:true,disable_mouse:false,
    initial_state:state?{buffer:state}:undefined});
  emu.add_listener('emulator-ready',()=>st(state?'再開しました':'起動中…（30〜90秒）'));
  emu.add_listener('screen-set-size',fit);
}
// fit canvas to screen
function fit(){const c=canvas;if(!c.width)return;const s=Math.min(innerWidth/c.width,innerHeight/c.height);
  c.style.width=c.width*s+'px';c.style.height=c.height*s+'px';}
addEventListener('resize',fit);setInterval(fit,1000);
// touch -> absolute-ish mouse via relative deltas
let last=null,moved=false,t0=0,fingers=0;
const scale=()=>canvas.width/canvas.getBoundingClientRect().width;
canvas.addEventListener('touchstart',e=>{e.preventDefault();fingers=e.touches.length;const t=e.touches[0];last=[t.clientX,t.clientY];moved=false;t0=Date.now();},{passive:false});
canvas.addEventListener('touchmove',e=>{e.preventDefault();if(!emu)return;const t=e.touches[0],k=scale();
  const dx=(t.clientX-last[0])*k,dy=(t.clientY-last[1])*k;if(Math.abs(dx)+Math.abs(dy)>2)moved=true;
  last=[t.clientX,t.clientY];emu.bus.send('mouse-delta',[dx,-dy]);},{passive:false});
canvas.addEventListener('touchend',e=>{e.preventDefault();if(!emu||e.touches.length)return;
  if(!moved&&Date.now()-t0<300){const r=fingers>=2;
    emu.bus.send('mouse-click',[!r,false,r]);setTimeout(()=>emu.bus.send('mouse-click',[false,false,false]),60);}},{passive:false});
// keyboard
const kb=document.getElementById('kb');
document.getElementById('bkbd').onclick=()=>{kb.focus();};
kb.addEventListener('input',()=>{if(emu&&kb.value)emu.keyboard_send_text(kb.value);kb.value='';});
kb.addEventListener('keydown',e=>{if(!emu)return;const m={Enter:28,Backspace:14,Tab:15,Escape:1};
  if(m[e.key]){e.preventDefault();emu.keyboard_send_scancodes([m[e.key],m[e.key]|0x80]);}});
document.getElementById('bstart').onclick=()=>start();
document.getElementById('bhide').onclick=()=>{const b=document.getElementById('bar');b.style.opacity=b.style.opacity==='0.2'?'1':'0.2';};
// save state in IndexedDB
const db=()=>new Promise(r=>{const q=indexedDB.open('v86',1);q.onupgradeneeded=()=>q.result.createObjectStore('s');q.onsuccess=()=>r(q.result);});
document.getElementById('bsave').onclick=async()=>{if(!emu)return;st('保存中…');const s=await emu.save_state();
  const d=await db();d.transaction('s','readwrite').objectStore('s').put(s,'state').oncomplete=()=>st('保存しました');};
document.getElementById('bload').onclick=async()=>{const d=await db();const q=d.transaction('s').objectStore('s').get('state');
  q.onsuccess=()=>q.result?start(q.result):st('保存データがありません');};
if(location.search.includes('autostart'))start();

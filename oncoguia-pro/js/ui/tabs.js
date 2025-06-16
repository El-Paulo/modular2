import { state } from '../state.js';
export function initTabs(){
 const info=[{id:'indicaciones',icon:'file-medical',label:'Indicaciones'},{id:'guia',icon:'book-medical',label:'Guía'},{id:'solicitudes',icon:'vial',label:'Solicitudes'},{id:'recetas',icon:'prescription',label:'Recetas'}];
 const nav=document.getElementById('tabs');
 info.forEach(({id,icon,label})=>{
  const btn=document.createElement('button');
  btn.setAttribute('role','tab');
  btn.className='tab px-6 py-3 font-semibold rounded-t-lg';
  btn.innerHTML=`<i class="fas fa-${icon} mr-2"></i>${label}`;
  btn.addEventListener('click',()=>state.ui.currentTab=id);
  nav.appendChild(btn);
 });
 document.addEventListener('statechange',({detail})=>{if(detail.prop==='ui')render();});
 function render(){nav.querySelectorAll('button').forEach(btn=>{btn.classList.toggle('tab-active',btn.textContent.includes(state.ui.currentTab.charAt(0).toUpperCase()));btn.classList.toggle('tab-inactive',!btn.classList.contains('tab-active'));});}
 render();
}
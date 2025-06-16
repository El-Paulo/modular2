import { state } from '../state.js';import { bsa,bmi,clCr } from '../calculations.js';
export function initForms(){
 const formIds=['name','age','gender','weight','height','creatinine'];
 const map={'name':'patient.name','age':'patient.age','gender':'patient.gender','weight':'patient.weight','height':'patient.height','creatinine':'patient.creatinine'};
 formIds.forEach(id=>{const el=document.createElement('input');el.id=`patient-${id}`;el.placeholder=id;el.className='border px-2 py-1';document.getElementById('form-paciente').appendChild(el);el.addEventListener('input',()=>{const path=map[id].split('.');state[path[0]][path[1]]=el.value;updateMetrics();});});
 function updateMetrics(){const m=document.getElementById('metrics');m.innerHTML=`<div>BSA: ${bsa(state.patient.weight,state.patient.height).toFixed(2)}</div><div>BMI: ${bmi(state.patient.weight,state.patient.height).toFixed(1)}</div><div>ClCr: ${clCr(state.patient.age,state.patient.weight,state.patient.creatinine,state.patient.gender,state.patient.height)}</div>`;}
 updateMetrics();
}
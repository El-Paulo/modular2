import { state } from '../state.js';import { schemes } from '../schemes.js';import { bsa,carboplatin } from '../calculations.js';
document.addEventListener('statechange',render);
function render(){const panel=document.getElementById('panel');panel.innerHTML=`<p class='text-gray-600'>Pestaña actual: ${state.ui.currentTab}</p>`;}
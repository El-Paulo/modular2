import { state } from '../state.js';
export function setupTheme(){
 const sel=document.getElementById('themeSelector');
 sel.value=state.ui.theme;
 document.documentElement.setAttribute('data-theme',state.ui.theme);
 sel.addEventListener('change',e=>{state.ui.theme=e.target.value;localStorage.setItem('oncoguia-theme',e.target.value);document.documentElement.setAttribute('data-theme',e.target.value);});
}
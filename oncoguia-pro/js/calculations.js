export const bsa=(w,h)=>w&&h?Math.sqrt((w*h)/3600):0;
export const bmi=(w,h)=>w&&h? w/((h/100)**2):0;
export const idealWeight=(h,g)=>g==='M'?50+0.91*(h-152.4):45.5+0.91*(h-152.4);
export const clCr=(age,w,cr,g,h)=>{if(!age||!w||!cr||!g)return 0;const ibmi=bmi(w,h);let aw=w;if(ibmi>30){const iw=idealWeight(h,g);aw=iw+0.4*(w-iw);}const factor=g==='M'?1:0.85;return Math.round(((140-age)*aw*factor)/(72*cr)*10)/10;}
export const carboplatin=(auc,age,w,cr,g,h)=>{const c=clCr(age,w,cr,g,h);return c?Math.round(auc*(c+25)):0;}
import {THREE} from '../vendor';


// const NF = 80;
// let rID = null, f = 0, dir = -1;

// function stopAni(){
//   cancelAnimationFrame(rID);
//   rID = null;
// };

// function update(){
//   f += dir;
//   let k = f/NF;
//   welcome.style.setProperty('opacity', `${+(k*100).toFixed(2)}%`);
//   if(!(f%NF)){
//     stopAni();
//     return
//   }
//   rID = requestAnimationFrame(update)
// };

// addEventListener('click', e => {
//   if(rID) stopAni();
//   dir *= -1;
//   update();
// }, false);

// (function animate(){


//   requestAnimationFrame(animate);
// })();
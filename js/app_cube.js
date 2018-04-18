let cube;
let rotationX = 45;
let rotationY = 45;
let lastPos = {};
let sides = [];
let cond=false;
let scaleCube = 1;
function init () {
  cube = document.querySelector(".cube-container");
  let side;
  for (let i=1;i<7;i++) {
    sides.push(document.querySelector(".side-"+i));
  }
  document.querySelector("#start").onclick = animate;
  document.body.addEventListener('mousemove', moveCubeByMouse);
  document.body.addEventListener('mousedown', startMovingByMouse);
  document.body.addEventListener('touchstart', startMovingByMouse);
  document.body.addEventListener('touchmove', moveCubeByMouse);
  document.body.addEventListener('dragstart', function (e) {
    e.preventDefault();
  })
  window.addEventListener('selectstart', function (e) {
    e.preventDefault();
  })
  document.body.addEventListener('mouseup', stopMovingByMouse);
  window.addEventListener('wheel', changePerspective);
}
function animate () {
  rotationX += 1;
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  window.requestAnimationFrame(animate);
}
function moveCubeByMouse (e) {
  if(cond) {
    let moveX;
    let moveY;
    if(e.touches) {
      moveX = e.touches[0].clientX-lastPos.clientX;
      lastPos.clientX = e.touches[0].clientX;
      moveY = e.touches[0].clientY-lastPos.clientY;
      lastPos.clientY = e.touches[0].clientY;
    } else {
      moveX = e.clientX-lastPos.clientX;
      lastPos.clientX = e.clientX;
      moveY = e.clientY-lastPos.clientY;
      lastPos.clientY = e.clientY;
    }
    rotationY+=calculateDegreesY(moveX);
    rotationX+=calculateDegreesX(moveY);
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }
}
function startMovingByMouse (e) {
  if(e.touches) {
    lastPos.clientX = e.touches[0].clientX;
    lastPos.clientY = e.touches[0].clientY;
  } else {
    lastPos.clientX = e.clientX;
    lastPos.clientY = e.clientY;
  }
  cond=true;
}
function stopMovingByMouse (e) {
  cond=false;
}
function calculateDegreesX(diff) {
  let scaling = 0.01;
  return -diff/(scaling*360);
}
function calculateDegreesY(diff) {
  let scaling = 0.01;
  return diff/(scaling*360);
}
function changePerspective (e) {
  if(e.deltaY > 0) {
    moveCubeFarer();
  } else {
    moveCubeNearer();
  }
}
function moveCubeFarer () {
  if(scaleCube <= 0.05 && scaleCube >0.01) {
    scaleCube-=0.001;
  } else if (scaleCube <=0.01) {
    scaleCube = 0.01;
  } else {
    scaleCube -=0.05;
  }

  let height = sides[0].offsetWidth;
  let translate = height*scaleCube/(2);
  let side_1 = "rotateX(0deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_2 = "rotateY(90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_3 = "rotateX(180deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_4 = "rotateY(-90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_5 = "rotateX(90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_6 = "rotateX(-90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  sides[0].style.transform = side_1;
  sides[1].style.transform = side_2;
  sides[2].style.transform = side_3;
  sides[3].style.transform = side_4;
  sides[4].style.transform = side_5;
  sides[5].style.transform = side_6;
}
function moveCubeNearer() {
  if (scaleCube < 0.049) {
    scaleCube+=0.001;
  } else {
    scaleCube +=0.05;
  }
  let height = sides[0].offsetWidth;
  let translate = height*scaleCube/(2);
  let side_1 = "rotateX(0deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_2 = "rotateY(90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_3 = "rotateX(180deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_4 = "rotateY(-90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_5 = "rotateX(90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  let side_6 = "rotateX(-90deg) " + `translateZ(${translate}px) ` + `scale3d(${scaleCube},${scaleCube},${scaleCube})`;
  sides[0].style.transform = side_1;
  sides[1].style.transform = side_2;
  sides[2].style.transform = side_3;
  sides[3].style.transform = side_4;
  sides[4].style.transform = side_5;
  sides[5].style.transform = side_6;
}
window.addEventListener('load', init);

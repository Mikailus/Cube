let scene;
let cube;
let rotationX=45;
let rotationY=45;
let translationX = 0;
let translationY = 0;
let lastPos = {};
let sides = [];
let ifRotate=false;
let ifTranslate = false;
let scaleCube = 1;
let moveX;
let moveY;
function init () {
  cube = document.querySelector(".cube-container");
  scene = document.querySelector(".scene");
  for (let i=1;i<7;i++) {
    sides.push(document.querySelector(".side-"+i));
  }
  let startRotationButton = document.querySelector("#start");
  startRotationButton.addEventListener('mousedown', (e) => e.stopPropagation());
  startRotationButton.addEventListener('mousedown', (e) => {
    animate();
    e.target.setAttribute('disabled', 'true');
  });
  document.body.addEventListener('contextmenu', startTranslatingCubeByMouse);
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
function startTranslatingCubeByMouse (e) {
  e.preventDefault();
}
function animate () {
  rotationX += 1;
  cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  window.requestAnimationFrame(animate);
}
function moveCubeByMouse (e) {
  if (ifRotate || ifTranslate) {
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
    if (ifRotate) {
      rotationY+=calculateDegreesY(moveX);
      rotationX+=calculateDegreesX(moveY);
      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    } else if (ifTranslate) {
      translationX +=calculateTranslation(moveX);
      translationY +=calculateTranslation(moveY);
      scene.style.transform = `translateX(${translationX}px) translateY(${translationY}px)`;
    }
  }
}
function calculateTranslation(diff) {
  let scaling = 1;
  return diff/scaling;
}
function startMovingByMouse (e) {
  if(e.touches) {
    lastPos.clientX = e.touches[0].clientX;
    lastPos.clientY = e.touches[0].clientY;
    ifRotate=true;
  } else
  {
    lastPos.clientX = e.clientX;
    lastPos.clientY = e.clientY;
    if (e.which === 1) {
      ifRotate=true;
    } else if(e.which === 3) {
      ifTranslate=true;
    }
  }
}
function stopMovingByMouse (e) {
  if (ifRotate) {
    ifRotate=false;
    decayCubeRotating();
  }

  if (ifTranslate) {
    ifTranslate=false;
    decayCubeTranslating();
  }
}
async function decayCubeRotating () {
  for(let i=0; i< 20; i++) {
    await rotateCubeAutomatically();
    moveX=moveX/1.1;
    moveY=moveY/1.1;
  }
}
async function decayCubeTranslating () {
  for(let i=0; i< 20; i++) {
    await translateCubeAutomatically();
    moveX=moveX/1.1;
    moveY=moveY/1.1;
  }
}
function translateCubeAutomatically () {
  return new Promise((resolve, reject) => {
    translationX +=calculateTranslation(moveX);
    translationY +=calculateTranslation(moveY);
    scene.style.transform = `translateX(${translationX}px) translateY(${translationY}px)`;
    setTimeout(() => {resolve();},10);
  })
}
function rotateCubeAutomatically () {
  return new Promise((resolve, reject) => {
    rotationY+=calculateDegreesY(moveX);
    rotationX+=calculateDegreesX(moveY);
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    setTimeout(() => {resolve();},10);
  })
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
  if (scaleCube <= 0.01) {
    scaleCube = 0.01;
  } else if (scaleCube <=0.05 && scaleCube > 0.01) {
    scaleCube-=0.001;
  } else if (scaleCube <= 0.25 && scaleCube > 0.05) {
    scaleCube-=0.005;
  } else if (scaleCube <=0.5 && scaleCube > 0.25) {
    scaleCube-=0.01;
  } else {
    scaleCube -=0.05;
  }
  updateCube();
}
function moveCubeNearer () {
  if (scaleCube < 0.049) {
    scaleCube+=0.001;
  } else if (scaleCube < 0.0249) {
    scaleCube+=0.005;
  } else if (scaleCube < 0.49) {
    scaleCube+=0.01;
  } else if (scaleCube >= 4) {
    scaleCube=scaleCube;
  } else {
    scaleCube +=0.05;
  }
  updateCube();
}
function updateCube () {
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

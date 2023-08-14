const arrowDown = document.querySelector('.arrowDown');
const arrowDownAnimtion = lottie.loadAnimation({
    container: arrowDown,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: './js/arrowDown.json'
});


// 鼠标移到上面时播放动画
arrowDown.addEventListener('mouseenter', () => {
    arrowDownAnimtion.play();
});

// 鼠标移出时取消动画
arrowDown.addEventListener('mouseleave', () => {
    arrowDownAnimtion.goToAndStop(0,false);
});








const logo = document.querySelector('.logo');

lottie.loadAnimation({
    container: logo,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './js/logo.json'
});

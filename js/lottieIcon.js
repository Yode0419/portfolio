const arrowDownElements = document.querySelectorAll('.arrowDown');

arrowDownElements.forEach(arrowDown => {
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
        arrowDownAnimtion.goToAndStop(0, false);
    });
});







const logo = document.querySelector('.logo');

lottie.loadAnimation({
    container: logo,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './js/logo.json'
});





const submitBtn = document.getElementById('submitBtn');
const confetti = document.getElementById('confetti'); // 將其添加到適當的容器中

// 設置動畫配置
const animationConfig = {
    container: confetti,
    renderer: 'svg',
    loop: false, // 設置為 true 以使動畫循環
    autoplay: false, // 設置為 false，將由按鈕控制動畫播放
    path: './js/confetti.json' // 請將路徑替換為您的 .json 動畫文件路徑
};

// 創建 Lottie 動畫實例
const animation = lottie.loadAnimation(animationConfig);

// 按鈕點擊事件處理
submitBtn.addEventListener('click', () => {
    // 開始播放動畫
    confetti.style.zIndex = '1'; // 動畫移動到最上層
    animation.goToAndPlay(0, true);

});

animation.addEventListener('complete', () => {
    confetti.style.zIndex = '-1'; // 還原 z-index
});

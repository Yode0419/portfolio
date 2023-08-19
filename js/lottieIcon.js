//歡迎頁面arrowDown動畫
const arrowDownElements = document.querySelectorAll('.arrowDown');
lottie.loadAnimation({
    container: arrowDown,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './js/arrowDown.json'
});


//arrowDownElements.forEach(arrowDown => {
//    const arrowDownAnimtion = lottie.loadAnimation({
//        container: arrowDown,
//        renderer: 'svg',
//        loop: true,
//        autoplay: false,
//        path: './js/arrowDown.json'
//    });
//
//    // 鼠标移到上面时播放动画
//    arrowDown.addEventListener('mouseenter', () => {
//        arrowDownAnimtion.play();
//    });
//
//    // 鼠标移出时取消动画
//    arrowDown.addEventListener('mouseleave', () => {
//        arrowDownAnimtion.goToAndStop(0, false);
//    });
//});






//Footer的logo動畫
const logo = document.querySelector('.logo');
lottie.loadAnimation({
    container: logo,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './js/logo.json'
});






//留言送出噴彩帶動畫
const submitBtn = document.getElementById('submitBtn');
const confetti = document.getElementById('confetti'); // 將其添加到適當的容器中
const form = document.getElementById('googleForm'); // 取得表單元素

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
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
        confetti.style.zIndex = '1';

        setTimeout(() => {
            animation.goToAndPlay(0, true);
        }, 1000); // 等待1秒，然後播放動畫
    }
});

animation.addEventListener('complete', () => {
    animation.goToAndStop(0);
    confetti.style.zIndex = '-1';
});

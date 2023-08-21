//Footer的logo動畫
const logo = document.querySelector('.logo');
lottie.loadAnimation({
    container: logo,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/logo.json'
});


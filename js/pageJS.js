//Footer的logo動畫
const logo = document.querySelector('.logo');
lottie.loadAnimation({
    container: logo,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '../js/logo_808080.json'
});


//點擊語言選擇欄外部時，關閉語言選擇欄
const navbarLink = document.querySelector('.navbarLink');
const langCheckbox = document.getElementById('langCheck');
document.addEventListener('click', event => {
    if (!navbarLink.contains(event.target)) {
        langCheckbox.checked = false; // 關閉語言選擇
    }
});



//非頁面最頂時則顯示goTopBtn
var goTopBtn = document.getElementById('goTopBtn');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 0) {
        goTopBtn.style.opacity = 1; // 显示按钮（淡入效果）
    } else {
        goTopBtn.style.opacity = 0; // 隐藏按钮（淡出效果）
    }
});






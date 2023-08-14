// 按hamberger下拉連結選擇、按地球下拉語言選擇時，再按下裡面的按鈕、左上角Logo、導航欄外面範圍時，要縮回去
// 連結選擇和語言選擇不能同時下拉
const links = document.querySelectorAll('.navbarItem a, .langOptions a, .navbarLogo');
const itemCheckbox = document.getElementById('itemCheck');
const langCheckbox = document.getElementById('langCheck');
const navbar = document.querySelector('.navbar');

links.forEach(link => {
    link.addEventListener('click', () => {
        itemCheckbox.checked = false; // 關閉連結選擇
        langCheckbox.checked = false; // 關閉語言選擇
    });
});

itemCheckbox.addEventListener('change', () => {
    if (itemCheckbox.checked) {
        langCheckbox.checked = false; // 關閉語言選擇
    }
});

langCheckbox.addEventListener('change', () => {
    if (langCheckbox.checked) {
        itemCheckbox.checked = false; // 關閉連結選擇
    }
});

// 監聽頁面上的點擊事件
document.addEventListener('click', event => {
    // 點擊導航欄外部時，關閉導航欄
    if (!navbar.contains(event.target)) {
        itemCheckbox.checked = false; // 關閉連結選擇
        langCheckbox.checked = false; // 關閉語言選擇
    }
});



//歡迎頁面捲動動畫
const bgCanvas = document.querySelector(".bgCanvas");
bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;
const bgContext = bgCanvas.getContext("2d");
const frameCount = 125;

const currentFrame = (index) => `./img/bgImage/${(index + 1).toString()}.jpg`;

const bgImages = [];
let bg = {
    frame: 0
};

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    bgImages.push(img);
}

gsap.to(bg, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5,
        pin: "canvas",
        end: "600%",
    },
    onUpdate: render,
});

bgImages[0].onload = render;

function render() {
    bgContext.canvas.width = bgImages[0].width;
    bgContext.canvas.height = bgImages[0].height;
    bgContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgContext.drawImage(bgImages[bg.frame], 0, 0);
    console.log(bg.frame);
}

function playAnimationAndScroll() {
    const currentFrameNumber = bg.frame;
    const durationTime = 2.5 * (1 - currentFrameNumber / frameCount);
    console.log('duration:Time' + durationTime);

    //暫時禁用頁面捲動smooth
    if (currentFrameNumber < frameCount - 1) {
        document.documentElement.style.scrollBehavior = "auto";
    }

    // 淡出 .scrollToHide 元素
    const durationTimeOfHide = Math.max(0, 2.5 * (45 - currentFrameNumber) / frameCount);
    console.log('durationTimeOfHide:' + durationTimeOfHide);
    gsap.to(".scrollToHide", {
        opacity: 0,
        duration: durationTimeOfHide, // 根据您的需求调整淡出的时间
    });

    gsap.to(bg, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: durationTime,
        onUpdate: render,
        onComplete: () => {
            // 播放完动画后，直接跳转到第二部分，无需平滑滚动
            const targetSection0 = document.getElementById("section0");
            const targetSection1 = document.getElementById("section1");
            targetSection0.scrollIntoView();
            document.documentElement.style.scrollBehavior = "smooth";
            targetSection1.scrollIntoView();
        },
    });
}

const bgAnimationButton = document.getElementById("bgAnimationButton");
const arrowDownButton = document.getElementById("arrowDown");

bgAnimationButton.addEventListener("click", playAnimationAndScroll);
arrowDownButton.addEventListener("click", playAnimationAndScroll);


// 使用 fromTo 方法来实现淡出动画并显示标记
gsap.fromTo(
    ".scrollToHide", {
        opacity: 1, // 起始透明度为 1
    }, {
        opacity: 0, // 结束透明度为 0
        scrollTrigger: {
            trigger: ".welcomePage", // 触发滚动的元素
            start: "5%", // 触发动画的位置
            end: "35%", // 结束动画的位置
            scrub: true, // 使动画与滚动同步
//            markers: true, // 启用标记以显示滚动位置和触发点
        },
    }
);






//alert("test");
let myImage = document.querySelector('#pekoImage');

myImage.onclick = function () {
    let myScr = myImage.getAttribute('src');
    if (myScr === 'img/peko.gif') {
        myImage.setAttribute('src', 'img/peko2.png');
    } else {
        myImage.setAttribute('src', 'img/peko.gif');
    }
}

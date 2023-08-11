const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 125;

const currentFrame = (index) => `./best-ball/${(index + 1).toString()}.jpg`;

const images = [];
let ball = {
    frame: 0
};

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    console.log(currentFrame(i));
    images.push(img);
}

gsap.to(ball, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5,
        pin: "canvas",
        end: "1000%",
    },
    onUpdate: render,
});

gsap.fromTo(
    ".ball-text", {
        opacity: 0,
    }, {
        opacity: 1,
        scrollTrigger: {
            scrub: 1,

            start: "50%",
            end: "60%",
        },
        onComplete: () => {
            gsap.to(".ball-text", {
                opacity: 0
            });
        },
    }
);

images[0].onload = render;

function render() {
    context.canvas.width = images[0].width;
    context.canvas.height = images[0].height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[ball.frame], 0, 0);
    console.log(ball.frame);
}


// 當按鈕被點擊時執行捲動到指定位置的功能
document.getElementById('scrollButton').addEventListener('click', function () {
    const targetSection = document.getElementById('targetSection');
    smoothScrollTo(targetSection, 1000, 30); // 調用自定義的平滑捲動函式
});

// 自定義的平滑捲動函式
function smoothScrollTo(target, duration, step) {
    const targetOffsetTop = target.offsetTop;
    const initialPosition = window.pageYOffset;
    const distance = targetOffsetTop - initialPosition;
    const steps = Math.abs(Math.floor(duration / step));
    const stepValue = distance / steps;
    let currentPosition = initialPosition;

    function scroll() {
        currentPosition += stepValue;
        window.scrollTo(0, currentPosition);

        if (Math.abs(currentPosition - targetOffsetTop) < Math.abs(stepValue)) {
            window.scrollTo(0, targetOffsetTop);
        } else if (currentPosition < targetOffsetTop) {
            setTimeout(scroll, step);
        }
    }

    scroll();
};

// 當按鈕被點擊時，觸發回到頂部的平滑捲動效果
document.getElementById('scrollToTopButton').addEventListener('click', function () {
    scrollToTop(1000, 30);
});

// 監聽視窗的滾動事件，顯示或隱藏回到頂部按鈕
window.addEventListener('scroll', function () {
    var scrollToTopButton = document.getElementById('scrollToTopButton');
    if (window.pageYOffset > 100) {
        scrollToTopButton.classList.add('show');
    } else {
        scrollToTopButton.classList.remove('show');
    }
});

// 平滑捲動到頁面最頂部的函式
function scrollToTop(duration, step) {
    var currentPosition = window.pageYOffset;
    var distance = currentPosition;
    var totalSteps = Math.abs(Math.floor(duration / step));
    var stepValue = currentPosition / totalSteps;

    function scroll() {
        currentPosition -= stepValue;
        window.scrollTo(0, currentPosition);

        if (currentPosition > 0) {
            setTimeout(scroll, step);
        } else {
            window.scrollTo(0, 0);
        }
    }

    scroll();
};


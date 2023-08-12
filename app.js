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
//    console.log(currentFrame(i));
    images.push(img);
}

gsap.to(ball, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        scrub: 0.5,
        pin: "canvas",
        end: "200%",
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




const startAnimationButton = document.getElementById("startAnimationButton");

startAnimationButton.addEventListener("click", () => {
    const Fm = ball.frame;
    const dd = 3*(1-Fm/frameCount);
    console.log('duration:'+ dd);
    gsap.to(ball, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: dd,
        onComplete: () => {
            // 播放完动画后，直接跳转到第二部分，无需平滑滚动
            const targetSection = document.getElementById("section1");
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "auto" // 使用 "auto" 或者没有 behavior 参数
                });
            }
        },
        onUpdate: render,
    });
    console.log(ball.frame);
});

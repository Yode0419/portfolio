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

//    //暫時禁用頁面捲動smooth
//    if (currentFrameNumber < frameCount - 1) {
//        document.documentElement.style.scrollBehavior = "auto";
//    }

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
//            document.documentElement.style.scrollBehavior = "smooth";
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
            start: "10% 50%", // 触发动画的位置
            end: "30% 100%", // 结束动画的位置
            scrub: true, // 使动画与滚动同步
            //                        markers: true, // 启用标记以显示滚动位置和触发点
        },
    }
);



//GSAP飛入淡入動畫
const sections = document.querySelectorAll('.section');

sections.forEach((section, index) => {

    const container = section.querySelector('.container');
    const cards = section.querySelectorAll('.card');
    const aboutMe1 = section.querySelectorAll('.aboutMe1');
    const aboutMe2 = section.querySelectorAll('.aboutMe2');
    
    gsap.set(container, {
        y: 150,
        opacity: 0
    });

    gsap.to(
        container, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.easeInOut',
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                toggleActions: "play none none reset",
            },
        }
    );

    cards.forEach(card => {
        gsap.set(card, {
            x: window.innerWidth < 768 ? 0 : 50, // 螢幕寬度小於 768px 時設為 0，否則設為 50
            opacity: 0
        });

        gsap.to(
            card, {
                opacity: 1,
                x: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 100%",
                    toggleActions: "play none none reset",
                },
            }
        );
    });

    gsap.set(aboutMe1, {
        x: window.innerWidth < 768 ? 0 : -50, // 螢幕寬度小於 768px 時設為 0，否則設為 -50
        opacity: 0
    });

    gsap.to(
        aboutMe1, {
            x: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                toggleActions: "play none none reset",
            },
        }
    );
    
    gsap.set(aboutMe2, {
        x: window.innerWidth < 768 ? 0 : 50, // 螢幕寬度小於 768px 時設為 0，否則設為 50
        opacity: 0
    });

    gsap.to(
        aboutMe2, {
            x: 0,
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                toggleActions: "play none none reset",
            },
        }
    );

});








// 紀錄評價的數值
const rating = document.querySelectorAll('input[name="score"]');
let score = 0;
rating.forEach(input => {
    input.addEventListener('click', function () {
        score = this.value;
    });
});

//聯繫我表單提交至Google Form
document.getElementById('googleForm').addEventListener('submit', function (e) {
    e.preventDefault(); // 阻止默认事件

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const FORM_ID = '1FAIpQLSfT4XMewlRDUyiANUsIc3cAqNQOkwT28xCaEOaAC0q5oE6Jbw';
    const query = {
        'entry.670740193': name,
        'entry.905490443': email,
        'entry.711108969': message,
        'entry.342017208': score,
        'submit': 'SUBMIT' // 添加 submit 参数
    };

    fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse?${new URLSearchParams(query)}`, {
            method: 'POST',
            mode: 'no-cors', // Google 只接受 'no-cors' 模式
        })
        .then(() => {
            alert("THANK YOU!!!");
            // 完成后清空表单字段
            rating.forEach(input => {
                input.checked = false;
            });
            console.log("send success!");
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        })
        .catch(() => {
            // 提交失败时处理
        });
});

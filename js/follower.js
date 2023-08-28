const follower = document.querySelector(".follower");
const followerImage = document.getElementById("followerImage");
let mouseX = 0;
let mouseY = 0;
let prevFollowerX = 0;
let prevFollowerY = 0;
const images = [
    "../images/SkaterBoi/arrow_1.png",
    "../images/SkaterBoi/arrow_2.png",
];
const defaultImage = "../images/SkaterBoi/arrow_default.png";

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

let isImage = true;

document.addEventListener("click", () => {
    if (isImage) {
        isImage = false;
        followerImage.src = '../images/SkaterBoi/arrow_flip.gif';

        setTimeout(() => {
            followerImage.src = '../images/SkaterBoi/arrow_default.png';
            isImage = true;
        }, 900); // 900 毫秒後切換回 PNG
    }
});

function getDirection(x, y) {
    if (y < prevFollowerY && x < prevFollowerX) {
        return 1; // 左上
    } else if (y < prevFollowerY && x > prevFollowerX) {
        return 2; // 右上
    } else if (y > prevFollowerY && x > prevFollowerX) {
        return 1; // 右下
    } else if (y > prevFollowerY && x < prevFollowerX) {
        return 2; // 左下
    }
    return 0; // 默認方向
}

function updateFollowerPosition() {
    const followerX = parseInt(follower.style.left) || 0;
    const followerY = parseInt(follower.style.top) || 0;

    const dx = mouseX - followerX;
    const dy = mouseY - followerY;

    const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

    const direction = getDirection(followerX, followerY);

    if (isImage) {
        if (direction === 0) {
            followerImage.src = defaultImage;
        } else {
            followerImage.src = images[direction - 1];
        }
    }

    if (distanceToMouse > 10) {
        const easeAmount = 0.05;
        follower.style.left = followerX + dx * easeAmount + "px";
        follower.style.top = followerY + dy * easeAmount + "px";
    }

    prevFollowerX = followerX;
    prevFollowerY = followerY;

    requestAnimationFrame(updateFollowerPosition);
}

updateFollowerPosition();

function snowFall(snow) {
    snow = snow || {};
    this.maxFlake = snow.maxFlake || 100;    // 雪花数量
    this.flakeSize = snow.flakeSize || 16;   // 雪花字体大小
    this.fallSpeed = snow.fallSpeed || 0.4;  // 飘落速度
    this.flakes = [];
    this.running = false;
}

snowFall.prototype.start = function () {
    if (this.running) return;
    this.running = true;

    this.createCanvas();
    this.createFlakes();
    this.drawSnow();
};

snowFall.prototype.stop = function () {
    this.running = false;
    if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
    }
    if (this.loop) cancelAnimationFrame(this.loop);
};

snowFall.prototype.createCanvas = function () {
    const canvas = document.createElement("canvas");
    canvas.id = "snowfall";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "none";

    document.body.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    window.addEventListener("resize", () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    });
};

function SnowFlake(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.fontSize = Math.random() * flakeSize + 8;
    this.speed = Math.random() * 0.5 + fallSpeed;
    this.char = "❄";
    this.stepSize = Math.random() / 30;
    this.step = 0;
}

SnowFlake.prototype.update = function () {
    this.x += Math.cos(this.step += 0.05) * this.stepSize;
    this.y += this.speed;

    if (this.y > this.canvasHeight || this.x < 0 || this.x > this.canvasWidth) {
        this.reset(this.canvasWidth, this.canvasHeight);
    }
};

SnowFlake.prototype.reset = function (width, height) {
    this.x = Math.random() * width;
    this.y = 0;
    this.fontSize = Math.random() * 8 + 12;
    this.speed = Math.random() * 0.5 + 0.4;
};

SnowFlake.prototype.render = function (ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // 白色
    ctx.font = `${this.fontSize}px Arial`;
    ctx.fillText(this.char, this.x, this.y);
    ctx.restore();
};

snowFall.prototype.createFlakes = function () {
    const flakes = this.flakes = [];
    for (let i = 0; i < this.maxFlake; i++) {
        flakes.push(new SnowFlake(this.canvas.width, this.canvas.height, this.flakeSize, this.fallSpeed));
    }
};

snowFall.prototype.drawSnow = function () {
    if (!this.running) return;

    const ctx = this.ctx;
    const canvas = this.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let flake of this.flakes) {
        flake.update();
        flake.render(ctx);
    }

    this.loop = requestAnimationFrame(() => this.drawSnow());
};

// 实例化并控制阅读页切换
const snow = new snowFall({ maxFlake: 60, flakeSize: 14, fallSpeed: 0.3 });

function toggleSnowByPage() {
    const isPostPage = document.body.classList.contains("post-page") || document.querySelector('.post') !== null;
    if (isPostPage) {
        snow.stop();
    } else {
        snow.start();
    }
}

// 页面加载判断一次
toggleSnowByPage();

// 如果你使用的是 PJAX（如 hexo-next 开启了 PJAX），需要监听切换：
document.addEventListener('pjax:complete', toggleSnowByPage);

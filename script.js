"use strict";

const animation = (() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    class Particle {
        constructor(moveRadius, step, pos, size) {
            this.moveRadius = moveRadius;
            this.step = step;
            this.pos = pos;
            this.size = size;
        }

        draw() {
            const x = Math.cos(this.pos) * this.moveRadius + canvas.width / 2;
            const y = Math.sin(this.pos) * this.moveRadius + canvas.height / 2;
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.pos += this.step;
            this.draw();
        }
    }

    let particleArr = [];
    function init() {
        particleArr = [];
        for (let i = 0; i < 500; i++) {
            let moveRadius = Math.floor(Math.random() * canvas.width);
            let step = (Math.random() * 0.002) + 0.002;
            let pos = Math.floor(Math.random() * (Math.PI * 2));
            let size = Math.floor(Math.random() * 8 + 0.5);

            particleArr.push(new Particle(moveRadius, step, pos, size));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = "rgba(0, 0, 0, .1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const particle of particleArr) {
            particle.update();
        }
    }

    function resize() {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        init();
    }

    init();
    animate();
    window.onresize = resize;

})();
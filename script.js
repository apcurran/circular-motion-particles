"use strict";

// Bare code block used as an alternative to an IIFE, to protect from the global scope
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d", { alpha: false });

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    const colors = [
        "#8B09FF",
        "#6A12E8",
        "#4A40FF",
        "#5009FF"
    ]

    class Particle {
        constructor(moveRadius, step, pos, size, color) {
            this.moveRadius = moveRadius;
            this.step = step;
            this.pos = pos;
            this.size = size;
            this.color = color;
        }

        draw() {
            const x = Math.cos(this.pos) * this.moveRadius + canvas.width / 2;
            const y = Math.sin(this.pos) * this.moveRadius + canvas.height / 2;
            ctx.beginPath();
            ctx.arc(x, y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.pos += this.step;
            this.draw();
        }
    }

    let particleArr = [];

    function init() {
        particleArr = [];
        const totalParticles = Math.floor(canvas.width / 4);

        for (let i = 0; i < totalParticles; i++) {
            let moveRadius = Math.floor(Math.random() * canvas.width + 50);
            let step = Math.random() * 0.002 + 0.002;
            let pos = Math.random() * (Math.PI * 2);
            let size = Math.floor(Math.random() * 6 + 0.5);
            let color = colors[Math.floor(Math.random() * colors.length)];

            particleArr.push(new Particle(moveRadius, step, pos, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = "rgba(255, 255, 255, .04)";
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

}
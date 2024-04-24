"use strict";
const HOUSE_BASE_Z = -490;
class Wall3D {
    constructor() {
        this._scrollRange = 0;
        this._mousePosition = { x: 0, y: 0 };
        this.$house = document.querySelector('.house');
        this.$progressBar = document.querySelector('.progress-bar');
        this._resizeHandler();
        window.addEventListener('scroll', this._scrollHandler.bind(this));
        window.addEventListener('resize', this._resizeHandler.bind(this));
        window.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
    }
    get _scrollRatio() {
        return window.scrollY / this._scrollRange;
    }
    _resizeHandler() {
        this._scrollRange = document.body.offsetHeight - window.innerHeight;
    }
    _scrollHandler() {
        const zMove = this._scrollRatio * 980 + HOUSE_BASE_Z;
        this.$house.style.transform = `translateZ(${zMove}vw)`;
        this.$progressBar.style.width = `${this._scrollRatio * 100}%`;
    }
    _mouseMoveHandler(e) {
        this._mousePosition.x = -1 + (e.clientX / window.innerWidth) * 2;
        this._mousePosition.y = 1 - (e.clientY / window.innerHeight) * 2;
    }
}
window.onload = function () {
    new Wall3D();
};

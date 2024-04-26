import { Character } from './Character.js';
const HOUSE_BASE_Z = -490;
class Wall3D {
    constructor() {
        this._scrollRange = 0;
        this._mousePosition = { x: 0, y: 0 };
        this.$house = document.querySelector('.house');
        this.$progressBar = document.querySelector('.progress-bar');
        this.$stage = document.querySelector('.stage');
        this.$selectCharacter = document.querySelector('.select-character');
        this._resizeHandler();
        window.addEventListener('scroll', this._scrollHandler.bind(this));
        window.addEventListener('resize', this._resizeHandler.bind(this));
        window.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
        this.$stage.addEventListener('click', this._handleClickStage.bind(this));
        this.$selectCharacter.addEventListener('click', this._handleClickSeletCharacter.bind(this));
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
        this.$stage.style.transform = `rotateX(${this._mousePosition.y * 5}deg) rotateY(${this._mousePosition.x * 5}deg)`;
    }
    _handleClickStage(e) {
        new Character({ xPos: (e.clientX / window.innerWidth) * 100, speed: Math.random() * 0.5 + 0.2 });
    }
    _handleClickSeletCharacter(e) {
        var _a;
        const value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('data-char');
        value && document.body.setAttribute('data-char', value);
    }
}
window.onload = function () {
    new Wall3D();
};

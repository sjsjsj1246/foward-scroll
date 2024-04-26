import { Character } from './Character.js';

const HOUSE_BASE_Z = -490;

class Wall3D {
    private _scrollRange: number = 0;
    private _mousePosition = { x: 0, y: 0 };
    private $house: HTMLElement;
    private $progressBar: HTMLElement;
    private $stage: HTMLElement;

    constructor() {
        this.$house = document.querySelector('.house')!;
        this.$progressBar = document.querySelector('.progress-bar')!;
        this.$stage = document.querySelector('.stage')!;
        this._resizeHandler();
        window.addEventListener('scroll', this._scrollHandler.bind(this));
        window.addEventListener('resize', this._resizeHandler.bind(this));
        window.addEventListener('mousemove', this._mouseMoveHandler.bind(this));
        window.addEventListener('click', this._handleClick.bind(this));
    }

    private get _scrollRatio(): number {
        return window.scrollY / this._scrollRange;
    }

    private _resizeHandler(): void {
        this._scrollRange = document.body.offsetHeight - window.innerHeight;
    }

    private _scrollHandler(): void {
        const zMove = this._scrollRatio * 980 + HOUSE_BASE_Z;
        this.$house.style.transform = `translateZ(${zMove}vw)`;

        this.$progressBar.style.width = `${this._scrollRatio * 100}%`;
    }

    private _mouseMoveHandler(e: MouseEvent): void {
        this._mousePosition.x = -1 + (e.clientX / window.innerWidth) * 2;
        this._mousePosition.y = 1 - (e.clientY / window.innerHeight) * 2;
        this.$stage.style.transform = `rotateX(${this._mousePosition.y * 5}deg) rotateY(${this._mousePosition.x * 5}deg)`;
    }

    private _handleClick(e: MouseEvent): void {
        new Character({ xPos: (e.clientX / window.innerWidth) * 100, speed: Math.random() * 0.5 + 0.2 });
    }
}

window.onload = function () {
    new Wall3D();
};

export class Character {
    private $mainElem: HTMLElement;
    private _scrollState: number | null;
    private _lastScrollTop;
    private _xPos;
    private _speed;
    private _direction: 'left' | 'right' | null;
    private _runningState;
    private _rafId: number | null;

    constructor(info: { xPos: number; speed: number }) {
        this.$mainElem = document.createElement('div');
        this.$mainElem.classList.add('character');
        this.$mainElem.innerHTML =
            '' +
            '<div class="character-face-con character-head">' +
            '<div class="character-face character-head-face face-front"></div>' +
            '<div class="character-face character-head-face face-back"></div>' +
            '</div>' +
            '<div class="character-face-con character-torso">' +
            '<div class="character-face character-torso-face face-front"></div>' +
            '<div class="character-face character-torso-face face-back"></div>' +
            '</div>' +
            '<div class="character-face-con character-arm character-arm-right">' +
            '<div class="character-face character-arm-face face-front"></div>' +
            '<div class="character-face character-arm-face face-back"></div>' +
            '</div>' +
            '<div class="character-face-con character-arm character-arm-left">' +
            '<div class="character-face character-arm-face face-front"></div>' +
            '<div class="character-face character-arm-face face-back"></div>' +
            '</div>' +
            '<div class="character-face-con character-leg character-leg-right">' +
            '<div class="character-face character-leg-face face-front"></div>' +
            '<div class="character-face character-leg-face face-back"></div>' +
            '</div>' +
            '<div class="character-face-con character-leg character-leg-left">' +
            '<div class="character-face character-leg-face face-front"></div>' +
            '<div class="character-face character-leg-face face-back"></div>' +
            '</div>';

        document.querySelector('.stage')!.appendChild(this.$mainElem);

        this.$mainElem.style.left = info.xPos + '%';
        // 스크롤 중인지 아닌지
        this._scrollState = null;
        // 바로 이전 스크롤 위치
        this._lastScrollTop = 0;
        this._xPos = info.xPos;
        this._speed = info.speed;
        this._direction = null;
        // 좌우 이동 중인지 아닌지
        this._runningState = false;
        this._rafId = null;
        this.init();
    }

    private _handleScroll() {
        this._scrollState && clearTimeout(this._scrollState);

        if (!this._scrollState) {
            this.$mainElem.classList.add('running');
        }

        this._scrollState = setTimeout(
            function (this: Character) {
                this._scrollState = null;
                this.$mainElem.classList.remove('running');
            }.bind(this),
            500,
        );

        // 이전 스크롤 위치와 현재 스크롤 위치를 비교
        if (this._lastScrollTop > window.scrollY) {
            // 이전 스크롤 위치가 크다면: 스크롤 올림
            this.$mainElem.setAttribute('data-direction', 'backward');
            this.$mainElem.classList.add('running');
        } else {
            // 현재 스크롤 위치가 크다면: 스크롤 내림
            this.$mainElem.setAttribute('data-direction', 'forward');
            this.$mainElem.classList.add('running');
        }

        this._lastScrollTop = window.scrollY;
    }

    private _handleKeyDown(e: KeyboardEvent) {
        if (this._runningState) return;

        if (e.keyCode == 37) {
            // 왼쪽
            this._direction = 'left';
            this.$mainElem.setAttribute('data-direction', 'left');
            this.$mainElem.classList.add('running');
            this.run();
            this._runningState = true;
        } else if (e.keyCode == 39) {
            // 오른쪽
            this._direction = 'right';
            this.$mainElem.setAttribute('data-direction', 'right');
            this.$mainElem.classList.add('running');
            this.run();
            this._runningState = true;
        }
    }

    private _handleKeyUp() {
        this.$mainElem.classList.remove('running');
        this._rafId && cancelAnimationFrame(this._rafId);
        this._runningState = false;
    }

    init() {
        window.addEventListener('scroll', this._handleScroll.bind(this));
        window.addEventListener('keydown', this._handleKeyDown.bind(this));
        window.addEventListener('keyup', this._handleKeyUp.bind(this));
    }

    run() {
        if (this._direction == 'left') {
            this._xPos -= this._speed;
        } else if (this._direction == 'right') {
            this._xPos += this._speed;
        }

        if (this._xPos < 2) {
            this._xPos = 2;
        }

        if (this._xPos > 88) {
            this._xPos = 88;
        }

        this.$mainElem.style.left = this._xPos + '%';

        this._rafId = requestAnimationFrame(this.run.bind(this));
    }
}

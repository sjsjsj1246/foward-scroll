const HOUSE_BASE_Z = -490

class Wall3D {
    _scrollRange
    $house
    $progressBar

    constructor() {
        this.$house = document.querySelector('.house')
        this._resizeHandler()
        window.addEventListener('scroll', this._scrollHandler.bind(this))
        window.addEventListener('resize', this._resizeHandler.bind(this))
    }

    get _scrollRatio() {
        return window.scrollY / this._scrollRange
    }

    _resizeHandler() {
        this._scrollRange = document.body.offsetHeight - window.innerHeight
    }

    _scrollHandler() {
        const zMove = this._scrollRatio * 980 + HOUSE_BASE_Z
        this.$house.style.transform = `translateZ(${zMove}vw)`

        this.$progressBar = document.querySelector('.progress-bar')
        this.$progressBar.style.width = `${this._scrollRatio * 100}%`
    }
}

window.onload = function() {
    new Wall3D()
}
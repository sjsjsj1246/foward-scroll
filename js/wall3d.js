const HOUSE_BASE_Z = -490

class Wall3D {
    _scrollRange
    $house

    constructor() {
        this.$house = document.querySelector('.house')
        this._resizeHandler()
        window.addEventListener('scroll', this._scrollHandler.bind(this))
        window.addEventListener('resize', this._resizeHandler.bind(this))
    }

    _resizeHandler() {
        this._scrollRange = document.body.offsetHeight - window.innerHeight
    }

    _scrollHandler() {
        const zMove = (window.scrollY / this._scrollRange) * 980 + HOUSE_BASE_Z
        this.$house.style.transform = `translateZ(${zMove}vw)`
    }
}

window.onload = function() {
    new Wall3D()
}
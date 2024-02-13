// ========================================= Move to block  =========================================
$(function () {
    let header = $("#header");
    let introH = $("#intro").innerHeight();
    let scrollOffset = $(window).scrollTop();
    checkScroll(scrollOffset);

    /* Fixed Header */
    $(window).on("scroll", function () {
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
    });

    function checkScroll(scrollOffset) {
        if (scrollOffset >= introH) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    /* Fixed Header */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault(); //если используется ссылка

        let $this = $(this);
        let blockId = $this.data("scroll");
        let blockOffset = $(blockId).offset().top;

        $("#nav a").removeClass("active");
        $this.addClass("active");

        $("html, body").animate(
            {
                scrollTop: blockOffset,
            },
            500
        );
    });

    /* Menu nav toggle */
    $("#nav-toggle").on("click", function (event) {
        event.preventDefault(); //если используется ссылка

        $(this).toggleClass("active");
        $("#nav").toggleClass("active");
    });
});

// ============================================ Slider ===========================================
(function () {
    function Slider() {
        this.images__slider = null;
        this.line__slider = null;
        this.width__sumsliders = null;
        this.showPrevBtn = null;
        this.showNextBtn = null;
        this.count__images = 0;
        this.start = function (elId) {
            let that = this;
            let elSelector = "#" + elId;
            let el = document.querySelector(elSelector);
            this.images__slider = el.querySelectorAll(
                ".div__slider .slider__line img"
            );
            this.line__slider = el.querySelector(".div__slider .slider__line");
            this.width__sumsliders = el.querySelector(".div__slider");
            this.showPrevBtn = el.querySelector(".slider__prev");
            this.showNextBtn = el.querySelector(".slider__next");
            this.init();
            window.addEventListener("resize", function (e) {
                that.init();
            });
            this.showPrevBtn.addEventListener("click", function (e) {
                that.onShowPrevBtnClick(e);
            });
            this.showNextBtn.addEventListener("click", function (e) {
                that.onShowNextBtnClick(e);
            });
        };
        this.rollSlider = function () {
            this.line__slider.style.transform =
                "translate(-" +
                this.count__images * this.width__sumsliders +
                "px)";
        };
        this.init = function () {
            this.width__sumsliders =
                document.querySelector(".div__slider").offsetWidth;
            this.line__slider.style.width =
                this.width__sumsliders * this.images__slider.length + "px";
            this.images__slider.forEach((item) => {
                item.style.width = this.width__sumsliders + "px";
                item.style.height = "auto";
            });
            this.rollSlider();
        };
        this.onShowPrevBtnClick = function (e) {
            this.count__images--;
            if (this.count__images < 0) {
                this.count__images = this.images__slider.length - 1;
            }
            this.rollSlider();
        };
        this.onShowNextBtnClick = function (e) {
            this.count__images++;
            if (this.count__images >= this.images__slider.length) {
                this.count__images = 0;
            }
            this.rollSlider();
        };
    }
    // создаём экземпляр слайдера
    const slider1 = new Slider();
    slider1.start("slider__1");
})();

// ============================================ Modal ===========================================
(function () {
    (function () {
        if (typeof window.CustomEvent === "function") return false;
        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: null,
            };
            const evt = new CustomEvent(type, { bubbles, cancelable, detail });
            return evt;
        }
        window.CustomEvent = CustomEvent;
    })();

    modalFuncReturnObj = function (options) {
        var _elemModal,
            _eventShowModal,
            _eventHideModal,
            _hiding = false,
            _destroyed = false,
            _animationSpeed = 200;

        function _createModal(options) {
            var elemModal = document.createElement("div"),
                modalTemplate = `
                    <div class="modal__backdrop" data-dismiss="modal">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__header-img-close">
                                <img
                                    class="img"
                                    src="assets/images/Modal/afterpay-logo.svg"
                                    alt="rating"
                                />
                                <div class="modal__btn-close" data-dismiss="modal" title="Закрыть">x</div>
                            </div>
                            <div class="modal__title" data-modal="title">{{title}}</div>
                        </div>
                        <div class="modal__body" data-modal="content">{{content}}</div>
                        <div class="modal__footer" data-modal="footer">{{footer}}</div>
                    </div>
                    </div>`,
                modalHTML;

            elemModal.classList.add("modal");
            modalHTML = modalTemplate.replace(
                "{{title}}",
                options.title || "Новое окно"
            );
            modalHTML = modalHTML.replace("{{content}}", options.content || "");
            modalHTML = modalHTML.replace("{{footer}}", options.footer || "");
            elemModal.innerHTML = modalHTML;
            document.body.appendChild(elemModal);
            return elemModal;
        }

        function _showModal() {
            if (!_destroyed && !_hiding) {
                _elemModal.classList.add("modal__show");
                document.dispatchEvent(_eventShowModal);
            }
        }

        function _hideModal() {
            _hiding = true;
            _elemModal.classList.remove("modal__show");
            _elemModal.classList.add("modal__hiding");
            setTimeout(function () {
                _elemModal.classList.remove("modal__hiding");
                _hiding = false;
            }, _animationSpeed);
            document.dispatchEvent(_eventHideModal);
        }

        function _handlerCloseModal(e) {
            if (e.target.dataset.dismiss === "modal") {
                _hideModal();
            }
        }

        _elemModal = _createModal(options || {});

        _elemModal.addEventListener("click", _handlerCloseModal);
        _eventShowModal = new CustomEvent("show.modal", { detail: _elemModal });
        _eventHideModal = new CustomEvent("hide.modal", { detail: _elemModal });

        return {
            show: _showModal,
            hide: _hideModal,
            destroy: function () {
                _elemModal.parentElement.removeChild(_elemModal),
                    _elemModal.removeEventListener("click", _handlerCloseModal),
                    (_destroyed = true);
            },
            setContent: function (html) {
                _elemModal.querySelector('[data-modal="content"]').innerHTML =
                    html;
            },
            setTitle: function (text) {
                _elemModal.querySelector('[data-modal="title"]').innerHTML =
                    text;
            },
        };
    };

    // создаём модальное окно
    var modal = modalFuncReturnObj({
        title: "Make easy monthly payments",
        content: `                      
                <div class="price-title">
                    <div class="price-title__discount">&#163;9.99/mo.</div>
                    <div class="price-title__months">10 months</div>
                </div>
                <div class="price-bottom">
                    <div class="price-bottom__item">
                        <p>APR</p>
                        <p>0%</p>
                    </div>
                    <div class="price-bottom__item">
                        <p>Interest</p>
                        <p>&#163;0</p>
                    </div>
                    <div class="price-bottom__item">
                        <p>Total</p>
                        <p>&#163;89.00</p>
                    </div>
                </div>                      
            `,
        footer: `
                <div class="footer-line"> <img width="100%" src="assets/images/Modal/Line 49.png" alt=""></div>
                <div class="modal__footer">
                    <div class="footer-btn">
                        <p>Confirm to checkout</p>
                    </div>
                </div>
            </div>`,
    });
    // при клике по кнопке
    document
        .querySelector(".product__footer-btn")
        .addEventListener("click", function () {
            // отобразим модальное окно
            modal.show();
        });
})();

// ============================================ Accordion ===========================================
(function () {
    class ItcAccordion {
        constructor(target, config) {
            this._el =
                typeof target === "string"
                    ? document.querySelector(target)
                    : target;
            const defaultConfig = {
                alwaysOpen: true,
                duration: 350,
            };
            this._config = Object.assign(defaultConfig, config);
            this.addEventListener();
        }
        addEventListener() {
            this._el.addEventListener("click", (e) => {
                const elHeader = e.target.closest(".accordion__header");
                if (!elHeader) {
                    return;
                }
                if (!this._config.alwaysOpen) {
                    const elOpenItem = this._el.querySelector(
                        ".accordion__item_show"
                    );
                    if (elOpenItem) {
                        elOpenItem !== elHeader.parentElement
                            ? this.toggle(elOpenItem)
                            : null;
                    }
                }
                this.toggle(elHeader.parentElement);
            });
        }
        show(el) {
            const elBody = el.querySelector(".accordion__body");
            if (
                elBody.classList.contains("collapsing") ||
                el.classList.contains("accordion__item_show")
            ) {
                return;
            }
            elBody.style.display = "block";
            const height = elBody.offsetHeight;
            elBody.style.height = 0;
            elBody.style.overflow = "hidden";
            elBody.style.transition = `height ${this._config.duration}ms ease`;
            elBody.classList.add("collapsing");
            el.classList.add("accordion__item_slidedown");
            elBody.offsetHeight;
            elBody.style.height = `${height}px`;
            window.setTimeout(() => {
                elBody.classList.remove("collapsing");
                el.classList.remove("accordion__item_slidedown");
                elBody.classList.add("collapse");
                el.classList.add("accordion__item_show");
                elBody.style.display = "";
                elBody.style.height = "";
                elBody.style.transition = "";
                elBody.style.overflow = "";
            }, this._config.duration);
        }
        hide(el) {
            const elBody = el.querySelector(".accordion__body");
            if (
                elBody.classList.contains("collapsing") ||
                !el.classList.contains("accordion__item_show")
            ) {
                return;
            }
            elBody.style.height = `${elBody.offsetHeight}px`;
            elBody.offsetHeight;
            elBody.style.display = "block";
            elBody.style.height = 0;
            elBody.style.overflow = "hidden";
            elBody.style.transition = `height ${this._config.duration}ms ease`;
            elBody.classList.remove("collapse");
            el.classList.remove("accordion__item_show");
            elBody.classList.add("collapsing");
            window.setTimeout(() => {
                elBody.classList.remove("collapsing");
                elBody.classList.add("collapse");
                elBody.style.display = "";
                elBody.style.height = "";
                elBody.style.transition = "";
                elBody.style.overflow = "";
            }, this._config.duration);
        }
        toggle(el) {
            el.classList.contains("accordion__item_show")
                ? this.hide(el)
                : this.show(el);
        }
    }
    // при клике по кнопке
    new ItcAccordion(document.querySelector(".accordion"), {
        alwaysOpen: true,
    });
})();

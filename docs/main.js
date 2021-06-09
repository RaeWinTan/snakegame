(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\E Business\Desktop\Personal Projects\snakegame\src\main.ts */"zUnb");


/***/ }),

/***/ "A4JB":
/*!**************************************************!*\
  !*** ./src/app/drawsnake/drawsnake.component.ts ***!
  \**************************************************/
/*! exports provided: DrawsnakeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrawsnakeComponent", function() { return DrawsnakeComponent; });
/* harmony import */ var queue_typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! queue-typescript */ "oOCA");
/* harmony import */ var queue_typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(queue_typescript__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _game_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-data.service */ "TeQP");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");





const _c0 = ["drawId"];
//DrawsnakeComponent
class DrawsnakeComponent {
    constructor(gds, toastr) {
        this.gds = gds;
        this.toastr = toastr;
        this.down = 0;
        //snake stuff
        this.snakeQueue = new queue_typescript__WEBPACK_IMPORTED_MODULE_0__["Queue"]();
        this.snakeSet = new Set();
        this.n = 10; //iput
        this.colourCode = {
            0: "#FFFFFF",
            1: "#000000",
            2: "#FF0000"
        };
        this.cellSide = gds.cellSide;
        this.n = gds.n;
    }
    saveChanges() {
        if (!this.snakeQueue.length) {
            this.toastr.error("Snake Cannot be empty", "ERROR", {
                positionClass: 'toast-bottom-right',
                timeOut: 3000
            });
            return;
        }
        this.gds.snakeQueue = this.snakeQueue;
        this.gds.snakeSet = this.snakeSet;
        this.gds.usePreview = true;
        this.toastr.success("Snake is changed", "CHANGED", {
            positionClass: 'toast-bottom-right',
            timeOut: 3000
        });
    }
    movingEvt(evt) {
        let x = evt.offsetX;
        let y = evt.offsetY;
        if (this.down > 0)
            this.insertSnake(x, y);
    }
    convertPos(pos) {
        if (pos.y === 0)
            return pos.x + 1;
        else
            return (pos.y) * this.n + pos.x + 1;
    }
    changeColour(pos, colourNum) {
        this.ctx.fillStyle = this.colourCode[colourNum];
        this.ctx.fillRect(pos.x * this.cellSide, pos.y * this.cellSide, this.cellSide, this.cellSide);
    }
    drawBorder() {
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        for (let i = 1; i < this.n; i++) {
            this.ctx.moveTo(i * this.cellSide, 0);
            this.ctx.lineTo(i * this.cellSide, this.cellSide * this.n);
            this.ctx.stroke();
        }
        for (let i = 1; i < this.n; i++) {
            this.ctx.moveTo(0, i * this.cellSide);
            this.ctx.lineTo(this.cellSide * this.n, i * this.cellSide);
            this.ctx.stroke();
        }
    }
    convertNum(num) {
        if (num <= this.n)
            return [num - 1, 0];
        else
            return num % this.n > 0 ? [num % this.n - 1, Math.floor(num / this.n)] : [this.n - 1, num / this.n - 1];
    }
    insertSnake(x, y) {
        let c = {};
        let num = 0;
        if (x < 0 || y < 0 || y > this.n * this.cellSide || x > this.n * this.cellSide)
            return;
        //do the estimate here
        if (x === 0)
            x = 1;
        if (y === 0)
            y = 1;
        c.x = Math.ceil(x / this.cellSide) - 1;
        c.y = Math.ceil(y / this.cellSide) - 1;
        num = this.convertPos(c);
        //check if num is valid against front this.snakeQueue.tail
        if (!this.snakeSet.has(num)) {
            if (this.snakeQueue.length) {
                let tmpNum = this.convertNum(num);
                let tmpT = this.convertNum(this.snakeQueue.tail);
                if (tmpNum[1] === tmpT[1]) {
                    if (!(tmpNum[0] === tmpT[0] + 1 || tmpNum[0] === tmpT[0] - 1 || tmpNum[0] === tmpT[0] + (this.n - 1) || tmpNum[0] === tmpT[0] - (this.n - 1))) {
                        return;
                    }
                }
                else if (tmpNum[0] === tmpT[0]) {
                    if (!(tmpNum[1] === tmpT[1] + 1 || tmpNum[1] === tmpT[1] - 1 || tmpNum[1] === tmpT[1] + (this.n - 1) || tmpNum[1] === tmpT[1] - (this.n - 1))) {
                        return;
                    }
                }
                else {
                    return;
                }
            }
            this.snakeSet.add(num);
            this.snakeQueue.enqueue(num);
            this.changeColour(c, 1);
        }
    }
    upEvt(evt) {
        console.log(this.snakeQueue.toArray());
        console.log(this.snakeSet);
        this.down--;
    }
    downEvt(evt) {
        let x = evt.offsetX;
        let y = evt.offsetY;
        this.insertSnake(x, y);
        this.down++;
    }
    ngAfterViewInit() {
        this.canvas.nativeElement.width = this.n * this.cellSide;
        this.canvas.nativeElement.height = this.n * this.cellSide;
        this.ctx = this.canvas.nativeElement.getContext("2d");
        this.drawBorder();
    }
}
DrawsnakeComponent.ɵfac = function DrawsnakeComponent_Factory(t) { return new (t || DrawsnakeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_game_data_service__WEBPACK_IMPORTED_MODULE_2__["GameDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"])); };
DrawsnakeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DrawsnakeComponent, selectors: [["app-drawsnake"]], viewQuery: function DrawsnakeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.canvas = _t.first);
    } }, decls: 19, vars: 0, consts: [[1, "container", "p-0", "m-0", "infobtn"], ["data-toggle", "collapse", "href", "#collapseExample", "xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "bi", "bi-info-circle", "float-right"], ["d", "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"], ["d", "m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["id", "collapseExample", 1, "collapse", "bg-transparent", "container", "float-left"], ["aria-label", "Page navigation example"], [1, "pagination", "justify-content-center"], ["routerLink", "/game", "routerLinkActive", "active", 1, "page-item"], [1, "page-link"], ["routerLink", "/drawsnake", "routerLinkActive", "active", 1, "page-item"], [1, "form-group", "row", "justify-content-center"], [1, "col-sm-auto"], [1, "btn", "form-control", "btn-success", 3, "click"], [1, "show", 2, "border", "1px solid blue", 3, "mousemove", "mouseout", "mousedown", "mouseup"], ["drawId", ""]], template: function DrawsnakeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "nav", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Snake Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Change snake");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DrawsnakeComponent_Template_button_click_15_listener() { return ctx.saveChanges(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Save Changes");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "canvas", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("mousemove", function DrawsnakeComponent_Template_canvas_mousemove_17_listener($event) { return ctx.movingEvt($event); })("mouseout", function DrawsnakeComponent_Template_canvas_mouseout_17_listener() { return ctx.down = 0; })("mousedown", function DrawsnakeComponent_Template_canvas_mousedown_17_listener($event) { return ctx.downEvt($event); })("mouseup", function DrawsnakeComponent_Template_canvas_mouseup_17_listener($event) { return ctx.upEvt($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLinkActive"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkcmF3c25ha2UuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
        this.title = 'snakegame';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "TeQP":
/*!**************************************!*\
  !*** ./src/app/game-data.service.ts ***!
  \**************************************/
/*! exports provided: GameDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameDataService", function() { return GameDataService; });
/* harmony import */ var queue_typescript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! queue-typescript */ "oOCA");
/* harmony import */ var queue_typescript__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(queue_typescript__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class GameDataService {
    constructor() {
        this.n = 10;
        this.cellSide = 10;
        this.snakeQueue = new queue_typescript__WEBPACK_IMPORTED_MODULE_0__["Queue"]();
        this.snakeSet = new Set();
        this.usePreview = false;
    }
}
GameDataService.ɵfac = function GameDataService_Factory(t) { return new (t || GameDataService)(); };
GameDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GameDataService, factory: GameDataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _drawsnake_drawsnake_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drawsnake/drawsnake.component */ "A4JB");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game/game.component */ "jBAD");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var angular_mouse_textbox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-mouse-textbox */ "Nibk");
/* harmony import */ var angular_resize_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-resize-element */ "dk5a");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var snakegame_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! snakegame-angular */ "X46g");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ "fXoL");














class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
            angular_mouse_textbox__WEBPACK_IMPORTED_MODULE_8__["AngularMouseTextboxModule"],
            angular_resize_element__WEBPACK_IMPORTED_MODULE_9__["AngularResizeElementModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_10__["ToastrModule"].forRoot(),
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            snakegame_angular__WEBPACK_IMPORTED_MODULE_11__["SnakegameAngularModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _drawsnake_drawsnake_component__WEBPACK_IMPORTED_MODULE_4__["DrawsnakeComponent"],
        _game_game_component__WEBPACK_IMPORTED_MODULE_5__["GameComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_6__["CommonModule"],
        angular_mouse_textbox__WEBPACK_IMPORTED_MODULE_8__["AngularMouseTextboxModule"],
        angular_resize_element__WEBPACK_IMPORTED_MODULE_9__["AngularResizeElementModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"], ngx_toastr__WEBPACK_IMPORTED_MODULE_10__["ToastrModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        snakegame_angular__WEBPACK_IMPORTED_MODULE_11__["SnakegameAngularModule"]] }); })();


/***/ }),

/***/ "jBAD":
/*!****************************************!*\
  !*** ./src/app/game/game.component.ts ***!
  \****************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var queue_typescript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! queue-typescript */ "oOCA");
/* harmony import */ var queue_typescript__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(queue_typescript__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "5eHb");
/* harmony import */ var _game_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game-data.service */ "TeQP");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var angular_mouse_textbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-mouse-textbox */ "Nibk");
/* harmony import */ var snakegame_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! snakegame-angular */ "X46g");
/* harmony import */ var angular_resize_element__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! angular-resize-element */ "dk5a");











const _c0 = ["container1"];
const _c1 = ["container2"];
function GameComponent_button_59_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameComponent_button_59_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.p = "start"; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "START");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameComponent_ng_template_60_button_0_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameComponent_ng_template_60_button_0_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r8.p = "pause"; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "PAUSE");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameComponent_ng_template_60_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, GameComponent_ng_template_60_button_0_Template, 2, 0, "button", 38);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.p === "start");
} }
const _c2 = function (a0) { return { "active": a0 }; };
const _c3 = function (a0, a1) { return { "show": a0, "notShow": a1 }; };
var AngularResizeElementDirection;
(function (AngularResizeElementDirection) {
    AngularResizeElementDirection["TOP"] = "top";
    AngularResizeElementDirection["TOP_RIGHT"] = "top-right";
    AngularResizeElementDirection["RIGHT"] = "right";
    AngularResizeElementDirection["BOTTOM_RIGHT"] = "bottom-right";
    AngularResizeElementDirection["BOTTOM"] = "bottom";
    AngularResizeElementDirection["BOTTOM_LEFT"] = "bottom-left";
    AngularResizeElementDirection["LEFT"] = "left";
    AngularResizeElementDirection["TOP_LEFT"] = "top-left";
})(AngularResizeElementDirection || (AngularResizeElementDirection = {}));
class GameComponent {
    constructor(renderer, toastr, gds) {
        this.renderer = renderer;
        this.toastr = toastr;
        this.gds = gds;
        this.data = {};
        this.data2 = {};
        this.c = "appliedResize";
        //somehtin
        //setting for the draw-snake
        this.snakeQueue = new queue_typescript__WEBPACK_IMPORTED_MODULE_1__["Queue"]();
        this.snakeSet = new Set();
        this.usePreview = false;
        this.showHelp = false;
        this.AngularResizeElementDirection = AngularResizeElementDirection;
        //bare bones
        this.x = 4;
        this.y = 4;
        this.speed = 2;
        this.cellSide = gds.cellSide;
        this.n = gds.n;
        this.p = "pause";
        this.activate = false;
        this.tmpN = this.n;
    }
    ngOnInit() {
        if (this.gds.usePreview) {
            this.snakeQueue = this.gds.snakeQueue;
            this.snakeSet = this.gds.snakeSet;
            this.usePreview = true;
        }
    }
    usePreviewChanges(usePreview) {
        this.usePreview = !usePreview;
        this.gds.usePreview = !this.usePreview;
    }
    goDraw() {
        this.gds.n = this.n;
        this.gds.cellSide = this.cellSide;
    }
    ngAfterViewInit() {
        this.renderer.setStyle(this.containerElement2.nativeElement, "width", this.n * this.cellSide + "px");
        this.renderer.setStyle(this.containerElement2.nativeElement, "height", this.n * this.cellSide + "px");
        this.renderer.setStyle(this.containerElement.nativeElement, "width", this.containerElement2.nativeElement.offsetWidth + "px");
        this.renderer.setStyle(this.containerElement.nativeElement, "height", this.containerElement2.nativeElement.offsetHeight + "px");
    }
    onResizePreview(evt) {
        this.activate = true;
        if (evt.currentWidthValue % this.cellSide === 0) {
            this.data2.width = evt.currentWidthValue;
            this.data2.height = evt.currentHeightValue;
            this.tmpN = evt.currentWidthValue / this.cellSide;
        }
    }
    onResize(evt) {
        this.activate = false;
        this.data.width = this.data2.width;
        this.data.height = this.data2.height;
        this.n = this.data.width / this.cellSide;
        this.showSuccess("SIZE", "" + this.n);
    }
    death() {
        this.toastr.error("restart game", "DEATH", {
            positionClass: 'toast-bottom-right',
            timeOut: 3000
        });
    }
    showSuccess(att, val) {
        this.toastr.success(val, att, {
            positionClass: 'toast-bottom-right',
            timeOut: 3000
        });
    }
}
GameComponent.ɵfac = function GameComponent_Factory(t) { return new (t || GameComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_game_data_service__WEBPACK_IMPORTED_MODULE_3__["GameDataService"])); };
GameComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameComponent, selectors: [["app-game"]], viewQuery: function GameComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElement = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.containerElement2 = _t.first);
    } }, decls: 69, vars: 39, consts: [[1, "overflow-auto", "container", "p-0", "m-0", "infobtn"], ["data-toggle", "collapse", "href", "#collapseExample", "xmlns", "http://www.w3.org/2000/svg", "width", "16", "height", "16", "fill", "currentColor", "viewBox", "0 0 16 16", 1, "bi", "bi-info-circle", "float-right"], ["d", "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"], ["d", "m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"], ["id", "collapseExample", 1, "collapse", "bg-transparent", "container", "float-left"], ["aria-label", "Page navigation example"], [1, "pagination", "justify-content-center"], [1, "page-item", 3, "ngClass"], [1, "page-link", 3, "click"], ["routerLink", "/game", "routerLinkActive", "active", 1, "page-item"], [1, "page-link"], ["routerLink", "/drawsnake", "routerLinkActive", "active", 1, "page-item", 3, "click"], [3, "ngClass"], [1, "list-group"], [1, "list-group-item", "d-flex", "justify-content-between", "align-items-start"], [1, "ms-2", "me-auto", "w-100"], [1, "font-weight-bold"], [1, "list-group-item"], [1, "list-group-item", "text-success"], [1, "list-group-item", "text-warning"], [1, "form-group", "row"], ["for", "speedInput", 1, "col-sm-3", "col-form-label"], [1, "col-sm-9"], ["type", "range", "min", "1", "max", "10", "step", "1", "id", "speedInput", 1, "form-range", "form-control", 3, "ngModel", "ngModelChange"], ["for", "snakesizeInput", 1, "col-sm-3", "col-form-label"], ["type", "range", "min", "5", "max", "50", "step", "5", "id", "snakesizeInput", 1, "form-range", "form-control", 3, "ngModel", "ngModelChange"], [1, "form-group", "row", "justify-content-center"], [1, "col-sm-auto"], ["class", " btn  form-control btn-success", 3, "click", 4, "ngIf", "ngIfElse"], ["elseBlock", ""], [3, "mousetextbox", "textIn", "zindex"], [1, "container1"], ["container1", ""], [1, "container2"], ["container2", ""], [3, "p", "x", "y", "speed", "cellSide", "n", "usePreview", "snakeSet", "snakeQueue", "death", "pChange", "xChange", "yChange", "speedChange", "usePreviewChange"], [1, "resize", "resize__bottom--right", 2, "border", "3px solid red", 3, "proportionalResize", "applyClass", "targetElement", "direction", "resize", "resizeEnd"], [1, "btn", "form-control", "btn-success", 3, "click"], ["class", "btn  form-control btn-danger", 3, "click", 4, "ngIf"], [1, "btn", "form-control", "btn-danger", 3, "click"]], template: function GameComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "nav", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameComponent_Template_a_click_8_listener() { return ctx.showHelp = !ctx.showHelp; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Toggle Help");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Snake Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameComponent_Template_li_click_13_listener() { return ctx.goDraw(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Change snake");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "ol", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Snake Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "ol", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Click start-> click on snake game box then use arrow keys to control snake movements");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Slide the slider to modify respective game setting");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "At the bottom right corner of the snake game box, click and drag it to desired map size.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "li", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "You are able to change any of these three setting during the game and changes can be seen in real-time");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Change Snake");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "ol", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "The dimension of the drawing box is dependent on the map setting configured at the snake game page. i.e. size of map and snake size.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Click/Click and drag cells in the drawing box to draw the snake you want to start of with in the snake game page.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "The first cell you click would be the head of the snake.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Finally, click Save Changes -> click Snake Game. And you will notice that the snake in the game is changed");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "li", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "You cannot draw a disconnected snake.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "SPEED");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GameComponent_Template_input_ngModelChange_51_listener($event) { return ctx.speed = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "label", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Snake Size");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function GameComponent_Template_input_ngModelChange_56_listener($event) { return ctx.cellSide = $event; })("ngModelChange", function GameComponent_Template_input_ngModelChange_56_listener() { return ctx.ngAfterViewInit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](59, GameComponent_button_59_Template, 2, 0, "button", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, GameComponent_ng_template_60_Template, 1, 1, "ng-template", null, 29, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div", 31, 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 33, 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "snakegame-angular", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("death", function GameComponent_Template_snakegame_angular_death_67_listener() { return ctx.death(); })("pChange", function GameComponent_Template_snakegame_angular_pChange_67_listener($event) { return ctx.p = $event; })("xChange", function GameComponent_Template_snakegame_angular_xChange_67_listener($event) { return ctx.x = $event; })("yChange", function GameComponent_Template_snakegame_angular_yChange_67_listener($event) { return ctx.y = $event; })("speedChange", function GameComponent_Template_snakegame_angular_speedChange_67_listener($event) { return ctx.speed = $event; })("usePreviewChange", function GameComponent_Template_snakegame_angular_usePreviewChange_67_listener($event) { return ctx.usePreviewChanges($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function GameComponent_Template_div_resize_68_listener($event) { return ctx.onResizePreview($event); })("resizeEnd", function GameComponent_Template_div_resizeEnd_68_listener($event) { return ctx.onResize($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](61);
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](31, _c2, ctx.showHelp));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](33, _c3, ctx.showHelp, !ctx.showHelp));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](36, _c3, !ctx.showHelp, ctx.showHelp));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.speed);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.cellSide);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.p === "pause")("ngIfElse", _r1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mousetextbox", ctx.activate)("textIn", "" + ctx.tmpN)("zindex", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.data.width, "px")("height", ctx.data.height, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.data2.width, "px")("height", ctx.data2.height, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("p", ctx.p)("x", ctx.x)("y", ctx.y)("speed", ctx.speed)("cellSide", ctx.cellSide)("n", ctx.n)("usePreview", ctx.usePreview)("snakeSet", ctx.snakeSet)("snakeQueue", ctx.snakeQueue);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("proportionalResize", true)("applyClass", ctx.c)("targetElement", _r4)("direction", ctx.AngularResizeElementDirection.BOTTOM_RIGHT);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLink"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterLinkActive"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["RangeValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], angular_mouse_textbox__WEBPACK_IMPORTED_MODULE_7__["AngularMouseTextboxDirective"], snakegame_angular__WEBPACK_IMPORTED_MODULE_8__["SnakegameAngularComponent"], angular_resize_element__WEBPACK_IMPORTED_MODULE_9__["AngularResizeElementDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJnYW1lLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _drawsnake_drawsnake_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawsnake/drawsnake.component */ "A4JB");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game/game.component */ "jBAD");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





const routes = [
    { path: 'drawsnake', component: _drawsnake_drawsnake_component__WEBPACK_IMPORTED_MODULE_1__["DrawsnakeComponent"] },
    { path: "game", component: _game_game_component__WEBPACK_IMPORTED_MODULE_2__["GameComponent"] },
    { path: "", redirectTo: "/game", pathMatch: "full" }
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map
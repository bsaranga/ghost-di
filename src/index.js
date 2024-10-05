"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Injectable(constructor) {
    console.log(constructor);
    console.log(Reflect.getMetadata('design:paramtypes', constructor));
}
var AnotherDep = /** @class */ (function () {
    function AnotherDep() {
    }
    return AnotherDep;
}());
var Dep = /** @class */ (function () {
    function Dep(anotherDep) {
        this.anotherDep = anotherDep;
    }
    Dep = __decorate([
        Injectable,
        __metadata("design:paramtypes", [AnotherDep])
    ], Dep);
    return Dep;
}());
var dep = new Dep(new AnotherDep());

'use strict';

var test = require('tape')
var exp = require('./')

function Game() {}

function defaults(t) {
    //Check defaults
    var p = exp(new Game(), {});
    t.equals(p.cexp, 0);
    t.equals(p.minExp, 0);
    t.equals(p.cl, 1);
    t.equals(p.minLevel, 1);
    t.equals(p.maxLevel, 99);
    t.equals(p.curve(p.cl), 500);
    t.equals(p.toNext(), 100);

    t.end();
};

function inc(t) {
    //Check Exp.inc
    var p = exp(new Game(), {});
    p.inc(500);
    t.equals(p.cexp, 500);
    t.equals(p.cl, 2);
    t.equals(p.curve(p.cl), 1000);
    p.inc(500);
    t.equals(p.cexp, 1000);
    t.equals(p.cl, 3);

    t.end();
};

function dec(t) {
    var p = exp(new Game(), {canDeLevel: true});
    p.inc(1000);
    t.equals(p.cexp, 1000);
    p.dec(500);
    t.equals(p.cexp, 500);
    p.dec(1);
    t.equals(p.cexp, 499);
    t.equals(p.cl, 1);

    t.end();
}

test('defaults', defaults);
test('inc', inc);
test('dec', dec);

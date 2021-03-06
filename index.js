inherits = require("inherits");
var em = require('events').EventEmitter;

module.exports = function(game, opts) {
    return new Exp(game, opts);
}

function Exp(game, opts) {
    this.curve = opts.curve || function(cl){return (cl) * 500};
    this.minLevel = opts.minLevel || 1;
    this.maxLevel = opts.maxLevel || 99;
    this.cl = opts.startLevel || 1;
    this.canDeLevel  = opts.canDeLevel || false;

    if (this.cl != 1) {
        this.cexp = this.curve(this.cl-1);
        this.minExp = this.cexp
    }
    else {
        this.cexp = 0;
        this.minExp = 0;
    }

    this.game = game;
    this.enable();
}

inherits(Exp, em);

Exp.prototype.enable = function() {};

Exp.prototype.inc = function(v) {
    this.cexp += v;
    this.emit('exp', this.cexp);
    this.emit('expgain', v);
    this.maybeLevel();
};

Exp.prototype.dec = function(v) {
    this.cexp -= v;
    this.emit('exp', this.cexp);
    this.emit('exploss', v);
    this.maybeLevel();
};

Exp.prototype.currentLevel = function() {
	return this.cl;
};

Exp.prototype.maybeLevel = function() {
    if (this.cexp >= this.curve(this.cl)) {
        this.cl++;
        this.minExp = this.curve(this.cl-1);
        this.emit('levelup', this.cl);
    }

    if (this.canDeLevel && this.cexp < this.curve(this.cl-1)) {
        this.cl--;
        this.minExp = this.curve(this.cl-1);
        this.emit('leveldown', this.cl);
    }
};

Exp.prototype.toNext = function() {
    return this.curve(this.cl) - this.cexp;
};

Exp.prototype.percent = function() {
    return this.cexp / this.curve(this.cl) * 100.0;
};

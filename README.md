voxel-exp
=========

Simple experience point and leveling system for voxeljs.

[![Build Status](https://travis-ci.org/Jiig/voxel-exp.svg?branch=master)](https://travis-ci.org/Jiig/voxel-exp)
## How-to
Load the modules with voxel-plugins

##Options
minLevel (1)
maxLevel (99)
startLevel (1)
canDeLevel (false) - Whether or not you can lose levels

##Usage
*inc(v) - Increaes total exp
*dec(v) - Decreases total exp
*toNext() - Returns exp required till next level
*percent() - Returns percent exp of current level (ex: 80%)

Events:
* expgain - amount gained
* exploss - amount lost
* levelup - current level after gain
* leveldown - current level after lose

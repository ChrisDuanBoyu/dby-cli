'use strict';



module.exports = core

const userHome =require('user-home')
const pathExists =require('path-exists')
const pkg = require('../package.json')
const rootCheck = require('root-check')
const semver = require('semver')
const {LOWEST_NODE_VERSION} = require('./const')
const colors =require('colors')
const log = require('@dby-cli/log')
function core(){
    try {
        checkPkgVersion();
        checkNodeVersion()
        checkRoot();
        checkUserHome()
        
    } catch (error) {
        log.error(error.message)
    }
    
}


function checkUserHome(){
   if(!userHome || pathExists(userHome)){
       throw new Error(colors.red('no user home directory!'))
   }
}
function checkNodeVersion(){
    const currentVersion = process.version;

    if(!semver.gte(currentVersion,LOWEST_NODE_VERSION)){
        throw new Error(colors.red(`dby-cli need node version more than ${LOWEST_NODE_VERSION}`))
    }
     
}


function checkRoot(){
    rootCheck()

}
function checkPkgVersion(){
    log.info('cli',pkg.version)
}
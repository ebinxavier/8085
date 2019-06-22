let RAM = require('./components/ram');
const REG = require('./components/registers/general')

REG.mvi('E','gs');
// REG.mov('E','B');
// REG.mvi('A','10')
// REG.mov('B','M');
// REG.lxi('H','ffff');

REG.log();
RAM.log();
// console.log("global RAM: ",global.RAM.get(0))
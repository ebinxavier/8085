let RAM = require('./components/ram');
const REG = require('./components/registers/general')

const decoder = require('./components/decoder');

try{
    
// REG.mvi('E','gs');
// REG.mov('E','B');
// decoder.mvi('B','10');
// REG.mov('B','M');
// decoder.lxi('B','00ff');
// decoder.lxi('D','00ff');
// decoder.mov('B','M');
decoder.lxi('H','ffaa');
decoder.mvi('M',12);

decoder.lxi('H','0001');
decoder.mvi('M',34);

decoder.mvi('H','ff');
decoder.mvi('L','aa');
// decoder.shld('fffe')
decoder.ldax('H');
decoder.mvi('A',22);
decoder.lxi('B','ffff');
decoder.stax('B');

decoder.xchg();
decoder.xchg();

// decoder.lhld('0000');

// decoder.lda('00ff')
// decoder.sta('00fe')

// decoder.mov('M','B');
// decoder.mov('A','M');

REG.log();
RAM.log();
// console.log("global RAM: ",global.RAM.get(0))
}
catch(err){
    console.log(err);
}
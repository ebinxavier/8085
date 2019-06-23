const RAM = require('../../ram');
const REG = require('../../registers/general');

module.exports = { 
    
    mov(TO, FROM){ // TO = REG / M ; FROM = REG / M
        REG.validateRegister(TO);
        REG.validateRegister(FROM);
        if(TO==='M'){
            const address = REG.getHL();
            const regVal = REG.get(FROM)
            RAM.set(address,regVal);
        }
        else if(FROM==='M'){
            const address = REG.getHL();
            const memVal = RAM.get(address);
            REG.set(TO, memVal);
        }
        else {
            REG.set(TO, REG.get(FROM));
        }
    },

    mvi(TO,DATA){
        if(TO==='M'){
            const address = REG.getHL();
            RAM.set(address,DATA); 
        }
        else {
            REG.set(TO, DATA);
        }
    },

    lxi(PAIR, DATA){
        if( REG.validateRegisterPair(PAIR) && DATA.length===4){
            const higherByte = parseInt(DATA.slice(0,2),16);
            const lowerByte = parseInt(DATA.slice(2,4),16);
            switch(PAIR){
                case 'B':
                    REG.set('B',higherByte);
                    REG.set('C',lowerByte);
                    break;
                case 'D':
                    REG.set('D',higherByte);
                    REG.set('E',lowerByte);
                    break;
                case 'H':
                    REG.set('H',higherByte);
                    REG.set('L',lowerByte);
                    break;
            }
        } else {
            if(!'BDH'.includes(PAIR)){
                throw new Error('Invalid Register');
            }
            if(DATA.length!==4){
                throw new Error('Invalid Data');
            }
        }
    },

    lda(address){
        const memVal = RAM.get(address);
        REG.set('A',memVal);
    },

    sta(address){
        const regVal = REG.get('A');
        RAM.set(address,regVal);
    },

    lhld(address){
        const H = RAM.get(address);
        const L = RAM.get(address,1);
        REG.set('H',H);
        REG.set('L',L);
    },

    shld(address){
        const H = REG.get('H');
        const L = REG.get('L');
        RAM.set(address,H);
        RAM.set(address,L,1);
    },

    ldax(pair){
        REG.validateRegisterPair(pair);
        let v1,v2;
        if(pair==='B'){
            v1 = REG.get('B');
            v2 = REG.get('C');
        }
        if(pair==='D'){
            v1 = REG.get('D');
            v2 = REG.get('E');
        }
        if(pair==='H'){
            v1 = REG.get('H');
            v2 = REG.get('L');
        }
        const address = parseInt(v1.toString(16) + v2.toString(16), 16)
        const value =  RAM.get(address);
        REG.set('A',value);
    },

    stax(pair){
        REG.validateRegisterPair(pair);
        let v1,v2;
        if(pair==='B'){
            v1 = REG.get('B');
            v2 = REG.get('C');
        }
        if(pair==='D'){
            v1 = REG.get('D');
            v2 = REG.get('E');
        }
        if(pair==='H'){
            v1 = REG.get('H');
            v2 = REG.get('L');
        }
        const address = parseInt(v1.toString(16) + v2.toString(16), 16)
        const value = REG.get('A');
        RAM.set(address, value);
    },

    xchg(){
       let H =  REG.get('H');
       let L =  REG.get('L');
       REG.set('H', REG.get('D'));
       REG.set('L', REG.get('E'));
       REG.set('D', H);
       REG.set('E', L);
    }
}

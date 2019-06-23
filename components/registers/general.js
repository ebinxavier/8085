
let RAM = require('../ram');
class generalPurposeRegisters{
    constructor(){
        this.REG={
            A:0,
            B:0,
            C:0,
            D:0,
            E:0,
            H:0,
            L:0,
        }
    }

    validateRegister(reg){
        if(!'ABCDEHLM'.includes(reg) || reg.length!==1){
            throw new Error('Invalid Register');
        }
        return true;
    }

    validateRegisterPair(reg){
        if(!'BDH'.includes(reg) || reg.length!==1){
            throw new Error('Invalid Register');
        }
        return true;
    }

    process1ByteData(data){ // 1 byte
        if(data.length!==2 || parseInt(data)===NaN){
            throw new Error('Invalid Data')
        }
        return parseInt(data,16);
    }

    process2ByteData(data){
        const higherByte = data.slice(0,2);
        const lowerByte = data.slice(2,4);
        this.process1ByteData(higherByte);
        this.process1ByteData(lowerByte);
        return [parseInt(higherByte.toString(16),16),parseInt(lowerByte.toString(16),16)];
    }


    getHL(){
        let address = parseInt(this.REG.H.toString(16)+this.REG.L.toString(16), 16);
        return address;
    }

    set(reg,val){ // string ? convert from hex to decimal : assumes decimal
        this.validateRegister(reg);
        let decimal = val;
        if(typeof val ==='string'){
            decimal = this.process1ByteData(val);
        }
        this.REG[reg] = decimal;
    }

    get(reg){
        this.validateRegister(reg);
        return this.REG[reg];
    }

    log(){
        console.log('REG', this.REG);
    }
}
module.exports = new generalPurposeRegisters();
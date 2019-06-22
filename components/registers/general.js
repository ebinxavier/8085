
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
        return [parseInt(higherByte,16),parseInt(lowerByte,16)];
    }


    getHL(){
        let address = parseInt(this.REG.H+this.REG.L);
        return address;
    }

    set(reg,val){
        this.validateRegister(reg)
        this.process1ByteData(reg)
        let decimal = this.process1ByteData(val)
        this.REG[reg] = decimal;
    }

    get(reg){
        this.validateRegister(reg)
        return this.REG[reg];
    }

    log(){
        console.log('REG', this.REG);
    }

    mov(TO, FROM){ // TO = REG / M ; FROM = REG / M
        this.validateRegister(TO);
        this.validateRegister(FROM);
        if(TO==='M'){
            const address = this.getHL();
            const regVal = this.get(FROM)
            RAM.set(address,regVal);
        }
        else if(FROM==='M'){
            const address = this.getHL();
            const memVal = RAM.get(address);
            this.REG[TO] = memVal;
        }
        else {
            this.REG[TO] = this.REG[FROM];
        }
    }

    mvi(TO,DATA){
        if(TO==='M'){
            const address = this.getHL();
            RAM.set(address,DATA); 
        }
        else {
            this.set(TO, DATA);
        }
    }

    lxi(PAIR, DATA){
        if( this.validateRegisterPair(PAIR) && DATA.length===4){
            const higherByte = parseInt(DATA.slice(0,2),16);
            const lowerByte = parseInt(DATA.slice(2,4),16);
            switch(PAIR){
                case 'B':
                    this.REG['B']= higherByte;
                    this.REG['C']= lowerByte;
                    break;
                case 'D':
                    this.REG['D']= higherByte;
                    this.REG['E']= lowerByte;
                    break;
                case 'H':
                    this.REG['H']= higherByte;
                    this.REG['L']= lowerByte;
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
    }
}
module.exports = new generalPurposeRegisters();


class RAM{
    constructor(){
        this.RAM=[];
    }
    get(address, offset=0){
        let realAddress = address;
        if(typeof realAddress === 'string'){
            realAddress = parseInt(realAddress, 16);
        }
        if(realAddress+offset >= 2**16)
        throw new Error("RAM overflow.");
        
        return this.RAM[realAddress+offset];
    }
    set(address, value, offset=0){
        let realAddress = address;
        let realValue = value;
        if(typeof realAddress === 'string'){
            realAddress = parseInt(realAddress, 16);
        }
        if(typeof realValue === 'string'){
            realValue = parseInt(realValue, 16);
        }
        if(realAddress+offset >= 2**16)
        throw new Error("RAM overflow.");
        this.RAM[realAddress+offset] = realValue;
    }
    log(){
        console.log('RAM', this.RAM)
    }
}

module.exports = new RAM();
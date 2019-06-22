

class RAM{
    constructor(){
        this.RAM=[];
    }
    get(address){
        return this.RAM[address];
    }
    set(address, value){
        this.RAM[address]=value;
    }
    log(){
        console.log('RAM', this.RAM)
    }
}

module.exports = new RAM();
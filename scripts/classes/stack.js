class Stack{
    constructor(){
        this.arr = [];
    }

    push(obj){
        this.arr.push(obj);
    }

    pop(obj){
        var poppedObj = this.arr.pop(obj);
        return poppedObj;
    }

    length(){
        return this.arr.length;
    }

    clear(){
        this.arr = [];
    }
}
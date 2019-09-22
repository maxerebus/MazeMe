class Stack {
    constructor() {
        this.arr = [];
    }

    push(obj) {
        this.arr.push(obj);
    }

    pop() {
        var poppedObj = this.arr.pop();
        return poppedObj;
    }

    length() {
        return this.arr.length;
    }

    clear() {
        this.arr = [];
    }
    forEach(func) {
        this.arr.forEach(function(element) {
            func(element);
        });
    }
}

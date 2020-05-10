import './index.less';
class Father {
    constructor(name) {
        this.name = name;
    }
}

class Son extends Father {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}
const D = new Son('Fly', 15);
console.log('D', D);
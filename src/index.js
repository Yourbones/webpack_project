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

document.getElementsByTagName('button')[0].onclick = function() {
    import('../public/js/handle.js').then(fn => fn.default());
}

// 添加这段代码，避免了更改代码整个页面都刷新
if(module && module.hot) {
    module.hot.accept();
}

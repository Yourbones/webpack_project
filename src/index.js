import './index.less';

// 添加这段代码，避免了更改代码整个页面都刷新
if (module && module.hot) {
    module.hot.accept();
}

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

document.getElementsByTagName('button')[0].onclick = function () {
    import('../public/js/handle.js').then(fn => fn.default());
}

fetch("/user")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

fetch("/login/account", {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: "admin",
        password: "888888"
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
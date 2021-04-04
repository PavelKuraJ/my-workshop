console.log('my-workshop');

const application = document.getElementById('app');

const config ={
    menu: {
        href: '/menu',
        text: 'Главная',
        open: menuPage,
    },
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
        open: signupPage,
    },
    login: {
        href: '/login',
        text: 'Авторизоваться',
        open: loginPage,
    },
    profile: {
        href: '/profile',
        text: 'Профиль',
        open: profilePage,
    },
    about: {
        href: '/about',
        text: 'Контакты',
    },
}

// функция, вызывающее меню
function menuPage() {
    application.innerHTML = '';

    Object.keys(config).map((menuKey) => {
        const {href, text} = config[menuKey];
    
        const menuItem = document.createElement('a');
        menuItem.href = href;     
        menuItem.textContent = text;
        menuItem.dataset.section = menuKey;     // 
    
        return menuItem;
    }).forEach((element) => {
        application.appendChild(element);
    });
}

// функци, которая делает запрос от сервера
// ajax - Asynchronous Javascript and XML
function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}



/* maybe, later

const button = document.querySelector('#button');
const handler = () => {
    console.log('click2');

// remote click after one time
button.removeEventListener('click', handler);
}

button.addEventListener('click', handler);

button.addEventListener('click', () => {
            console.log('click3');
})      */
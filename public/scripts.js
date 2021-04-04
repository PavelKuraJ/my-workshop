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

// функция, которая будет вызывать наше меню
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
console.log('my-workshop');

const application = document.getElementById('app');

const config = {
    menu: {
        href: '/menu',
        text: 'Главная',
    },
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
    },
    login: {
        href: '/login',
        text: 'Авторизоваться',
    },
    profile: {
        href: '/profile',
        text: 'Профиль',
    },
    about: {
        href: '/about',
        text: 'Контакты',
    },
};

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
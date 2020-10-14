const button = document.querySelector('#button');
const handler = () => {
    console.log('click2');

// remote click after one time
button.removeEventListener('click', handler);
}

button.addEventListener('click', handler);

button.addEventListener('click', () => {
            console.log('click3');
})
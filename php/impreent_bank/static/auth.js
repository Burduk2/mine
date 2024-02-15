document.querySelector('.show-pwd-wrapper').onclick = () => {
    const a = document.querySelector('.show-pwd-wrapper a');
    const inp = document.querySelector('#auth-pwd-inp');
    a.classList.toggle('checked');
    a.classList.contains('checked') ? inp.setAttribute('type', 'text') : inp.setAttribute('type', 'password');
}
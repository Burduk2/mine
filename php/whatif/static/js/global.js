
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
} else {
    document.querySelector('nav .theme i').classList.replace('fa-sun', 'fa-moon');
    document.body.classList.add('light-sheme');
}

function toggleTheme() {
    const btn = document.querySelector('nav .theme i');
    if (btn.classList.contains('fa-sun')) {
        document.body.classList.replace('dark-theme', 'light-theme');
        btn.classList.replace('fa-sun', 'fa-moon')
    } else {
        document.body.classList.replace('light-theme', 'dark-theme');
        btn.classList.replace('fa-moon', 'fa-sun');
    }
}


const modalsStyles = document.createElement('style');
modalsStyles.innerHTML = `[m-wrapper]{width:100%;max-width:100%;height:100vh;position:fixed;top:0;left:0;display:flex;justify-content:center;align-items:center;display:none;z-index:99999;animation:modalS-m-fade-in 50ms forwards;background-color:#0005}[m-wrapper][m-open]{display:flex}[m-name]{background-color:#fff;border-radius:10px;padding:10px;width:400px;max-width:90%;max-height:90svh}@keyframes modalS-m-fade-in{from{opacity:.1}to{opacity:1}}`;
document.head.insertAdjacentElement('afterbegin', modalsStyles);

document.querySelectorAll(`[m-name]`).forEach(modal => {
    const bd = document.createElement('div');
    modal.insertAdjacentElement('afterend', bd);
    bd.setAttribute('m-wrapper', '');
    const bdStyle = modal.getAttribute('m-backdrop');
    if (bdStyle) {
        const bdStyleType = bdStyle.trim().charAt(0);
        bdStyleType === '.' ? bd.classList.add(bdStyle.slice(1)) : bdStyleType === '#' ? bd.id = bdStyle.slice(1) 
            : console.warn(`ModalS: Specify "${modal.getAttribute('m-name')}" modal's backdrop style using "." or "#".`);
    }
    bd.appendChild(modal);
});

document.querySelectorAll(`[m-touch]`).forEach(btn => {
    btn.addEventListener('click', () => {
        let modalWrapper;
        const targetModal = btn.getAttribute('m-touch');
        try { modalWrapper = document.querySelector(`[m-name="${targetModal}"]`).parentElement } 
        catch {
            console.error(`ModalS: m-touch="${targetModal}" attribute does not match any "m-name" attributes`);
            return;
        }
        
        modalWrapper.toggleAttribute('m-open');
        if (modalWrapper.hasAttribute('m-open')) {
            function addQueryParam(url, paramName, paramValue) {
                const separator = url.includes('?') ? '&' : '?';
                const hashIndex = url.indexOf('#');
                const baseUrl = hashIndex !== -1 ? url.substring(0, hashIndex) : url;
                const hashPart = hashIndex !== -1 ? url.substring(hashIndex) : '';
                return `${baseUrl}${separator}${paramName}=${encodeURIComponent(paramValue)}${hashPart}`;
            }
            
            const originalUrl = window.location.href;
            const updatedUrl = addQueryParam(originalUrl, 'm_name', targetModal);
            window.history.pushState({ path: updatedUrl }, '', updatedUrl);
        } else {
            function removeQueryParam(url, paramName) {
                const parsedUrl = new URL(url);
                parsedUrl.searchParams.delete(paramName);
                return parsedUrl.toString();
            }
            const updatedUrl = removeQueryParam(window.location.href, 'm_name');
            window.history.pushState({ path:  updatedUrl }, '', updatedUrl);
        }
    });
});

document.querySelectorAll('[m-wrapper]').forEach(bd => {
    bd.addEventListener('click', e => {
        if (e.target === bd) {
            bd.toggleAttribute('m-open')
            function removeQueryParam(url, paramName) {
                const parsedUrl = new URL(url);
                parsedUrl.searchParams.delete(paramName);
                return parsedUrl.toString();
            }
            const updatedUrl = removeQueryParam(window.location.href, 'm_name');
            window.history.pushState({ path:  updatedUrl }, '', updatedUrl);
        }
    });
});

if (new URLSearchParams(window.location.search).get('m_name')) {
    const modal = document.querySelector(`[m-name="${new URLSearchParams(window.location.search).get('m_name')}"`);
    modal ? modal.parentElement.setAttribute('m-open', '') : console.warn(`ModalS: Modal specified in query param was not found.`);
}
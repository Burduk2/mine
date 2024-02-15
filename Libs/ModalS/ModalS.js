window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('popstate', showModalFromQueryParam);
    
    let prefOverflow = window.getComputedStyle(document.body).overflowY;

    // insert default styles
    const styles = document.createElement('style');
    styles.innerHTML = '[m-wrapper-for]{width:100%;max-width:100%;height:100vh;position:fixed;top:0;left:0;justify-content:center;align-items:center;display:none;z-index:99999;animation:ModalS-m-fade-in 50ms forwards;background-color:#0008}[m-wrapper-for][m-opened]{display:flex}[m-name]{background-color:#fff;border-radius:10px;padding:10px;width:400px;max-width:85%;max-height:90vh}@keyframes ModalS-m-fade-in{from{opacity:.1}to{opacity:1}}';
    styles.setAttribute('m-default-styles', '');
    document.head.insertAdjacentElement('afterbegin', styles);

    function showModalFromQueryParam() {
        const modalName = new URLSearchParams(window.location.search).get('m_name');
        if (modalName) {
            document.querySelector(`[m-name="${modalName}"`) ? openModal(modalName) 
            : console.warn(`ModalS: Modal specified in query param was not found.`);
        }
    }
    function closeModal(modalName) {
        const modal = document.querySelector(`[m-name="${modalName}"]`);
        modal.parentElement.removeAttribute('m-opened');
        function removeQueryParam(url, paramName) {
            const parsedUrl = new URL(url);
            parsedUrl.searchParams.delete(paramName);
            return parsedUrl.toString();
        }
        const updatedUrl = removeQueryParam(window.location.href, 'm_name');
        window.history.pushState({ path:  updatedUrl }, '', updatedUrl);
        document.body.style.overflowY = prefOverflow;
    }
    function openModal(modalName) {
        const modal = document.querySelector(`[m-name="${modalName}"]`)
        modal.parentElement.setAttribute('m-opened', '');
        function addQueryParam(url, paramName, paramValue) {
            const originalUrl = url.split('#');
            const queryString = originalUrl[0].split('?')[1] || '';
            const queryParams = new URLSearchParams(queryString);
            const hashPart = originalUrl[1] ? `#${originalUrl[1]}` : ''; 
            const baseUrl = originalUrl[0].split('?')[0];
            
            queryParams.has(paramName) ?
                queryParams.set(paramName, paramValue) : queryParams.append(paramName, paramValue);

            return `${baseUrl}${queryParams.toString() ? `?${queryParams.toString()}` : ''}${hashPart}`;
        }
        const updatedUrl = addQueryParam(window.location.href, 'm_name', modal.getAttribute('m-name'));
        window.history.pushState({ path: updatedUrl }, '', updatedUrl);

        prefOverflow = window.getComputedStyle(document.body).overflowY;
        document.body.style.overflowY = 'hidden';
    }

    // create wrappers for modals
    document.querySelectorAll('[m-name]').forEach(modal => {
        const bd = document.createElement('div');
        modal.insertAdjacentElement('afterend', bd);
        bd.setAttribute('m-wrapper-for', modal.getAttribute('m-name'));
        const bdStyle = modal.getAttribute('m-backdrop');
        if (bdStyle) {
            const bdCustomization = bdStyle.split(' ');
            for (const item of bdCustomization) {
                const itemType = item.charAt(0);
                itemType === '.' ? bd.classList.add(item.slice(1)) : itemType === '#' ? bd.id = item.slice(1) 
                : console.warn(`ModalS: Invalid style: "${item}". Specify "${modal.getAttribute('m-name')}" modal's backdrop style using "." or "#".`);
            }
        }
        bd.appendChild(modal);
    });
    
    // click event listeners for all types of click targets
    document.querySelectorAll('[m-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalName = btn.getAttribute('m-toggle');
            const modalWrapper = document.querySelector(`[m-name="${modalName}"]`).parentElement;
            modalWrapper.hasAttribute('m-opened') ? closeModal(modalName) : openModal(modalName);
        });
    });
    document.querySelectorAll('[m-open]').forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(btn.getAttribute('m-open'));
        });
    });
    document.querySelectorAll('[m-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.getAttribute('m-close')) 
        });
    });
    document.querySelectorAll('[m-wrapper-for]').forEach(bd => {
        bd.addEventListener('click', e => {
            if (e.target === bd) closeModal(bd.getAttribute('m-wrapper-for'));
        });
    });
    
    showModalFromQueryParam();
});
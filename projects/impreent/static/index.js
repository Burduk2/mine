const langMode = document.documentElement.getAttribute('lang');

function resetOrderContactTries() {
    const lastResetTime = localStorage.getItem('orderContactTriesResetTime');
    const currentTime = Date.now();

    if (!lastResetTime || (currentTime - lastResetTime > 60000 * 60 * 24)) {
        localStorage.setItem('orderContactTries', '0');
        localStorage.setItem('orderContactTriesResetTime', currentTime);
        console.log('reset');
    } else {
        console.log('not yet');
    }
    setTimeout(resetOrderContactTries, 60000 * 60 * 24);
}
resetOrderContactTries();

document.querySelectorAll('.nav-lang-select a').forEach(a => {
    a.addEventListener('click', () => {
        if (a.textContent.toLowerCase() === 'en') {
            localStorage.setItem('langPref', 'en');
        } else {
            localStorage.setItem('langPref', 'ua');
        }
    });
});

const carouselSpans = document.querySelectorAll('span.ws-carousel');
function carouselSpanType(i = 0, j = 0) {
    const allWords = {
        en: ['Website', 'Landing Page', 'Online Store', 'Portfolio'],
        ua: ['Вебсайт', 'Лендінг', 'Веб-Магазин', 'Персональний Сайт']
    }

    const words = allWords[langMode];

    if (i >= words.length) {i = 0}

    if (j >= words[i].length) {
        setTimeout(() => {
            clearText();
            carouselSpanType(i + 1, 0);
        }, 3000);
        return;
    }

    carouselSpans.forEach(span => {span.textContent += words[i][j]});
    j++;

    setTimeout(() => {
        carouselSpanType(i, j);
    }, 100);
}

function clearText() {carouselSpans.forEach(span => {span.textContent = ''})}
carouselSpanType();


const addFeatureBtns = document.querySelectorAll('.section-order .plan .includes .item.c');
const deliveryOut = document.querySelector('.section-order .plan .includes .item .delivery')
const priceOut = document.querySelector('.section-order .plan.custom .price span');
const hourlyRate = 22;
const pageCost = hourlyRate * 2;
const projectDailyRate = hourlyRate * 6;
let pageAmt = 1;

const pageAmtInp = document.querySelector('.section-order .plan .includes .item input');
localStorage.setItem('TBT', '123');
localStorage.setItem('TCBT', '123');

pageAmtInp.addEventListener('input', () => {
    pageAmtInp.value = pageAmtInp.value.replace(/\D/g, '');
    if (pageAmtInp.value.charAt(0) === '0') {
        pageAmtInp.value = '';
    }
    pageAmtInp.style.width = pageAmtInp.value.length + 'ch';
});

pageAmtInp.addEventListener('blur', () => {
    pageAmtInp.value === '' ? pageAmtInp.value = '1' : pageAmt=pageAmt;
    pageAmt = parseInt(pageAmtInp.value);
    
    let total = 0;
    addFeatureBtns.forEach(btn => {
        const def = btn.querySelector('.def').classList[2].substring(3);
        if (btn.classList.contains('active')) {
            if (def === 'mobile-screen-button') {
                total += pageAmt * pageCost / 2;
            } else if (def === 'envelope') {
                total += (hourlyRate * 3 + pageAmt * pageCost / 3);
            } else if (def === 'cart-shopping') {
                total += (hourlyRate * 7 + pageAmt * pageCost / 3.1);
            } else if (def === 'server') {
                total += pageAmt * pageCost * .8;
            } else if (def === 'hashtag') {
                total += hourlyRate / 2.5;
            } else if (def === 'fan') {
                total += pageCost * pageAmt / 1.5;
            } else if (def === 'credit-card') {
                total += 15 * hourlyRate * .9;
            } else if (def === 'arrow-up-from-bracket') {
                total += (hourlyRate * 10 + pageAmt * pageCost / 3);
            } else if (def === 'magnifying-glass') {
                total += hourlyRate + pageAmt * pageCost;
            } else if (def === 'cube') {
                total += (pageCost ** 2 * hourlyRate * .1 + pageAmt * pageCost);
            }
        }
    });

    priceOut.textContent = Math.ceil(pageCost * pageAmt * 2 + total);
    if (parseInt(priceOut.textContent) / (projectDailyRate) < 3) {
        deliveryOut.textContent = 3;
    } else {
        deliveryOut.textContent = Math.floor(parseInt(priceOut.textContent) / (projectDailyRate));
    }
});

addFeatureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const def = btn.querySelector('.def').classList[2].substring(3);
        const out = document.querySelector('.section-order .plan.custom .price span');
        const aod = btn.querySelector('.aod');
        let total = 0;
        let del = -1;

        if (aod.classList.contains('fa-plus')) {
            del = 1;
            aod.classList.replace('fa-plus', 'fa-trash-can');
        } else {
            aod.classList.replace('fa-trash-can', 'fa-plus');
        }

        if (def === 'mobile-screen-button') {
            total += pageAmt * pageCost / 2 * del;
        } else if (def === 'envelope') {
            total += (hourlyRate * 3 + pageAmt * pageCost / 3) * del;
        } else if (def === 'cart-shopping') {
            total += (hourlyRate * 7 + pageAmt * pageCost / 3.1) * del;
        } else if (def === 'server') {
            total += pageAmt * pageCost * .8 * del;
        } else if (def === 'hashtag') {
            total += hourlyRate / 2.5 * del;
        } else if (def === 'fan') {
            total += pageCost * pageAmt / 1.5 * del;
        } else if (def === 'credit-card') {
            total += 15 * hourlyRate * .9 * del;
        } else if (def === 'arrow-up-from-bracket') {
            total += (hourlyRate * 10 + pageAmt * pageCost / 3) * del;
        } else if (def === 'magnifying-glass') {
            total += (hourlyRate + pageAmt * pageCost) * del;
        } else if (def === 'cube') {
            total += (pageCost ** 2 * hourlyRate * .1 + pageAmt * pageCost) * del;
        }

        total < 0 ? total = Math.floor(total) : total = Math.ceil(total); 
        const priceChangeOut = document.querySelector('.section-order .plan .price em');
        total > 0 ? totalPriceChange = '+' + total : totalPriceChange=total;
        total === 0 ? totalPriceChange = "+?" : total=total;
        priceChangeOut.textContent = totalPriceChange;
        
        priceChangeOut.style.animation = 'fade-in-out 1s forwards';
        setTimeout(() => {priceChangeOut.style.animation = ''}, 1000);

        out.textContent = parseInt(out.textContent) + total;
        if (parseInt(out.textContent) / (projectDailyRate) < 3) {
            deliveryOut.textContent = 3;
        } else {
            deliveryOut.textContent = Math.floor(parseInt(out.textContent) / (projectDailyRate));
        }
        btn.classList.toggle('active');
    });
});


const cctRadioInps = document.querySelectorAll('dialog.order .radio-input');



cctRadioInps.forEach(btn => {

    btn.addEventListener('click', () => {

        if (btn.classList.contains('checked')) {return}



        cctRadioInps.forEach(b => {

            b.classList.toggle('checked');

        });



        btn.parentElement.parentElement.querySelectorAll('.cct-inp').forEach(inp => {

            inp.setAttribute('disabled', 'true');

            inp.removeAttribute('required');

        });

        btn.parentElement.querySelector('.cct-inp').setAttribute('required', 'true');
        btn.parentElement.querySelector('.cct-inp').removeAttribute('disabled');
    });
});

const orderForm = document.querySelector('dialog.order form');
orderForm.email.value = localStorage.getItem('orderEmail');
orderForm.name.value = localStorage.getItem('orderName');
if (localStorage.getItem('wsPurpose')) {
    orderForm.querySelector('select').value = localStorage.getItem('wsPurpose');
}

orderForm.querySelector('textarea').value = localStorage.getItem('orderComment');
orderForm.querySelectorAll('.cct-inp').forEach(inp => {
    inp.value = localStorage.getItem('orderCct')
});

orderForm.addEventListener('submit', e => {
    e.preventDefault();
    if (parseInt(localStorage.getItem('orderContactTries')) >= 4) {
        console.warn('You\'ve reached your daily Contact/Order limit: 4/4');
        orderForm.querySelector('.limit-warn').style.display = 'block';
        return;
    }

    let crrOrderContactTries = parseInt(localStorage.getItem('orderContactTries'));
    if (!crrOrderContactTries) {crrOrderContactTries = 0}
    localStorage.setItem('orderContactTries', crrOrderContactTries + 1, 1);

    if (orderForm.dataset.contact) {
        const ltx = document.querySelector('dialog.order-thx');
        ltx.classList.add('contact');
        if (langMode === 'en') {
            ltx.querySelector('.content-wrapper h1').innerHTML = 'Thanks for contacting!\
            <i class="fas fa-heart fa-beat" style="color: red"></i>';
        } else if (langMode === 'ua') {
            ltx.querySelector('.content-wrapper h1').innerHTML = 'Дякую за контактування!\
            <i class="fas fa-heart fa-beat" style="color: red"></i>';
        }
        let cct = '';
        cctRadioInps.forEach(inp => {
            if (inp.classList.contains('checked')) {
                cct = inp.parentElement.querySelector('.cct-inp').value;
            }
        });

        const msg = `
ℹ *Contact* ℹ

✏ *Subject:*
_${orderForm.querySelector('textarea').value}_

👤 *CONTACTER*
Name: \`${orderForm.name.value}\`
Contact: \`${cct}\`
Email: \`${orderForm.email.value}\`
        `;

        // const chatId = '1773718260';
        const chatId = '-1002093323485'
        const apiUrl = `https://api.telegram.org/bot${localStorage.getItem('TCBT')}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`;
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        document.querySelector('dialog.order').close();
        ltx.showModal();
        return;
    } else {
        const ltx = document.querySelector('dialog.order-thx');
        if (langMode === 'en') {
            ltx.querySelector('.content-wrapper h1').innerHTML = 'Thanks for ordering!\
            <i class="fas fa-heart fa-beat" style="color: red"></i>';
        } else if (langMode === 'ua') {
            ltx.querySelector('.content-wrapper h1').innerHTML = 'Дякую за замовлення!\
            <i class="fas fa-heart fa-beat" style="color: red"></i>';
        }
    }

    const plan = orderForm.dataset.plan;
    const price = orderForm.dataset.price;
    const wsPurpose = orderForm.querySelector('select').value;
    let comment = orderForm.querySelector('textarea').value;
    let inc = [];
    let incOut = '';
    let cct = '';
    cctRadioInps.forEach(inp => {
        if (inp.classList.contains('checked')) {
            cct = inp.parentElement.querySelector('.cct-inp').value;
        }
    });

    if (orderForm.querySelector('.cbox').checked) {
        localStorage.setItem('orderEmail', orderForm.email.value);
        localStorage.setItem('orderName', orderForm.name.value);
        localStorage.setItem('wsPurpose', wsPurpose);
        localStorage.setItem('orderComment', comment);
        localStorage.setItem('orderCct', cct);
    }

    if (plan === 'Custom') {
        orderForm.parentElement.querySelector('.includes').querySelectorAll('.item').forEach(item => {
            if (!item.classList.contains('c')) {
                inc.push(item.textContent.trim());
            }

            if (item.classList.contains('c') && item.classList.contains('active')) {
                inc.push(item.textContent.trim());
            }
        });

        for(const item of inc) {
            incOut += '✓ ' + item + `
`;
        }
    } else {
        orderForm.parentElement.querySelector('.includes').querySelectorAll('.item').forEach(item => {
            inc.push(item.textContent.trim());
        });

        for(const item of inc) {
            incOut += '✓ ' + item + `
`;
        }
    }
    if (comment === '') {comment = 'None.'}

    const msg = `
⚡ *${plan} Plan $${price}* ⚡
${incOut}
🌎 *Website:*
_${wsPurpose}_

✏ *Comment:*
_${comment}_

👤 *ORDERER*
Name: \`${orderForm.name.value}\`
Contact: \`${cct}\`
Email: \`${orderForm.email.value}\`
    `;

    // const chatId = '1773718260';
    const chatId = '-1002093323485'
    const apiUrl = `https://api.telegram.org/bot${localStorage.getItem('TBT')}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}&parse_mode=Markdown`;
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    document.querySelector('dialog.order').close();
    document.querySelector('dialog.order-thx').showModal();
}); 


document.querySelectorAll('[data-ltx]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        if (navigator.userAgent.indexOf("Win") !== -1) {
            document.body.style.paddingRight = '17px';
        }

        if (btn.dataset.ltx === 'contact') {
            const ltx = document.querySelector('dialog.order');
            ltx.classList.add('contact');

            if (langMode === 'en') {
                ltx.querySelector('.top-menu h1').textContent = 'Contact';
                ltx.querySelector('.title').textContent = 'Let\'s start our conversation!';
                ltx.querySelector('.comm-label').textContent = 'subject';
                ltx.querySelector('textarea').placeholder = 'What\'s the matter?';
            } else if (langMode === 'ua') {
                ltx.querySelector('.top-menu h1').textContent = 'Контактувати';
                ltx.querySelector('.title').textContent = 'Розпочнімо нашу розмову!';
                ltx.querySelector('.comm-label').textContent = 'тема';
                ltx.querySelector('textarea').placeholder = 'Що тебе турбує?';
            }
            
            ltx.querySelector('textarea').value = '';
            ltx.querySelector('select').removeAttribute('required');
            ltx.querySelector('textarea').setAttribute('required', 'true');
            ltx.querySelector('textarea').setAttribute('maxlength', '700');
            ltx.querySelector('textarea').setAttribute('minlength', '50');
            orderForm.dataset.contact = 'true';
            ltx.showModal();
            return;
        }

        const ltx = document.querySelector(`dialog.${btn.dataset.ltx}`);
        ltx.showModal(); 

        if (btn.dataset.ltx === 'order') {
            if (langMode === 'en') {
                ltx.querySelector('.top-menu h1').textContent = 'Order';
                ltx.querySelector('.title').textContent = btn.dataset.plan + ' Plan';
            } else if (langMode === 'ua') {
                ltx.querySelector('.top-menu h1').textContent = 'Замовити';
                ltx.querySelector('.title').textContent = btn.dataset.plan + ' План';
            }
            ltx.querySelector('select').setAttribute('required', 'true');

            orderForm.setAttribute('data-plan', btn.dataset.plan);
            orderForm.setAttribute('data-price', btn.parentElement.querySelector('.price span').textContent)
            ltx.querySelector('.includes').innerHTML = btn.parentElement.querySelector('.includes').innerHTML;
            if (btn.parentElement.querySelector('.includes .item input')) {
                const inpReplacement = document.createElement('span');
                inpReplacement.textContent = btn.parentElement.querySelector('.includes .item input').value;
                ltx.querySelector('.includes .item input').replaceWith(inpReplacement);
            }
        }
    });
});

document.querySelectorAll('[data-closeltx]').forEach(btn => {
    btn.addEventListener('click', () => {
        const ltx = document.querySelector(`dialog.${btn.dataset.closeltx}`);
        ltx.style.animation = 'ltx-fade-out 100ms forwards';
        setTimeout(() => {
            ltx.style.animation = 'ltx-fade-in 200ms forwards';
            ltx.close();
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0';
        }, 210);

        if (btn.parentElement.parentElement.classList.contains('contact')) {
            setTimeout(() => {
                ltx.classList.remove('contact');
                const ltx1 = document.querySelector('dialog.order');
                const ltx2 = document.querySelector('dialog.order-thx');
                ltx1.classList.remove('contact');
                ltx1.querySelector('.title').textContent = '';
                ltx1.querySelector('textarea').value = localStorage.getItem('orderComment');
                ltx1.querySelector('textarea').removeAttribute('required');
                ltx1.querySelector('textarea').removeAttribute('minlength');
                ltx1.querySelector('textarea').setAttribute('maxlength', '300');
                orderForm.removeAttribute('data-contact');
                ltx2.classList.remove('contact');

                if (langMode === 'en') {
                    ltx1.querySelector('.comm-label').textContent = 'HAVE ANYTHING ELSE TO TELL?';
                    ltx1.querySelector('textarea').placeholder = 'Special requests, comments...';
                    ltx2.querySelector('.content-wrapper h1').innerHTML = 'Thanks for ordering!\
                        <i class="fas fa-heart fa-beat" style="color: red"></i>'
                    ltx2.querySelector('p').textContent = 'We will contact you soon. Max response time - 8 hours';
                } else if (langMode === 'ua') {
                    ltx1.querySelector('.comm-label').textContent = 'Хочеш залишити якесь повідомлення?';
                    ltx1.querySelector('textarea').placeholder = 'Особливі прохання, коментарі...';
                    ltx2.querySelector('.content-wrapper h1').innerHTML = 'Дякую за замовлення!\
                        <i class="fas fa-heart fa-beat" style="color: red"></i>'
                }
                
            }, 210);
        }
    });
});
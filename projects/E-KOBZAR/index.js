const body = document.querySelector('body');
const textContainer = document.getElementById("text-container");
const wholePoem = document.querySelector('.whole-poem');
const poemH1 = wholePoem.querySelector('.poem-h1');
const poemH3 = wholePoem.querySelector('.poem-h3');
const searchInp = document.querySelector('#search-inp');

function setCols() {
    // var cols = window.innerWidth / 350;
    // textContainer.style.columnCount = Math.floor(cols);
} setCols ();
window.addEventListener('resize', setCols);

searchInp.addEventListener('input', () => {
    const searchVal = searchInp.value.toLowerCase();
    const textBtns = Array.from(document.querySelectorAll('.title-btn'));
    const blanks = document.querySelectorAll('.blank-text');

    blanks.forEach(blank => {
        blank.style.display = 'none';
    });

    textBtns.forEach(btn => {
        const btnText = btn.textContent.toLowerCase();
        if (btnText.includes(searchVal)) {
            btn.style.display = 'block';
            blanks.forEach(blank => {
                if (blank.textContent.toLowerCase() === btnText.charAt(0)) {
                    blank.style.display = 'block';
                }
            });
        } else {
            btn.style.display = 'none';
        }
    });
});

document.addEventListener("keydown", function(event) {
    if (event.key === '/') {
        event.preventDefault();
        searchInp.focus(); 
    }
});


for (var key in writings) {
    if (writings.hasOwnProperty(key) && key.trim() !== '' && writings[key]) {
        const newText = document.createElement('button')
        newText.classList.add('title-btn');
        newText.innerHTML = key;
            
        textContainer.appendChild(newText);
        var texts = Array.from(document.querySelectorAll('.title-btn'));

        // Sort the divs based on the text content of the h3 element
        texts.sort(function(a, b) {
            var titleA = a.textContent.toLowerCase();
            var titleB = b.textContent.toLowerCase();
            return titleA.localeCompare(titleB);
        });
        
        newText.addEventListener('click', function() {
            searchInp.value = '';

            function addQueryParam(url, paramName, paramValue) {
                const separator = url.includes('?') ? '&' : '?';
                const hashIndex = url.indexOf('#');
                const baseUrl = hashIndex !== -1 ? url.substring(0, hashIndex) : url;
                const hashPart = hashIndex !== -1 ? url.substring(hashIndex) : '';
                const updatedUrl = `${baseUrl}${separator}${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue)}${hashPart}`;
                return updatedUrl;
            }
            
            const textId = newText.getAttribute('data-id');
            const originalUrl = window.location.href;
            const paramName = "w";
            const paramValue = textId;
            
            const updatedUrl = addQueryParam(originalUrl, paramName, paramValue);
            window.history.pushState({ path: updatedUrl }, '', updatedUrl);

            displayThePoem(textId);
        });

        textContainer.innerHTML = '';
        texts.forEach(function(div) {
            textContainer.appendChild(div);
        });
    }
}

const textElements = textContainer.querySelectorAll('.title-btn');

const grouppedTitleBtns = {}; 
textElements.forEach(btn => {
    const firstChar = btn.textContent.charAt(0).toLowerCase();

    if (!grouppedTitleBtns[firstChar]) {
      grouppedTitleBtns[firstChar] = document.createElement('div');
      textContainer.appendChild(grouppedTitleBtns[firstChar]);
    }

    grouppedTitleBtns[firstChar].appendChild(btn);
});

const alphabet = 'АБВГДЄЗІКЛМНОПРСТУХЦЧШЮЯx';

// Iterate through each letter in the alphabet
for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];

    // Iterate through the div elements
    for (let j = 0; j < textElements.length; j++) {
        const title = textElements[j];
        const blank = document.createElement('h1');
        blank.classList.add('blank-text');
        blank.id = 'blank' + j;
        title.dataset.id = j;

        if (title.textContent.trim().startsWith(letter) && letter !== 'x') {
            blank.innerHTML = letter;
            title.insertAdjacentElement('beforebegin', blank);
            break;
        
        } else if (title.textContent.trim().startsWith('x')) {
            blank.style.fontFamily = '"Courier New", Courier, monospace;'
            blank.innerHTML = 'i';
            title.insertAdjacentElement('beforebegin', blank);
            break;
        }
    }
}


const lightboxes = document.querySelectorAll('.lightbox');
lightboxes.forEach(ltBox => {
    ltBox.querySelectorAll('*').forEach(x => x.classList.add('lt-child'));
    ltBox.querySelector('.close-btn').classList.remove('lt-child');
    ltBox.querySelector('.close-btn i').classList.remove('lt-child');

    ltBox.addEventListener('click', function (e) {
    const clickedElm = e.target;
        if (clickedElm.classList.contains('lt-child')) { return; }

        ltBox.classList.toggle('active');
        body.style.overflow = 'auto'; 
        body.style.paddingRight = '0';
        poemH1.innerHTML = '';
        poemH3.innerHTML = '';

        function removeQueryParam(url, paramName) {
            const parsedUrl = new URL(url);
            parsedUrl.searchParams.delete(paramName);
            return parsedUrl.toString();
        }
        
        const originalUrl = window.location.href;
        const paramNameToRemove = "w";
        
        const updatedUrl = removeQueryParam(originalUrl, paramNameToRemove);
        window.history.pushState({ path:  updatedUrl}, '', updatedUrl);
    });
});


function displayThePoem(id) {
    textContainer.querySelectorAll('.title-btn').forEach(btn => {
        btn.style.display = 'block';
    });

    textContainer.querySelectorAll('.blank-text').forEach(blank => {
        blank.style.display = 'block';
    });

    setCols();

    id = `${id}`;
    const title = textContainer.querySelector(`[data-id="${id}"]`).innerHTML;
    if (title) {
        wholePoem.classList.toggle('active');
        wholePoem.scrollTop = '990000px';
        body.style.overflow = 'hidden';
        if (navigator.platform.indexOf('Win') !== -1) {body.style.paddingRight = '17px';}
        poemH1.innerHTML = title;
        const currentText = Object.entries(writings).find(([key]) => key === poemH1.innerHTML)
        poemH3.innerHTML = currentText[1];          
    }
} 

const queryParams = new URLSearchParams(window.location.search);
const wQueryParam = queryParams.get('w'); 
if (wQueryParam) {displayThePoem(wQueryParam)}
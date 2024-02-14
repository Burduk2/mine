document.addEventListener('DOMContentLoaded', function() {
    history.replaceState({}, '', '/');
});

window.addEventListener('load', () => {
    document.querySelector('.loading-page').style.display = 'none';
});

document.querySelector('.comparing-form').addEventListener('submit', (e) => {
    if (document.querySelector('.comparing-form .comparing-inps input:first-child').value === 
        document.querySelector('.comparing-form .comparing-inps input:last-child').value) {
            
        e.preventDefault();
        alert('Keywords can not be the same!');
        exit();
    }

    const load = document.querySelector('.loading-page');
    load.style.display = 'flex';

}); 

const sampleComparingWords = [
    ['iPhone', 'Samsung', 'Nokia'],
    ['MacBook', 'Lenovo', 'Asus', 'HP', 'Dell', 'Acer'],
    ['BMW', 'Mercedes', 'Audi', 'Volkswagen'],
    ['Coca-Cola', 'Pepsi', 'Fanta', 'Sprite', '7up'],
    ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'],
    ['PlayStation', 'Xbox', 'Nintendo'],
    ['Google', 'Firefox', 'Bing', 'Yahoo'],
    ['Facebook', 'Instagram', 'Twitter', 'YouTube', 'TikTok'],
    ['Netflix', 'Hulu', 'Megogo', 'Disney+'],
    ['Spotify', 'Apple Music', 'SoundCloud', 'YT Music'],
    ['Snapchat', 'WhatsApp', 'Telegram', 'Skype'],
    ['Apple', 'Microsoft', 'Google', 'Amazon', 'Meta'],
    ['Starbucks', 'Costa Coffee', 'McCafe', 'Tim Hortons'],
    ['KFC', 'McDonalds', 'Burger King', 'Subway'],
    ['Visa', 'Mastercard', 'Discover'],
    ['Windows', 'macOS', 'Linux'],
    ['Android', 'iOS'],
    ['Python', 'JavaScript', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Swift'],
    ['Hulk', 'Ironman', 'Batman', 'Superman'],
    ['Harry Potter', 'The Hobbit', 'Narnia'],
    ['The Beatles', 'Queen', 'Led Zeppelin', 'Pink Floyd', 'Metallica'],
    ['The Simpsons', 'Family Guy', 'South Park', 'Rick and Morty'],
    ['DALL-E', 'Midjourney'], 
    ['The Matrix', 'Inception', 'Interstellar']
]

function getRandSampleWords () {
    const firstWordInp = document.querySelector('.comparing-form .comparing-inps input:first-child');
    const secondWordInp = document.querySelector('.comparing-form .comparing-inps input:last-child');

    let wordsGroup = sampleComparingWords[Math.floor(Math.random() * sampleComparingWords.length)];

    let firstWord = wordsGroup[Math.floor(Math.random() * wordsGroup.length)];
    let secondWord = wordsGroup[Math.floor(Math.random() * wordsGroup.length)];

    while (firstWord === secondWord) {
        secondWord = wordsGroup[Math.floor(Math.random() * wordsGroup.length)];
    }

    firstWordInp.value = firstWord;
    secondWordInp.value = secondWord;

} getRandSampleWords();

const comparingInps = document.querySelectorAll('.comparing-form .comparing-inps input');

comparingInps.forEach(inp => {
    inp.addEventListener('input', () => {
        // inp.style.width = inp.value.length * 1.2 + 'ch';
    });
});


comparingInps.forEach(inp => {
    inp.addEventListener('click', () => {
        if (inp.classList.contains('untouched')) {
            inp.value = '';
            inp.classList.remove('untouched');
        }
    });
});


document.querySelectorAll('.comparing-form .depth-menu .inc-dec button').forEach(btn => {
    btn.addEventListener('click', () => {
        const inps = btn.parentElement.parentElement.querySelectorAll('input');
        const inpForDisplay = btn.parentElement.parentElement.querySelector('input');
        function setInps(val) {
            inps.forEach(inp => {
                inp.value = val;
                inp.style.width = inp.value.length + 'ch';
            });
        }

        const speedOut = btn.parentElement.parentElement.querySelector('.speed');
        const val = parseInt(inpForDisplay.value);

        const steps = [2, 4, 6, 8, 16, 24, 32];
        const speeds = ['not accurate, fastest', 'less accuracy, faster', 'optimal', 'better accuracy, slower', 
        'very accurate, slower', 'much better accuracy, slower', 'most accurate, slowest'];
        
        let currentStep = steps.indexOf(val);

        if (btn.classList.contains('inc') && val !== 32) {
            setInps(steps[currentStep + 1]);
            speedOut.textContent = speeds[currentStep + 1];

        } else if (btn.classList.contains('dec') && val !== 2) {
            setInps(steps[currentStep - 1]);
            speedOut.textContent = speeds[currentStep - 1];
        }

    });
});


/*
 *  LIGHTBOXES GENERAL ----------------------------------------------------------
 */

document.querySelectorAll('.ltx .close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.parentElement.classList.remove('active');
    });
});



function showComparingWinner(st, nd) {
    const key1 = document.querySelector('.comparing-result .leaderboard input.st').value;
    const key2 = document.querySelector('.comparing-result .leaderboard input.nd').value;
    const conc = document.querySelector('.comparing-result .conclusion');

    let winner;

    st > nd ? winner = key1 : winner = key2;
    st === nd ? winner = 'tie' : winner = winner;

    let sum = st + nd;
    let stPercent = Math.round(st * 100 / sum);
    let ndPercent = 100 - stPercent;

    if (st > nd) {
        if (stPercent === 50) {
            stPercent = 51;
            ndPercent = 49;
        }

        conc.innerHTML = `<b>${key1}</b> is more popular by <b>${stPercent - ndPercent}%</b> on the internet.`;
    
    } else if (nd > st) {
        if (ndPercent === 50) {
            ndPercent = 51;
            stPercent = 49;
        }

        conc.innerHTML = `<b>${key2}</b> is more popular by <b>${ndPercent - stPercent}%</b> on the internet.`;
    
    } else if (st === nd) {
        conc.innerHTML = `Both are equally popular on the internet.`;
    }
}

document.querySelectorAll('.comparing-result .leaderboard span.pts').forEach(h2 => {
    const item = document.querySelector('.comparing-result .leaderboard .item');
    item.style.width = parseInt(window.getComputedStyle(item).width) + 10 + 'px';
        
    const targetVal = parseInt(h2.textContent);
    h2.textContent = 0;
    const step = Math.ceil(targetVal / 500);
    var timeout = step;

    function animateValue(currentVal) {
        let slider;

        if (currentVal <= targetVal) {
            if (h2.classList.contains('st')) {
                slider = document.querySelector('.comparing-result .leaderboard .item .slider.first');
            } else {
                slider = document.querySelector('.comparing-result .leaderboard .item .slider.second');
            }

            h2.textContent = currentVal + 'pts';
            slider.style.width = currentVal / 500 + 'vw';

            timeout *= .5;
            timeout = Math.round(timeout * 1000) / 1000;

            setTimeout(() => {
                animateValue(currentVal + step);
            }, timeout);
        
        } else if (currentVal >= targetVal) {
            const first = parseInt(document.querySelector('.comparing-result .leaderboard span.st')
                .textContent);
            const second = parseInt(document.querySelector('.comparing-result .leaderboard span.nd')
                .textContent);
            
            showComparingWinner(first, second);
        }
    }

    animateValue(0);
});

const moneyJar = document.querySelector('.money-jar');

const setJarMoney = amt => {
    moneyJar.innerHTML = '';
    const cols = Math.floor((window.innerWidth - 32) / 36);
    for (let i = 0; i < cols; i++) {
        const col = document.createElement('div');
        col.classList.add('col');
        col.dataset.col = i + 1;
        moneyJar.appendChild(col);
    }

    let moneyDistribution = [];
    for (let i = 1; i <= cols; i++) {
        moneyDistribution.push(0);
    }

    for (let i = 0; i < amt; i++) {
        const col = Math.floor(Math.random() * moneyDistribution.length);
        moneyDistribution[col] += 1;
    }

    for (let k = 0; k < moneyDistribution.length; k++) {
        const col = moneyDistribution[k];
        let divided = [];
        
        const ns = [
            parseInt(col.toString().slice(-1)),
            parseInt(col.toString().slice(-2, -1)),
            parseInt(col.toString().slice(-3, -2)),
            parseInt(col.toString().slice(0, -3))
        ];

        for (let i = 0; i < ns.length; i++) {
            if (Number(ns[i])) {
                i === 0 ? divided.push(ns[i]) : 0;
                let degree = i === 1 ? 10 : i === 2 ? 100 : i === 3 ? 1000 : 1;
                
                for (let j = 0; j < ns[i]; j++) {
                    appendImg(k + 1, degree, i);
                } 
            }
        }
    }

    function appendImg(col, imgN, z) {
        const img = document.createElement('img');
        img.src = `img/${imgN}dollars.svg`;
        img.style.zIndex = z;
        moneyJar.querySelector(`[data-col="${col}"]`).appendChild(img);
    }
}
setJarMoney(moneyAmt);
window.addEventListener('resize', setJarMoney(moneyAmt));

document.querySelector('.money-jar-wrapper .stats .total span').textContent = '$' + moneyAmt;


document.querySelectorAll('dialog.take .take-options a').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.querySelector('input').value = btn.dataset.amt;
        document.querySelectorAll('dialog.take .take-options a').forEach(a => {
            a.classList.toggle('chosen');
        });
    });
});

document.querySelectorAll('dialog.take .pm-label-wrapper').forEach(btn => {
    const radio = btn.querySelector('.radio');
    btn.onclick = () => {
        document.querySelectorAll('dialog.take .pm-label-wrapper .radio').forEach(radio => {
            radio.classList.remove('checked');
        });
        document.querySelectorAll('dialog.take .pm-wrapper input').forEach(inp => {
            inp.disabled = 'true';
        });
        radio.classList.add('checked');
        btn.parentElement.querySelector('input').removeAttribute('disabled');
    }
});


document.querySelectorAll('dialog.donate .donate-options a').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('#donation-amt-inp').value = btn.textContent.replace(',', '');
    });
});

document.querySelector('#donation-amt-inp').addEventListener('input', () => {
    const inp = document.querySelector('#donation-amt-inp');
    inp.value = inp.value.replace(/[^\d.]+|(?<=\..*)\./g, '');
    if (inp.value === '0' || inp.value === '.') inp.value = '';
    if (inp.value.includes('.') && inp.value.split('.')[1].length > 2) inp.value = inp.value.slice(0,-1);
});


document.querySelectorAll('[data-ltx]').forEach(btn => {
  btn.addEventListener('click', () => {
      document.body.style.overflow = 'hidden';
      if (navigator.userAgent.indexOf("Win") !== -1) {
          document.body.style.paddingRight = '17px';
      }
      const ltx = document.querySelector(`dialog.${btn.dataset.ltx}`);
      ltx.showModal(); 

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
      }, 190);
  });
});

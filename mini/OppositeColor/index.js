const colorInp = document.querySelector('#color-inp');
const maxContrastOut = document.querySelector('#max-contrast');
const decolorOut = document.querySelector('.color-inps-wrapper div.color-inp div');

window.addEventListener('keydown', e => {
    if (e.key === 'c') {
        colorInp.click();
    }
});

function hexToRgb(hex) {
    // Remove the "#" if it's included
    hex = hex.replace(/^#/, '');
  
    // Parse the hexadecimal string into RGB values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHsl(rgbString) {
    // Extract the RGB values from the string
    const [r, g, b] = rgbString.match(/\d+/g).map(Number);
  
    // Ensure the input RGB values are in the range [0, 255]
    const normalizedR = Math.min(255, Math.max(0, r)) / 255;
    const normalizedG = Math.min(255, Math.max(0, g)) / 255;
    const normalizedB = Math.min(255, Math.max(0, b)) / 255;
  
    // Find the maximum and minimum values among the normalized RGB components
    const max = Math.max(normalizedR, normalizedG, normalizedB);
    const min = Math.min(normalizedR, normalizedG, normalizedB);
  
    // Calculate the lightness (L)
    let l = (max + min) / 2;
  
    // Calculate the difference and sum of the maximum and minimum values
    const diff = max - min;
    const sum = max + min;
  
    // Calculate the saturation (S)
    let s = 0;
    if (diff > 0) {
        s = l > 0.5 ? diff / (2 - sum) : diff / sum;
    }
  
    // Calculate the hue (H)
    let h = 0;
    if (diff > 0) {
        if (max === normalizedR) {
            h = (normalizedG - normalizedB) / diff + (normalizedG < normalizedB ? 6 : 0);
        } else if (max === normalizedG) {
            h = (normalizedB - normalizedR) / diff + 2;
        } else {
            h = (normalizedR - normalizedG) / diff + 4;
        }
        h /= 6;
    }
  
    // Convert hue to degrees
    h *= 360;
  
    // Round H, S, and L to reasonable precision
    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
  
    return `hsl(${h}, ${s}%, ${l}%)`;
}

const colorBtns = document.querySelectorAll('.decolor-container button[data-tooltip]');
colorInp.addEventListener('input', () => {
    const firstHexGroup = ['7', '6', '5', '4', '3', '2', '1', '0'];
    const secondHexGroup = ['8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    const inpValue = colorInp.value.substr(1);

    let allPercentages = [];
    let finalDecolor = '';
    for (let i = 0; i < inpValue.length; i+=2) {
        const currentChar = inpValue[i];
        let contrastPercentage = 0;
        if (firstHexGroup.includes(currentChar)) {
            let charIndex = firstHexGroup.indexOf(currentChar);
            contrastPercentage = 100 / 8 * (charIndex + 1);
            finalDecolor += 'ff';
        } else if (secondHexGroup.includes(currentChar)) {
            let charIndex = secondHexGroup.indexOf(currentChar);
            contrastPercentage = 100 / 8 * (charIndex + 1);
            finalDecolor += '00';
        }

        allPercentages.push(contrastPercentage*2);
    }
    
    let percentageSum = 0;
    for (let i = 0; i < allPercentages.length; i++) {
      percentageSum += allPercentages[i];
    }

    maxContrastOut.innerHTML = (percentageSum / 6).toFixed(1) + '%';
    decolorOut.style.background = '#' + finalDecolor;

    colorBtns.forEach(btn => {  
        if (btn.parentElement.classList.contains('left')) {
            const inpBtns = btn.parentElement.querySelectorAll('button');
            inpBtns[0].innerHTML = colorInp.value.substr(1);
            inpBtns[1].innerHTML = hexToRgb(colorInp.value).slice(4, -1);
            inpBtns[2].innerHTML = rgbToHsl(inpBtns[1].innerHTML).slice(4, -1);
        } else {
            const inpBtns = btn.parentElement.querySelectorAll('button');
            inpBtns[0].innerHTML = finalDecolor;
            inpBtns[1].innerHTML = decolorOut.style.background.slice(4, -1);
            inpBtns[2].innerHTML = rgbToHsl(inpBtns[1].innerHTML).slice(4, -1);
        }
    });
});

function copyToClipboard(textToCopy) {
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

const copyColorTooltip = document.querySelector('.copy-color-tooltip');
colorBtns.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        if (btn.dataset.tooltip === 'hex-color') {
            copyColorTooltip.innerHTML = 'Copy HEX';
        } else if (btn.dataset.tooltip === 'rgb-color') {
            copyColorTooltip.innerHTML = 'Copy RGB';
        } else {
            copyColorTooltip.innerHTML = 'Copy HSL';
        }

        const rect = btn.getBoundingClientRect();
        const x = rect.left + window.scrollX + 'px';
        const y = rect.top + window.scrollY + 'px';

        copyColorTooltip.style.display = 'block';
        copyColorTooltip.style.left = x;
        copyColorTooltip.style.top = y;
    });

    btn.addEventListener('mouseout', () => {
        copyColorTooltip.style.display = 'none';
    });

    btn.addEventListener('click', () => {
        copyToClipboard(btn.textContent);
        copyColorTooltip.innerHTML = 'Copied <span>✓</span>';
    });
});

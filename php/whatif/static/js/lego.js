

function appendLegoBricks() {
    const bricksContainer = document.querySelector('#lego-bricks-svg');
    const scale = 2;
    const brickH = 10 * scale;
    const brickW = 32 * scale;
    const smallRectW = 5 * scale;
    const smallRectH = 2 * scale;
    const bricksAmt = 20;

    bricksContainer.setAttribute('width', brickW);
    bricksContainer.setAttribute('height', brickH * bricksAmt + smallRectH)
    
    const legoBricksFragment = document.createDocumentFragment();
    let smallRectColor = '';
    for (let i = 0; i < bricksAmt; i++) {
        const hexChars = '0123456789abcdef';
        let hexColor = '#';
        for (let j = 0; j < 6; j++) hexColor += hexChars[Math.floor(Math.random() * hexChars.length)];
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', brickW);
        rect.setAttribute('height', brickH);
        rect.setAttribute('y', i * brickH + smallRectH);
        rect.setAttribute('fill', hexColor)

        i === 0 ? smallRectColor += hexColor : 0;

        legoBricksFragment.appendChild(rect);
    }

    for (let i = 0; i < 4; i++) {
        const smallRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        smallRect.setAttribute('width', smallRectW);
        smallRect.setAttribute('height', smallRectH);
        smallRect.setAttribute('x', i * (brickW / 4) + smallRectW / 4);
        smallRect.setAttribute('y', 0);
        smallRect.setAttribute('fill', smallRectColor);

        legoBricksFragment.appendChild(smallRect);
    }
    document.querySelector('#lego-bricks-svg').appendChild(legoBricksFragment);

}
appendLegoBricks();
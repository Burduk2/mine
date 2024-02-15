class Random {
    static random() {
        let seed = parseFloat((new Date() - new Date(2000, 0, 1)).toString().slice(-3));

        const seedNums = {
            '0': 1957, '1': 2845, '2': 3732, '3': 4629, '4': 5118,
            '5': 6523, '6': 7431, '7': 8342, '8': 9251, '9': 1569,
        }

        for (const num of seed.toString()) {
            // seed *= seedNums[num];
            seed ^= (seedNums[num] << 5) | (seedNums[num] >>> 27); // XOR with bitwise shifts and OR
            seed += seed << 13;
            seed < 0 ? seed *= -1 : 0;
        }
        let rand = seed;
        
        rand = parseFloat(`0.${rand.toString().replace('.', '')}`);
        return rand;
    }
    static int(min, max) {
        if (!Number.isInteger(min) || !Number.isInteger(max)) return NaN;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static float(min, max) {
        if (typeof min !== 'number' || typeof max !== 'number') return NaN;
        return (Math.random() * (max - min)) + min;
    }
    static str(len, settings='') {
        if (!Number.isInteger(len) || len < 1) {
            console.error('\'Length\' parameter should be an integer bigger than 0.');
            return;
        }

        let settingsArr = [...settings.split(' ')]
        let finalStr = '';
        let useChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\
                        !@#$%^&*()_+-=[]{}|;:\'",.<>?';

        if (settings === '') {
            for (let i = 0; i < len; i++) {
                finalStr += useChars.charAt(Math.floor(Math.random() * useChars.length));         
            }
            return finalStr;
        }

        useChars = '';
        for (let i = 0; i < settingsArr.length; i++) {
            if (settingsArr[i] === 'lower') {
                useChars += 'abcdefghijklmnopqrstuvwxyz';
            } else if (settingsArr[i] === 'upper') {
                useChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            } else if (settingsArr[i] === 'digits') {
                useChars += '1234567890';
            } else if (settingsArr[i].charAt(0) === '{') {
                const lastToken = settingsArr[i][settingsArr[i].length - 1];
                if (lastToken !== '}') {
                    console.error(`Invalid token: '${lastToken}' in 'settings' property. Expected: '}'`);
                    return;
                }
                const symbols = settingsArr[i].slice(1, -1);
                for (let j = 0; j < symbols.length; j++) {
                    useChars += symbols[j];
                }
            } else {
                console.error(`Uncaught property '${settingsArr[i]}' in 'settings' property.`);
                return;
            }
        }

        for (let i = 0; i < len; i++) {
            finalStr += useChars[Math.floor(Math.random() * useChars.length)];          
        }
        return finalStr;
    }
    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    static choice = arr => arr[Math.floor(Math.random() * arr.length)];
}
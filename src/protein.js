const initMatrix = (s1, s2) => {
    if (undefined === s1 || undefined === s2) {
        return null;
    }
    let mx = [];
    //let mx = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(null));
    for (let i = 0; i <= s1.length; i += 1) {
        mx[i] = [];
        mx[i][0] = i;
    }
    for (let j = 0; j <= s2.length; j += 1) {
        mx[0][j] = j;
    }

    return mx;
};

const distance = (s1, s2) => {
    if (
        undefined === s1 ||
        undefined === s2 ||
        "string" !== typeof s1 ||
        "string" !== typeof s2
    ) {
        return -1;
    }

    let mx = initMatrix(s1, s2);
    if (null === mx) {
        return -1;
    }
    for (let i = 1; i <= s1.length; i += 1) {
        for (let j = 1; j <= s2.length; j += 1) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;

            mx[i][j] = Math.min(
                mx[i - 1][j] + 1,
                mx[i][j - 1] + 1,
                mx[i - 1][j - 1] + cost
            );
        }
    }

    return mx;
};

let proteinCalc = (s1, s2) => {
    s1 = s1.trim();
    s2 = s2.trim();
    const mx = distance(s1, s2);
    console.log(mx);
    let output1 = '';
    let output2 = '';
    let i = s1.length;
    let j = s2.length;

    while (i !== 0 && j !== 0) {
        //console.log(`[${i}][${j}]ВЫЧИСЛЯЮ ПРОТЕИНЫ . . . ${output1} /// ${output2}`);
        let minimum = Math.min.apply(null, [
            mx[i - 1][j - 1],
            mx[i][j - 1],
            mx[i - 1][j],
        ]);

        if (mx[i][j] === mx[i - 1][j - 1] && mx[i - 1][j - 1] === minimum) {
            //console.log(mx[i][j], mx[i - 1][j - 1], minimum);
            output2 = s2[j - 1] + output2;
            output1 = s1[i - 1] + output1;
            i--;
            j--;
        } else {
            if (mx[i][j - 1] === minimum) {
                //console.log('i j-1',mx[i][j - 1], minimum);
                output1 = '—' + output1;
                output2 = s2[j - 1] + output2;
                j--;
            } else if (mx[i - 1][j] === minimum) {
                //console.log('i-1 j',mx[i - 1][j], minimum);
                output1 = s1[i - 1] + output1;
                output2 = '—' + output2;
                i--;
            } else {
                output2 = s2[j - 1] + output2;
                output1 = s1[i - 1] + output1;
                i--;
                j--;
            }
        }
    }

    return [mx[s1.length][s2.length], output1, output2];
};

//console.log(proteinCalc('PRETTY', 'PRTTEIN'));

export default proteinCalc;
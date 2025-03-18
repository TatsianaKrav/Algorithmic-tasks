/* 1 Первый аргумент - массив, второй - колбек-функция, которая применяется на массив
Колбек-функция применяется на каждый элемент массива и проверяет условие
Если хотя бы один раз колбек-функция вернула true, то any возвращает true
Иначе - false

Если колбек-функция не была передана, то из any возвращаем true,
    если в массиве есть хотя бы один элемент, который дает true,
    если все значения в массиве дают false, то возвращаем false

console.log(any([0, 1, 2, 0], x => x >= 2)); -> true
console.log(any([0, 0, 1, 0])); -> true
console.log(any([0, 0, 0, 0])); -> false */

function any(arr, cb) {
    if (!cb) return true;

    for (let i = 0; i < arr.length; i++) {
        if (cb(arr[i])) return true;
    }

    return false;
}

console.log(any([0, 1, 2, 0], x => x >= 2));
console.log(any([0, 0, 1, 0]));
console.log(any([0, 0, 0, 0])); //why false?

/* 2 Функция принимает 2 массива.
    Возвращает новый массив, который состоит только из тех элементов,
    которые встретились в одном массиве, но не встретились в другом

console.log(arrayDiff([1, 2, 3], [1, 2, 4])); -> [3, 4]
console.log(arrayDiff([1, 3, 3, 4], [1, 3, '4'])); -> [4, '4'] */

function arrayDiff(arr1, arr2) {
    const arr = arr1.concat(arr2); // 1, 2, 3, 1, 2, 4
    const usedNums = [];

    arr.forEach((item) => {
        if (!arr1.includes(item) && arr2.includes(item) || arr1.includes(item) && !arr2.includes(item)) {
            usedNums.push(item);
        }
    })

    return usedNums;

}

console.log(arrayDiff([1, 2, 3], [1, 2, 4]));  //-> [3, 4]
console.log(arrayDiff([1, 3, 3, 4], [1, 3, '4'])); //-> [4, '4'] 


/* 3 Реализовать функцию forEachRight
Первый аргумент - массив, второй - функция, применяется на массив в обратном порядке

Пример:
    Результатом работы функции forEachRight,
    будет вывод элементов массива в обратном порядке в консоль.
    Одно значение - один вывод (построчно)

forEachRight([1, 2, 3, 4], val => console.log(val)); -> в консоль 4 3 2 1 */

function forEachRight(arr, fn) {
    return arr.reverse().forEach(el => fn(el));
}

forEachRight([1, 2, 3, 4], val => console.log(val));


/* 4 Функция принимает 2 массива, и возвращает массив объединенных значений,
    без дублирования

console.log(union([5, 1, 2, 3, 3], [4, 3, 2])); -> [5, 1, 2, 3, 4]
console.log(union([5, 1, 3, 3, 4], [1, 3, 4])); -> [5, 1, 3, 4]
 */

function union(arr1, arr2) {
    return [...new Set(arr1.concat(arr2))];
}

console.log(union([5, 1, 2, 3, 3], [4, 3, 2]));
console.log(union([5, 1, 3, 3, 4], [1, 3, 4]));

/* 5 Реализовать функцию without.
    Первый аргумент - массив, второй и последующие - значения

Функция возвращает новый массив, который наполнен теми значениями,
    которые не передавались как второй и последующие аргументы функции

console.log(without([2, 1, 2, 3], 1, 2)) -> [3]
console.log(without([2, 1, 10, 20, 5], 1, 2, 5)) -> [10, 20] */

function without(arr, ...args) {
    const values = [...args];
    const result = [];

    arr.forEach(el => {
        if (!values.includes(el)) {
            result.push(el);
        }
    })
    return result;
}

console.log(without([2, 1, 2, 3], 1, 2));
console.log(without([2, 1, 10, 20, 5], 1, 2, 5));


/* 6 Реализовать функцию indexOfAll.
    Первый аргумент - массив, второй - значение

Функция возвращает массив со всеми индексами, которые соответствуют переданному значению */

function indexOfAll(arr, val) {
    const result = [];

    arr.forEach((el, index) => {
        if (el === val) {
            result.push(index);
        }
    });

    return result;
}

console.log(indexOfAll([1, 2, 3, 1, 2, 3], 1)); //-> [0, 3]
console.log(indexOfAll([1, 2, 3], 4)); //-> []


/* 7. Функция принимает массив meetups,
    и возвращает суммарное количество человек, находящихся на активных митапах

membersOnActiveMeetups(meetups); // 1500

Пример:
    const meetups = [
        { name: 'JavaScript', isActive: true, members: 100 },
        { name: 'Angular', isActive: true, members: 900 },
        { name: 'Node', isActive: false, members: 600 },
        { name: 'React', isActive: true, members: 500 },
    ];
membersOnActiveMeetups(meetups); // 1500 */

function membersOnActiveMeetups(arr) {
    return arr.reduce((acc, val) => {
        if (val.isActive) {
            return acc + val.members;
        } else {
            return acc + 0;
        }

    }, 0)
}

const meetups = [
    { name: 'JavaScript', isActive: true, members: 100 },
    { name: 'Angular', isActive: true, members: 900 },
    { name: 'Node', isActive: false, members: 600 },
    { name: 'React', isActive: true, members: 500 },
];

console.log(membersOnActiveMeetups(meetups));


/* 8 const factory = (xValue, yValue, funcSumName) => {
    ...
    }
    const obj = factory(12, 23, 'myFunc');
    
    console.log(obj.x, obj.y, obj.myFunc()); // 12, 23, 35 */

/* const factory = (xValue, yValue, funcSumName) => {
    Object.defineProperty(Object.prototype, 'x', {
        value: xValue
    })

    Object.defineProperty(Object.prototype, 'y', {
        value: yValue
    })

    Object.defineProperty(Object.prototype, funcSumName, {
        value: function () {
            return this.x + this.y
        }
    })

    return Object;
}
 */

const factory = (xValue, yValue, funcSumName) => {
    Object.defineProperties(Object.prototype, {
        x: {
            value: xValue
        },

        y: {
            value: yValue
        }
    })

    Object.defineProperty(Object.prototype, funcSumName, {
        value: () => this.x + this.y
    })

    return Object;
}

const obj = factory(12, 23, 'myFunc');
console.log(obj.x, obj.y, obj.myFunc());

/* 9.
const obj = {
    id: 0,
    name: 'Obj-name',
    // ...
};

console.log(`Name: ${obj}`); 		// Name: Obj-name
console.log(+obj);            		// 0
console.log(obj + 10);        		// 10 */



/* 10. Каррирование
add(4)(3)(1) => 8
*/

function add(x) {
    return function (y) {
        return function (z) {
            return x + y + z;
        };
    };
}

// const add = (x:number) => (y:number) => (z:number) => x+y+z;
console.log(add(4)(3)(1))



/* 11. На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].

    Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.

    Функция getMaxSubSum(arr) должна возвращать эту сумму.

    Например:

getMaxSubSum([-1, 2, 3, -9]) = 5 (сумма выделенных)
getMaxSubSum([2, -1, 2, 3, -9]) = 6
getMaxSubSum([-1, 2, 3, -9, 11]) = 11
getMaxSubSum([-2, -1, 1, 2]) = 3
getMaxSubSum([100, -9, 2, -3, 5]) = 100
getMaxSubSum([1, 2, 3]) = 6 (берём все)
Если все элементы отрицательные – ничего не берём(подмассив пустой) и сумма равна «0» */

function getMaxSubSum(arr) {
    const allNegative = arr.every(el => el < 0);
    if (allNegative) return 0;

    let maxSum = 0;

    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;

        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            maxSum = Math.max(maxSum, currentSum);
        }
    }

    return maxSum;
}

console.log(getMaxSubSum([-1, 2, 3, -9]));
console.log(getMaxSubSum([2, -1, 2, 3, -9]));
console.log(getMaxSubSum([-1, 2, 3, -9, 11]));
console.log(getMaxSubSum([-2, -1, 1, 2]));
console.log(getMaxSubSum([100, -9, 2, -3, 5]));
console.log(getMaxSubSum([1, 2, 3]));


/* 12. camelize("background-color") == 'backgroundColor';
camelize("list-style-image") == 'listStyleImage';
camelize("-webkit-transition") == 'WebkitTransition'; */

function camelize(value) {
    let flag = false;
    if (value.startsWith('-')) {
        flag = true;
        value = value.slice(1);
    }

    const arr = value.split('-');

    let result = arr.map(el => {
        return el[0].toUpperCase() + el.slice(1);
    }).join('');

    result = flag ? result : result[0].toLowerCase() + result.slice(1);

    return result;

}

console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));


/* 13. Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет в нём элементы между a и b и отдаёт массив этих элементов.

    Например:

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert( filtered ); // 3,1 */

let arr = [5, 3, 8, 1];

function filterRange(arr, a, b) {

    return arr.filter(item => item >= a && item <= b);
}


console.log(filterRange(arr, 1, 4));


/* 14. Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.

    Например:

let strings = [‘aaa', ‘aaa', ‘zzz', ‘xxx', ‘aaa', ‘bbb', ‘aaa',  ‘xxx', ‘ccc'];

alert( unique(strings) ); // [‘aaa', ‘zzz', ‘xxx', ‘bbb', ‘ccc']
 */

function unique(arr) {
    return [...new Set(arr)];
}
let strings = ["aaa", "aaa", "zzz", "xxx", "aaa", "bbb", "aaa", "xxx", "ccc"];
console.log(unique(strings));

/* 15.
Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n. */

function sumTo(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

console.log(sumTo(5));
console.log(sumTo(7));

/* 16.
Напишите функцию, которая принимает строку из одного или нескольких слов и возвращает ту же строку, но с перевернутыми словами из X и более букв (X — второй параметр ф-ии)..
Переданные строки будут состоять только из букв и пробелов.

Examples:
spinWords( "Hey fellow warriors", 5 ) => returns "Hey wollef sroirraw"
spinWords( "This is a test", 10) => returns "This is a test"
spinWords( "This is another test", 3 )=> returns "sihT is rehtona tset" */

function spinWords(string, number) {
    const arr = string.split(' ');
    const newArr = [];

    arr.forEach(item => {
        if (item.length > number) {
            item = item.split('').reverse().join('');
        }

        newArr.push(item);
    })

    return newArr.join(' ');
}

console.log(spinWords("Hey fellow warriors", 5));
console.log(spinWords("This is a test", 10));
console.log(spinWords("This is another test", 3));


/* 17.
filter_list([1,2,'a','b']) == [1,2]
filter_list([1,'a','b',0,15]) == [1,0,15]
filter_list([1,2,'aasf','1','123',123]) == [1,2,123] */

function filterList(arr) {
    return arr.filter(item => typeof item === 'number');
}

console.log(filterList([1, 2, 'a', 'b']));
console.log(filterList([1, 'a', 'b', 0, 15]));
console.log(filterList([1, 2, 'aasf', '1', '123', 123]));

/* 18.
Возвести в квадрат каждую цифру числа и соединить их.
Например, если мы запустим 9119 через функцию, выйдет 811181, потому что 9^2 - это 81, а 1^2 - 1.
Примечание: функция принимает целое число и возвращает целое число. */

function sqrt(num) {
    let str = [];

    while (num > 0) {
        const digit = num % 10
        num = Math.floor(num / 10);
        str.push(digit * digit);
    }

    return str.reverse().join('');
}

console.log("sqrt " + sqrt(9119));
console.log("sqrt " + sqrt(5143));


/* 19)
Написать функцию persistence, которая принимает положительный параметр num и возвращает число, которое нужно умножить цифры в num, пока не дойдете до единственной цифры.

Примеры:
 persistence(39) === 3 	// because 3*9 = 27, 2*7 = 14, 1*4=4
                                        // and 4 has only one digit

 persistence(999) === 4 	// because 9*9*9 = 729, 7*2*9 = 126,
                                // 1*2*6 = 12, and finally 1*2 = 2

 persistence(4) === 0 		// because 4 is already a one-digit number
 */

function persistence(num) {
    let arrOfNums = num.toString().split('');
    if (arrOfNums.length === 1) return num;

    while (arrOfNums.length > 1) {
        const result = arrOfNums.reduce((acc, item) => acc * item, 1);
        arrOfNums = result.toString().split('');
    }

    return arrOfNums[0];
}

console.log(persistence(39));
console.log(persistence(999));
console.log(persistence(4));


/* 20.
Создать функцию с именем divisors / Divisors, которая принимает целое число n> 1 и возвращает массив со всеми делителями целого числа (кроме 1 и самого числа),
от наименьшего до наибольшего. Если число простое, вернуть строку '(integer) is prime'.

Примеры:
divisors(12); // should return [2,3,4,6]
divisors(25); // should return [5]
divisors(13); // should return "13 is prime" */

function divisors(num) {
    const arr = [];

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            arr.push(i);
        }
    }

    const result = arr.length > 0 ? arr : `${num} is integer`;

    return result;
}

console.log(divisors(12));
console.log(divisors(25));
console.log(divisors(13));


/* 21.
Дана строка. Вернуть длину самого короткого слова
Пример:
getLengthOfShortestWord(‘Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.’) 	// => 2 */

function getLengthOfShortestWord(string) {
    const arr = string.split(' ');
    const arrOfLength = arr.map(item => item.length);

    return Math.min(...arrOfLength);
}

console.log(getLengthOfShortestWord("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."));


/* 22.
Написать ф-ию, которая принимает 3 целочисленных значения a, b, c. Ф-ия должна возвращать true,
сли треугольник можно построить со сторонами заданной длины, и false в любом другом случае.

Примеры:
isTriangle(1,2,2)	// true
isTriangle(7,2,2)	// false */

function isTriangle(a, b, c) {
    return (a + b > c && a + c > b && b + c > a);
}

console.log(isTriangle(1, 2, 2));
console.log(isTriangle(7, 2, 2));


/* 23.
Вернуть средний символ слова. Если длина слова нечетная, вернуть средний символ. Если длина слова четная, вернуть 2 средних символа.

Примеры:
getMiddle("test") 	// should return "es"
getMiddle("testing") 	// should return "t"
getMiddle("middle") 	// should return "dd"
getMiddle("A") 	// should return "A" */

function getMiddle(string) {
    if (string.length % 2 !== 0) {
        return string[Math.floor(string.length / 2)];
    } else {
        return string[Math.floor(string.length / 2) - 1] + string[Math.floor(string.length / 2)];
    }
}

console.log(getMiddle("test"));
console.log(getMiddle("testing"));
console.log(getMiddle("middle"));
console.log(getMiddle("A"));


/* 24.
Дан массив чисел. Необходимо отсортировать нечетные числа в порядке возрастания, оставив четные числа на их исходных позициях.

Примеры:
[7, 1]  =>  [1, 7]
[5, 8, 6, 3, 4]  =>  [3, 8, 6, 5, 4]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  =>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0] */

function sortNums(arr) {
    const oddNums = arr.filter(num => num % 2 !== 0).sort((a, b) => a - b);
    let index = -1;

    const result = arr.map(item => {
        if (item % 2 !== 0) {
            index++;
            return oddNums[index];
        }

        return item;
    })

    return result;

}

console.log(sortNums([7, 1]));
console.log(sortNums([5, 8, 6, 3, 4]));
console.log(sortNums([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));


/* 25.
Написать функцию, которая будет возвращать количество отдельных нечувствительных к регистру буквенных символов и числовых цифр,
которые встречаются во входной строке более одного раза. Предполагается, что входная строка содержит только буквы (как в верхнем, так и в нижнем регистре) и цифры.

Примеры
"abcde" -> 0 # no characters repeats more than once
"aabbcde" -> 2 # 'a' and 'b'
"aabBcde" -> 2 # 'a' occurs twice and 'b' twice (`b` and `B`)
"indivisibility" -> 1 # 'i' occurs six times
"Indivisibilities" -> 2 # 'i' occurs seven times and 's' occurs twice
"aA11" -> 2 # 'a' and '1'
"ABBA" -> 2 # 'A' and 'B' each occur twice
 */

function repeatingSymbols(string) {
    let count = 0;
    let arr = string.split('').map(item => item.toLowerCase());
    const usedNums = [];

    for (item of arr) {
        if (usedNums.includes(item)) continue;

        if (arr.indexOf(item) !== arr.lastIndexOf(item)) {
            count++;
            usedNums.push(item);
        }
    }

    return count;
}

console.log(repeatingSymbols("abcde"));
console.log(repeatingSymbols("aabbcde"));
console.log(repeatingSymbols("aabBcde"));
console.log(repeatingSymbols("indivisibility"));
console.log(repeatingSymbols("Indivisibilities"));
console.log(repeatingSymbols("aA11"));
console.log(repeatingSymbols("ABBA"));

/* 26. Написать функцию, которая возвращает минимальное и максимальное количество заданного списка / массива.

Примеры
minMax([1,2,3,4,5])   == [1,5]
minMax([2334454,5])   == [5, 2334454]
minMax([1])           == [1, 1] */

function minMax(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);

    return [min, max];
}

console.log(minMax([1, 2, 3, 4, 5]));
console.log(minMax([2334454, 5]));
console.log(minMax([1]));


//27. deepClone

const country = {

    name: "Германия",
    language: "немецкий",
    capital: {

        name: "Берлин",
        population: 3375000,
        year: 1237,
    }
};

function deepClone(obj) {
    const copyObj = {};

    for (const key in obj) {
        if (obj[key] === 'object') {
            obj = deepClone(obj[key]);
        } else {
            copyObj[key] = obj[key];
        }
    }

    return copyObj;
}

console.log(deepClone(country));

//find all occurrences

const string = 'ivisibility';

function findAllOccurrences(string, char) {
    const obj = {};
    let count = 0;

    string.split('').forEach(el => {
        if (el === char) {
            obj[el] = ++count;
        }
    })

    return obj[char];
}

console.log(findAllOccurrences(string, 'i'));

function repeatingSymbols2(string) {
    let count = 0;
    let arr = string.split('').map(item => item.toLowerCase());
    const usedNums = { count: 0 };

    for (item of arr) {
        if (usedNums[item]) continue;

        if (arr.indexOf(item) !== arr.lastIndexOf(item)) {
            usedNums.count = ++count;
            usedNums[item] = item;
        }
    }

    return usedNums.count;
}

console.log(repeatingSymbols2("abcde"));
console.log(repeatingSymbols2("aabbcde"));
console.log(repeatingSymbols2("aabBcde"));
console.log(repeatingSymbols2("indivisibility"));
console.log(repeatingSymbols2("Indivisibilities"));
console.log(repeatingSymbols2("aA11"));
console.log(repeatingSymbols2("ABBA"));



function arrayDiff2(arr1, arr2) {
    const arr = arr1.concat(arr2); // 1, 3, 3, 4, 1, 3,'4' 
    const first = Object.fromEntries(arr1.map((el, index) => [el, el])); //1, 3, 3, 4
    const second = Object.fromEntries(arr2.map((el, index) => [el, el])); //1, 3,'4' 
    const map = new Map();

    arr.forEach((item) => {
        if (first[item] !== item && second[item] === item || first[item] === item && second[item] !== item) {
            map.set(item, item);
        }
    })

    return Array.from(map.values());

}

console.log(arrayDiff2([1, 2, 3], [1, 2, 4]));  //-> [3, 4]
console.log(arrayDiff2([1, 3, 3, 4], [1, 3, '4'])); //-> [4, '4'] 


//9. 
const object = {
    id: 0,
    name: 'Obj-name',

    [Symbol.toPrimitive](hint) {
        return hint == "string" ? this.name : this.id;
    }
};

console.log(`Name: ${object}`); 		// Name: Obj-name
console.log(+object);            		// 0
console.log(object + 10);        		// 10 */


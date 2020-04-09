/**
 * @file Домашка по FP ч. 1
 * 
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import * as R from 'ramda';

const length = (color) => R.compose(
    R.length,
    R.filter(el => el === color),
    R.values
);

const colorLengthGreaterThan = (color, number) => R.compose(
    R.gte(R.__, number),
    length(color)
);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => R.allPass([
    R.propEq('star', 'red'),
    R.propEq('square', 'green'),
    R.propEq('triangle', 'white'),
    R.propEq('circle', 'white'),
])(figures);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => colorLengthGreaterThan('green', 2)(figures);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    return R.equals(
        length('red')(figures),
        length('blue')(figures),
    );
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (figures) => R.allPass([
    R.propEq('star', 'red'),
    R.propEq('square', 'orange'),
    R.propEq('circle', 'blue'),
])(figures);

// 5. Три фигуры одного любого цвета кроме белого.
export const validateFieldN5 = (figures) => R.anyPass([
    colorLengthGreaterThan('orange', 3),
    colorLengthGreaterThan('red', 3),
    colorLengthGreaterThan('blue', 3),
    colorLengthGreaterThan('green', 3),
])(figures);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (figures) => R.allPass([
    colorLengthGreaterThan('green', 2),
    colorLengthGreaterThan('red', 1),
    R.propEq('triangle', 'green'),
])(figures);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => R.allPass([
    R.propEq('star', 'orange'),
    R.propEq('square', 'orange'),
    R.propEq('triangle', 'orange'),
    R.propEq('circle', 'orange'),
])(figures);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (figures) => R.anyPass([
    R.propEq('star', 'green'),
    R.propEq('star', 'orange'),
    R.propEq('star', 'blue'),
])(figures);

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => R.allPass([
    R.propEq('star', 'green'),
    R.propEq('square', 'green'),
    R.propEq('triangle', 'green'),
    R.propEq('circle', 'green'),
])(figures);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (figures) => {

    const isTriangleAndSquareOneColor = (color) => R.allPass([
        R.propEq('square', color),
        R.propEq('triangle', color),
    ]);

    return R.anyPass([
        isTriangleAndSquareOneColor('green'),
        isTriangleAndSquareOneColor('red'),
        isTriangleAndSquareOneColor('blue'),
        isTriangleAndSquareOneColor('orange'),
    ])(figures);
}

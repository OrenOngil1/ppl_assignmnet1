import { Result, makeFailure, makeOk, bind, either } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}
//a//
export const findResult: <T>(pred: (x: T) => boolean, a: T[]) => Result<T> = <T>(pred: (x: T) => boolean, a: T[]) : Result<T> => (element => element !== undefined ? makeOk(element) : makeFailure("No element found"))(a.find(pred));


/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}
//b//
export const returnSquaredIfFoundEven_v2 : (a: number[]) => Result<number> = (a: number[]): Result<number> => bind(findResult(x => x % 2 === 0, a), (y: number): Result<number> => makeOk(y*y));
//c//
export const returnSquaredIfFoundEven_v3 : (a: number[]) => number = (a: number[]): number => either(findResult(x => x % 2 === 0, a), (x: number): number => x*x, (x: string) => -1);

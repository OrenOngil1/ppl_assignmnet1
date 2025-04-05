import { Result, makeFailure, makeOk, bind, either, isOk, isFailure } from "../lib/result";
import * as R from "ramda";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult : <T>(pred: (x: T) => boolean, a: T[]) => Result<T> = <T>(pred: (x: T) => boolean, a: T[]) : Result<T> => {
    for(const x of a) {
        if(pred(x)) {
            return makeOk(x);
        }
    }
    return makeFailure("No element found.");
};

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 : (a: number[]) => Result<number> = (a: number[]): Result<number> => (
    R.pipe(
        (a: number[]) => findResult((x) => x % 2 === 0, a),
        (r: Result<number>) => bind(r, (x: number) => makeOk(x * x)),
    )(a)
);

export const returnSquaredIfFoundEven_v3 : (a: number[]) => Result<number> = (a: number[]): Result<number> => (
    R.pipe(
        (a: number[]) => findResult((x: number) => x % 2 === 0, a),
        (r: Result<number>) => either(r, (x: number) => makeOk(x * x), (message = "No element found.") => makeFailure(message)),
    )(a)
);
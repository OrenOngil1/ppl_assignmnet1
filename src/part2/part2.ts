import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];
export const countVowels = (x : string) : number => R.reduce((acc : number, cur : string) => vowels.includes(cur.toLowerCase()) ? ++acc : acc ,0, stringToArray(x));

/* Question 2 */

const checkPalindrome = R.pipe(
    (x : string) : string[] => stringToArray(x.toLowerCase()).filter(char => char >= '0' && char <= '9' || char >= 'a' && char <= 'z'),
    (x : string[]) : string[][] => x.length % 2 === 0 ? [x.slice(0, x.length / 2), x.slice(x.length/ 2)] : [x.slice(0, x.length / 2), x.slice(x.length / 2 + 1)],
    (x : string[][]) : boolean => x[0].every((char : string, index : number) => char === x[1][x[0].length - 1 - index])
);

export const isPalindrome = (x : string) : boolean => checkPalindrome(x);

/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence = (wt : WordTree) : string => wt.children.length === 0 ? wt.root : wt.root.concat(wt.children.reduce((acc, child) => acc.concat(" ", treeToSentence(child)), ""));

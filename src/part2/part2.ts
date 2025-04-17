import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];

export const countVowels: (str: string) => number = (str: string): number => (
    R.pipe(
        (str: string) => stringToArray(str.toLowerCase()),
        (strAsArray: string[]) => strAsArray.reduce((acc: number, c: string) => R.includes(c, vowels) ? acc + 1 : acc, 0)
    )(str)
);

/* Question 2 */
export const isPalindrome: (str: string) => boolean = (str: string): boolean => (
    R.pipe(
        (str: string) => stringToArray(str.toLowerCase()),
        (strAsArray: string[]) => R.join('', strAsArray.filter(isLetterOrNumber)),
        (str: string) => str === safeReverse(str),
)(str)
);

const isLetterOrNumber: (c: string) => boolean = (c: string): boolean => c >= '0' && c <= '9' || c >= 'a' && c <= 'z';
const safeReverse: (str: string) => string = (str: string): string => (
    R.pipe(
        stringToArray,
        R.reduce((acc: string, c: string) => c + acc, ""),
    )(str)
);
  
/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence: (tree : WordTree) => string = (tree: WordTree): string => (
    tree.children.length === 0 ? tree.root :
    R.pipe(
        (tree: WordTree) => tree.children.map(treeToSentence),
        (children: string[]) => children.reduce((acc: string, child: string) => acc + " " + child, tree.root),
    )(tree)
);

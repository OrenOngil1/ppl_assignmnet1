import * as R from "ramda";

const stringToArray = R.split("");

/* Question 1 */
const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];
export const countVowels: (x : string) => number = (x: string) : number => R.reduce((acc : number, cur : string) => vowels.includes(cur.toLowerCase()) ? ++acc : acc ,0, stringToArray(x));


/* Question 2 */
export const isPalindrome: undefined = undefined;
  
/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence: (tree : WordTree) => string = (tree: WordTree): string => (
    tree.children.length === 0 ? tree.root :
    tree.children.reduce((acc: string, child: WordTree) => acc + " " + treeToSentence(child), tree.root)
);

/// <reference types="vite/client" />

type langType = "ja" | "hi" | "es" | "fr";

type wordType = {
    word:string;
    meaning:string;
    options:string[];
}

type stateType = {
    loading:boolean;
    result:string[];
    error?:string;
    words:wordType[];
}

type fetchedDatatype = {
    translations:{text:string;}[]
}
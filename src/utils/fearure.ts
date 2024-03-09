import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateMCQ = (meaning: { Text: string }[], i: number): string[] => {
  const correctAns: string = meaning[i]?.Text;

  const checkCorrect = meaning.filter(
    (ele: { Text: string }) => ele.Text !== correctAns
  );

  const indirectOption: string[] = _.sampleSize(checkCorrect, 3).map(
    (e: { Text: string }) => e.Text
  );

  const mcqOptions = _.shuffle([...indirectOption, correctAns]);

  return mcqOptions;
};

export const translateWord = async (params: langType) => {
  try {
    // @ts-ignore
    const word: string[]  = generate(8);
    // @ts-ignore
    const words: { Text: string }[] = generate(8).map((ele) => ({ Text: ele }));

    const url = `https://microsoft-translator-text.p.rapidapi.com/translate`;
    const res = await axios.post(url, words, {
      params: {
        "to[0]": params,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },

      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "958245e9c8msh2321ad0fe4addd9p1ed41ejsn70a0003f9d9f",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
    });

    const data: fetchedDatatype[] = await res.data;

    const wordsArr: wordType[] = data.map((ele, i) => {
      const options: string[] = generateMCQ(words, i);

      return {
        word: ele.translations[0].text,
        meaning: words[i].Text,
        options: options,
      };
    });

    return wordsArr;
  } catch (error) {
    console.log(error);
  }
};

export const calTrue = (arr1: string[], arr2: string[]): number => {
  if (arr1.length !== arr2.length) {
    alert("Something went Wrong");
  }

  let count = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] == arr2[i]) {
      count++;
    }
  }

  return count;
};

export const speakText = async (string: string, language: langType) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("src", string);
  encodedParams.set("hl", language);
  encodedParams.set("r", "0");
  encodedParams.set("c", "mp3");
  encodedParams.set("f", "8khz_8bit_mono");
  encodedParams.set("b64", "true");

  if (language === "ja") encodedParams.set("hl", "ja-jp");
  else if (language === "es") encodedParams.set("hl", "es-es");
  else if (language === "fr") encodedParams.set("hl", "fr-fr");
  else encodedParams.set("hl", "hi-in");

  const options = {
    method: "POST",
    url: "https://voicerss-text-to-speech.p.rapidapi.com/",
    params: { key: "b9d2a730450c4f5d99c9ef6c6a2184ed" },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "958245e9c8msh2321ad0fe4addd9p1ed41ejsn70a0003f9d9f",
      "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Button, Typography, Stack } from "@mui/material";
import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { speakText, translateWord } from "../utils/fearure";
import { useDispatch, useSelector } from "react-redux";
import { getWordsFail, getWordsRequest, getWordsSuccess, clearResult, } from "../redux/slices";
import Loading from "./Loading";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>();
  const params = useSearchParams()[0].get("language") as langType;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const { loading, words, error } = useSelector((state: { root: stateType }) => state.root);

  const nextHandler = (): void => {
    setCount((prev) => (prev + 1));
    setAudioSrc("");
  }

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef?.current!;

    if (player) {
      player.play();
    } else {
      const data = await speakText(words[count]?.word, params);
      setAudioSrc(data);
    }
  }

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWord(params || "hi")
      .then((arr) => { arr?.map(() => dispatch(getWordsSuccess(arr))) })
      .catch((err) => { dispatch(getWordsFail(err)); })

    if (error) {
      alert(error);
      dispatch(clearResult());
    }
  }, [])

  if (loading) return <Loading />

  return (<>
    <Container maxWidth="sm" sx={{ padding: "1rem" }}>
      {audioSrc && <audio src={audioSrc} autoPlay ref={audioRef}></audio>}
      <Button onClick={count === 0 ? () => navigate("/") : () => setCount((prev) => (prev - 1))}>
        <ArrowBack />
      </Button>
      <Typography sx={{ marginBottom: "1rem" }}>Learning Made Easy</Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">{count + 1} - {words[count]?.word}</Typography>
        <Typography color={blue} variant="h4">:{words[count]?.meaning}</Typography>
        <Button sx={{ borderRadius: "50%" }} onClick={audioHandler}><VolumeUp /></Button>
      </Stack>
      <Button sx={{ margin: "3rem 0" }} variant="contained" fullWidth
        onClick={count === words.length - 1 ? () => navigate("/quiz") : nextHandler}>
        {count === words.length - 1 ? "Test" : "Next"}
      </Button>
    </Container>
  </>
  )
}

export default Learning
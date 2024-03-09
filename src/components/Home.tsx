import { Container, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {

  type languagesType = { name: string; code: string }
  const languages: languagesType[] = [
    { name: "japanese", code: "ja" },
    { name: "hindi", code: "hi" },
    { name: "spanish", code: "es" },
    { name: "french", code: "fr" }
  ]
  const navigate = useNavigate();
  const setLangHandler = (language: languagesType["code"]): void => {
    navigate(`/learn?language=${language}`)
  }

  return (<>
    <Container maxWidth={"sm"}>
      <Typography variant="h3" textAlign={"center"} >Welcome, Begining of your journey of learning.</Typography>
      <Stack direction={"row"} spacing={"2rem"} p={"2rem"} alignItems={"center"} justifyContent={"center"}>
        {languages.map((elm) => (
          <Button onClick={() => setLangHandler(elm.code)} key={elm.code} variant="contained">{elm.name}</Button>
        ))}
      </Stack>
        <Typography textAlign={"center"}>Choose 1 language from above</Typography>
    </Container>
  </>)
}

export default Home
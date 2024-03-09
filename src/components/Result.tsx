import { Container, Stack, Typography, List, ListItem, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearResult } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { calTrue } from "../utils/fearure";

const Result = () => {
  const { words, result } = useSelector((state: { root: stateType }) => state.root);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const correctAns = calTrue(result, words.map((elm) => (elm.meaning)));
  const percntage = (correctAns / words.length) * 100;
  const resetHandler = (): void => {
    navigate("/");
    dispatch(clearResult());
  }

  return (<>
    <Container maxWidth="sm">
      <Typography variant="h3" color="primary" m="2rem 0">Result</Typography>
      <Typography m="1rem" variant="h6">You got {correctAns} right out of {words.length}</Typography>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">Your Ans</Typography>
          <List>
            {result.map((elm, ind) => (<ListItem key={ind}>{ind + 1} - {elm}</ListItem>))}
          </List>
        </Stack>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">Correct Ans</Typography>
          <List>
            {words.map((elm, ind) => (<ListItem key={ind}>{ind + 1} - {elm.meaning}</ListItem>))}
          </List>
        </Stack>
      </Stack>
      <Typography m={"1rem"} variant="h5" color={percntage > 50 ? "green" : "red"}>{percntage > 50 ? "Pass" : "Fail"}</Typography>
      <Button onClick={resetHandler} sx={{ margin: "1rem" }} variant="contained">
        Reset
      </Button>
    </Container>
  </>)
}

export default Result
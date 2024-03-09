import { CircularProgress,Stack } from "@mui/material"

const Loading = () => {
  return (<>
  <Stack justifyContent={"center"} alignItems={"center"} height={"80vh"}>
    <CircularProgress sx={{}}/>
  </Stack>
  </>
  )
}

export default Loading
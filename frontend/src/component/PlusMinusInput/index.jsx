import { Add, Remove } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";

const PlusMinusInput = (props) => {
  const { sum, setSum } = props;

  const add = () => {
    setSum(sum + 1);
  };
  const remove = () => {
    if (sum > 0) {
      setSum(sum - 1);
    }
  };
  return (
    <Stack direction="row" gap={1}>
      <IconButton onClick={remove}>
        <Remove />
      </IconButton>
      <TextField
        size="small"
        disabled
        value={sum}
        InputProps={{
          inputProps: {
            style: { textAlign: "center", width: "100px" },
          },
        }}
      />

      <IconButton onClick={add}>
        <Add />
      </IconButton>
    </Stack>
  );
};

export default PlusMinusInput;

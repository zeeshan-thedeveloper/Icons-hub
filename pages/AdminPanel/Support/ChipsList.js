import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsList({ isDeleteAllow = true, ...props }) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);
  const handleDelete = (chipToDelete) => () => {

    if (isDeleteAllow === true)
      props.setData((chips) =>
        chips.filter((chip) => chip.key !== chipToDelete.key)
      );
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
      elevation={0}
    >
      {data.map((data) => {
        let icon;
        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}

import * as React from "react";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "react-bootstrap";

export const Card = ({ value, handleSelected, index }: any) => {
  return (
    <MuiCard
      variant="outlined"
      sx={{
        width: "20%",
        margin: "5px",
      }}
    >
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Title:{value.title}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Description: {value.description}
          </Typography>
          <Typography variant="body2">Due Date: {value.due_date}</Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => {
              handleSelected(index, "update");
            }}
            className="button"
            style={{
              flex: 0.4,
              backgroundColor: "#2486d0",
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleSelected(index, "delete");
            }}
            className="button"
            style={{
              flex: 0.4,
              backgroundColor: "black",
            }}
          >
            Delete
          </Button>
        </CardActions>
      </React.Fragment>
    </MuiCard>
  );
};

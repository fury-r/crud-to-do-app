import { Box } from "@mui/material";
import { Card } from "./Card";

export const Cards = ({ data, handleSelected }: any) => {
  return (
    <Box display="flex" flex="1" flexDirection="row" flexWrap="wrap">
      {data.length > 0 ? (
        data.map((value: any, key: any) => (
          <Card
            value={value}
            handleSelected={handleSelected}
            key={key}
            index={key}
          />
        ))
      ) : (
        <></>
      )}
    </Box>
  );
};

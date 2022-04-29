import React from "react";
import Button from "@mui/material/Button";
import * as styles from "./bigButton.module.css";

export default function BigButton(props) {
  return (
    <Button className={styles.bigButton} sx={props.sx } style={props.style} variant="outlined">
      Read Our Story
    </Button>
  );
}

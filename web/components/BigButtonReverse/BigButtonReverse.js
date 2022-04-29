import React from "react";
import Button from "@mui/material/Button";
import * as styles from "./bigButtonReverse.module.css";

export default function BigButtonReverse(props) {
  return (
    <Button className={styles.bigButton} sx={props.sx } style={props.style}>
      Read Our Story
    </Button>
  );
}

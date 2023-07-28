import React, { useState } from "react";
import Button from "@mui/material/Button";
import { smallButtonStyles as style } from "../../../constants/buttonStyles";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SortingButton = ({
    sortingOrder,
    children = "Button Text",
    onClick = () => {
        console.log("Button pressed");
    },
}) => {
   
    const [sortState, setSortState] = useState('default');
    const [isClicked, setIsClicked] = useState(false);

    const handleSorting = () => {
      if (sortState === 'default') {
        setSortState('asc');
      } else if (sortState === 'asc') {
        setSortState('desc');
      } else {
        setSortState('default');
      }
        setIsClicked(true);
        onClick();
    };
  
    const getButtonContent = () => {
      if (sortState === 'default') {
        return;
      } else if (sortState === 'asc') {
        return (
            <ExpandMoreIcon />
        );
      } else {
        return (
             <ExpandLessIcon />
        );
      }
    };
  
    const getButtonColor = () => {
      if (sortState === 'default') {
        return style["secondary"];
      } else {
        return style["primary"];
      }
    };

    const getHoverColor = () => {
        if (sortState === 'default') {
          return style["secondary"].hoverColor;
        } else {
          return style["primary"].hoverColor;
        }
      };

    return (
        <Button
            sx={{
                backgroundColor: getButtonColor(),
                color: "white",
                boxShadow: "2",
                width: "7rem",
                "&:hover": {
                    backgroundColor: getHoverColor(),
                },
            }}
            variant="contained"
            onClick={handleSorting}
        >
            {children} {getButtonContent()}
        </Button>
    );
};

export default SortingButton;




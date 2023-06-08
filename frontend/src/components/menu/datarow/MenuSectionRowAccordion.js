import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "../../common/form/TextField";
import { useFormContext } from "react-hook-form";
import Divider from "@mui/material/Divider"
import AccordionDetails from "@mui/material/AccordionDetails";
import HeadingThree from "../../common/heading/HeadingThree";
import MenuSectionItemsFieldsArray from "./MenuSectionItemsFieldsArray";

const MenuSectionRowAccordion = ({ index = -1 }) => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <div key={index} style={{ width: "100%" }}>
            <Accordion sx={{ boxShadow: 3 }}>
                <AccordionSummary
                    sx={{
                        "&.MuiAccordionSummary-root": {
                            "&.Mui-focusVisible": { bgcolor: "white" },
                        },
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <TextField
                        rules={{ require: true }}
                        name={`sections.${index}.name`}
                        label="Section Name"
                        nestedError={errors.sections?.[index]?.name}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <HeadingThree>Menu Section Items</HeadingThree>
                    <br />
                    <MenuSectionItemsFieldsArray index={index}/>
                </AccordionDetails>
            </Accordion>
            <Divider />
        </div>
    );
};

export default MenuSectionRowAccordion;

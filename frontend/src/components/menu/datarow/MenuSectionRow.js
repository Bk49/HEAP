import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import DragHandle from "@mui/icons-material/DragHandle";
import MenuSectionRowAccordion from "./MenuSectionRowAccordion";

const MenuSectionRow = ({ id, index = -1, removeFn = () => {} }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width:"100%",
                columnGap:"1rem",
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <IconButton onClick={removeFn}>
                <RemoveIcon />
            </IconButton>
            <MenuSectionRowAccordion index={index} />
            <div
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                {...listeners}
            >
                <DragHandle />
            </div>
        </div>
    );
};

export default MenuSectionRow;

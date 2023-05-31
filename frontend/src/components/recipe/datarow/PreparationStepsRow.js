import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import TextArea from "../../common/form/TextArea";
import DragHandle from "@mui/icons-material/DragHandle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFormContext } from "react-hook-form";

const PreparationStepsRow = ({ id, index = -1, removeFn = () => {} }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <IconButton onClick={removeFn}>
                <RemoveIcon />
            </IconButton>
            <TextArea
                rules={{ required: true }}
                label={`Step ${index + 1}`}
                name={`steps.${index}.text`}
                nestedError={errors.steps?.[index]?.text}
            />
            <div
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                {...listeners}
            >
                <DragHandle />
            </div>
        </div>
    );
};

export default PreparationStepsRow;

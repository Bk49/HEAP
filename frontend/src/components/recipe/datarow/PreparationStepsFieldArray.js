import { useFieldArray } from "react-hook-form";
import PreparationStepsRow from "./PreparationStepsRow";
import { Fragment } from "react";
import HeadingThree from "../../common/heading/HeadingThree";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const PreparationStepsFieldArray = () => {
    const { fields, append, remove, move } = useFieldArray({ name: "steps" });
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <Fragment>
            <HeadingThree add={true} addFn={() => append({ text: "" })}>
                Preparation Steps
            </HeadingThree>

            <DndContext
                onDragEnd={(event) => {
                    const { active, over } = event;
                    if (active.id !== over.id) {
                        const oldIndex = fields.findIndex(
                            (field) => field.id === active.id
                        );
                        const newIndex = fields.findIndex(
                            (field) => field.id === over.id
                        );

                        move(oldIndex, newIndex);
                    }
                }}
                sensors={sensors}
                collisionDetection={closestCenter}
            >
                <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={fields.map((field) => field.id)}
                >
                    <div
                        style={{
                            marginTop: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        {fields.map((field, index) => (
                            <PreparationStepsRow
                                key={field.id}
                                id={field.id}
                                index={index}
                                removeFn={() => {
                                    remove(
                                        fields.findIndex(
                                            ({ id }) => id === field.id
                                        )
                                    );
                                }}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </Fragment>
    );
};

export default PreparationStepsFieldArray;

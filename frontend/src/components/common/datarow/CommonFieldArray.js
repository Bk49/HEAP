import { useFieldArray } from "react-hook-form";
import TextField from "../form/TextField";
import { Fragment } from "react";
import HeadingThree from "../heading/HeadingThree";

const CommonFieldArray = ({
    name = "fieldary",
    appendObj = { name: "" },
    heading,
    Component = TextField,
}) => {
    const { fields, append, remove } = useFieldArray({ name: name });

    return (
        <Fragment>
            <HeadingThree add={true} addFn={() => append(appendObj)}>
                {heading}
            </HeadingThree>
            <div
                style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {fields.map((field, index) => (
                    <Component
                        removeFn={() => remove(index)}
                        key={field.id}
                        index={index}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default CommonFieldArray;

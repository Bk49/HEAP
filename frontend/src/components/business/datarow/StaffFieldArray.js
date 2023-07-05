import { useFieldArray } from "react-hook-form";
import StaffRow from "./StaffRow";
import { Fragment } from "react";
import HeadingThree from "../../common/heading/HeadingThree";

const StaffFieldArray = () => {
    const { fields, append, remove } = useFieldArray({
        name: "staffs",
    });

    return (
        <Fragment>
            <HeadingThree
                add={true}
                addFn={() => append({ name: "", hiringMethod: "", position: "" })}
            >
                Staffs
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
                    <StaffRow
                        removeFn={() => remove(index)}
                        key={field.id}
                        index={index}
                    />
                ))}
            </div>
        </Fragment>
    )
};

export default StaffFieldArray;
import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import HeadingThree from "../../../common/heading/HeadingThree";
import ContentsToBeUploadedRow from "./ContentsToBeUploadedRow";

const ContentsToBeUploadedFieldArray = () => {
    const { fields, append, remove } = useFieldArray({ name: "contents" });

    return (
        <Fragment>
            <HeadingThree
                add={true}
                addFn={() => append({ name: "", file: null, date: "" })}
            >
                Contents to be Uploaded
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
                    <ContentsToBeUploadedRow
                        removeFn={() => remove(index)}
                        key={field.id}
                        index={index}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default ContentsToBeUploadedFieldArray;

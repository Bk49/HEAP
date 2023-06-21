import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import HeadingThree from "../../common/heading/HeadingThree";
import ContainersSourcingRow from "./ContainersSourcingRow";

const ContainersSourcingFieldArray = () => {
    const { fields, append, remove } = useFieldArray({
        name: "containers",
    });

    return (
        <Fragment>
            <HeadingThree
                add={true}
                addFn={() =>
                    append({
                        containerName: "",
                        vendorName: "",
                        price: "",
                        quantity: "",
                    })
                }
            >
                Containers Sourcing
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
                    <ContainersSourcingRow
                        removeFn={() => remove(index)}
                        key={field.id}
                        index={index}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default ContainersSourcingFieldArray;

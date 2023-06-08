import { Fragment } from "react";
import TextIconButton from "../../common/button/TextIconButton";
import { useFieldArray } from "react-hook-form";
import MenuSectionItemsRow from "./MenuSectionItemsRow";

const MenuSectionItemsFieldsArray = ({ index = -2 }) => {
    const { fields, append, remove } = useFieldArray({
        name: `sections.${index}.items`,
    });

    return (
        <Fragment>
            <TextIconButton
                onClick={() => append({ item: "", price: 0 })}
                type="secondary"
            >
                Add Item
            </TextIconButton>
            <div
                style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {fields.map((field, fieldIndex) => (
                    <MenuSectionItemsRow
                        key={field.id}
                        removeFn={() => remove(index)}
                        sectionIndex={index}
                        itemIndex={fieldIndex}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default MenuSectionItemsFieldsArray;

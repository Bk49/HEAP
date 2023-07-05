import { Fragment } from "react";
import { useFieldArray } from "react-hook-form";
import HeadingThree from "../../../common/heading/HeadingThree";
import InfluencerCollaborationRow from "./InfluencerCollaborationRow";

const InfluencerCollaborationFieldArray = () => {
    const { fields, append, remove } = useFieldArray({ name: "influencer" });

    return (
        <Fragment>
            <HeadingThree
                add={true}
                addFn={() =>
                    append({ name: "", email: "", phone: "", price: 0 })
                }
            >
                Influencers Collaboration
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
                    <InfluencerCollaborationRow
                        removeFn={() => remove(index)}
                        key={field.id}
                        index={index}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default InfluencerCollaborationFieldArray;

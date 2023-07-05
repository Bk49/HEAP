import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import TextField from "../../../common/form/TextField";
import TextArea from "../../../common/form/TextArea";
import SingleItemDropdown from "../../../common/form/SingleItemDropdown";
import ContainersSourcingFieldArray from "../../datarow/container/ContainersSourcingFieldArray";

const BGPOutletExpansionForm = () => {
    return (
        <Fragment>
            <HeadingThree>Outlet Expansion Address and Location</HeadingThree>
            <FieldsColumn>
            <FieldsRow>
                <TextArea
                    rules={{ required: true }}
                    label="Outlet Expansion Address and Location"
                    name="address"
                />
            </FieldsRow>
            </FieldsColumn>

            <StaffFieldArray />

            <HeadingThree>Other Details</HeadingThree>
            <FieldsColumn>
            <FieldsRow>
                <TextField
                    rules={{ required: true }}
                    label="Rental Price"
                    name="rentalPrice"
                    type="number"
                />
                <TextField
                    rules={{ required: true }}
                    label="Renovation Est. Cost"
                    name="renovation"
                    type="number"
                />
            </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default BGPOutletExpansionForm;
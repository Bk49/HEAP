import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import TextField from "../../../common/form/TextField";
import SingleItemDropdown from "../../../common/form/SingleItemDropdown";

const BGPOutletExpansionForm = () => {
    return (
        <Fragment>
            <HeadingThree>Outlet Expansion Address and Location</HeadingThree>
            <FieldsColumn>
            <FieldsRow>
                <TextField
                    rules={{ required: true }}
                    label="Outlet Expansion Address and Location"
                    name="address"
                />
            </FieldsRow>
            </FieldsColumn>

            <HeadingThree>Staffs</HeadingThree>
            <FieldsColumn>
            <FieldsRow>
                <TextField
                    rules={{ required: true }}
                    label="Staff Name"
                    name="staffName"
                />
                 <SingleItemDropdown
                    rules={{ required: true }}
                    label="Hiring Method"
                    name="hiringMethod"
                />
                <SingleItemDropdown
                    rules={{ required: true }}
                    label="Position"
                    name="position"
                />
            </FieldsRow>
            </FieldsColumn>
        </Fragment>
    );
};

export default BGPOutletExpansionForm;
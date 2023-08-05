import { Fragment } from "react";
import HeadingThree from "../../../common/heading/HeadingThree";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import TextField from "../../../common/form/TextField";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import StaffRow from "../../datarow/StaffRow";
import Map from "../../map/Map";

const BGPOutletExpansionForm = () => {
    return (
        <Fragment>
            <HeadingThree>Outlet Expansion Address and Location</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <Map
                        rules={{ required: true }}
                        label="Outlet Expansion Address and Location"
                        name="address"
                    />
                </FieldsRow>
            </FieldsColumn>

            <CommonFieldArray
                name="staffs"
                appendObj={{ name: "", hiringMethod: "", position: "" }}
                heading="Staffs"
                Component={StaffRow}
            />

            <HeadingThree>Other Details</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <TextField
                        rules={{ required: true, min: 0 }}
                        label="Rental Price"
                        name="rentalPrice"
                        type="number"
                    />
                    <TextField
                        rules={{ required: true, min: 0 }}
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

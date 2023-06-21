import { Fragment } from "react";
import FieldsColumn from "../common/form/FieldsColumn";
import FieldsRow from "../common/form/FieldsRow";
import SingleItemDropdown from "../common/form/SingleItemDropdown";
import HeadingThree from "../common/heading/HeadingThree";
import ContainersSourcingFieldArray from "../business/datarow/ContainersSourcingFieldArray";
import SubmitFormGroup from "../common/form/SubmitFormGroup";
import FoodDeliveryMarketplaceCardGroup from "../business/cardgroup/FoodDeliveryMarketplaceCardGroup";
const BGPFoodDeliveryForm = ({ isCreate }) => {
    return (
        <Fragment>
            <HeadingThree>Marketplace to Explore</HeadingThree>
            <FieldsColumn>
                <FieldsRow>
                    <FoodDeliveryMarketplaceCardGroup />
                </FieldsRow>
                <FieldsRow>
                    <SingleItemDropdown
                        name="menuId"
                        label="Menu Attached"
                        choices={[
                            {
                                text: "Please Select a menu to attach",
                                value: "",
                            },
                        ]}
                    />
                </FieldsRow>
            </FieldsColumn>
            <ContainersSourcingFieldArray />
            <SubmitFormGroup
                submitErrorText={`${
                    isCreate ? "Creation" : "Update"
                } of business growth plan is unsuccessful, please check your input`}
            />
        </Fragment>
    );
};

export default BGPFoodDeliveryForm;
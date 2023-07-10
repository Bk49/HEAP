import { Fragment } from "react";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import SingleItemDropdown from "../../../common/form/SingleItemDropdown";
import HeadingThree from "../../../common/heading/HeadingThree";
import FoodDeliveryMarketplaceCardGroup from "../../cardgroup/FoodDeliveryMarketplaceCardGroup";
import CommonFieldArray from "../../../common/datarow/CommonFieldArray";
import ContainersSourcingRow from "../../datarow/ContainersSourcingRow";

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
            <CommonFieldArray
                name="containers"
                appendObj={{
                    containerName: "",
                    vendorName: "",
                    price: "",
                    quantity: "",
                }}
                heading="Containers Sourcing"
                Component={ContainersSourcingRow}
            />
        </Fragment>
    );
};

export default BGPFoodDeliveryForm;

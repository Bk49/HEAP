import FieldsColumn from "../../common/form/FieldsColumn";
import FieldsRow from "../../common/form/FieldsRow";
import TextField from "../../common/form/TextField";
import DatePicker from "../../common/form/DatePicker";
import SingleItemDropdown from "../../common/form/SingleItemDropdown";
import { planType, priorityChoices } from "../../../constants/dropdown-choices";
import Grid from "@mui/material/Grid";
import FoodDeliveryIllustration from "../../../assets/illustrations/business/food-delivery-illustration.jpg";
import MarketingIllustration from "../../../assets/illustrations/business/marketing-illustration.jpg";
import OutletExpansionIllutration from "../../../assets/illustrations/business/outlet-expansion-illustration.jpg";
import { useFormContext } from "react-hook-form";

const BasicDetailsSection = ({ defaultPlan = "" }) => {
    const { watch } = useFormContext();
    const currentPlan = watch("planType");

    return (
        <Grid container direction="row" spacing={1}>
            <Grid item xs={9}>
                <FieldsColumn>
                    <FieldsRow>
                        <TextField
                            rules={{ required: true }}
                            name="planName"
                            label="Plan Name"
                        />
                        <DatePicker
                            rules={{
                                required: true,
                                disablePast: true,
                            }}
                            name="startDate"
                            label="Expected Start Date"
                        />
                        <DatePicker
                            rules={{
                                required: true,
                                disablePast: true,
                            }}
                            name="endDate"
                            label="Deadline"
                        />
                    </FieldsRow>
                    <FieldsRow>
                        <TextField
                            rules={{ required: true, min: 0 }}
                            name="budget"
                            label="Expected Budget"
                            type="number"
                        />
                        <SingleItemDropdown
                            rules={{ required: true }}
                            name="priority"
                            label="Priority"
                            choices={priorityChoices}
                        />
                    </FieldsRow>
                    <FieldsRow>
                        <SingleItemDropdown
                            rules={{ required: true }}
                            name="planType"
                            label="Business Growth Plan Type"
                            choices={planType}
                            size="large"
                            defaultValue={defaultPlan}
                            disabled={defaultPlan !== ""}
                        />
                    </FieldsRow>
                </FieldsColumn>
            </Grid>
            <Grid item xs={3}>
                <div
                    style={{
                        height: "100%",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundImage: `url(${
                            currentPlan === "FD"
                                ? FoodDeliveryIllustration
                                : currentPlan === "OE"
                                ? OutletExpansionIllutration
                                : currentPlan === "MK"
                                ? MarketingIllustration
                                : ""
                        })`,
                        backgroundPosition: "center",
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default BasicDetailsSection;

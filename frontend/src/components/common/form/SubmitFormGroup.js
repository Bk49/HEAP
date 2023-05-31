import Divider from "@mui/material/Divider";
import { Fragment } from "react";
import SmallButton from "../button/SmallButton";
import { useFormContext } from "react-hook-form";
import { useSnackbar } from "notistack";
import { queueError } from "../../../functions/formHandling";

const SubmitFormGroup = ({
    onSubmit = (data) => console.log(data),
    submitErrorText = "Form submission unsuccessful",
    submitText = "Confirm Changes",
}) => {
    const {
        handleSubmit,
        getValues,
        formState: { isValid },
    } = useFormContext();
    const { enqueueSnackbar } = useSnackbar();

    return (
        <Fragment>
            <Divider sx={{ margin: "1rem 0" }} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: "1rem",
                }}
            >
                <SmallButton type="default">Return</SmallButton>
                <SmallButton
                    onClick={() => {
                        handleSubmit(onSubmit, (e) => console.error(e))();
                        console.log(getValues())
                        if (!isValid) {
                            queueError(submitErrorText, enqueueSnackbar);
                        }
                    }}
                    type="primary"
                >
                    {submitText}
                </SmallButton>
            </div>
        </Fragment>
    );
};

export default SubmitFormGroup;

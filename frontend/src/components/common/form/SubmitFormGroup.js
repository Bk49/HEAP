import Divider from "@mui/material/Divider";
import { Fragment, useEffect, useState } from "react";
import SmallButton from "../button/SmallButton";
import { useFormContext } from "react-hook-form";
import { useSnackbar } from "notistack";
import { enqueueError } from "../../../functions/formHandling";

const SubmitFormGroup = ({
    onSubmit = (data) => console.log(data),
    submitErrorText = "Form submission unsuccessful",
    submitText = "Confirm Changes",
}) => {
    const {
        handleSubmit,
        formState: { errors },
    } = useFormContext();
    const { enqueueSnackbar } = useSnackbar();
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        enqueueError(submitErrorText, errors, enqueueSnackbar);
    }, [enqueueSnackbar, errors, submitErrorText, update]);

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
                        handleSubmit(onSubmit)();
                        setUpdate((prev) => prev + 1);
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

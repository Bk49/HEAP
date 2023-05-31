import TextIconButton from "../button/TextIconButton";

const HeadingThree = ({
    children = "Heading Three",
    add = false,
    addFn = () => {},
}) => {
    return (
        <div
            style={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <span
                style={{
                    color: "#43ACD9",
                    fontFamily: "Cocogoose",
                    fontSize: "1.2rem",
                }}
            >
                {children}
            </span>
            {add && (
                <TextIconButton onClick={addFn} type="secondary">
                    Add
                </TextIconButton>
            )}
        </div>
    );
};

export default HeadingThree;

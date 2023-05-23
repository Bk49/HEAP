const FieldsRow = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
            }}
        >
            {children}
        </div>
    );
};

export default FieldsRow;
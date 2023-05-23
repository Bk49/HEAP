const FieldsColumn = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                margin: "1rem 0",
            }}
        >
            {children}
        </div>
    );
};

export default FieldsColumn;

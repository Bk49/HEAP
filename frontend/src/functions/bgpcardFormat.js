const bgpCardFormat = {
    formatDate: (inputDate) => {
        const [day, monthStr, year] = inputDate.split("/");
        const month = new Date(year, parseInt(monthStr) - 1).toLocaleString("en-US", { month: "long" });

        return `${day} ${month} ${year}`;
    },

    formatPrice: (number) =>
        number.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }),

    formatPriority: (number) =>
        `${number === 5 || number === 1 ? "Very " : ""}${
            number > 3 ? "High" : number < 3 ? "Low" : "Medium"
        } Priority`,
};

export default bgpCardFormat;

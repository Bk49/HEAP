export const generateRules = ({
    name,
    required = false,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    patternMsg = `${name} pattern is incorrect`,
    customRules,
}) => {
    const rule = { ...customRules };
    if (required) {
        rule.required = `${name} is required`;
    }
    if (min !== undefined) {
        rule.min = { value: min, message: `${name} has to be at least ${min}` };
    }
    if (max !== undefined) {
        rule.max = { value: max, message: `${name} has to be at most ${max}` };
    }
    if (minLength !== undefined) {
        rule.minLength = {
            value: minLength,
            message: `${name}'s minimum length is ${minLength} characters`,
        };
    }
    if (maxLength !== undefined) {
        rule.maxLength = {
            value: maxLength,
            message: `${name}'s maximum length is ${maxLength} characters`,
        };
    }
    if (pattern) {
        rule.pattern = {
            value: pattern,
            message: patternMsg,
        };
    }

    return rule;
};

export const generateRules = ({
    name,
    required = true,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    patternMsg = `${name} pattern is incorrect`,
}) => {
    const rule = {};
    if (required) {
        rule.required = `${name} is required`;
    }
    if (min) {
        rule.min = { value: min, message: `${name} has to be at least ${min}` };
    }
    if (max) {
        rule.max = { value: max, message: `${name} has to be at most ${max}` };
    }
    if (minLength) {
        rule.minLength = {
            value: minLength,
            message: `${name}'s minimum length is ${minLength} characters`,
        };
    }
    if (maxLength) {
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

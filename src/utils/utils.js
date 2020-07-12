export const resolveServerValidationErrorMessages = (errors) => {
  const newErrors = {};
  Object.keys(errors).forEach((key) => {
    if (typeof errors[key] === 'string') {
      newErrors[key] = errors[key];
    } else {
      newErrors[key] = resolveServerValidationErrorMessages(errors[key]);
    }
  });
  return newErrors;
};

export const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

/**
 * Interpolate the given template string with the values provided in
 *  replacementParams and return the interpolated string. The template syntax:
 *    'literal {varName}'
 *
 * Usage example: interpolateString('literal {varName}', {varName: 123})
 *
 * @param {string} templateString Template string to be interpolated
 * @param {object} replacementParams Mapping of variable names to values
 *
 * @returns {string} Interpolated string
 */
export const interpolateString = (templateString, replacementParams) =>
  templateString.replace(
    /\{(\w+)\}/g,
    (_match, varName) => replacementParams[varName],
  );

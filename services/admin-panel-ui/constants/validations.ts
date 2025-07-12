export enum EValidationMessages {
  REQUIRED = "This field is required",
}

export const getMinLengthErrorMessage = (limitValue: number) =>
  `Min. length is ${limitValue} symb.`;

export const getMaxLengthErrorMessage = (limitValue: number) =>
  `Max. length is ${limitValue} symb.`;

export const getPleaseEnterAValidFieldErrorMessage = (fieldName: string) =>
  `Please enter a valid ${fieldName}`;

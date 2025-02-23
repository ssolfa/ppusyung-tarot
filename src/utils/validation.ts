import { ERROR_MESSAGES } from '@/constants/constants';
import { ErrorType, FormProps } from '@/types/form.types';

export const validateForm = ({ name, phoneNumber }: FormProps): ErrorType => {
  const errors: ErrorType = {};

  if (!name.trim()) {
    errors.name = ERROR_MESSAGES.REQUIRED_NAME;
  }

  if (phoneNumber.length < 10) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE;
  }

  return errors;
};

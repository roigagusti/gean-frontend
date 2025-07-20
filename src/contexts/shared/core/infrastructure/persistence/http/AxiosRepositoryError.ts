import { ErrorTypes } from "@contexts/shared/core/infrastructure/persistence/http/ErrorTypes";

export class AxiosRepositoryError {
  constructor(error_type: string) {
    const error_message = ErrorTypes[error_type as keyof typeof ErrorTypes];

    return new Error(error_message);
  }
}

import { envAppPortSchema, envFileUploadSchema, envFrontendUrlSchema, envJwtSchema, envMailSchema } from '@guitar-shop/core';
import Joi from 'joi';

export const envValidationSchema = Joi.object()
  .concat(envAppPortSchema)
  .concat(envFrontendUrlSchema)
  .concat(envJwtSchema)
  .concat(envFileUploadSchema)
  .concat(envMailSchema);

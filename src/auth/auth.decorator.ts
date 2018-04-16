import { ReflectMetadata } from '@nestjs/common';

export const Auth = (required: boolean = true) => ReflectMetadata('auth', required);

import { NotFoundException, Logger } from '@nestjs/common';

export class ProductsNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Products not found`;
    super(message);
    this.logger.error(message);
  }
}

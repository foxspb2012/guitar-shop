import { NotFoundException, Logger } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    const message = `Product with the id — ${id} not found`;
    super(message);
    this.logger.error(message);
  }
}

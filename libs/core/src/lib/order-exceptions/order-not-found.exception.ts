import { NotFoundException, Logger } from '@nestjs/common';

export class OrderNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    const message = `Order with the id — ${id} not found`;
    super(message);
    this.logger.error(message);
  }
}

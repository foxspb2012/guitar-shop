import { NotFoundException, Logger } from '@nestjs/common';

export class CommentNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    const message = `There are no comments for product with the id — ${id}`;
    super(message);
    this.logger.error(message);
  }
}

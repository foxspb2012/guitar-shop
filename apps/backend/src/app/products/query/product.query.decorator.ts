import { ApiQuery } from "@nestjs/swagger";
import { applyDecorators } from '@nestjs/common';
import { Guitar, StringsCount } from "@guitar-shop/shared-types";
import { ProductSort } from "../product.constant";

export function IndexQuery() {
  return applyDecorators(
    ApiQuery({ name: 'limit', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'page', description: '', required: false, type: () => Number }),
    ApiQuery({ name: 'guitarType', description: '', required: false, enum: Guitar }),
    ApiQuery({ name: 'stringCount', description: '', required: false, enum: StringsCount }),
    ApiQuery({ name: 'sortType', description: '', required: false, enum: ProductSort }),
    ApiQuery({ name: 'sortDirection', description: '', required: false, enum: ['asc', 'desc'] }),
    ApiQuery({ name: 'searchInTitle', description: '', required: false, type: () => String }),
  );
}

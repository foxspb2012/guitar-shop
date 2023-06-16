export enum CommentValidity {
  IdMinValue = 0,
  AdvantagesMinLength = 50,
  AdvantagesMaxLength = 100,
  DisadvantagesMinLength = 50,
  DisadvantagesMaxLength = 100,
  ContentMinLength = 5,
  ContentMaxLength = 1024,
  ScoreMinValue = 1,
  ScoreMaxValue = 5,
}

export const CommentDefaults = {
  Score: CommentValidity.ScoreMinValue,
} as const;

export const CommentQueryDefault = {
  DEFAULT_COMMENT_QUERY_LIMIT: 50,
  DEFAULT_COMMENT_SORT_DIRECTION: 'desc',
} as const;

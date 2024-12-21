export type Align = 'left' | 'right' | 'center';

export type CellProps = {
  align?: Align;
  className?: string;
};

export type TableHeadItem =
  | JSX.Element
  | string
  | { content: JSX.Element | string; props?: CellProps };

export type TableHeadItems = TableHeadItem[];

export type RenderRow<Head extends readonly TableHeadItem[]> = {
  [K in keyof Head]: string | JSX.Element | { content: JSX.Element; props?: CellProps };
};

export type TableRenderReturnType<T extends TableHeadItem[]> = RenderRow<T>;

export type Column<Head> = {
  [K in keyof Head]: number;
};

type Fix<Head> = {
  [K in keyof Head]: 'fix' | 'auto';
};

export type FixColumn<Head> =
  | Fix<Head>
  | {
      [key in ScreenSizes]: Fix<Head>;
    };

export type ScreenSizes = 1920 | 1440 | 1280;

export type ColumnSizes<Head> =
  | {
      [key in ScreenSizes]: Column<Head>;
    }
  | Column<Head>;

export type NotFoundProps = {
  content: JSX.Element;
  isActive?: boolean;
};

export type TableClassNames = {
  table?: string;
  head?: string;
  body?: string;
  headRow?: string;
  headCell?: string;
  bodyRow?: string;
  bodyCell?: string;
};

export type TableHeadClassNames = Partial<Pick<TableClassNames, 'head' | 'headCell' | 'headRow'>>;

export type TableBodyClassNames = Partial<Pick<TableClassNames, 'bodyCell' | 'bodyRow'>>;

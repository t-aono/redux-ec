export type OnMenuClose = (e: MenuEvent) => void;

export type MenuEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement, MouseEvent>;

export type NonEmptyArray<Element> = {
  0: Element;
} & Element[];

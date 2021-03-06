export const mapArray =
  <InputElement, OutputElement>(
    mapFn: (
      input: InputElement,
      index: number,
      array: InputElement[]
    ) => OutputElement
  ) =>
  (input: InputElement[]): OutputElement[] =>
    input.map(mapFn);

export const mapHead =
  <Element>(mapFn: (input: Element) => Element) =>
  (input: Element[]): Element[] =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    input.length === 0 ? [] : [mapFn(input[0]!), ...input.slice(1)];

export const mapTail =
  <Element>(
    mapFn: (input: Element, index: number, array: Element[]) => Element
  ) =>
  (input: Element[]): Element[] =>
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    input.length === 0 ? [] : [input[0]!, ...input.slice(1).map(mapFn)];

export const mapLast =
  <Element>(mapFn: (input: Element) => Element) =>
  (input: Element[]): Element[] => {
    if (!input.length) {
      return [];
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const last = input.slice(-1)[0]!;
    return [...input.slice(0, -1), mapFn(last)];
  };

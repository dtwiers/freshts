export const chunk =
  (chunkSize: number) =>
  <Element>(list: Element[]): Element[][] => {
    if (chunkSize === 0) {
      return [list];
    }
    const newArrayLength = Math.ceil(list.length / chunkSize);
    return [...Array(newArrayLength)].map((_, idx) =>
      list.slice(idx * chunkSize, (idx + 1) * chunkSize)
    );
  };

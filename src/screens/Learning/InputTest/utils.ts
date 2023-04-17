import dataToeic, {DataWord} from 'src/assets/dataToeic';

export const LIST_WORD = dataToeic
  .map(item => {
    return item.data_child;
  })
  .flat();

export const LIST_WORĐ_RANDOM: {
  idx: number;
  words: DataWord[];
}[] = [];

export const getRandomThreeAnotherWord = (idx: number) => {
  if (
    LIST_WORĐ_RANDOM.length !== 0 &&
    LIST_WORĐ_RANDOM.find(item => item.idx === idx)
  ) {
    return LIST_WORĐ_RANDOM.find(item => item.idx === idx)?.words;
  }

  const arr: number[] = [];
  while (arr.length < 3) {
    const rd = Math.floor(Math.random() * LIST_WORD.length);
    if (rd !== idx && !arr.includes(rd)) {
      arr.push(rd);
    }
  }

  const listResult = [
    LIST_WORD[idx],
    LIST_WORD[arr[0]],
    LIST_WORD[arr[1]],
    LIST_WORD[arr[2]],
  ].sort(() => Math.random() - 0.5);

  LIST_WORĐ_RANDOM.push({
    idx,
    words: listResult,
  });
  if (LIST_WORĐ_RANDOM.length > 3) {
    LIST_WORĐ_RANDOM.shift();
  }
  return listResult;
};

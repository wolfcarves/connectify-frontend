export const concatContraction = (word: string) => {
  const _word = word.split(' ')[0];
  const canBeContact = _word[_word.length - 1].toLowerCase() !== 's';

  if (canBeContact) {
    return _word + "'s";
  }

  return word;
};

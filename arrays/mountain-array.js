function isMountain(arr) {
  if (arr.length < 3) {
    return false;
  }

  const max = Math.max(...arr);
  const maxIdx = arr.indexOf(max);

  if (maxIdx === arr.length - 1 || maxIdx === 0) {
    return false;
  }

  for (let i = 0; i < maxIdx; i++) {
    if (arr[i + 1] && arr[i] >= arr[i + 1]) {
      return false;
    }
  }

  for (let j = maxIdx; j < arr.length; j++) {
    if (arr[j + 1] && arr[j] <= arr[j + 1]) {
      return false;
    }
  }

  return true;
}

export default isMountain;
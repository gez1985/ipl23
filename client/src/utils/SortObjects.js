export default function sortObjects(object, sortBy) {
  object.sort((a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    } else {
      return -1;
    }
  });
  object.reverse();
}
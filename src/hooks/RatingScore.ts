export const RatingScore = (rating: number) => {
  if (rating >= 7) {
    return 'green';
  } else if (rating >= 5) {
    return 'orange';
  } else if (rating >= 3) {
    return 'orange';
  } else {
    return 'red';
  }
};

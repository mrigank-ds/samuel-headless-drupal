/**
 * limitDescription Function - To limit the number of description
 * @param description
 * @param limit
 * @returns Description with limited words
 */
const limitDescription = (description, limit) => {
  const words = description.split(" ");

  if (words.length > limit) {
    const truncatedWords = words.slice(0, limit);
    return `${truncatedWords.join(" ")} ...`;
  }

  return description;
};
export default limitDescription;

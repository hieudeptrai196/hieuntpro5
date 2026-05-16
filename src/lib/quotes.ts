/**
 * Engineering wisdom drops. One is rolled each time the vault opens.
 */
export const proverbs = [
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
  { text: "Code is read more often than it is written.", author: "Guido van Rossum" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "The best code is no code at all.", author: "Jeff Atwood" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  {
    text:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    text:
      "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
  },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  {
    text:
      "There are only two hard things in Computer Science: cache invalidation and naming things.",
    author: "Phil Karlton",
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place.",
    author: "Brian Kernighan",
  },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  {
    text: "The function of good software is to make the complex appear simple.",
    author: "Grady Booch",
  },
  { text: "Walk without rhythm, and you won't attract the worm.", author: "Old Saying" },
  { text: "The wound is the place where the light enters you.", author: "Rumi" },
] as const;

export type Proverb = (typeof proverbs)[number];

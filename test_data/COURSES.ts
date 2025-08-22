export const COURSES = [
  "Web Development", "Python", "UX Design", "Database Design",
  "Javascript", "HTML & CSS", "Intro to Coding", "Apps & Games"
] as const;

export type Course = (typeof COURSES)[number];

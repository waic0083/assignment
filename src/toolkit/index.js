export const courseCodeIs = courseCode => enrollment => enrollment.courseCode === courseCode;

export const mapGradeByCourseCode = (ret, cur) => {
  ret[cur.courseCode] = cur;
  return ret;
}
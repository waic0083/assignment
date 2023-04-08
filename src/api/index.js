export const httpGet = (url) => (params) => {
  const query = new URLSearchParams();

  for (const [k, v] of Object.entries(params)) {
    if (v) {
      query.append(k, v);
    }
  } ;

  // query.append('studentId', studentId);
  // query.append('courseCode', courseCode);
  // query.append('semester', semester);
  // query.append('take', take);

  return fetch(`/${url}?${query.toString()}`).then(res => res.json());
}

export const fetchGrades = httpGet('grade');
export const fetchEnrollments = httpGet('enrollments');
export const fetchStatistic = httpGet('gradestatistics');
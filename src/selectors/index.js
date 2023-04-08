import {
  STATE_ENROLLMENTS,
  STATE_GRADES,
  STATE_STATISTIC,
  STATE_STUDENT_ID,
  STATE_STUDENT_NAME,
  STATE_APP_ERROR,
  STATE_SELECTED_COURSE_CODE
} from "../constant";

const getState = field => state => state[field];

export const getEnrollments = getState(STATE_ENROLLMENTS);
export const getGrades = getState(STATE_GRADES);
export const getStudentId = getState(STATE_STUDENT_ID);
export const getStatistic = getState(STATE_STATISTIC);
export const getStudentName = getState(STATE_STUDENT_NAME);
export const getAppError = getState(STATE_APP_ERROR);
export const getSelectedCourseCode = getState(STATE_SELECTED_COURSE_CODE);
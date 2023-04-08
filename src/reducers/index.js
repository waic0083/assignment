import {
  STATE_ENROLLMENTS,
  STATE_GRADES,
  STATE_STATISTIC,
  STATE_SEMESTER,
  STATE_STUDENT_ID,
  STATE_STUDENT_NAME,
  FETCH_GRADES,
  FETCH_STATISTIC,
  FETCH_ALL,
  STATE_APP_ERROR,
  STATE_SELECTED_COURSE_CODE
} from "../constant";
import { createReducer, createAction } from '@reduxjs/toolkit';

const initialState = {
  [STATE_ENROLLMENTS]: [],
  [STATE_GRADES]: [],
  [STATE_STATISTIC]: {},
  [STATE_SEMESTER]: [
    {key: '202301', label:'202301'},
    {key:'202202', label:'202202'}
  ],
  [STATE_STUDENT_ID]: '999000099',
  [STATE_SELECTED_COURSE_CODE]: '',
  [STATE_STUDENT_NAME]: 'Jone',
  [STATE_APP_ERROR]: null
};

const update = createAction('UPDATE_FIELD');

const updateState = field => payload => update({value: payload, field});

export const fail = createAction('FAIL');
export const updateGradesAction = updateState(STATE_GRADES);
export const updateEnrollmentsAction = updateState(STATE_ENROLLMENTS);
export const updateStatisticAction = updateState(STATE_STATISTIC);
export const updateSelectedCourseCodeAction = updateState(STATE_SELECTED_COURSE_CODE);

export const fetchEnrollmentsAction = createAction(STATE_ENROLLMENTS);
export const fetchGradesAction = createAction(FETCH_GRADES);
export const fetchStatisticAction = createAction(FETCH_STATISTIC);
export const fetchAllAction = createAction(FETCH_ALL);

export default createReducer(initialState, (builder) => 
  builder
    .addCase(update, (state, action) => {
      const {field, value} = action.payload;
      state[field] = value;
    })
    .addCase(fail, (state, action) => {
      const {field, message} = action.payload;
      state[STATE_APP_ERROR] = {message, field};
      state[field] = initialState[field];
    })
);
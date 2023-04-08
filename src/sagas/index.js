import { call, put, all, takeLatest } from 'redux-saga/effects'

import * as actions from "../reducers";
import {
  STATE_ENROLLMENTS,
  STATE_GRADES,
  STATE_STATISTIC,
  FETCH_STATISTIC,
  FETCH_ALL,
  ERROR
} from "../constant";
import * as API from "../api";

import { courseCodeIs } from "../toolkit";

const fetchData = (apiCall, field, onSuccess, onFail, errorMessage) => function* _fetchData(dispatchedAction) {
  try {
    // console.log('>>> call:' + field);
    const value = yield call(apiCall, dispatchedAction.payload);
    yield put(onSuccess(value));
    // console.log('>>> update:' + field);
    return value;
  } catch (e) {
    yield put(onFail({field, message: errorMessage || e.message }));
    console.error(e);
  }
  return null;
}

const fetchEnrollments = fetchData(
    API.fetchEnrollments,
    STATE_ENROLLMENTS,
    actions.updateEnrollmentsAction,
    actions.fail,
    ERROR.FETCH_ENROLLMENTS_FAIL
  );

const fetchStatistic = fetchData(
    API.fetchStatistic,
    STATE_STATISTIC,
    actions.updateStatisticAction,
    actions.fail,
    ERROR.FETCH_STATISTIC_FAIL
  );

const fetchGrades = fetchData(
    API.fetchGrades,
    STATE_GRADES,
    actions.updateGradesAction,
    actions.fail,
    ERROR.FETCH_GRADES_FAIL
  );

const fetchAll = (nextAction) => function* _fetchAll(dispatchedAction) {
  const [enrollments, grades] = yield all([
    call(fetchEnrollments, dispatchedAction),
    call(fetchGrades, dispatchedAction)
  ]);

  const { courseCode } = enrollments[0];
  yield put(nextAction.updateSelectedCourseCodeAction(courseCode));

  const [selectedGrade] = grades.filter(courseCodeIs(courseCode));

  const statisticParams = {
    ...dispatchedAction,
    payload: {
      ...dispatchedAction.payload,
      courseCode,
      take: selectedGrade?.take
    },
    type: FETCH_STATISTIC
  };
  yield put(statisticParams);
}

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_STATISTIC, fetchStatistic),
    takeLatest(FETCH_ALL, fetchAll(actions))
  ])
}
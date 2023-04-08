import { useCallback, useMemo, useRef } from "react";

import { DownloadOutlined } from '@ant-design/icons';
import { Table, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux'

import {
  API_HOST
} from "../../constant";

import * as actions from "../../reducers";
import {
  getStudentId,
  getGrades,
  getEnrollments,
  getSelectedCourseCode
} from "../../selectors";

import { courseCodeIs, mapGradeByCourseCode } from "../../toolkit";

import './style.css';

const columns = [
  {
    title: 'Course Code',
    dataIndex: 'courseCode',
    key: 'courseCode'
  },
  {
    title: 'Course Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Take',
    dataIndex: 'take',
    key: 'take',
  },
  {
    title: 'Grade',
    dataIndex: 'grade',
    key: 'grade',
  },
  {
    title: 'Exam Notebook',
    key: 'notebook',
    align: 'center',
    render: (_, record) => {
      return <DownloadLink {...record}/>
    },
  },
];

const DownloadLink = (props) => {
  const {courseCode, take} = props;

  const enrollments = useSelector(getEnrollments);
  const studentId = useSelector(getStudentId);

  const [{ semester }] = enrollments.filter(courseCodeIs(courseCode));

  const query = `studentId=${studentId}&courseCode=${courseCode}&semester=${semester}&take=${take}`;
  return <Button href={`${API_HOST}/exam?${query}`} title="Download exam notebook" download={true} icon={<DownloadOutlined />}/>
}

const mapEnrollment = grades => item => {
  const grade = grades[item.courseCode];
  
  return {
    key: item.courseCode,
    courseCode: item.courseCode,
    type: item.type,
    take: grade?.take,
    grade: grade?.finalGrade
  };
};

const useOverviewSelector = () => {
  const grades = useSelector(getGrades).reduce(mapGradeByCourseCode, {});

  const enrollments = useSelector(getEnrollments)
                      .map(mapEnrollment(grades));

  const selectedCourseCode = useSelector(getSelectedCourseCode);
  const studentId = useSelector(getStudentId);
  const selectedCourse = enrollments[selectedCourseCode];

  return {
    grades,
    studentId,
    selectedCourseCode,
    enrollments,
    selectedCourse
  };
}

const TableName = () => <h3 className="table-name">Grades</h3>;

export default function Overview() {
  const {
    grades,
    studentId,
    selectedCourseCode: initialCourseCode,
    enrollments
  } = useOverviewSelector();

  const dispatch = useDispatch();
  const previousCourseCode = useRef(initialCourseCode);

  const rowSelection = useMemo(() => ({
    type: 'radio',
    columnWidth:0,
    renderCell: () => null,
    selectedRowKeys: [initialCourseCode]
  }), [initialCourseCode]);

  const rowEvents = useCallback(record => (
    {
      onClick: ({target}) => {
        const courseCode = record.key;
        const isDifferentCourseCode = previousCourseCode.current !== courseCode;

        if (isDifferentCourseCode && target.classList.contains('ant-table-cell')) {
          dispatch(actions.updateSelectedCourseCodeAction(record.key));

          const {take, semester} = grades[courseCode];
          const payload = {
            studentId, courseCode, semester, take 
          };

          dispatch(actions.fetchStatisticAction(payload));
          previousCourseCode.current = courseCode;
        }
      }
    }), [grades, studentId, dispatch]);

  return (
    <Table
      className="overview"
      title={TableName}
      size="small"
      rowClassName="course-row"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={enrollments}
      pagination={false}
      onRow={rowEvents}
    />
  );
}
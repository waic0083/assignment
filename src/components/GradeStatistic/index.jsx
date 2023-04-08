import { useSelector } from "react-redux";
import { Collapse, Statistic, Col, Row } from "antd";

// import { STATE_STATISTIC } from "../../constant";
import { getStatistic, getGrades, getSelectedCourseCode } from "../../selectors";

import "./style.css";
import { courseCodeIs } from "../../toolkit";

const mapInvalidValueToNA = value => Object.is(value, undefined) ? 'NA' : value;

export default function GradeStatistic() {
  const {
    averageGrade,
    courseCode,
    maxGrade,
    minGrade,
    numberOfStudents,
    passRate,
    studentRank,
  } = useSelector(getStatistic);

  const grades = useSelector(getGrades);
  const selectedCourse = useSelector(getSelectedCourseCode);
  const [yourGrade] = grades.filter(courseCodeIs(courseCode));

  return (
    <Collapse bordered={false} className="statistic-collapse" expandIconPosition="end" defaultActiveKey={["1"]}>
      <Collapse.Panel className="statistic-panel" header={`Grade Statistics of Course: ${selectedCourse}`} key="1">
        <Row className="statistic-panel-row" gutter={16}>
          <Col xs={8} sm={4}>
            <Statistic className="statistic-grade" title="Your Grade" value={mapInvalidValueToNA(yourGrade?.finalGrade)} />
          </Col>
          <Col xs={16} sm={20}>
            <Row gutter={8}>
              <Col span={8}>
                <Statistic className="statistic-value" title="Your Rank" value={mapInvalidValueToNA(studentRank)} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Pass Rate" value={mapInvalidValueToNA(passRate)} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Average Grade" value={mapInvalidValueToNA(averageGrade)} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Number of Students" value={mapInvalidValueToNA(numberOfStudents)} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Max Grade" value={mapInvalidValueToNA(maxGrade)} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Min Grade" value={mapInvalidValueToNA(minGrade)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
}

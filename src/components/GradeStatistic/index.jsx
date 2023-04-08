import { useSelector } from "react-redux";
import { Collapse, Statistic, Col, Row } from "antd";

// import { STATE_STATISTIC } from "../../constant";
import { getStatistic, getGrades, getSelectedCourseCode } from "../../selectors";

import "./style.css";
import { courseCodeIs } from "../../toolkit";

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
            <Statistic className="statistic-grade" title="Your Grade" value={yourGrade?.finalGrade} />
          </Col>
          <Col xs={16} sm={20}>
            <Row gutter={8}>
              <Col span={8}>
                <Statistic className="statistic-value" title="Your Rank" value={studentRank} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Pass Rate" value={passRate} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Average Grade" value={averageGrade} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Number of Students" value={numberOfStudents} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Max Grade" value={maxGrade} />
              </Col>
              <Col span={8}>
                <Statistic className="statistic-value" title="Min Grade" value={minGrade} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
}

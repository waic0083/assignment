import React, {useCallback, useEffect } from "react";
import { Layout, Menu, message } from "antd";
import { HistoryOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'

import { STATE_SEMESTER } from "./constant";
import Overview from "./components/Overview";
import Panel from "./components/Panel";
import GradeStatistic from "./components/GradeStatistic";
import UserProfile from "./components/UserProfile";
import * as actions from "./reducers";
import {
  getStudentName,
  getStudentId,
  getAppError
} from "./selectors";

import './App.css';

const { Header, Content, Sider } = Layout;

export default function App() {
  const dispatch = useDispatch();
  const menuItems = useSelector(state => state[STATE_SEMESTER]);
  const studentId = useSelector(getStudentId);
  const studentName = useSelector(getStudentName);
  const appError = useSelector(getAppError);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = useCallback(
    event => dispatch(actions.fetchAllAction({semester: event.key, studentId})),
    [studentId, dispatch]
  );

  const defaultSemester = menuItems[0].key;
  // once app start up, fetch all courses and grades againt the current student
  // then fetch the statistic informationfor the first course
  useEffect(
    () => {dispatch(actions.fetchAllAction({semester: defaultSemester, studentId}))},
    [studentId, dispatch, defaultSemester]
  );

  useEffect(() => {appError?.message && messageApi.error(appError.message)}, [appError, messageApi]);

  return (<>
    {contextHolder}
    <Layout className="root-panel">
      <Sider
        className="root-sider"
        theme="light"
        breakpoint="sm"
        collapsedWidth="0"
        zeroWidthTriggerStyle={{zIndex: 2, left: '100%', top: '.5em'}}
      >
        <div className="logo"></div>
        <Menu
          mode="inline"
          className="slider-menu"
          onClick={fetchData}
          defaultSelectedKeys={[defaultSemester]}
          defaultOpenKeys={['semester']}
          items={[
            {key:'semester', label: 'Semester', icon: <HistoryOutlined />, children: menuItems}
          ]}
        >
        </Menu>
      </Sider>
      <Content>
        <Panel>
          <Header className="banner">
            <UserProfile studentName={studentName} />
          </Header>
          <GradeStatistic/>
          <Overview /> 
        </Panel>
      </Content>
    </Layout>
  </>);
}

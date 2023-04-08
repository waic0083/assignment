import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import "./style.css";

export default function UserProfile({studentName}) {

  return (
    <div className="profile">
      <Avatar size={`small`} icon={<UserOutlined />}/>
      <span className="name">{studentName}</span>
    </div>
  );
}
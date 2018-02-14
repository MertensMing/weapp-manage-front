import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Divider } from 'antd';
import * as teamActions from '@/store/actions/team';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import './TeamList.scss';
import { createAdd } from 'typescript';

const columns = [
  {
    title: '球队名称',
    key: 'name',
    render: data => {
      return (
        <div>
          <img className="team-logo" src={data.logo} />
          <a href={data.objectId}>{data.name}</a>
        </div>
      );
    },
  },
  {
    title: '所在学校',
    key: 'university',
    render: data => {
      return (
        <div>
          <span>{data.university && data.university.province}</span>
          <Divider type="vertical" />
          <span>{data.university && data.university.name}</span>
        </div>
      );
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => {
      return <div>{dateformat(createdAt, 'yyyy-m-dd HH:MM:ss')}</div>
    }
  },
  {
    title: '队长',
    key: 'captain',
    render: data => {
      return (
        <a href={data.captain.objectId}>{data.captain.realName || data.captain.nickName}</a>
      );
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="#">查看所有队员</a>
      </span>
    ),
  }
];

class TeamList extends PureComponent {

  static propTypes = {
    prop: PropTypes.array
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(teamActions.getTeamList());
  }

  render() {
    const { teamList, loading } = this.props;
    return (
      <Table
        rowKey="objectId"
        columns={columns}
        dataSource={teamList}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = ({ team, loading }) => {
  return {
    teamList: team.list,
    loading: loading['GET_TEAM_LIST'],
  };
};

export default connect(mapStateToProps)(TeamList)

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const UserList = ({ onDelete, users }) => {
  const columns = [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: 'Account',
    dataIndex: 'Account',
  }, {
    title: 'CreateTime',
    dataIndex: 'CreateTime',
  }];
  return (
    <Table
      bordered
      dataSource={users}
      columns={columns}
    />
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;

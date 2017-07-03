import React from 'react';
import { connect } from 'dva';
import UserList from '../components/UserList';

const Users = ({ dispatch, users }) => {
  console.log(users);
  return (
    <div>
      <UserList users={users.list} />
    </div>
  );
};

// export default Products;
export default connect(({ users }) => ({
  users,
}))(Users);

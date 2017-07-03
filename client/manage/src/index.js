import dva from 'dva';
import './index.css';

// 1. Initialize
// const app = dva();

const app = dva({
  initialState: {
    users: {
        list: [
          { id: 'dva', Account: 1, CreateTime: '123'},
          { id: 'antd', Account: 2, CreateTime: '346'},
        ]
    }
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');


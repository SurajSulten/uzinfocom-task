import { Pagination } from 'antd';
import styles from './pagination.module.css'
const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const App = () => (
  <div className={styles.pagination}>
    <Pagination
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={1}
      total={10}
    />
  </div>
);
export default App;
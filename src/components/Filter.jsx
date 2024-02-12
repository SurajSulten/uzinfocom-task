import { useState } from 'react';
import styles from './filter.module.css'

// eslint-disable-next-line react/prop-types
const Filter = ({onFilterChange}) => {
  const [nameFilter, setNameFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  // const [statusFilter, setStatusFilter] = useState('all');

  const handleNameChange = (event) => {
    const value = event.target.value;
    setNameFilter(value);
    onFilterChange({ name: value, difficulty: difficultyFilter});
  };

  const handleDifficultyChange = (event) => {
    const value = event.target.value;
    setDifficultyFilter(value);
    onFilterChange({ name: nameFilter, difficulty: value });
  };

  // const handleStatusChange = (event) => {
  //   const value = event.target.value;
  //   setStatusFilter(value);
  //   onFilterChange({ name: nameFilter, difficulty: difficultyFilter, status: value });
  // };

  return (
    <div className={styles.filter}>
      <div>
        <p>Name:</p>
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameChange}
          placeholder="Filter by Name"
          className={styles.nameInput}
        />
      </div>
      <div>
        <label>Difficulty</label> <br/>
        <select className={styles.difficulty} name="difficulty" value={difficultyFilter} onChange={handleDifficultyChange}>
          <option value="all">All</option>
          <option value="Beginner">Beginner</option>
          <option value="Basic">Basic</option>
          <option value="Normal">Normal</option>
          <option value="Medium">Medium</option>
          <option value="Advanced">Advanced</option>
          <option value="Hard">Hard</option>
          <option value="Extremal">Extremal</option>
        </select>
      </div>
      {/* <div>
        <label>Status</label>
        <select name="status" value={statusFilter} onChange={handleStatusChange}>
          <option value="all">All</option>
          <option value="unknown">Unknown</option>
          <option value="true">Solved</option>
          <option value="false">Unsolved</option>
        </select>
      </div> */}
    </div>
  );
};

export default Filter;

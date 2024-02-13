/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { LikeOutlined, DislikeOutlined, DownOutlined,  } from "@ant-design/icons";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProblems } from "./redux/slices/problemsSlice";
import Filter from "./components/Filter";
import { Pagination } from "antd";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProblems());
  }, [dispatch]);
  
  const problems = useSelector((state) => state.problems.problems);
  const [filteredProblems, setFilteredProblems] = useState(problems?.data);
  useEffect(() => {
    setFilteredProblems(problems.data);
  }, [problems.data]);

  const handleFilterChange = ({ name = nameFilter, difficulty = difficultyFilter }) => {

    const filteredData = problems.data.filter((problem) => {
      const nameMatch = name === '' || problem.title.toLowerCase().includes(name.toLowerCase());
      const difficultyMatch = difficulty === 'all' || problem.difficultyTitle === difficulty;

      return nameMatch && difficultyMatch;
    });
    setFilteredProblems(filteredData);
  };
  
  const sortByName = () => {

    const sortedData = [...filteredProblems];
    const sortOrder = sortedData[0]?.title < sortedData[1]?.title ? 1 : -1;
  
    sortedData.sort((a, b) => {
      if (a.title < b.title) {
        return sortOrder;
      }
      if (a.title > b.title) {
        return -sortOrder;
      }
      return 0;
    });

    setFilteredProblems(sortedData);
  };
  const sortByID = () => {

    const sortedData = [...filteredProblems];
    const sortOrder = sortedData[0].id < sortedData[1].id ? 1 : -1;
  
    sortedData.sort((a, b) => {
      return (a.id - b.id) * sortOrder;
    });
    setFilteredProblems(sortedData);
  };
  
  return (
    <div className={styles.container}>
      <Filter onFilterChange={handleFilterChange} />
      
      <table >
        <tr className={styles.tableHead}>
          <th style={{ width: "57px" }}>ID <DownOutlined onClick={sortByID}/></th>
          <th style={{ width: "352px" }}>Title <DownOutlined onClick={sortByName} /></th>
          <th style={{ width: "366px" }}>Tags</th>
          <th style={{ width: "105px" }}>Difficulty</th>
          <th style={{ width: "87px" }}>Rating</th>
          <th style={{ width: "108px" }}>Attempts</th>
        </tr>
        <tbody>
          {filteredProblems?.map((problem) => (
            <tr key={problem.id}>
              <td style={{ color: "black" }}>{problem.id}</td>
              <td>{problem.title}</td>
              <td>
                {problem.tags.map((tag) => (
                  <span key={tag.id} className={styles.tag}>{tag.name}</span>
                ))}
                
              </td>
              <td >{problem.difficultyTitle}</td>
              <td>
                <LikeOutlined /> <span>{problem.likesCount}</span>
                <br />
                <DislikeOutlined /> <span>{problem.dislikesCount}</span>
              </td>
              <td>{problem.solved}/{problem.attemptsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

export default App;

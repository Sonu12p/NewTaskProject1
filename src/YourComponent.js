import React, { useState } from 'react';

const itemsPerPage = 5; // You can change this based on your requirement

const YourComponent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Display your current items here */}
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Display pagination */}
      <div>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;


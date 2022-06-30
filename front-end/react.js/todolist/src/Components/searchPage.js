import "../App.css";
import React from "react";

const { useEffect, useState } = React;

const AllFruits = [
    'Apple','Banana','Orange','Mango','Pineapple','Watermelon'
  ];

  
  
function SearchPage()
{
        const [fruits, setFruits] = useState('');
      
        // the search result
        const [foundFruits, setFoundFruits] = useState(AllFruits);

        useEffect(() => {
          console.log(`Fruits searched : ` + fruits);
          console.log(`Fruits found : ` + foundFruits);
        });

        function handleChange(e) {
          const keyword = e.target.value;
      
          if (keyword !== '') {
            const results = AllFruits.filter((fruit) => {
              var fruitsFound =  fruit.toLowerCase().includes(keyword.toLowerCase());
              // Use the toLowerCase() method to make it case-insensitive

              return fruitsFound;
              
            });
            setFoundFruits(results);
          } else {
            setFoundFruits(AllFruits);
            // If the text field is empty, show all fruits
          }
      
          setFruits(keyword);
        };

        return (
          <div className="container">
            <input
              type="search"
              value={fruits}
              onChange={(e) => handleChange(e)}
              className="input"
              placeholder="Filter"
            />
      
            <div className="fruit-list">
              {foundFruits && foundFruits.length > 0 ? (
                foundFruits.map((fruit) => (
                  <li key={fruit} className="fruit">
                    <span className="fruit-name">{fruit}</span>
                  </li>
                ))
              ) : (
                <h1>No results found!</h1>
              )}
            </div>
          </div>
        );
      
}





export default SearchPage;
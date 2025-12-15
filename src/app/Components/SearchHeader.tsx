interface ISearchHeaderProps {
  onChange: (e: Event) => void,
  onClick: () => void,
}

/**
 * Displays the Solace Advocates search header 
 * @param onChange - function to fire on change of the search term 
 * @param onClick - function to fire on click of the "Reset Search" button
 */ 
export function SearchHeader({onChange, onClick, children}: ISearchHeaderProps) {
  return (
    <>     
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      {children}
    </>
  )
}

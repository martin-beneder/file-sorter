// Assume necessary imports

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
    return (
      <input
        type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded"
      />
    );
  };

export default SearchBar;
import { useState } from "react";
import { X, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSearchBar } from "../../store/slices/popupSlice";

const SearchOverlay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSearchBarOpen } = useSelector((state) => state.popup);
  const { products } = useSelector((state) => state.product);
  const [query, setQuery] = useState("");

  const source = products || [];

  const results = source
    .filter((item) => {
      const text = `${item.name} ${item.category}`.toLowerCase();
      return text.includes(query.toLowerCase());
    })
    .slice(0, 6);

  const closeSearch = () => dispatch(toggleSearchBar());

  return (
    <div
      className={`fixed inset-0 z-[60] transition-all duration-300 ${
        isSearchBarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSearch} />

      <div className="relative max-w-3xl mx-auto px-4 pt-20">
        <div className="glass-panel p-4 md:p-5">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              autoFocus={isSearchBarOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search sofas, beds, tables..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={closeSearch}
              className="p-2 rounded-md hover:bg-secondary transition-colors"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-2 max-h-[50vh] overflow-y-auto">
            {!query && (
              <p className="text-sm text-muted-foreground">
                Try keywords like "living room", "dining", or "office desk".
              </p>
            )}

            {query && results.length === 0 && (
              <p className="text-sm text-muted-foreground">No products found.</p>
            )}

            {results.map((item) => (
              <button
                key={String(item.id)}
                onClick={() => {
                  closeSearch();
                  navigate(`/product/${item.id}`);
                }}
                className="w-full p-2.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors flex items-center gap-3 text-left"
              >
                <img
                  src={item.image || item.images?.[0] || ""}
                  alt={item.name}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-foreground font-medium text-sm">{item.name}</p>
                  <p className="text-muted-foreground text-xs">{item.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;


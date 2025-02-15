import { useSearchRestaurants } from "@/api/RestaurantApi";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
};

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
    });
    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const setPage = (page: number) => {

        setSearchState((prevState) => ({
            ...prevState, page
        }));
    };

    const setSearchQuery = (searchFromData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFromData.searchQuery,
            page: 1,
        }));
    };

    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    };

    if (isLoading) {
        return <span> Loading ... </span>;
    }

    if (!results?.data || !city) {
        return <span>No results found!</span>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                insert cuisines here:)
            </div>
            <div id="main-contet"
                className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeholder="Search by Cuisine or Restaurant Name"
                    onReset={resetSearch} />
                <SearchResultInfo
                    total={results.pagination.total}
                    city={city}
                />
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))}
                <PaginationSelector
                    page={results.pagination.page}
                    pages={results.pagination.pages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default SearchPage;
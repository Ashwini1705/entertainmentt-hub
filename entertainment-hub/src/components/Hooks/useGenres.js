const useGenres = (selectedGenres) => {
    if(selectedGenres<1) return "";

    const genresIDs = selectedGenres.map(g => g.id);
    return genresIDs.reduce((acc, curr) => acc + "," + curr);
}

export default useGenres;
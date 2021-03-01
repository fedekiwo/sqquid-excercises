function bestMatchSort(match1, match2) {
  if(match1.length < match2.length) { return -1 } // Comparing by the string that matched length 
  if(match1.length > match2.length) { return 1 }
  if(match1.index < match2.index) { return -1 } // Comparing by the start position
  if(match1.index > match2.index) { return 1 }
  return 0; // Even
}

function fuzzyMatch(stringForRegex) {
  return record => {
      const matches = Object.values(record)
        .filter(value => value)
        .map(value => RegExp(stringForRegex, 'i').exec(value))
        .filter(match => match)
        .map(match => ({ length: match[0].length, index: match.index}));

      if(matches.length === 0) { return null };
      const bestMatch = matches.sort((match1, match2) => bestMatchSort(match1, match2))[0];
      return { record, ...bestMatch }
  }
}

function stringForRegex(stringToSearch) {
  return stringToSearch.split('').filter(char => char != " ").join('.*');
}

function fuzzySearch(stringToSearch, records) {
  stringToSearch = (stringToSearch || "").toLowerCase().trim()
  if(stringToSearch === "" || !records) { return []; }

  return records.map(fuzzyMatch(stringForRegex(stringToSearch)))
    .filter(match => match)
    .sort((match1, match2) => bestMatchSort(match1, match2))
    .map(({ record }) => record);
};

module.exports = fuzzySearch;

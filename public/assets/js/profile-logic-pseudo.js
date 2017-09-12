/*
contests is an array

contest table
  -> contest header
  -> candidate table
*/

function main () {
  // make ajax call to elections API
    // when response object returned
      // NOTE: FOR elections in object.polititracker array
        // populate indicators (populateIndicators)
        createCarouselItem()
        // append to carousel inner div
}

// CAROUSEL ITEM FUNCTIONS
// ========================================================
function createCarouselItem(resp) {
  // *** if carousel item is first
    // add active class

  createElectionHeader(resp);
  // append to carousel item div
  createContestList(resp);
  // append to carousel item div
  createPollingInfo(resp);
  // append ot carousel item div
}

//  ELECTION
// ========================================================
function createElectionHeader(resp) {
  // (createElectionHeader)
}

// CONTEST FUNCTIONS
// ========================================================

function createContestList(resp) {
  // NOTE: FOR contest table
  createCOntestTable(resp);
  // append contest table to contest list
}

function createContestTable(resp) {
  // create contest table div

  let contestHeader = createContestHeader();
  let contestTable = createCandidateTable();
  // append contest header to contest table div
  // append candidate table to contest table div
}

function createContestHeader(resp) {
   // create h4 with contest office
   // create h4 with contest type
   // append to contest header
}

function createCandidateTable(resp) {
  // create candidate table header (static)
  // NOTE: FOR candidates in array
    // create candidate row (createCandidateEntry)
    // append to candidate table
}

// ========================================================
// POLLING INFO FUNCTIONS
// ========================================================

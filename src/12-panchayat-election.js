/**
 * 🗳️ Panchayat Election System - Capstone
 *
 * Village ki panchayat election ka system bana! Yeh CAPSTONE challenge hai
 * jisme saare function concepts ek saath use honge:
 * closures, callbacks, HOF, factory, recursion, pure functions.
 *
 * Functions:
 *
 *   1. createElection(candidates)
 *      - CLOSURE: private state (votes object, registered voters set)
 *      - candidates: array of { id, name, party }
 *      - Returns object with methods:
 *
 *      registerVoter(voter)
 *        - voter: { id, name, age }
 *        - Add to private registered set. Return true.
 *        - Agar already registered or voter invalid, return false.
 *        - Agar age < 18, return false.
 *
 *      castVote(voterId, candidateId, onSuccess, onError)
 *        - CALLBACKS: call onSuccess or onError based on result
 *        - Validate: voter registered? candidate exists? already voted?
 *        - If valid: record vote, call onSuccess({ voterId, candidateId })
 *        - If invalid: call onError("reason string")
 *        - Return the callback's return value
 *
 *      getResults(sortFn)
 *        - HOF: takes optional sort comparator function
 *        - Returns array of { id, name, party, votes: count }
 *        - If sortFn provided, sort results using it
 *        - Default (no sortFn): sort by votes descending
 *
 *      getWinner()
 *        - Returns candidate object with most votes
 *        - If tie, return first candidate among tied ones
 *        - If no votes cast, return null
 *
 *   2. createVoteValidator(rules)
 *      - FACTORY: returns a validation function
 *      - rules: { minAge: 18, requiredFields: ["id", "name", "age"] }
 *      - Returned function takes a voter object and returns { valid, reason }
 *
 *   3. countVotesInRegions(regionTree)
 *      - RECURSION: count total votes in nested region structure
 *      - regionTree: { name, votes: number, subRegions: [...] }
 *      - Sum votes from this region + all subRegions (recursively)
 *      - Agar regionTree null/invalid, return 0
 *
 *   4. tallyPure(currentTally, candidateId)
 *      - PURE FUNCTION: returns NEW tally object with incremented count
 *      - currentTally: { "cand1": 5, "cand2": 3, ... }
 *      - Return new object where candidateId count is incremented by 1
 *      - MUST NOT modify currentTally
 *      - If candidateId not in tally, add it with count 1
 *
 * @example
 *   const election = createElection([
 *     { id: "C1", name: "Sarpanch Ram", party: "Janata" },
 *     { id: "C2", name: "Pradhan Sita", party: "Lok" }
 *   ]);
 *   election.registerVoter({ id: "V1", name: "Mohan", age: 25 });
 *   election.castVote("V1", "C1", r => "voted!", e => "error: " + e);
 *   // => "voted!"
 */
export function createElection(candidates) {
  // Your code here

  const registeredSet = [];
  const votesObject = {};

  function registerVoter(voter) {
    //checking for invalid voter object
    if (!voter) return false;
    if (Object.keys(voter).length !== 3) return false;
    if (
      typeof voter.id !== "string" ||
      typeof voter.name !== "string" ||
      typeof voter.age !== "number"
    )
      return false;
    if (voter.age < 18) return false;

    const isExist = registeredSet.find((v) => v.id === voter.id);
    if (isExist) return false;

    registeredSet.push(voter);
    return true;
  }

  function castVote(voterId, candidateId, onSuccess, onError) {
    const isVoterExist = registeredSet.find((rs) => rs.id === voterId);
    const isCandidateExist = candidates.find((c) => c.id === candidateId);
    if (!isVoterExist || !isCandidateExist) return onError("reason string");

    //Already voted?
    if (votesObject[voterId] !== undefined) return onError("reason string");

    //All Valid
    votesObject[voterId] = candidateId;
    return onSuccess({ voterId, candidateId });
  }

  function getResults(sortFn) {
    const partyVote = [];
    const voteCount = Object.entries(votesObject).reduce((count, curr) => {
      if (count[curr[1]] === undefined) {
        count[curr[1]] = 1;
      } else {
        count[curr[1]] += 1;
      }
      return count;
    }, {});
    candidates.forEach((c) => {
      const cVote = voteCount[c.id] || 0;
      const tempObj = {
        id: c.id,
        name: c.name,
        party: c.party,
        votes: cVote,
      };
      partyVote.push(tempObj);
    });

    if (sortFn) {
      return partyVote.sort(sortFn);
    }
    return partyVote.sort((a, b) => b.votes - a.votes);
  }

  function getWinner() {
    if (Object.keys(votesObject).length === 0) return null;
    const voteCount = Object.entries(votesObject).reduce((count, curr) => {
      if (count[curr[1]] === undefined) {
        count[curr[1]] = 1;
      } else {
        count[curr[1]] += 1;
      }
      return count;
    }, {});
    const result = Object.entries(voteCount).sort((a, b) => b[1] - a[1]);
    const winnerID = result[0][0];
    const findCandidate = candidates.find((c) => c.id === winnerID);
    return findCandidate;
  }

  return {
    registerVoter,
    castVote,
    getResults,
    getWinner,
  };
}

export function createVoteValidator(rules) {
  // Your code here
  function validationFunction(voter) {
    let isValid = false;
    let reason;
    const { id, name, age } = voter;
    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof age !== "number" ||
      age < 18
    ) {
      reason = "error";
    } else {
      isValid = true;
    }
    return {
      valid: isValid,
      reason: reason,
    };
  }
  return validationFunction;
}

export function countVotesInRegions(regionTree) {
  // Your code here
  if (!regionTree) return 0;

  return (
    regionTree.votes +
    regionTree.subRegions.reduce((total, curr) => {
      total += countVotesInRegions(curr);
      return total;
    }, 0)
  );
}

export function tallyPure(currentTally, candidateId) {
  // Your code here
  const newTally = { ...currentTally };
  if (!newTally[candidateId]) {
    newTally[candidateId] = 1;
  } else {
    newTally[candidateId] += 1;
  }
  // newTally[candidateId] ? newTally[candidateId]++ : 1;
  return newTally;
}

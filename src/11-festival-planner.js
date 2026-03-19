/**
 * 🎉 Festival Countdown Planner - Module Pattern
 *
 * Indian festivals ka planner bana! Module pattern use karna hai —
 * matlab ek function jo ek object return kare jisme public methods hain,
 * lekin andar ka data PRIVATE rahe (bahar se directly access na ho sake).
 *
 * Function: createFestivalManager()
 *
 * Returns an object with these PUBLIC methods:
 *
 *   - addFestival(name, date, type)
 *     date is "YYYY-MM-DD" string, type is "religious"/"national"/"cultural"
 *     Returns new total count of festivals
 *     Agar name empty or date not string or invalid type, return -1
 *     No duplicate names allowed (return -1 if exists)
 *
 *   - removeFestival(name)
 *     Returns true if removed, false if not found
 *
 *   - getAll()
 *     Returns COPY of all festivals array (not the actual private array!)
 *     Each festival: { name, date, type }
 *
 *   - getByType(type)
 *     Returns filtered array of festivals matching type
 *
 *   - getUpcoming(currentDate, n = 3)
 *     currentDate is "YYYY-MM-DD" string
 *     Returns next n festivals that have date >= currentDate
 *     Sorted by date ascending
 *
 *   - getCount()
 *     Returns total number of festivals
 *
 * PRIVATE STATE: festivals array should NOT be accessible from outside.
 *   manager.festivals should be undefined.
 *   getAll() must return a COPY so modifying it doesn't affect internal state.
 *   Two managers should be completely independent.
 *
 * Hint: This is the Module Pattern — a function that returns an object
 *   of methods, all closing over shared private variables.
 *
 * @example
 *   const mgr = createFestivalManager();
 *   mgr.addFestival("Diwali", "2025-10-20", "religious");   // => 1
 *   mgr.addFestival("Republic Day", "2025-01-26", "national"); // => 2
 *   mgr.getAll(); // => [{ name: "Diwali", ... }, { name: "Republic Day", ... }]
 *   mgr.getUpcoming("2025-01-01", 1); // => [{ name: "Republic Day", ... }]
 */
export function createFestivalManager() {
  // Your code here
  const festivalArray = [];
  function addFestival(name, date, type) {
    if (typeof name !== "string" || name === "") return -1;
    else if (typeof date !== "string") return -1;
    else if (
      !(type === "religious" || type === "national" || type === "cultural")
    )
      return -1;

    const isFestivalExist = festivalArray.find((item) => item.name === name);
    if (isFestivalExist) return -1;
    else {
      festivalArray.push({
        name: name,
        date: date,
        type: type,
      });
    }
    return festivalArray.length;
  }
  function removeFestival(name) {
    const index = festivalArray.findIndex((f) => f.name === name);
    if (index === -1) return false;

    festivalArray.splice(index, 1);
    return true;
  }
  function getAll() {
    return [...festivalArray];
  }
  function getByType(type) {
    return festivalArray.filter((festival) => festival.type === type);
  }
  function getUpcoming(currentDate, n = 3) {
    const upcomingFestivals = festivalArray
      .filter((festival) => festival.date >= currentDate)
      .sort((a, b) => (a.date >= b.date ? 1 : -1));

    if (upcomingFestivals.length > n) {
      upcomingFestivals.length = n;
      return upcomingFestivals;
    }
    return upcomingFestivals;
  }
  function getCount() {
    return festivalArray.length;
  }

  return {
    addFestival,
    removeFestival,
    getAll,
    getByType,
    getUpcoming,
    getCount,
  };
}

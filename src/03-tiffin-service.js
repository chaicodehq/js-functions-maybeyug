/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  // Your code here\
  if (name === undefined || name === "") {
    return null;
  }

  const vegMealDailyRate = 80;
  const nonVeMealDailyRate = 120;
  const jainMealDailyRate = 90;
  let calTotalCost;

  function calculateCost(dailyRate) {
    calTotalCost = dailyRate * days;
    return {
      name: name,
      mealType: mealType,
      days: days,
      dailyRate: dailyRate,
      totalCost: calTotalCost,
    };
  }

  switch (mealType) {
    case "veg":
      return calculateCost(vegMealDailyRate);

    case "nonveg":
      return calculateCost(nonVeMealDailyRate);

    case "jain":
      return calculateCost(jainMealDailyRate);

    default:
      return null;
  }
}

export function combinePlans(...plans) {
  // Your code here

  if (Array.isArray(plans) && plans.length === 0) return null;

  let calTotalCustomer = 0,
    calTotalRevenue = 0,
    calVegMeal = 0,
    calNonvegMeal = 0,
    calJainMeal = 0;

  plans.forEach((item) => {
    calTotalCustomer++;
    calTotalRevenue += item.totalCost;
    if (item.mealType === "veg") calVegMeal++;
    else if (item.mealType === "nonveg") calNonvegMeal++;
    else calJainMeal++;
  });

  return {
    totalCustomers: calTotalCustomer,
    totalRevenue: calTotalRevenue,
    mealBreakdown: {
      veg: calVegMeal,
      nonveg: calNonvegMeal,
      jain: calJainMeal,
    },
  };
}

export function applyAddons(plan, ...addons) {
  // Your code here
  if (
    plan === null ||
    Object.keys(plan).length === 0 ||
    plan.name === null ||
    plan.mealType === null ||
    plan.days === null ||
    plan.dailyRate === null
  ) {
    return null;
  }
  let addAddonsPrice = 0;
  let addAddonsName = [];
  let newTotalCost;
  let newDailyRate;
  addons.forEach((item) => {
    addAddonsPrice += item.price;
    addAddonsName.push(item.name);
  });
  newDailyRate = plan.dailyRate + addAddonsPrice;
  newTotalCost = newDailyRate * plan.days;

  return {
    name: plan.name,
    mealType: plan.mealType,
    days: plan.days,
    dailyRate: newDailyRate,
    totalCost: newTotalCost,
    addonNames: addAddonsName,
  };
}

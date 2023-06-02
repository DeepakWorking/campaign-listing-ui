export const formatUSD = ({ data }) => {
  const { Budget } = data;
  const suffixes = ["", "K", "M", "B", "T"];
  const suffixNum = Math.floor(("" + Budget).length / 3);

  let shortValue = parseFloat(
    (suffixNum !== 0 ? Budget / Math.pow(1000, suffixNum) : Budget).toPrecision(
      2
    )
  );
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }

  return shortValue + suffixes[suffixNum] + " USD";
};

export const formatDate = (date) => {
  const CurrentDate = new Date(date);
  const yyyy = CurrentDate.getFullYear();
  let mm = CurrentDate.getMonth() + 1; // Months start at 0!
  let dd = CurrentDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const isValidCampaign = (campaign, campaignList) => {
  try {
    if (!Object.keys(campaign).length) return [false, "Invalid Entry"];
    if (!campaign["id"] || isNaN(campaign["id"])) {
      return [false, "Enter valid Id!"];
    }
    if (campaign["Budget"] <= 0) {
      return [false, "Enter valid Campaign Budget!"];
    }
    if (!campaign["userId"] || isNaN(campaign["userId"])) {
      return [false, "Enter valid User Id!"];
    }
    if (!campaign["startDate"] || !isValidDate(campaign["startDate"])) {
      return [false, "Enter valid Campaign Start Date!"];
    }
    if (
      campaign["endDate"] &&
      campaign["startDate"] &&
      new Date(campaign["startDate"]) > new Date(campaign["endDate"])
    ) {
      return [false, "End Date cannot be greater than start date!"];
    }
    if (campaignList.findIndex((cg) => cg.id === campaign["id"]) > -1) {
      return [false, `Campaign with id ${campaign["id"]} already exists!`];
    }
    return [true, `Campaign id ${campaign["id"]} added sucessfully!`];
  } catch (e) {
    return [false, "Something went wrong, try again!"];
  }
};

import { useEffect, useState } from "react";
import { isValidCampaign } from "./util";
import { useDispatch, useSelector } from "react-redux";
import { addCampaigns } from "./AppReducer";

const AddCampaign = () => {
  const [inputCampaign, setInputCampaign] = useState("");
  const [isInValid, setIsInValid] = useState(false);
  const [message, setMessage] = useState("");
  const campaignList = useSelector((state) => state.campaign.campaignList);
  const dispatch = useDispatch();

  useEffect(() => {
    window.AddCampaigns = (campaigns) => {
      const validList = [];
      const idSet = new Set();

      campaigns.forEach((cg) => {
        if (!idSet.has(cg.id)) {
          const [isValid, message] = isValidCampaign(cg, campaignList);
          console.log(`Campaign ${cg.id} - ${message}`);
          if (isValid) {
            validList.push(cg);
            idSet.add(cg.id);
          }
        } else {
          console.log(`Duplicate campaign ID found: ${cg.id}`);
        }
      });

      dispatch(addCampaigns(validList));
    };
    return () => delete window.AddCampaigns;
  }, [campaignList]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputCampaign(value);
    setIsInValid(false);
    setMessage("");
  };
  const handleAddCampaign = () => {
    try {
      const escapedChar = inputCampaign.replace(/\\/g, "");
      const campaign = JSON.parse(escapedChar);
      const [isValid, message] = isValidCampaign(campaign, campaignList);
      setIsInValid(!isValid);
      setMessage(message);
      if (isValid) {
        dispatch(addCampaigns([campaign]));
        setInputCampaign("");
      }
    } catch (e) {
      setIsInValid(true);
      setMessage("Invalid Entry");
    }
  };
  return (
    <div className="add-campaign-wrapper">
      <textarea
        type="text"
        className="add-campaign-input"
        value={inputCampaign}
        placeholder="Enter campaign data as JSON.........."
        onChange={handleChange}
        data-testid="add-campaign-input"
      />
      <button
        className="add-campaign-button"
        onClick={handleAddCampaign}
        disabled={!inputCampaign}
        data-testid="add-campaign-button"
      >
        Add Campaign
      </button>
      {message &&
        (isInValid ? (
          <p style={{ color: "#de1a24" }} data-testid="add-campaign-error">
            {message}
          </p>
        ) : (
          <p style={{ color: "#3f8f29" }} data-testid="add-campaign-success">
            {message}
          </p>
        ))}
    </div>
  );
};

export default AddCampaign;

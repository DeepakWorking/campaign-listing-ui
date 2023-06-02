import Campaigns from "./Campaigns";
import "./App.css";
import CampaignData from "./__mocks__/campaignData.json";

const App = () => {
  return (
    <div className="App">
      <Campaigns campaignListData={CampaignData.campaignData} />
    </div>
  );
};

export default App;

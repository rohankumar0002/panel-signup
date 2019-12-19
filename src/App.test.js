import React from 'react';
import { BrowserRouter as Router , Route ,Switch} from 'react-router-dom';
import Header from './pages/Header';
import Dashboard from './pages/ProfileSummary';
import CandidateSearch from './pages/CandidateSearch';
import RequireterMainPage from './pages/RequireterMainPage';
import candidate_complete_profile from './pages/candidate_complete_profile';
import ReqViewPanelSearch from './pages/ReqViewPanelSearch'
import ReqViewPanelDash from './pages/ReqViewPanelDash'
import PanellistDashboard from './pages/PanellistDashboard'
import RecIntelligentSearch from './pages/RecruiterIntelligentSearch'
import HiredMemDash from './pages/HiredcandidateDashboard'
import Chartspage from './pages/Chartspage'
import Charttest from './pages/Charttest'
import MyRequirements from './pages/MyRequirements'
import ISearch from './pages/ISearch'
import HotCVs from './pages/HotCVs'
import MyReava from './pages/MyReava'
import InMail from './pages/InMail'

import './App.css';

function Apphome(){
  return(
    <Router>
    <div >
      <Header />
      <Switch> 
      <Route path="/Reqhome"  exact component={RequireterMainPage} />
      <Route path="/CandidateSearch"  component={CandidateSearch} />
      <Route path="/Dashboard"  component={Dashboard} />
      <Route path="/HiredMemDash"  component={HiredMemDash} />
      <Route path="/Candidatehome"  component={candidate_complete_profile} />
      <Route path="/panelList" component={ReqViewPanelSearch} />
      <Route path="/PanellistDashboard" component={PanellistDashboard} />
      <Route path="/ReqViewPanelDash" component={ReqViewPanelDash} />
      <Route path="/RecIntelligentSearch" component={RecIntelligentSearch} /> 
      <Route path="/Chartspage" component={Chartspage} />
      <Route path="/Charttest" component={Charttest} />
      <Route path="/MyRequirements" component={MyRequirements} />
      <Route path="/ISearch" component={ISearch} />
      <Route path="/HotCVs" component={HotCVs} />
      <Route path="/MyReava" component={MyReava} />
      <Route path="/InMail" component={InMail} />

    </Switch>
 </div>
    </Router>
  )
}
export default Apphome;

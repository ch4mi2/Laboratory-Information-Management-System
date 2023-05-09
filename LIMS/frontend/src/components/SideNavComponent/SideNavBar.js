import React, { useState } from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

// Insert this code after your NavText of your Nav Item if a dorpdown is needed... RegSub is given as an example
// <NavItem className = 'subNav'>
// <NavText>RegSub</NavText>
// </NavItem>
// Add you relevant path to event key as well no need to add '/'.. This is needed for subNav componens as well
// =)

function SideNavBar() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(localStorage.getItem('location'));

  return (
    <aside style={{ zIndex: '10000' }}>
      <SideNav
        onSelect={(selected) => {
          localStorage.setItem('location', selected);
          setCurrent(localStorage.getItem('location'));
          navigate('/' + selected);
        }}
        id="sideNav"
        className="side-nav"
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="dashboard">
          <NavItem eventKey="dashboard" className="navItems">
            <NavIcon>
              <AiIcons.AiOutlineHome size={30} />
            </NavIcon>
            <NavText>Dashboard</NavText>
          </NavItem>

          <NavItem eventKey="registration">
            <NavIcon>
              <MdIcons.MdOutlinePersonOutline size={30} />
            </NavIcon>
            <NavText>Registration</NavText>
            <NavItem className="subNav" eventKey="create-patient">
              <NavText>Add Patients</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="patient-list">
              <NavText>Patient List</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="billing">
            <NavIcon>
              <FaIcons.FaCashRegister size={25} />
            </NavIcon>
            <NavText>Billing</NavText>
            <NavItem className="subNav" eventKey="view-bills">
              <NavText>View all Bills</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="customer-leaderboard">
              <NavText>Customer Leaderboard</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="pendingAccession">
            <NavIcon>
              <RiIcons.RiTestTubeLine size={30} />
            </NavIcon>
            <NavText>Accession</NavText>
            <NavItem className="subNav" eventKey="pendingAccession">
              <NavText>Pending</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="accessed">
              <NavText>Accessed</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="pendingTests">
            <NavIcon>
              <AiIcons.AiOutlineReconciliation size={30} />
            </NavIcon>
            <NavText>Test Results</NavText>
            <NavItem className="subNav" eventKey="pendingTests">
              <NavText>Pending</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="completedTests">
              <NavText>Completed</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="testData">
            <NavIcon>
              <AiIcons.AiOutlineExperiment size={30} />
            </NavIcon>
            <NavText>Test Data</NavText>
            <NavItem className="subNav" eventKey="testData">
              <NavText>View Tests</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="createTest">
              <NavText>Add Test</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="viewStats">
              <NavText>Statistics</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="Inventory">
            <NavIcon>
              <MdIcons.MdOutlineInventory size={30} />
            </NavIcon>
            <NavText>Inventory</NavText>
            <NavItem className="subNav" eventKey="inventory">
              <NavText>Inventory List</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="InventoryForm">
              <NavText>Add Inventory</NavText>
            </NavItem>
          </NavItem>
        
          {/*<NavItem eventKey="">
            <NavIcon>
              <MdIcons.MdOutlineInventory size={30} />
            </NavIcon>
            <NavText>Inventory</NavText>
      </NavItem> */}

          <NavItem eventKey="machines">
            <NavIcon>
              <MdIcons.MdBiotech size={30} />
            </NavIcon>
            <NavText>Machines</NavText>
            <NavItem className="subNav" eventKey="AddMachines">
              <NavText>Add Machines</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="MachineList">
              <NavText>Machine List</NavText>
            </NavItem>
          </NavItem>

          {/*
          <NavItem eventKey="">
            <NavIcon>
              <MdIcons.MdOutlinePersonOutline size={30} />
            </NavIcon>
            <NavText>Staff</NavText>
          </NavItem>
        */}
          <NavItem eventKey="Finance">
            <NavIcon>
              <BsIcons.BsCashCoin size={30} />
            </NavIcon>
            <NavText>Finance</NavText>
            <NavItem className="subNav" eventKey="AddExpenses">
              <NavText>Add Expenses</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="Expenseslist">
              <NavText>View Expenses</NavText>
            </NavItem>
            <NavItem className="subNav" eventKey="FinancialReport">
              <NavText>Financial Report</NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="LabInfo">
            <NavIcon>
              <BsIcons.BsGear size={30} />
            </NavIcon>
            <NavText>Settings</NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </aside>
  );
}

export default SideNavBar;

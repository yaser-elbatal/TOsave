import React from "react";
import BranchesDetails from "./BranchesDetails";
import BranchesEmployees from "./BranchesEmployees";
import Tabs from "../../views/Components/Custom/Tabs/Tabs"

const BranchesTabs = props => {
  const id = props.match.params.id;


  let mainTab = (
    <BranchesDetails branchId={id} />
  )
  let secondaryTab = (
    <BranchesEmployees branchId={id} />

  )
  let dataTabs = [
    {
      label: <b>تفاصيل الفرع</b>,
      body: mainTab
    },
    {
      label: <b>الموظفين</b>,
      body: secondaryTab
    },
  ]





  return (


    <Tabs data={dataTabs} />
  )
}
export default BranchesTabs;

import React from "react";

export default function ManagerBranch(props) {
  let data = props.data;

  let manager = data.find(em => {

    return em.emp_branch !== null
      ? em.emp_branch.branch_manager
        ? em.id === em.emp_branch.branch_manager
        : "لم يحدد مدير الفرع"
      : "لم يحدد مدير الفرع";
  });
  console.log(data);


  return (
    <React.Fragment>
      <span style={{ color: "#58595B" }}>مدير الفرع :</span>{" "}
      {manager && manager.emp_branch &&
        manager.emp_branch.branch_manager ? (
          <span>
            {!manager.employee_user ||
              manager.employee_user.display_name == null
              ? "اسم الموظف"
              : manager.employee_user.display_name}
            <img
              src={manager.avatar}
              style={{
                width: "38px",
                height: "38px"
              }}
              className="img-avatar"
              alt="pic"
            />
          </span>
        ) : (
          "لم يحدد مدير الفرع بعد"
        )
      }
    </React.Fragment>
  );
}

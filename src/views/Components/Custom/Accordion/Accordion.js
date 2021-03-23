import React, { useState } from "react";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";

export default (props) => {
  const { data, rightTitle = false } = props;

  return (
    <div>
      <Collapse>
        {data.map((item, ind) => {
          return (
            <Panel key={ind} header={item.title} headerClass="my-header-class">
              {item.body}
            </Panel>
          );
        })}
      </Collapse>
      {/* for making a global style */}
      {rightTitle && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .rc-collapse > .rc-collapse-item > .rc-collapse-header {justify-content: space-between;direction: ltr;}
        `,
          }}
        />
      )}
    </div>
  );
};

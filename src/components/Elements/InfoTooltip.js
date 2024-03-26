import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InfoTooltip = ({ placement, sourceTitle, content, bright }) => {
  const renderTooltipContent = () => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {sourceTitle}
      <OverlayTrigger
        placement={placement}
        overlay={
          <Tooltip id={`tooltip-${placement}`} style={{ zIndex: 1500 }}>
            {renderTooltipContent()}
          </Tooltip>
        }
      >
        <div>
          <InfoOutlinedIcon
            className="info-icon"
            style={{ color: bright ? "white" : "gray" }}
          />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default InfoTooltip;

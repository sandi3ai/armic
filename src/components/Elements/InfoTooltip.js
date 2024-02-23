import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const InfoTooltip = ({ placement, sourceTitle, content }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {sourceTitle}
      <OverlayTrigger
        placement={placement}
        overlay={<Tooltip id={`tooltip-${placement}`}>{content}</Tooltip>}
      >
        <div>
          <InfoOutlinedIcon className="info-icon" />
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default InfoTooltip;

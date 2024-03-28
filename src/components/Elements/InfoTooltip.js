import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { isString } from "lodash";

const InfoTooltip = ({
  placement,
  sourceTitle,
  content,
  bright,
  marginLeft,
}) => {
  const renderTooltipContent = () => {
    if (isString(content) && content.includes("\n")) {
      return content.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < content.split("\n").length - 1 && <br />}{" "}
        </React.Fragment>
      ));
    } else {
      return content; // Return content as is if there are no line breaks
    }
  };
  return (
    <>
      {" "}
      {sourceTitle}
      <OverlayTrigger
        placement={placement}
        overlay={
          <Tooltip
            id={`tooltip-${placement}`}
            className="custom-tooltip"
            style={{ zIndex: 1500 }}
          >
            {renderTooltipContent()}
          </Tooltip>
        }
      >
        <InfoOutlinedIcon
          className="info-icon"
          style={{ color: bright ? "white" : "gray", marginLeft: marginLeft }}
        />
      </OverlayTrigger>
    </>
  );
};

InfoTooltip.defaultProps = {
  marginLeft: "0px", // Default margin left is 0px
};

export default InfoTooltip;

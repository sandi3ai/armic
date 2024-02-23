import React, { useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const HolidaysList = ({ holidays }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={10} md={6} lg={4}>
        <Paper elevation={12} sx={{ my: 2 }}>
          <Accordion expanded={expanded} onChange={handleAccordionToggle}>
            <AccordionSummary
              expandIcon={<ExpandMoreOutlinedIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h5>Dela prosti dnevi</h5>
            </AccordionSummary>
            <AccordionDetails>
              {holidays.length > 0 ? (
                <List dense>
                  {holidays.map((holiday, index) => (
                    <ListItem
                      key={index}
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "medium" }}
                          >
                            {holiday.DATUM} - <i>{holiday.DAN_V_TEDNU}</i>
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {holiday.IME_PRAZNIKA}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  Loading holidays...
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default HolidaysList;

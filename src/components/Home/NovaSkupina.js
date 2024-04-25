import React, { useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { post } from "../../Helper";
import PrikaziSkupine from "./PrikaziSkupine";
import CustomSnackbar from "../Elements/Snackbar";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

const NovaSkupina = ({ zaposleniData, isLoading }) => {
  const postUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/novaSkupina.php`;
  const [imeSkupine, setImeSkupine] = useState("");
  const [showSeznam, setShowSeznam] = useState(false);
  const [novVnos, setNovVnos] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [vodjaData, setVodjaData] = useState({
    vodjaID: null,
    vodjaEmail: "",
    vodjaIme: "",
  });
  const [formError, setFormError] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    console.log(imeSkupine);
    if (!imeSkupine.trim()) {
      setFormError("Ime skupine je obvezno polje.");
      return;
    }
    setFormError("");
    try {
      post(postUrl, {
        name: imeSkupine,
        email: vodjaData.vodjaEmail,
        vodjaID: vodjaData.vodjaID,
      }).then(() => {
        console.log("submitForm executed");
        if (imeSkupine !== "") {
          //prikaže success box, če so vsi podatki izpolnjeni
          setOpenSnackbar(true);
        }

        setImeSkupine("");
        setVodjaData({
          vodjaID: null,
          vodjaEmail: "",
          vodjaIme: "",
        });

        setRefreshTrigger((oldTrigger) => !oldTrigger);
      });
    } catch (error) {
      alert(error.message);
    }
  }

  function prikazi() {
    if (showSeznam === false) {
      setShowSeznam(true);
    } else {
      setShowSeznam(false);
      if (novVnos === true) {
        setNovVnos(false);
      }
    }
  }

  function showNovVnos() {
    if (novVnos === false) {
      setNovVnos(true);
      console.log("showNovVnos triggered to true");
    } else {
      setNovVnos(false);
      console.log("showNovVnos triggered to false");
    }
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    const isValid =
      newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setVodjaData((prevVodjaData) => ({
      ...prevVodjaData,
      vodjaEmail: newEmail,
    }));
    setIsEmailValid(isValid);
  };

  const handleSelectVodja = (selectedZaposleniID) => {
    // Find the zaposleni object that matches the selected ID
    const selectedZaposleni = zaposleniData.find(
      (z) => z.zaposleniID === Number(selectedZaposleniID)
    );

    if (selectedZaposleni) {
      setVodjaData((prevVodjaData) => ({
        ...prevVodjaData,
        vodjaID: selectedZaposleni.zaposleniID,
        vodjaIme: selectedZaposleni.zaposleniIme,
      }));
    }
  };

  return (
    <>
      <div>
        <div className="float-right">
          {showSeznam && (
            <Button
              variant={novVnos ? "danger" : "outline-primary"}
              onClick={showNovVnos}
            >
              {novVnos ? (
                "Zapri vnos skupine"
              ) : (
                <>
                  Dodaj skupino <GroupAddOutlinedIcon />
                </>
              )}
            </Button>
          )}
          <Button
            variant={showSeznam ? "danger" : "outline-primary"}
            onClick={prikazi}
          >
            {showSeznam ? "Zapri" : "Prikaži"} skupine {showSeznam ? " " : " "}
          </Button>
        </div>

        {showSeznam && (
          <div className="addNew">
            {novVnos && (
              <div className="addNew">
                <h3>Dodaj novo skupino</h3>
                <Form onSubmit={(e) => submitForm(e)}>
                  <Form.Group className="mb-3 inputForm">
                    <Form.Label>Vpiši ime nove skupine: </Form.Label>
                    <Col>
                      <Form.Control
                        isInvalid={formError}
                        name="name"
                        onChange={(e) => {
                          setImeSkupine(e.target.value);
                          setFormError("");
                        }}
                        value={imeSkupine}
                        type="text"
                        placeholder="Naziv skupine ..."
                      />
                      <Form.Control.Feedback type="invalid">
                        {formError}
                      </Form.Control.Feedback>
                    </Col>
                    <Form.Label>Vpiši e-mail vodje skupine: </Form.Label>
                    <Col>
                      <Form.Control
                        name="email"
                        onChange={handleEmailChange}
                        value={vodjaData.vodjaEmail}
                        type="email"
                        placeholder="primer.emaila@armic-sp.si"
                        isInvalid={!isEmailValid}
                      />
                      <Form.Control.Feedback type="invalid">
                        Prosim vnesi veljaven e-mail naslov.
                      </Form.Control.Feedback>
                    </Col>
                    <Form.Label>Izberi vodjo skupine: </Form.Label>
                    <DropdownButton
                      size="sm"
                      variant="outline-primary"
                      title={vodjaData.vodjaIme || "Izberi vodjo"}
                      onSelect={handleSelectVodja}
                      value={vodjaData.vodjaIme || ""}
                      drop="down"
                    >
                      {zaposleniData.map((z, i) => (
                        <Dropdown.Item key={i} eventKey={z.zaposleniID}>
                          {z.zaposleniIme}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                    <br />
                  </Form.Group>
                  <div className="successBox">
                    <Button variant="outline-success" type="submit">
                      Ustvari novo skupino
                    </Button>
                    <br />
                  </div>
                </Form>
              </div>
            )}
            <PrikaziSkupine
              zaposleniData={zaposleniData}
              isLoading={isLoading}
              novVnos={novVnos}
              showNovVnos={showNovVnos}
              refreshTrigger={refreshTrigger}
            />
          </div>
        )}
      </div>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        content={`Nova skupina dodana.`}
      />
    </>
  );
};

export default NovaSkupina;

import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { post } from "../../Helper";
import CustomSnackbar from "../Elements/Snackbar";

const NovVnos = () => {
  const postUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/novDezurni.php`;
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [errorTxt, setErrorTxt] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function submitForm(e) {
    e.preventDefault();
    const postData = {
      date,
      name,
    };
    console.log(postData);
    post(postUrl, {
      date: postData.date,
      name: postData.name,
    }).then(() => {
      console.log("submitForm executed");
      setName("");
      if (name !== "" && date !== "") {
        console.log("Name: ", name, "Date: ", date);
        setOpenSnackbar(true);
        setTimeout(() => {}, 4000);
      } else {
        //prikaže error box, če oba podatka nista izpolnjena
        setErrorTxt(true);
        setTimeout(() => {
          setErrorTxt(false);
        }, 2000);
      }
    });
  }

  return (
    <div>
      <Col xxl="4" xl="6" lg="9" md="11" sm="12">
        <Form className="addNew" onSubmit={(e) => submitForm(e)}>
          <Form.Group className="mb-5">
            <Form.Label>Datum dežurstva: </Form.Label>
            <Form.Control
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="date"
              placeholder="dan/mesec/leto"
            />
            <Form.Text className="text-muted">
              Ob kliku na ikono koledarja se odpre koledar
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Izvajalec dežurstva: </Form.Label>
            <Form.Control
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Ime in priimek izvajalca"
            />
          </Form.Group>
          <Button variant="outline-success" type="submit">
            Dodaj
          </Button>
          {errorTxt && "  Izpolniti morate vsa polja!"}
        </Form>
      </Col>
      <CustomSnackbar
        open={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
        content="Novo dežurstvo dodano."
      />
    </div>
  );
};
export default NovVnos;

import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { post } from "../../Helper";

const NovVnos = () => {
  const postUrl = `${process.env.REACT_APP_BASE_URL}/src/rest/novDezurni.php`;
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [successTxt, setSuccessTxt] = useState(false);
  const [errorTxt, setErrorTxt] = useState(false);

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
        //prikaže success box, le če sta oba podatka izpolnjena
        console.log("Name: ", name, "Date: ", date);
        setSuccessTxt(true);
        setTimeout(() => {
          setSuccessTxt(false);
        }, 4000);
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
      <br />
      <Col xxl="1" xl="2" lg="4" md="5" sm="6">
        <Form className="novVnos" onSubmit={(e) => submitForm(e)}>
          <Form.Group className="mb-3">
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
          <Form.Group className="mb-3">
            <Form.Label>Izvajalec dežurstva: </Form.Label>
            <Form.Control
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Ime in priimek izvajalca"
            />
          </Form.Group>

          <div className="successBox">
            <Button variant="outline-success" type="submit">
              Dodaj
            </Button>
            {errorTxt && "  Izpolniti morate vsa polja!"}
            {successTxt && "  Novo dežurstvo uspešno dodano!"}
          </div>
        </Form>
      </Col>
    </div>
  );
};
export default NovVnos;

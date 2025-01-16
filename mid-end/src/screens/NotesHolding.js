import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";

const NotesHolding = () => {
  const [form, setForm] = useState({
    branch: "",
    denominations: [{ denomination: "", fit: "", unfit: "" }],
  });

  const handleChange = (e, index, field) => {
    const { value } = e.target;
    const updatedDenominations = [...form.denominations];
    updatedDenominations[index][field] = value;
    setForm({ ...form, denominations: updatedDenominations });
  };

  const handleAddDenomination = () => {
    setForm((prevState) => ({
      ...prevState,
      denominations: [
        ...prevState.denominations,
        { denomination: "", fit: "", unfit: "" },
      ],
    }));
  };

  const handleRemoveDenomination = (index) => {
    const updatedDenominations = form.denominations.filter((_, i) => i !== index);
    setForm({ ...form, denominations: updatedDenominations });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Form submitted successfully!");
  };

  return (
    <Container
      className="mt-5 p-4"
      style={{
        maxWidth: "800px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 className="text-center mb-4">Cash Denomination Form</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="branchName" className="mb-4">
          <Form.Label>Branch Name</Form.Label>
          <Form.Control
            as="select"
            size="sm"
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
          >
            <option value="">Select Branch</option>
            <option value="Branch A">Branch A</option>
            <option value="Branch B">Branch B</option>
            <option value="Branch C">Branch C</option>
          </Form.Control>
        </Form.Group>

        {form.denominations.map((entry, index) => (
          <Row key={index} className="align-items-center mb-3">
            <Col xs="3">
              <div className="form-floating">
                <Form.Control
                  as="select"
                  className="form-control-sm"
                  value={entry.denomination}
                  onChange={(e) => handleChange(e, index, "denomination")}
                >
                  <option value="">Select</option>
                  <option value="50 (new)">50 (new)</option>
                  <option value="50 (old)">50 (old)</option>
                  <option value="100 (new)">100 (new)</option>
                  <option value="100 (old)">100 (old)</option>
                  <option value="200">200 (new)</option>
                  <option value="200">200 (old)</option>
                  <option value="500">500 (new)</option>
                  <option value="500">500 (old)</option>
                  <option value="1000">1000 (new)</option>
                </Form.Control>
                <Form.Label>Denomination</Form.Label>
              </div>
            </Col>
            <Col xs="3">
              <div className="form-floating">
                <Form.Control
                  type="number"
                  className="form-control-sm"
                  placeholder="Fit"
                  value={entry.fit}
                  onChange={(e) => handleChange(e, index, "fit")}
                />
                <Form.Label>Fit</Form.Label>
              </div>
            </Col>
            <Col xs="3">
              <div className="form-floating">
                <Form.Control
                  type="number"
                  className="form-control-sm"
                  placeholder="Unfit"
                  value={entry.unfit}
                  onChange={(e) => handleChange(e, index, "unfit")}
                />
                <Form.Label>Unfit</Form.Label>
              </div>
            </Col>
            <Col xs="2">
              <div className="form-floating"></div>
              <div className="form-floating">
                <Form.Control
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="total"
                  // value={entry.unfit}
                  value="40"
                />
                <Form.Label htmlFor="total">T24 Total</Form.Label>
              </div>
            </Col>

            <Col xs="1" className="text-center">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveDenomination(index)}
              >
                <FaTrash />
              </Button>
            </Col>
          </Row>
        ))}


        <div className="text-center mb-4">
          <Button
            variant="success"
            size="sm"
            onClick={handleAddDenomination}
          >
            <FaPlus /> Add Denomination
          </Button>
        </div>

        <Button
          type="submit"
          className="w-100"
          style={{ backgroundColor: "#002D62", border: "none" }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default NotesHolding;

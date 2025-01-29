import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

const NotesHolding = () => {
  const [form, setForm] = useState({
    branch: "",
    denominations: [],
  });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingDenominations, setFetchingDenominations] = useState(false);

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cash/branches");
        const result = await response.json();
        if (result.success && Array.isArray(result.data[0])) {
          setBranches(result.data[0]);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleBranchChange = (e) => {
    setForm({ ...form, branch: e.target.value, denominations: [] });
  };

  // Fetch denominations
  const fetchDenominations = async () => {
    const selectedBranch = branches.find(
      (b) => b.NCBA_BRANCH_NAME === form.branch
    );

    if (!selectedBranch?.NCBA_BRANCH_CODE) return;

    setFetchingDenominations(true);
    try {
      const url = `http://localhost:8000/api/cash/branch/${selectedBranch.NCBA_BRANCH_CODE}`;
      const response = await fetch(url);
      const result = await response.json();

      if (result.success && Array.isArray(result.data?.[0])) {
        const formatted = result.data[0].map((d) => ({
          ...d,
          fit: "",
          unfit: "",
        }));
        setForm((prev) => ({ ...prev, denominations: formatted }));
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setFetchingDenominations(false);
    }
  };

  const handleChange = (e, index, field) => {
    const updated = [...form.denominations];
    updated[index][field] = e.target.value;
    setForm((prev) => ({ ...prev, denominations: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", form);
    // Submit logic here
  };

  return (
    <Container
      className="mt-5 p-4"
      style={{ maxWidth: "1000px", backgroundColor: "#f9f9f9" }}
    >
      <h3 className="text-center mb-4">Cash Denomination Form</h3>
      <Form onSubmit={handleSubmit}>
        {/* Combined branch selector and fetch button row */}
        <Form.Group className="mb-4">
          <Form.Label>Branch Name</Form.Label>
          <Row className="g-2 align-items-end">
            <Col md={9}>
              <Form.Control
                as="select"
                value={form.branch}
                onChange={handleBranchChange}
                disabled={loading}
                className="form-control-md"
              >
                <option value="">
                  {loading ? "Loading..." : "Select Branch"}
                </option>
                {branches.map((branch) => (
                  <option
                    key={branch.NCBA_BRANCH_CODE}
                    value={branch.NCBA_BRANCH_NAME}
                  >
                    {branch.NCBA_BRANCH_NAME}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={3}>
              <Button
                variant="primary"
                onClick={fetchDenominations}
                disabled={!form.branch || fetchingDenominations}
                className="w-100 btn-md"
              >
                {fetchingDenominations ? "Fetching..." : "Fetch Denominations"}
              </Button>
            </Col>
          </Row>
        </Form.Group>

        {/* Denominations display with floating labels */}
        {form.denominations.length > 0 ? (
          form.denominations.map((denom, index) => (
            <Row key={index} className="align-items-center mb-3">
              {/* Denomination Field */}
              <Col md={3}>
                <div className="form-floating">
                  <Form.Control
                    plaintext
                    readOnly
                    className="form-control-md"
                    value={denom.DENOMINATION}
                  />
                  <Form.Label>Denomination</Form.Label>
                </div>
              </Col>

              {/* Total Quantity Field */}
              <Col md={2}>
                <div className="form-floating">
                  <Form.Control
                    plaintext
                    readOnly
                    className="form-control-md"
                    value={denom.TOTAL_QUANTITY}
                  />
                  <Form.Label>Total Quantity</Form.Label>
                </div>
              </Col>

              {/* Fit Field */}
              <Col md={3}>
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    className="form-control-md"
                    placeholder="Fit"
                    value={denom.fit}
                    onChange={(e) => handleChange(e, index, "fit")}
                  />
                  <Form.Label>Fit</Form.Label>
                </div>
              </Col>

              {/* Unfit Field */}
              <Col md={3}>
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    className="form-control-md"
                    placeholder="Unfit"
                    value={denom.unfit}
                    onChange={(e) => handleChange(e, index, "unfit")}
                  />
                  <Form.Label>Unfit</Form.Label>
                </div>
              </Col>
            </Row>
          ))
        ) : (
          <div className="text-center text-muted py-3">
            {form.branch ? "No denominations found" : "Select a branch first"}
          </div>
        )}

        <Button
          type="submit"
          variant="success"
          className="w-100 mt-4"
          disabled={form.denominations.length === 0}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default NotesHolding;

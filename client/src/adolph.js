import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

const TestScreen = () => {
  const [form, setForm] = useState({
    branch: "",
    denominations: [],
  });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingDenominations, setFetchingDenominations] = useState(false);

  // Fetch branches (your original working version)
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

  // Fixed denomination fetching with proper logging
  const fetchDenominations = async () => {
    const selectedBranch = branches.find(b => b.NCBA_BRANCH_NAME === form.branch);
    
    if (!selectedBranch?.NCBA_BRANCH_CODE) return;

    setFetchingDenominations(true);
    try {
      const url = `http://localhost:8000/api/cash/branch/${selectedBranch.NCBA_BRANCH_CODE}`;
      console.log('Fetching denominations from:', url);
      
      const response = await fetch(url);
      const result = await response.json();
      console.log('Denominations response:', result);

      if (result.success && Array.isArray(result.data?.[0])) {
        const formatted = result.data[0].map(d => ({
          ...d,
          fit: "",
          unfit: ""
        }));
        setForm(prev => ({ ...prev, denominations: formatted }));
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
    setForm(prev => ({ ...prev, denominations: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', form);
    // Your submit logic here
  };

  return (
    <Container className="mt-5 p-4" style={{ maxWidth: "800px", backgroundColor: "#f9f9f9" }}>
      <h3 className="text-center mb-4">Cash Denomination Form</h3>
      <Form onSubmit={handleSubmit}>
        {/* Branch selector - your working version */}
        <Form.Group className="mb-4">
          <Form.Label>Branch Name</Form.Label>
          <Form.Control
            as="select"
            value={form.branch}
            onChange={handleBranchChange}
            disabled={loading}
          >
            <option value="">{loading ? "Loading..." : "Select Branch"}</option>
            {branches.map(branch => (
              <option key={branch.NCBA_BRANCH_CODE} value={branch.NCBA_BRANCH_NAME}>
                {branch.NCBA_BRANCH_NAME}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button
          variant="primary"
          onClick={fetchDenominations}
          disabled={!form.branch || fetchingDenominations}
          className="mb-4"
        >
          {fetchingDenominations ? "Fetching..." : "Fetch Denominations"}
        </Button>

        {/* Simplified denominations display */}
        {form.denominations.length > 0 ? (
          form.denominations.map((denom, index) => (
            <Row key={index} className="mb-3 g-2">
              <Col md={3}>
                <Form.Control
                  plaintext
                  readOnly
                  value={denom.DENOMINATION}
                  className="fw-bold"
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  plaintext
                  readOnly
                  value={denom.TOTAL_QUANTITY}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Fit"
                  value={denom.fit}
                  onChange={(e) => handleChange(e, index, 'fit')}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="number"
                  min="0"
                  placeholder="Unfit"
                  value={denom.unfit}
                  onChange={(e) => handleChange(e, index, 'unfit')}
                />
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

export default TestScreen;
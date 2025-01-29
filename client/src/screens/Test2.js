import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TestScreen = () => {
  const [form, setForm] = useState({
    branch: "",
    denominations: [],
  });

  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingDenominations, setFetchingDenominations] = useState(false);

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
          fitNew: "",
          fitOld: "0",  // Default to 0
          unfitNew: "0", // Default to 0
          unfitOld: "0", // Default to 0
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
    const denomination = updated[index];
    const value = e.target.value;

    // Update changed field
    denomination[field] = value;

    // Calculate fitNew whenever other values change
    if (field !== "fitNew") {
      const total = parseInt(denomination.TOTAL_QUANTITY) || 0;
      const fitOld = parseInt(denomination.fitOld) || 0;
      const unfitNew = parseInt(denomination.unfitNew) || 0;
      const unfitOld = parseInt(denomination.unfitOld) || 0;
      
      const calculatedFitNew = total - (fitOld + unfitNew + unfitOld);
      denomination.fitNew = calculatedFitNew >= 0 ? calculatedFitNew.toString() : "0";
    }

    setForm((prev) => ({ ...prev, denominations: updated }));
  };

  const transformData = (form) => {
    if (!form || !form.denominations) return null;

    return {
      branch: form.branch,
      DEPT_CODE: form.denominations[0]?.DEPT_CODE,
      denominations: form.denominations.map((denom) => {
        const serialBase = denom.DENOMINATION.replace("KES", "");
        const serialCodeNew = `KESB${serialBase}`;
        const serialCodeOld = `KES${serialBase}`;

        return {
          DENOMINATION: denom.DENOMINATION,
          TOTAL_QUANTITY: denom.TOTAL_QUANTITY,
          fit: {
            new: { amount: parseInt(denom.fitNew) || 0, serialCode: serialCodeNew },
            old: { amount: parseInt(denom.fitOld) || 0, serialCode: serialCodeOld },
          },
          unfit: {
            new: { amount: parseInt(denom.unfitNew) || 0, serialCode: serialCodeNew },
            old: { amount: parseInt(denom.unfitOld) || 0, serialCode: serialCodeOld },
          },
        };
      }),
    };
  };

  const validateDenominations = () => {
    let isValid = true;
    
    form.denominations.forEach((denom) => {
      const total = parseInt(denom.TOTAL_QUANTITY);
      const fitNew = parseInt(denom.fitNew) || 0;
      const fitOld = parseInt(denom.fitOld) || 0;
      const unfitNew = parseInt(denom.unfitNew) || 0;
      const unfitOld = parseInt(denom.unfitOld) || 0;

      // Check if sum matches total
      if (fitNew + fitOld + unfitNew + unfitOld !== total) {
        toast.error(`Values for ${denom.DENOMINATION} don't sum to total quantity`);
        isValid = false;
      }

      // Check for negative values
      if ([fitNew, fitOld, unfitNew, unfitOld].some(val => val < 0)) {
        toast.error(`Negative values found for ${denom.DENOMINATION}`);
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateDenominations()) return;

    const payload = transformData(form);
    
    try {
      const response = await fetch("http://localhost:8000/api/cash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Data submitted successfully!");
        setForm({ branch: "", denominations: [] });
      } else {
        toast.error("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <Container
      className="mt-5 p-4"
      style={{ maxWidth: "1000px", backgroundColor: "#f9f9f9" }}

    >
      <ToastContainer position="top-center" autoClose={12000} />


      <h3 className="text-center mb-4">Cash Denomination Form</h3>
      <Form onSubmit={handleSubmit}>
        {/* Combined branch selector and fetch button row */}
        <Form.Group className="mb-4">
          <Form.Label>Branch Name</Form.Label>
          <Row className="g-2 align-items-center">
            <Col md={8}>
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
            <Col md={3} className="px-0 ms-3">
              <Button
                variant="primary"
                onClick={fetchDenominations}
                disabled={!form.branch || fetchingDenominations}
                className="w-90 btn-md"
                style={{ height: "100%", borderRadius: "0.5rem" }}
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
              <Col md={2}>
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

              <Col md={2}>
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    min="0"
                    className="form-control-md"
                    placeholder="Unfit-New"
                    value={denom.unfitNew}
                    onChange={(e) => handleChange(e, index, "unfitNew")}
                  />
                  <Form.Label>Unfit New</Form.Label>
                </div>
              </Col>

              <Col md={2}>
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    min="0"
                    className="form-control-md"
                    placeholder="Unfit-Old"
                    value={denom.unfitOld}
                    onChange={(e) => handleChange(e, index, "unfitOld")}
                  />
                  <Form.Label>Unfit Old</Form.Label>
                </div>
              </Col>

              <Col md={2}>
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    className="form-control-md"
                    placeholder="Fit-New"
                    value={denom.fitNew}
                    readOnly
                  />
                  <Form.Label>Fit New</Form.Label>
                </div>
              </Col>

              <Col md={2}>
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    min="0"
                    className="form-control-md"
                    placeholder="Fit-Old"
                    value={denom.fitOld}
                    onChange={(e) => handleChange(e, index, "fitOld")}
                  />
                  <Form.Label>Fit Old</Form.Label>
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

export default TestScreen;
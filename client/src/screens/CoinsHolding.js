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
          fitOld: "",
          unfitNew: "",
          unfitOld: "",
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
            new: { amount: denom.fitNew || 0, serialCode: serialCodeNew },
            old: { amount: denom.fitOld || 0, serialCode: serialCodeOld },
          },
          unfit: {
            new: { amount: denom.unfitNew || 0, serialCode: serialCodeNew },
            old: { amount: denom.unfitOld || 0, serialCode: serialCodeOld },
          },
        };
      }),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = transformData(form);
 console.log(payload)
    if (!payload.branch || payload.denominations.length === 0) {
      alert("Branch and denominations are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/cash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        alert("Data submitted successfully!");
        setForm({ branch: "", denominations: [] });
      } else {
        alert("Failed to submit data. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
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
              {/* Denomination Field */}
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

               {/* Unfit-New Field */}
<Col md={2}>
  <div className="form-floating">
    <Form.Control
      type="number"
      className="form-control-md"
      placeholder="Unfit-New"
      value={denom.unfitNew || ""}
      onChange={(e) => handleChange(e, index, "unfitNew")}
    />
    <Form.Label>Unfit New</Form.Label>
  </div>
</Col>

{/* Unfit-Old Field */}
<Col md={2}>
  <div className="form-floating">
    <Form.Control
      type="number"
      className="form-control-md"
      placeholder="Unfit-Old"
      value={denom.unfitOld || ""}
      onChange={(e) => handleChange(e, index, "unfitOld")}
    />
    <Form.Label>Unfit Old</Form.Label>
  </div>
</Col>

{/* Fit-New Field */}
<Col md={2}>
  <div className="form-floating">
    <Form.Control
      type="number"
      className="form-control-md"
      placeholder="Fit-New"
      value={denom.fitNew || ""}
      onChange={(e) => handleChange(e, index, "fitNew")}
    />
    <Form.Label>Fit New</Form.Label>
  </div>
</Col>

{/* Fit-Old Field */}
<Col md={2}>
  <div className="form-floating">
    <Form.Control
      type="number"
      className="form-control-md"
      placeholder="Fit-Old"
      value={denom.fitOld || ""}
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

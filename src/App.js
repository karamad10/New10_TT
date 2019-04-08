import React, { Component } from "react";
import "./app.css";
const monthArray = [3, 6, 9, 12, 24, 36, 48, 60];

class App extends Component {
  state = {
    selectedTargetValue: "",
    selectedFormValue: "",
    selectedAmount: 5000,
    selectedDuration: 0,
    durationOption: 3,
    interest: 6
  };

  computeInterestRate(duration, amount) {
    if (duration <= 19) {
      if (amount <= 50000) return 6;
      if (amount <= 150000) return 5;
      return 4;
    }
    if (duration <= 42) {
      if (amount <= 50000) return 7;
      if (amount <= 150000) return 6;
      return 5;
    }
    if (amount <= 50000) return 8;
    if (amount <= 150000) return 7;
    return 7;
  }

  handleSelectChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleInterestChange = e => {
    const { name, value } = e.target;
    let selectedDurationValue;

    if (name === "selectedAmount") {
      this.setState({ selectedAmount: parseInt("" + value * 1000) });
    } else if (name === "selectedDuration") {
      selectedDurationValue = parseInt(value, 10);

      const closestMonth = monthArray.reduce((prev, curr) => {
        return Math.abs(curr - selectedDurationValue) <
          Math.abs(prev - selectedDurationValue)
          ? curr
          : prev;
      });

      this.setState({
        [name]: parseInt(value, 10),
        durationOption: closestMonth
      });
    }

    const { selectedAmount, selectedDuration } = this.state;

    this.setState({
      interest: this.computeInterestRate(selectedDuration, selectedAmount)
    });
  };

  handleInterestChange;
  render() {
    const {
      selectedTargetValue,
      selectedFormValue,
      selectedDuration,
      durationOption,
      selectedAmount,
      interest
    } = this.state;
    return (
      <div className="App">
        <h3 className="header">Put together your business financing</h3>

        <div>
          <form>
            <div className="requested-value-container">
              <label id="mini-title">Target</label>
              <label id="mini-title">Company form</label>
            </div>
            <div className="requested-value-container">
              <select
                name="selectedTargetValue"
                className="select-value"
                value={selectedTargetValue}
                onChange={this.handleSelectChange}
              >
                <option value="" disabled>
                  Choose target
                </option>
                <option value="marketing">marketing</option>
                <option value="equipment">equipment</option>
              </select>

              <select
                id="nd-select"
                name="selectedFormValue"
                className="select-value"
                value={selectedFormValue}
                onChange={this.handleSelectChange}
              >
                <option value="" disabled>
                  Choose form
                </option>
                <option value="bv">bv</option>
                <option value="eenmanszaak">eenmanszaak</option>
              </select>
            </div>

            <div className="requested-value-container">
              <label id="mini-title">Financing</label>
              <span className="input-euro left">
                <input
                  name="selectedAmount"
                  type="text"
                  value={(selectedAmount / 1000).toFixed(3)}
                  id="amount-input"
                  onChange={this.handleInterestChange}
                />
              </span>
            </div>

            <div className="range">
              <input
                className="range-slide"
                name="selectedAmount"
                type="range"
                min="5.000"
                max={
                  selectedTargetValue === "equipment" &&
                  selectedFormValue === "bv"
                    ? "500.000"
                    : "250.000"
                }
                step="1.00"
                value={(selectedAmount / 1000).toFixed(3)}
                onChange={this.handleInterestChange}
              />
            </div>

            <div className="interest-container">
              <span id="interest-title">Interest:</span>
              <div id="interest">{interest}%</div>
            </div>

            <div className="requested-value-container">
              <label id="mini-title">Duration</label>
              <select
                id="d-select"
                name="selectedDuration"
                value={durationOption}
                className="select-value"
                onChange={this.handleInterestChange}
              >
                <option disabled>Choose duration</option>
                {monthArray.map((month, index) => (
                  <option key={index} value={month}>
                    {month} months
                  </option>
                ))}
              </select>
            </div>
            <div className="range">
              <input
                className="range-slide"
                name="selectedDuration"
                type="range"
                min={1}
                max={60}
                step="1"
                value={selectedDuration}
                onChange={this.handleInterestChange}
              />
            </div>
            <div id="footer">
              <a href=".">Check if you qualify</a>
              <button className="submit-button">
                <span id="button-text">Get started right away</span>
              </button>
            </div>
          </form>
          <p id="contact">
            Calculate an automatically generated customized offer. Please
            contact 020-2621800 for questions or comments..
          </p>
        </div>
      </div>
    );
  }
}

export default App;

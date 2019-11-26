import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      start: "",
      finish: "",
      total: 0,
      displayTotal: "0:0"
    };

    this.submitTime = this.submitTime.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
  }

  submitTime(e) {
    e.preventDefault();
    var timeStart = new Date("01/01/2019 " + e.target.start.value);
    var timeEnd = new Date("01/01/2019 " + e.target.finish.value);

    var diff = (timeEnd - timeStart) / 60000; //dividing by seconds and milliseconds

    console.log(diff);

    var newTotal = this.state.total + diff;

    var minutes = newTotal % 60;
    var hours = (newTotal - minutes) / 60;

    var newDisplay = hours + ":" + minutes;

    var prevEntries = this.state.entries;
    var newEntry = {
      start: e.target.start.value,
      finish: e.target.finish.value,
      id: newTotal
    };
    prevEntries.push(newEntry);

    this.setState({
      total: newTotal,
      displayTotal: newDisplay,
      entries: prevEntries,
      start: "",
      finish: ""
    });
  }

  deleteTime(id) {
    var entries = this.state.entries;
    var newTotal = this.state.total;
    var newDisplay = this.state.displayTotal;

    for (var i = 0; i < entries.length; i++) {
      if (entries[i].id === id) {
        var timeStart = new Date("01/01/2019 " + entries[i].start);
        var timeEnd = new Date("01/01/2019 " + entries[i].finish);

        var diff = (timeEnd - timeStart) / 60000;

        newTotal -= diff;

        var minutes = newTotal % 60;
        var hours = (newTotal - minutes) / 60;

        newDisplay = hours + ":" + minutes;

        entries.splice(i, 1);
      }
    }

    var newEntries = entries;
    console.log(newEntries);

    this.setState({
      entries: newEntries,
      total: newTotal,
      displayTotal: newDisplay
    });
  }

  render() {
    return (
      <div className="App">
        <div className="navbar-fixed">
          <nav className="teal accent-4">
            <div className="container">
              <div className="nav-wrapper">
                <a href="#!" className="brand-logo center">
                  <i className="icon ion-ios-timer icon-lg"></i>WORKING{" "}
                  <b>HOURS</b>
                </a>
              </div>
            </div>
          </nav>
        </div>

        <div className="container">
          <br />

          <br />
          <div class="row">
            <div class="col s9">
              <div class="card text-left">
                <div class="card-content ">
                  <span class="card-title">
                    Insert the starting time & finishing time
                  </span>

                  {this.state.entries ? (
                    this.state.entries.map(entry => (
                      <div className="row" key={entry.id}>
                        <div class="input-field col s5">
                          <h6>{entry.start}</h6>
                        </div>
                        <div class="input-field col s5">
                          <h6>{entry.finish}</h6>
                        </div>
                        <div class="input-field col s2">
                          <button
                            class="btn-flat"
                            onClick={() => {
                              this.deleteTime(entry.id);
                            }}
                          >
                            <i className="icon ion-ios-close-circle-outline icon-lg red-text"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div />
                  )}

                  <div className="row">
                    <form onSubmit={this.submitTime}>
                      <div class="input-field col s5">
                        <input
                          type="text"
                          name="start"
                          class="col s7 timepicker"
                          value={this.state.start}
                        />
                        <label for="first_name">Start</label>
                      </div>
                      <div class="input-field col s5">
                        <input
                          type="text"
                          name="finish"
                          class="col s7 timepicker"
                          value={this.state.finish}
                        />
                        <label for="last_name">Finish</label>
                      </div>
                      <div class="input-field col s2">
                        <button type="submit" class="btn">
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s3">
              <div class="card fixed">
                <div class="card-content padded">
                  <span class="card-title">Total Hours</span>
                  <h1>{this.state.displayTotal}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

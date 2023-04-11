import { useState } from "react";
import moment from "moment";
import "./App.css";

function App() {
  const [selectedOption, setSelectedOption] = useState("");
  const [bedtime, setBedtime] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [suggestedTime, setSuggestedTime] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setBedtime("");
    setWakeUpTime("");
    setSuggestedTime("");
  };

  const handleTimeChange = (e) => {
    if (selectedOption === "bedtime") {
      setBedtime(e.target.value);
    } else {
      setWakeUpTime(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hoursOfSleep = 9;
    if (bedtime) {
      const bedtimeMoment = moment(bedtime, "HH:mm");
      const wakeUpMoment = bedtimeMoment.clone().add(hoursOfSleep, "hours");
      const suggestedTimeMoment = wakeUpMoment.format("hh:mm A");
      setSuggestedTime(suggestedTimeMoment);
    } else if (wakeUpTime) {
      const wakeUpMoment = moment(wakeUpTime, "HH:mm");
      const suggestedBedtimeMoment = wakeUpMoment
        .clone()
        .subtract(hoursOfSleep, "hours")
        .format("hh:mm A");
      setSuggestedTime(suggestedBedtimeMoment);
    }
  };

  const handleClear = () => {
    setSelectedOption("");
    setBedtime("");
    setWakeUpTime("");
    setSuggestedTime("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <h1
          className="text-9xl font-bold text-center text-indigo-500 mt-10 mb-2 z-1"
          style={{ whiteSpace: "nowrap" }}
        >
          Snooze
        </h1>
        <h2 className="text-2xl font-bold text-center mb-20 text-white">
          Wake up feeling fresh
        </h2>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="optionSelect"
                className="block text-sm font-medium text-gray-700"
              >
                Select an option:
              </label>
              <div className="mt-1">
                <select
                  id="optionSelect"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <option value="">Select one...</option>
                  <option value="bedtime">What time will you sleep?</option>
                  <option value="wakeUpTime">
                    What time will you wake up?
                  </option>
                </select>
              </div>
            </div>
            {selectedOption && (
              <div>
                <label
                  htmlFor={`${selectedOption}Input`}
                  className="block text-sm font-medium text-gray-700"
                >
                  {selectedOption === "bedtime"
                    ? "What time will you sleep?"
                    : "What time will you wake up?"}
                </label>
                <div className="mt-1">
                  <input
                    type="time"
                    id={`${selectedOption}Input`}
                    name={`${selectedOption}Input`}
                    value={selectedOption === "bedtime" ? bedtime : wakeUpTime}
                    onChange={handleTimeChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            {suggestedTime && (
              <div className="text-center text-xl font-bold text-indigo-500">
                You should try to{" "}
                {selectedOption === "bedtime" ? "wake up" : "sleep"} at{" "}
                <span className="underline">{suggestedTime}</span> resulting in
                6 Sleep Cycles (Suggested).
              </div>
            )}
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-1/3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="w-1/3 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

//   return (
//     <div className="">
//       <header>
//         <h1>Snooze</h1>
//       </header>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="bedtimeInput">
//           What time do you plan to go to bed?
//         </label>
//         <input
//           type="time"
//           id="bedtimeInput"
//           value={bedtime}
//           onChange={handleBedtimeChange}
//           disabled={wakeUpTime}
//         />
//         <label htmlFor="wakeUpTimeInput">
//           What time do you want to wake up?
//         </label>
//         <input
//           type="time"
//           id="wakeUpTimeInput"
//           value={wakeUpTime}
//           onChange={handleWakeUpTimeChange}
//           disabled={bedtime}
//         />
//         <button type="submit">Submit</button>
//         <button type="button" onClick={handleClear}>
//           Clear
//         </button>
//       </form>
//       {suggestedBedTime && (
//         <p>You should aim to sleep at around {suggestedBedTime}.</p>
//       )}
//       {bedtime && wakeUpTime && (
//         <div>
//           <p>
//             If you go to bed at {bedtime}, you should wake up at {wakeUpTime}.
//           </p>
//           <p>
//             If you want to wake up at {wakeUpTime}, you should go to bed at{" "}
//             {bedtime}.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

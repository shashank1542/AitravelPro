import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import TravelDetails from "./TravelDetails"; // Import TravelDetails component

const TripForm = () => {
  const [formData, setFormData] = useState({
    destination: "",
    startDate: dayjs(new Date()),
    endDate: dayjs(new Date()),
    noOfTravellers: "",
  });

  const [response, setResponse] = useState(null); // You can use this state to display the response

  const structureData = `{
    "destination": "travel destination",
    "Duration": "how many days",
    "Travelers": "Number of Travelers",
    "travel": "through which mode we can go there",
    "days": [["1 activity to do in day1",.., "2 activity to do in day1"],
             ["1 activity to do in day2", "2 activity to do in day3"],
             ...
             ["1 activity to do in dayn",.., "2 activity to do in dayn"]
            ],
    "bestAccommodations": [],
    "Dining":[],
    "Activities":[],
    "Tips":[]
  }`;

  const api_key = "AIzaSyDTqpmWGozpjS8AVsb4f2kj24h078AMTgA";
  const [isDisable, setIsDisable] = useState(false);
  console.log("hello");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisable === false) {
      setIsDisable(true);
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const payload = {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Plan a great trip to ${formData.destination} from ${formData.startDate} to ${formData.endDate}. There will be ${formData.noOfTravellers} travelers. Please provide the response in this format: ${structureData}`,
                },
              ],
            },
          ],
        };

        console.log("hello1");
        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${api_key}`,
          payload,
          { headers }
        );
        console.log("hello3", res.data);

        setResponse(res.data.candidates[0].content.parts[0].text);
      } catch (error) {
        console.error(
          "Error details:",
          error.response ? error.response.data : error.message
        );
        console.log("hello2");

        setResponse(
          JSON.stringify({ error: "Error fetching response from Gemini API" })
        );
      }
    }
  };

  return (
    <>
      {response ? (
        <TravelDetails tripDetails={response} />
      ) : (
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="destination"
            label="Destination"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.destination}
            onChange={(event) => {
              setFormData({ ...formData, destination: event.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Start Date"
                defaultValue={formData.startDate}
                value={formData.startDate}
                onChange={(value) => {
                  setFormData({ ...formData, startDate: value });
                }}
              />
              <DatePicker
                label="End Date"
                defaultValue={formData.endDate}
                value={formData.endDate}
                onChange={(value) => {
                  setFormData({ ...formData, endDate: value });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            id="travelers"
            label="Number of Travelers"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.noOfTravellers}
            onChange={(event) => {
              setFormData({ ...formData, noOfTravellers: event.target.value });
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Plan My Trip
          </Button>
        </Box>
      )}
    </>
  );
};

export default TripForm;

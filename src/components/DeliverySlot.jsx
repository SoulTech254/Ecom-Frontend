import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { AlarmClock, Clock, MapPinned } from "lucide-react";
import { Button } from "./ui/button";

const DeliverySlot = ({ onSelectSlot }) => {
  const [deliverySlots, setDeliverySlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const generateDeliverySlots = () => {
      const times = ["09:00", "12:00", "15:00", "17:00", "19:00"];

      const today = new Date();
      const tempDeliverySlots = [];

      for (let d = 0; d < 5; d++) {
        const currentDate = new Date(today);
        currentDate.setDate(currentDate.getDate() + d);

        const filteredTimes = times.filter((time) => {
          const dateTimeString = `${currentDate.getFullYear()}-${(
            currentDate.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${currentDate
            .getDate()
            .toString()
            .padStart(2, "0")} ${time}`;
          const slotDateTime = new Date(dateTimeString);
          return slotDateTime > today;
        });

        filteredTimes.forEach((time) => {
          const dayOfWeek = getDayOfWeek(currentDate.getDay());
          const year = currentDate.getFullYear();
          const month = (currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          const day = currentDate.getDate().toString().padStart(2, "0");

          const formattedTime = formatTime(time); // Format time to AM/PM format

          const slot = {
            datetime: `${year}-${month}-${day} ${time}`,
            display: `${dayOfWeek} ${day}${getOrdinalSuffix(
              day
            )} ${getMonthName(month)} ${formattedTime}`,
          };
          tempDeliverySlots.push(slot);
        });
      }

      setDeliverySlots(tempDeliverySlots);
      setSelectedSlot(tempDeliverySlots[0]);
      onSelectSlot(tempDeliverySlots[0].datetime);
    };

    const getDayOfWeek = (dayIndex) => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return daysOfWeek[dayIndex];
    };

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const getMonthName = (month) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return monthNames[parseInt(month, 10) - 1];
    };

    const formatTime = (time) => {
      const [hour, minute] = time.split(":");
      const hourInt = parseInt(hour, 10);
      const isPM = hourInt >= 12;
      const formattedHour = hourInt % 12 || 12; // Convert to 12-hour format
      return `${formattedHour}:${minute}${isPM ? "PM" : "AM"}`;
    };

    generateDeliverySlots();
  }, []);

  const handleSelectSlot = (selectedSlot) => {
    setSelectedSlot(selectedSlot);
    onSelectSlot(selectedSlot.datetime);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-[#A0D8BF] flex gap-8 px-10 py-3 mt-2">
        <AlarmClock color="#E61927" />
        <h2>Schedule Delivery Time</h2>
      </div>
      <div className="bg-white flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold">Select Delivery Time Slot</h2>
        <p className="text-gray-700">
          {selectedSlot ? selectedSlot.display : ""}
        </p>
        <PopoverContent className="w-50 h-60 bg-white p-4">
          <ScrollArea className="h-full w-full border-none rounded-md border">
            <ul>
              {deliverySlots.map((slot, index) => (
                <li
                  key={index}
                  className="py-2 px-3 cursor-pointer hover:bg-gray-100 rounded-md transition duration-300"
                  onClick={() => handleSelectSlot(slot)}
                >
                  {slot.display}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </PopoverContent>
        <PopoverTrigger asChild>
          <button
            className="border border-5 border-[#194A34] text-[#194A34] rounded-full px-4 py-2 hover:bg-[#194A34] hover:text-white transition duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            Select Time Slot
          </button>
        </PopoverTrigger>
      </div>
    </Popover>
  );
};

export default DeliverySlot;

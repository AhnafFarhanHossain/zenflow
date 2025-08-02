"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const ScheduleForm = ({
  handleClose,
  onScheduleCreated,
  onSuccess,
  onClose,
  selectedDate = null,
  editSchedule = null,
}) => {
  const { user } = useUser();
  // Use onClose if provided, otherwise fallback to handleClose
  const closeForm = onClose || handleClose;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Set the date from selectedDate prop if provided
  useEffect(() => {
    console.log("ScheduleForm received selectedDate:", selectedDate);
    if (editSchedule) {
      // Populate form with existing schedule data for editing
      setTitle(editSchedule.title || "");
      // setDescription(editSchedule.description || ""); // Temporarily disabled
      if (editSchedule.date) {
        const scheduleDate = new Date(editSchedule.date);
        const year = scheduleDate.getFullYear();
        const month = String(scheduleDate.getMonth() + 1).padStart(2, "0");
        const day = String(scheduleDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        setDate(dateStr);

        // Extract time if it exists
        const hours = String(scheduleDate.getHours()).padStart(2, "0");
        const minutes = String(scheduleDate.getMinutes()).padStart(2, "0");
        if (hours !== "00" || minutes !== "00") {
          setTime(`${hours}:${minutes}`);
        }
      }
    } else if (selectedDate) {
      // Fix timezone issue by using local date instead of UTC
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      console.log("Converted to date string:", dateStr);
      setDate(dateStr);
    }
  }, [selectedDate, editSchedule]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors first
    setErrors({
      title: "",
      date: "",
    });

    // Validate form fields
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Schedule title is required" }));
      return;
    }

    if (!date) {
      setErrors((prev) => ({ ...prev, date: "Date is required" }));
      return;
    }

    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }
    setIsSubmitting(true);

    try {
      // Combine date and time if time is provided
      let finalDate = date;
      if (time) {
        finalDate = `${date}T${time}:00`;
      }
      const scheduleData = {
        user_id: user.id,
        title: title.trim(),
        date: finalDate,
        // description: description.trim() || null, // Temporarily disabled until DB column is added
      };

      // Simulate form submission for static frontend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        editSchedule
          ? "Schedule updated successfully!"
          : "Schedule created successfully!"
      );

      // Reset form
      setTitle("");
      setDate("");
      setTime("");

      // Trigger callback with new schedule if provided
      if (onScheduleCreated) {
        onScheduleCreated({
          id: Date.now(),
          title: title.trim(),
          date: finalDateTime,
          user_id: user.id,
        });
      }

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      } else {
        // Close the form (fallback)
        closeForm();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error(err.message || "Failed to create schedule");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Title Field */}
      <div>
        <label
          htmlFor="schedule-title"
          className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
        >
          Event Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="schedule-title"
          className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
          placeholder="Enter event title..."
          required
        />
        {errors.title && (
          <p className="mt-2 text-sm sm:text-sm font-medium text-red-600 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md">
            {errors.title}
          </p>
        )}
      </div>
      {/* Date Field */}
      <div>
        <label
          htmlFor="schedule-date"
          className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
        >
          Date
        </label>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          id="schedule-date"
          className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
          required
        />
        {errors.date && (
          <p className="mt-2 text-sm sm:text-sm font-medium text-red-600 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md">
            {errors.date}
          </p>
        )}
      </div>
      {/* Time Field */}
      <div>
        <label
          htmlFor="schedule-time"
          className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
        >
          Time (Optional)
        </label>
        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
          id="schedule-time"
          className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
        />
      </div>{" "}
      {/* Description Field - Temporarily disabled until DB column is added */}
      {/* 
      <div>
        <label
          htmlFor="schedule-description"
          className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="schedule-description"
          rows="3"
          className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm resize-none"
          placeholder="Add a description for this event..."
        />
      </div>
      */}
      <Button
        variant="primary"
        size="md"
        type="submit"
        disabled={isSubmitting}
        className="flex-1 w-full mt-2 cursor-pointer"
      >
        {isSubmitting
          ? editSchedule
            ? "Updating..."
            : "Creating..."
          : editSchedule
          ? "Update Event"
          : "Create Event"}
      </Button>
    </form>
  );
};

export default ScheduleForm;

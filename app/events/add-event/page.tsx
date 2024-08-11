"use client";
import { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import { v4 as uuidv4 } from "uuid";

interface EventForm {
  title: string;
  description: string;
  datetime: string;
  duration: number;
  slots: number;
  ticketprice: number;
  discount: number;
  hostid: string;
  tags: string[];
  pic: string;
  location: string;
  links: string[];
}

const CreateEventPage = () => {
  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    datetime: "",
    duration: 0,
    slots: 0,
    ticketprice: 0,
    discount: 0,
    hostid: "",
    tags: [],
    pic: "",
    location: "",
    links: [],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]:
        name === "duration" ||
        name === "slots" ||
        name === "ticketprice" ||
        name === "discount"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>, key: keyof EventForm) => {
    const { value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value.split(","),
    }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prevForm) => ({
        ...prevForm,
        pic: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prevForm) => ({
        ...prevForm,
        pic: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const eventId = uuidv4();
    const eventData = { id: eventId, ...form };
    console.log(eventData);
    

    try {
      const response = await fetch(
        "https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        alert("Event created successfully");
      } else {
        alert("Failed to create event");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Date and Time:</label>
        <input
          type="datetime-local"
          name="datetime"
          value={form.datetime}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Duration (minutes):</label>
        <input
          type="number"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Slots:</label>
        <input
          type="number"
          name="slots"
          value={form.slots}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ticket Price:</label>
        <input
          type="number"
          step="0.01"
          name="ticketprice"
          value={form.ticketprice}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Discount:</label>
        <input
          type="number"
          step="0.01"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Host ID:</label>
        <input
          type="text"
          name="hostid"
          value={form.hostid}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tags (comma separated):</label>
        <input
          type="text"
          name="tags"
          value={form.tags.join(",")}
          onChange={(e) => handleArrayChange(e, "tags")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Picture:</label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-dashed border-2 border-gray-400 rounded-md p-4 text-center relative"
        >
          Drag and drop an image here or click to select a file
          <input
            type="file"
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {form.pic && (
          <img src={form.pic} alt="Selected" className="mt-2 max-h-48" />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Links (comma separated):</label>
        <input
          type="text"
          name="links"
          value={form.links.join(",")}
          onChange={(e) => handleArrayChange(e, "links")}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Create Event
      </button>
    </form>
  );
};

export default CreateEventPage;

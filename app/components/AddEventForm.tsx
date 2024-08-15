"use client";
import { useState, ChangeEvent, FormEvent, DragEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaRegTrashAlt } from "react-icons/fa";

interface EventForm {
  title: string;
  description: string;
  datetime: string;
  duration: number;
  slots: number;
  ticketprice: number;
  discount: number;
  hostName: string;
  tags: string[];
  pic: string;
  location: string;
  links: string[];
  hasChildrensFee: boolean;
}

const AddEventForm = () => {
  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    datetime: "",
    duration: 0,
    slots: 0,
    ticketprice: 0,
    discount: 0,
    hostName: "",
    tags: [],
    pic: "",
    location: "",
    links: [],
    hasChildrensFee: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
  
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? newValue : type === "number" ? parseFloat(value) : newValue,
    }));
  
  };
  

  const addField = (key: keyof EventForm, max: number) => {
    if (form[key].length < max) {
      setForm((prevForm) => ({
        ...prevForm,
        [key]: [...prevForm[key], ""],
      }));
    }
  };

  const removeField = (key: keyof EventForm, index: number) => {
    const newFields = [...form[key]];
    newFields.splice(index, 1);
    setForm((prevForm) => ({
      ...prevForm,
      [key]: newFields,
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
    const { hasChildrensFee, ...eventData } = form;
    const eventDataWithId = { id: eventId, ...eventData };

    try {
      const response = await fetch(
        "https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventDataWithId),
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

      {form.hasChildrensFee && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Discount:</label>
          <input
            type="number"
            step="0.01"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="hasChildrensFee"
          checked={form.hasChildrensFee}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700 text-sm font-bold">Apply Children&apos;s Fee</label>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Host Name:</label>
        <input
          type="text"
          name="hostName"
          value={form.hostName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Tags:</label>
        {form.tags.map((tag, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) => {
                const newTags = [...form.tags];
                newTags[index] = e.target.value;
                setForm((prevForm) => ({ ...prevForm, tags: newTags }));
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => removeField("tags", index)}
              className="ml-2 bg-red-500 text-white p-2 rounded-md"
            >
              <FaRegTrashAlt/>
            </button>
          </div>
        ))}
        {form.tags.length < 5 && (
          <button
            type="button"
            onClick={() => addField("tags", 5)}
            className="bg-blue-500 text-white py-1 px-2 rounded-md"
          >
            Add Tag
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Links:</label>
        {form.links.map((link, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={link}
              onChange={(e) => {
                const newLinks = [...form.links];
                newLinks[index] = e.target.value;
                setForm((prevForm) => ({ ...prevForm, links: newLinks }));
              }}
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => removeField("links", index)}
              className="ml-2 bg-red-500 text-white p-2 rounded-md"
            >
              <FaRegTrashAlt/>
            </button>
          </div>
        ))}
        {form.links.length < 3 && (
          <button
            type="button"
            onClick={() => addField("links", 3)}
            className="bg-blue-500 text-white py-1 px-2 rounded-md"
          >
            Add Link
          </button>
        )}
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

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Create Event
      </button>
    </form>
  );
};

export default AddEventForm;

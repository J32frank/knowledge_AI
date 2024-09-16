import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function EditTitle({ initialTitle, initialDescription, onSave }) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(title, description);
   
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Course Details</DialogTitle>
          <DialogDescription>
            Update the course title and description.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-400">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900 focus:border-teal-800 focus:ring-teal-800 sm:text-sm px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-400">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:border-teal-800 focus:ring-teal-800 sm:text-sm px-3 py-2"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-950 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-800 focus:ring-offset-2"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditTitle;

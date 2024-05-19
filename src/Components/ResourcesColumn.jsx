import React, { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResourcesColumn = ({ resources,setResources, addResource, datesInMonth }) => {
  const [newResource, setNewResource] = useState('');

  const handleAddResource = () => {
    if (newResource.trim() === '') {
      toast.error("Resource name cannot be empty.");
      return;
    }



    // Capitalize the first and second words
    const capitalizedResource = newResource
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (resources.includes(capitalizedResource)) {
      toast.error("Resource already exists.");
      return;
    }

    if (resources.includes(capitalizedResource)) {
      toast.error("Resource already exists.");
      return;
    }
        // Update resources in local storage
        const updatedResources = [...resources, capitalizedResource];
        localStorage.setItem('resources', JSON.stringify(updatedResources));
    addResource(capitalizedResource);
    setNewResource('');
  };

  
  useEffect(() => {
    // Load resources from local storage when component mounts
    const storedResources = JSON.parse(localStorage.getItem('resources'));
    if (storedResources) {
      setResources(storedResources);
    }
  }, []);

  return (
    <div className="resources-column flex flex-col w-[30%]">

      {/* Render resources */}
      {resources.map((resource, index) => (
        <div key={index} className={" p-2 h-[82px] border border-gray-300  text-gray-700 " + (index === 0 ? "mt-[42px] " : "")}>{resource}</div>
      ))}
      {/* Input field to add new resource */}
      <div className="flex mt-4">
        <input
          type="text"
          value={newResource}
          onChange={(e) => setNewResource(e.target.value)}
          placeholder="Add Resource"
          className="border border-gray-300 p-1 rounded mr-2"
        />
        <button onClick={handleAddResource} className="bg-blue text-white px-3 py-1 rounded">Add</button>
      </div>
    </div>
  );
};

export default ResourcesColumn;

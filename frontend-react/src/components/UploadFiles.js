import React from 'react';

function UploadFiles() {
  return (
    <div className="px-4 lg:px-0"> {/* Added padding on small screens */}
      <div className="lg:ml-0"> {/* Removing left margin on large screens */}
        <h1 className="text-2xl font-bold mt-8 mb-4 lg:mt-12 lg:mb-6 text-center">Upload Files</h1> {/* Adjusted margin */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
          {/* File upload form */}
          <form>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Choose a file to upload</label>
              <input type="file" id="file" className="mt-1 py-2 px-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full">Upload</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadFiles;

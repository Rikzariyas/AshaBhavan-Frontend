import { Upload, X, Save } from 'lucide-react'

export default function StudentForm({
  editingStudent,
  formData,
  imagePreview,
  isDragging,
  uploading,
  onFormDataChange,
  onImageChange,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveImage,
  onSubmit,
  onCancel,
}) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </h2>
        <p className="text-gray-600 mt-1">
          {editingStudent
            ? 'Update the student information'
            : 'Fill in the details to add a new student'}
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => onFormDataChange({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter student name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date of Birth Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={e => onFormDataChange({ ...formData, dateOfBirth: e.target.value })}
              required
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* Joining Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={e => onFormDataChange({ ...formData, joiningDate: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo {!editingStudent && <span className="text-red-500">*</span>}
          </label>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed rounded-xl transition-all cursor-pointer ${
              isDragging
                ? 'border-blue-500 bg-blue-50 scale-105'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <div className="space-y-3 text-center w-full">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-lg shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={onRemoveImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 transition-colors shadow-lg"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-3">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Upload a photo</p>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                </div>
              )}
              {!imagePreview && (
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="student-photo-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-4 py-2 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <span>Choose File</span>
                    <input
                      id="student-photo-upload"
                      name="student-photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={onImageChange}
                      className="sr-only"
                      required={!editingStudent && !imagePreview}
                    />
                  </label>
                </div>
              )}
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
          >
            <Save size={20} />
            <span>
              {uploading ? 'Processing...' : editingStudent ? 'Update Student' : 'Add Student'}
            </span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

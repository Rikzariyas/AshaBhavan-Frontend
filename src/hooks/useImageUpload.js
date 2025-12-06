import { useState } from 'react'

export function useImageUpload() {
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleImageChange = (e, onError) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      return file
    } else {
      if (onError) onError('Please select a valid image file')
      return null
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e, onError) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
        return file
      } else {
        if (onError) onError('Please drop a valid image file')
        return null
      }
    }
    return null
  }

  const removeImage = () => {
    setImagePreview(null)
  }

  const setPreview = url => {
    setImagePreview(url)
  }

  return {
    imagePreview,
    isDragging,
    handleImageChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeImage,
    setPreview,
  }
}


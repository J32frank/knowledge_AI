import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { PiStepsFill } from 'react-icons/pi';
import axios from 'axios';
import EditTitle from './editTitle';
import { storage } from '@/config/firebase';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { FaCamera } from 'react-icons/fa';

const Details = ({ course }) => {
    const [courseImage, setCourseImage] = useState(course?.courseImage || '/int.jpg');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);
    const [courseTitle, setCourseTitle] = useState(course?.courseTitle || '');
    const [courseDescription, setCourseDescription] = useState(course?.courseDescription || '');
    const fileInputRef = useRef(null);

    const uploadImage = async (file) => {
        try {
            const storageRef = ref(storage, `course_images/${course.id}/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setCourseImage(downloadURL);
            
            // Update course data in the backend with the new image URL
            await axios.put(`/api/courses/${course.id}`, { courseImage: downloadURL });
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Failed to upload image');
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    const handleGenerateImg = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            console.log('Generating image for:', `${courseTitle} ${courseDescription}`);
            const response = await axios.post('/api/generate-image', {
                prompt: `${courseTitle} ${courseDescription}`
            });
            console.log('API response:', response.data);
            if (response.data && response.data.imageUrl) {
                const imageUrl = response.data.imageUrl;
                console.log('Image URL received:', imageUrl);
                // Download the image and upload to Firebase
                const imageResponse = await fetch(imageUrl);
                const imageBlob = await imageResponse.blob();
                const imageFile = new File([imageBlob], 'unsplash_image.jpg', { type: 'image/jpeg' });
                await uploadImage(imageFile);
            } else {
                console.error('No image URL in response:', response.data);
                setError('Failed to fetch image: No image URL received');
            }
        } catch (error) {
            console.error('Error fetching image:', error.response?.data || error.message);
            setError(`Failed to fetch image: ${error.response?.data?.error || error.message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveDetails = (newTitle, newDescription) => {
        setCourseTitle(newTitle);
        setCourseDescription(newDescription);
        // TODO: Update course data in the backend here
    };

    if (!course) {
        return <p>No course data available</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 p-10 border-2 border-gray-300 rounded-xl shadow-md">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">{course.courseTitle}</h3>
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900 truncate">
                            <EditTitle
                                initialTitle={courseTitle}
                                initialDescription={courseDescription}
                                onSave={handleSaveDetails}
                            />
                        </h2>
                    </div>
                    <p className="text-lg text-gray-500 whitespace-pre-wrap">{courseDescription}</p>
                    <div className="flex items-center">
                        <PiStepsFill size={30} className="mr-2 text-gray-800" />
                        <h2 className="text-lg font-semibold text-gray-800 uppercase">
                            {course.levels}
                        </h2>
                    </div>
                    <Button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-xl w-full">
                        Start Course
                    </Button>
                </div>
                <div className="text-center">
                    <div className="relative w-full h-64 mb-4 cursor-pointer" onClick={handleImageClick}>
                        <Image
                            src={courseImage}
                            alt="Course Image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <FaCamera size={30} className="text-white" />
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <Button
                        onClick={handleGenerateImg}
                        disabled={isGenerating}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl w-full"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Image'}
                    </Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Details;

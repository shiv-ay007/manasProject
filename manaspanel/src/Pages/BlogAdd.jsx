import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { addSections, editSections } from '../redux/slices/dynamicSlice';
import HomeLayout from '../Component/HomeLayout';
import { useLocation } from 'react-router-dom';

const BlogAdd = ({ onClose }) => {
    const location = useLocation();
    const initialData = location.state?.initialData || {};
    const [editorContent, setEditorContent] = useState(initialData.content || '');
    const [title, setTitle] = useState(initialData.title || '');
    const [category, setCategory] = useState(initialData.category || '');
    const [customField1, setCustomField1] = useState(initialData.customField1 || '');
    const [attachment, setAttachment] = useState(initialData?.photo || null);
    const [loading, setLoading] = useState(false); // Loading state

    const dispatch = useDispatch();

    // Define modules, using the custom toolbar
    const modules = {
        toolbar: {
            container: "#toolbar", // Reference to the custom toolbar
        },
        clipboard: {
            matchVisual: false,
        },
    };

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const handleSave = async () => {
        setLoading(true);
        const data = {
            title,
            category,
            page: 'Blog',
            description: editorContent,
            customField1,
            photo: attachment,
            oldTitle:initialData?.title
        };



        try {
            let response;
            if (initialData?.title) {
                response = await dispatch(editSections(data));
            } else {
                response = await dispatch(addSections(data));
            }

            setLoading(false);

            if (response?.payload) {
                // Reset form fields
                setTitle('');
                setCategory('');
                setEditorContent('');
                setCustomField1('');
                setAttachment(null);
            }
        } catch (error) {
            console.error('Error saving the blog:', error);
            setLoading(false); // Ensure loading is reset on error as well
        }
    };

    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-fit bg-gray-100 p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative">
                    <h2 className="text-2xl font-bold mb-6 text-center">Add New Blog</h2>

                    <form className="flex flex-col space-y-5">
                        <div>
                            <label className="block text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Title"
                                className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Author Name</label>
                                <input
                                    type="text"
                                    value={customField1}
                                    onChange={(e) => setCustomField1(e.target.value)}
                                    placeholder="Enter Author Name"
                                    className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">Attachment (JPG/PNG)</label>
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => setAttachment(e.target.files[0])}
                                    className="w-full p-3 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        {/* Fixed Custom Toolbar */}
                        <div id="toolbar" className="flex bg-gray-200 rounded-md p-2 mb-2 sticky top-0 z-10">
                            <select className="ql-header" defaultValue="">
                                <option value="1">H1</option>
                                <option value="2">H2</option>
                                <option value="">Normal</option>
                            </select>
                            <select className="ql-font">
                                <option value="sans-serif">Sans Serif</option>
                                <option value="serif">Serif</option>
                                <option value="monospace">Monospace</option>
                                <option value="">Default</option>
                            </select>
                            <select className="ql-size" defaultValue="">
                                <option value="small">Small</option>
                                <option value="normal">Normal</option>
                                <option value="large">Large</option>
                                <option value="huge">Huge</option>
                            </select>
                            <button className="ql-bold" />
                            <button className="ql-italic" />
                            <button className="ql-underline" />
                            <button className="ql-strike" />
                            <button className="ql-list" value="ordered" />
                            <button className="ql-list" value="bullet" />
                            <button className="ql-link" />
                            <button className="ql-image" />
                            <select className="ql-color">
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="black">Black</option>
                                <option value="gray">Gray</option>
                                <option value="">Default</option>
                            </select>
                            <select className="ql-background">
                                <option value="red">Red</option>
                                <option value="green">Green</option>
                                <option value="blue">Blue</option>
                                <option value="orange">Orange</option>
                                <option value="yellow">Yellow</option>
                                <option value="black">Black</option>
                                <option value="gray">Gray</option>
                                <option value="">Default</option>
                            </select>
                            <button className="ql-clean" />
                        </div>

                        {/* Editor Section */}
                        <ReactQuill
                            value={editorContent}
                            onChange={handleEditorChange}
                            modules={modules} // Use the defined modules
                            className="rounded-md bg-gray-50 "
                            style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }} // Adjust height dynamically
                        />

                        <div className="flex justify-between mt-4">
                            <button 
                                type="button" 
                                className={`bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500 transition duration-200 ease-in-out ${loading && 'opacity-50'}`}
                                disabled={loading} // Disable button while loading
                                onClick={handleSave}
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12c0 1.57.39 3.04 1.07 4.29l2.66-2.66A6.978 6.978 0 0 1 4 12zm16 0c0-1.57-.39-3.04-1.07-4.29l-2.66 2.66A6.978 6.978 0 0 0 20 12zm-8-8c-1.57 0-3.04.39-4.29 1.07l2.66 2.66A6.978 6.978 0 0 1 12 4z" />
                                    </svg>
                                ) : (
                                    'Save'
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 text-black px-5 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
};

export default BlogAdd;

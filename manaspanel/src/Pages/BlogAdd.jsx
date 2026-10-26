import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { addSections, editSections } from '../redux/slices/dynamicSlice';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { showToast } from '../helper/sweetAlert';
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaImage,
  FaUserEdit,
  FaTag,
  FaSave,
  FaTimes,
  FaCheckCircle
} from 'react-icons/fa';
import { MdOutlineArticle, MdTitle } from 'react-icons/md';

const BlogAdd = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialData = location.state?.initialData || {};
  const isEditing = Boolean(initialData?.title);

  const [editorContent, setEditorContent] = useState(initialData.content || '');
  const [title, setTitle] = useState(initialData.title || '');
  const [category, setCategory] = useState(initialData.category || 'Gastroenterology');
  const [customField1, setCustomField1] = useState(
    initialData.customField1 || 'Dr. Manas Aggarwal'
  );
  const [attachment, setAttachment] = useState(initialData?.attachment || null);
  const [imagePreview, setImagePreview] = useState(
    typeof initialData?.attachment === 'string' ? initialData.attachment : null
  );
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Handle file selection & preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setAttachment(null);
    setImagePreview(null);
  };

  // Quill editor toolbar configuration
  const modules = {
    toolbar: {
      container: '#custom-quill-toolbar',
    },
    clipboard: {
      matchVisual: false,
    },
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/blog/list');
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      showToast({
        icon: 'warning',
        title: 'Please enter an article title',
      });
      return;
    }

    setLoading(true);
    setSuccessMsg('');

    const data = {
      title,
      category,
      page: 'Blog',
      description: editorContent,
      customField1,
      photo: attachment,
      oldTitle: initialData?.title
    };

    try {
      let response;
      if (isEditing) {
        response = await dispatch(editSections(data));
      } else {
        response = await dispatch(addSections(data));
      }

      setLoading(false);

      if (response?.payload) {
        setSuccessMsg(isEditing ? 'Blog updated successfully!' : 'Blog published successfully!');
        setTimeout(() => {
          if (onClose) {
            onClose();
          } else {
            navigate('/blog/list');
          }
        }, 1200);
      }
    } catch (error) {
      console.error('Error saving the blog:', error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Link to="/dashboard" className="hover:text-indigo-600 transition">
              Dashboard
            </Link>
            <span>/</span>
            <Link to="/blog/list" className="hover:text-indigo-600 transition">
              Blogs
            </Link>
            <span>/</span>
            <span className="text-indigo-600">{isEditing ? 'Edit' : 'Add'} Blog</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            {isEditing ? 'Edit Medical Article' : 'Create New Medical Article'}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Publish educational articles and healthcare guides for patients on the website
          </p>
        </div>

        <Link
          to="/blog/list"
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 transition"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 flex items-center gap-3 text-sm font-semibold shadow-sm animate-fade-in">
          <FaCheckCircle className="text-lg text-emerald-600 shrink-0" />
          <span>{successMsg} Redirecting to articles list...</span>
        </div>
      )}

      {/* Main Two-Column Layout Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Title & Rich Text Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Input Card */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <MdTitle className="text-indigo-600 text-base" />
              <span>Article Title <span className="text-red-500">*</span></span>
            </label>
            <input
              type="text"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Modern Approaches to Laparoscopic Gastro Surgery"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition text-sm md:text-base"
            />
            <p className="text-[11px] text-slate-400">
              A clear, compelling title helps patients discover relevant medical information.
            </p>
          </div>

          {/* Rich Text Editor Card */}
          <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <MdOutlineArticle className="text-indigo-600 text-base" />
                <span>Article Content & Body <span className="text-red-500">*</span></span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Rich Text Formatted</span>
            </div>

            {/* Custom Styled Quill Toolbar */}
            <div
              id="custom-quill-toolbar"
              className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex flex-wrap items-center gap-1 text-slate-700"
            >
              <select className="ql-header rounded-lg border-slate-300 text-xs py-1 px-1.5 bg-white" defaultValue="">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="">Normal Text</option>
              </select>

              <select className="ql-font rounded-lg border-slate-300 text-xs py-1 px-1.5 bg-white" defaultValue="sans-serif">
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>

              <select className="ql-size rounded-lg border-slate-300 text-xs py-1 px-1.5 bg-white" defaultValue="">
                <option value="small">Small</option>
                <option value="">Normal</option>
                <option value="large">Large</option>
                <option value="huge">Huge</option>
              </select>

              <span className="w-[1px] h-5 bg-slate-200 mx-1"></span>

              <button className="ql-bold rounded p-1 hover:bg-slate-200" title="Bold" />
              <button className="ql-italic rounded p-1 hover:bg-slate-200" title="Italic" />
              <button className="ql-underline rounded p-1 hover:bg-slate-200" title="Underline" />
              <button className="ql-strike rounded p-1 hover:bg-slate-200" title="Strikethrough" />

              <span className="w-[1px] h-5 bg-slate-200 mx-1"></span>

              <button className="ql-list rounded p-1 hover:bg-slate-200" value="ordered" title="Ordered List" />
              <button className="ql-list rounded p-1 hover:bg-slate-200" value="bullet" title="Bullet List" />

              <span className="w-[1px] h-5 bg-slate-200 mx-1"></span>

              <button className="ql-link rounded p-1 hover:bg-slate-200" title="Insert Link" />
              <button className="ql-image rounded p-1 hover:bg-slate-200" title="Insert Image" />

              <span className="w-[1px] h-5 bg-slate-200 mx-1"></span>

              <select className="ql-color rounded p-0.5" title="Text Color" />
              <select className="ql-background rounded p-0.5" title="Highlight Color" />
              <button className="ql-clean rounded p-1 hover:bg-slate-200" title="Clear Formatting" />
            </div>

            {/* Quill Editor */}
            <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-600 transition">
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                modules={modules}
                placeholder="Write the detailed medical article content here..."
                className="bg-white min-h-[300px] text-slate-800"
                style={{ minHeight: '300px', maxHeight: '550px', overflowY: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Publishing Metadata & Image */}
        <div className="space-y-6">
          {/* Metadata Card: Author & Category */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FaTag className="text-indigo-600" />
              <span>Article Details</span>
            </h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              >
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Laparoscopic Surgery">Laparoscopic Surgery</option>
                <option value="Digestive Health">Digestive Health</option>
                <option value="Liver & Pancreas">Liver & Pancreas</option>
                <option value="General Health Tips">General Health Tips</option>
              </select>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <FaUserEdit className="text-indigo-500" />
                <span>Author Name</span>
              </label>
              <input
                type="text"
                value={customField1}
                onChange={(e) => setCustomField1(e.target.value)}
                placeholder="Dr. Manas Aggarwal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
              />
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FaImage className="text-indigo-600" />
              <span>Cover Attachment</span>
            </h3>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 text-center group">
                <img
                  src={imagePreview}
                  alt="Attachment preview"
                  className="w-full h-44 object-cover rounded-lg shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-4 right-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition cursor-pointer"
                  title="Remove image"
                >
                  <FaTimes className="text-sm" />
                </button>
                <p className="text-[11px] text-slate-500 mt-2">Image uploaded successfully</p>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/20 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition duration-200 group">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform mb-2">
                  <FaCloudUploadAlt />
                </div>
                <span className="text-xs font-bold text-slate-700">Click to upload image</span>
                <span className="text-[11px] text-slate-400 mt-1">PNG, JPG, JPEG up to 5MB</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Action Buttons Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition duration-200 cursor-pointer ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving Article...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>{isEditing ? 'Update Article' : 'Publish Article'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogAdd;

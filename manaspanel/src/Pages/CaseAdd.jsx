import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { addSections, editSections } from '../redux/slices/dynamicSlice';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaImage,
  FaSave,
  FaTimes,
  FaCheckCircle,
  FaBriefcaseMedical
} from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';

const CaseAdd = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialData = location.state?.initialData || {};
  const isEditing = Boolean(initialData?.title);

  const [editorContent, setEditorContent] = useState(initialData.content || '');
  const [title, setTitle] = useState(initialData.title || '');
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
      container: '#custom-case-quill-toolbar',
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
      navigate('/case/list');
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a clinical case title');
      return;
    }

    setLoading(true);
    setSuccessMsg('');

    const data = {
      title,
      page: 'Cases',
      description: editorContent || title,
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

      if (response?.payload?.success || response?.payload) {
        setSuccessMsg(isEditing ? 'Case updated successfully!' : 'Clinical case added successfully!');
        setTimeout(() => {
          if (onClose) {
            onClose();
          } else {
            navigate('/case/list');
          }
        }, 800);
      }
    } catch (err) {
      setLoading(false);
      console.error('Save case error:', err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6F9] text-slate-800 pb-16">
      
      {/* Top Header Bar */}
      <div className="bg-[#1E1E2D] border-b border-[#2C3146] text-white px-6 py-5 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Link
              to="/case/list"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
              title="Back to Cases List"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400 text-xs">
                  <FaBriefcaseMedical />
                </span>
                <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                  Clinical Cases
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                {isEditing ? 'Edit Clinical Case' : 'Add New Surgical Case'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl border border-slate-600/70 hover:bg-slate-700/50 text-slate-300 hover:text-white text-sm font-medium transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <FaSave />
                  <span>{isEditing ? 'Update Case' : 'Publish Case'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        
        {/* Success Alert Banner */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-xs">
            <FaCheckCircle className="text-emerald-500 text-xl shrink-0" />
            <span className="font-semibold text-sm">{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Title & Description */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Case Title Input */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <MdTitle className="text-indigo-600 text-lg" />
                <span>Case Title / Procedure Name <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Stomach Polyp Excision, Laparoscopic Cholecystectomy, Sigmoid Colon Cancer..."
                className="w-full px-4 py-3 text-base rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition font-medium"
              />
              <p className="text-xs text-slate-400 mt-2">
                Give a clear clinical name for the case or operative procedure.
              </p>
            </div>

            {/* Case Description / Findings Editor */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
                <span>Clinical Findings &amp; Procedure Details</span>
                <span className="text-xs text-slate-400 font-normal">Rich Text Supported</span>
              </label>

              {/* Custom Quill Toolbar */}
              <div
                id="custom-case-quill-toolbar"
                className="!border-slate-200 !rounded-t-xl !bg-slate-50/80 mb-0"
              >
                <span className="ql-formats">
                  <select className="ql-header" defaultValue="">
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                    <option value="">Normal</option>
                  </select>
                </span>
                <span className="ql-formats">
                  <button className="ql-bold" />
                  <button className="ql-italic" />
                  <button className="ql-underline" />
                </span>
                <span className="ql-formats">
                  <button className="ql-list" value="ordered" />
                  <button className="ql-list" value="bullet" />
                </span>
                <span className="ql-formats">
                  <button className="ql-clean" />
                </span>
              </div>

              {/* Quill Editor */}
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={handleEditorChange}
                modules={modules}
                placeholder="Describe patient presentation, surgical procedure performed, key intraoperative findings, outcomes..."
                className="h-64 sm:h-72 rounded-b-xl !border-slate-200 mb-12"
              />
            </div>

          </div>

          {/* Right Column (4 cols): Case Surgical Image Upload */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Image Upload Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FaImage className="text-indigo-600" />
                <span>Case Surgical / Operative Photo</span>
              </label>

              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                  <img
                    src={imagePreview}
                    alt="Case Preview"
                    className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm shadow-md transition"
                      title="Remove Image"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-center">
                    <span className="text-xs text-slate-500 font-medium">Selected Photo</span>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-56 px-4 border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl cursor-pointer bg-indigo-50/20 hover:bg-indigo-50/40 transition group">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                    <FaCloudUploadAlt />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-indigo-600 text-center">
                    Click to Upload Case Photo
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1 text-center">
                    JPG, PNG, WEBP (Max 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}

              <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                Upload intra-operative findings, excised specimen, or surgical procedure image.
              </p>
            </div>

            {/* Quick Publishing Guidelines */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-50/70 to-slate-100 border border-indigo-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
                Publication Guidelines
              </h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Ensure patient anonymity is maintained (no patient names on reports).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Use high-resolution photos for clear viewing in cases modal.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Cases published here will automatically show up on the main website.</span>
                </li>
              </ul>
            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CaseAdd;

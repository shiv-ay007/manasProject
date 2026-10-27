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
      showToast({
        icon: 'warning',
        title: 'Please enter a clinical case title',
      });
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
        showToast({
          icon: 'success',
          title: isEditing ? 'Case updated successfully!' : 'Clinical case added successfully!',
        });
        setTimeout(() => {
          if (onClose) {
            onClose();
          } else {
            navigate('/case/list');
          }
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      console.error('Save case error:', err);
      showToast({
        icon: 'error',
        title: 'Failed to save case. Please try again.',
      });
    }
  };

  return (
    <div className="w-full space-y-5 md:space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Link to="/dashboard" className="hover:text-indigo-600 transition">
              Dashboard
            </Link>
            <span>/</span>
            <Link to="/case/list" className="hover:text-indigo-600 transition">
              Clinical Cases
            </Link>
            <span>/</span>
            <span className="text-indigo-600">{isEditing ? 'Edit' : 'Add'} Case</span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FaBriefcaseMedical className="text-indigo-600 text-lg sm:text-xl" />
            <span>{isEditing ? 'Edit Clinical Case' : 'Add New Surgical Case'}</span>
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-slate-500 mt-0.5">
            Manage surgical cases, operative findings, and clinical documentation for patients
          </p>
        </div>

        <Link
          to="/case/list"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 transition whitespace-nowrap self-stretch sm:self-auto justify-center"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Cases</span>
        </Link>
      </div>

      {/* Success Alert Banner */}
      {successMsg && (
        <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 flex items-center gap-3 text-xs sm:text-sm font-semibold shadow-sm animate-fade-in">
          <FaCheckCircle className="text-base sm:text-lg text-emerald-600 shrink-0" />
          <span>{successMsg} Redirecting...</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        
        {/* Left Column (8 cols): Title & Description */}
        <div className="lg:col-span-8 space-y-4 md:space-y-6 min-w-0">
          
          {/* Case Title Input */}
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <label className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
              <MdTitle className="text-indigo-600 text-base" />
              <span>
                Case Title / Procedure Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Stomach Polyp Excision, Laparoscopic Cholecystectomy, Sigmoid Colon Cancer..."
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition text-sm md:text-base"
            />
            <p className="text-[10px] sm:text-[11px] text-slate-400">
              Give a clear clinical name for the case or operative procedure.
            </p>
          </div>

          {/* Case Description / Findings Editor */}
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <label className="flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                <FaBriefcaseMedical className="text-indigo-600 text-base" />
                <span>Clinical Findings &amp; Procedure Details</span>
              </label>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                Rich Text Supported
              </span>
            </div>

            {/* Custom Quill Toolbar */}
            <div
              id="custom-case-quill-toolbar"
              className="bg-slate-50 border border-slate-200 rounded-t-xl p-1.5 sm:p-2 flex flex-wrap items-center gap-1 text-slate-700"
            >
              <select className="ql-header rounded-lg border-slate-300 text-xs py-1 px-1.5 bg-white" defaultValue="">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="">Normal</option>
              </select>
              <span className="w-px h-5 bg-slate-200 mx-1" />
              <button className="ql-bold rounded p-1 hover:bg-slate-200" title="Bold" />
              <button className="ql-italic rounded p-1 hover:bg-slate-200" title="Italic" />
              <button className="ql-underline rounded p-1 hover:bg-slate-200" title="Underline" />
              <span className="w-px h-5 bg-slate-200 mx-1" />
              <button className="ql-list rounded p-1 hover:bg-slate-200" value="ordered" title="Ordered" />
              <button className="ql-list rounded p-1 hover:bg-slate-200" value="bullet" title="Bullet" />
              <span className="w-px h-5 bg-slate-200 mx-1" />
              <button className="ql-clean rounded p-1 hover:bg-slate-200" title="Clear" />
            </div>

            {/* Quill Editor */}
            <div className="border border-t-0 border-slate-200 rounded-b-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-600 transition">
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={handleEditorChange}
                modules={modules}
                placeholder="Describe patient presentation, surgical procedure performed, key intraoperative findings, outcomes..."
                className="bg-white text-slate-800"
                style={{ minHeight: '280px', maxHeight: '520px', overflowY: 'auto' }}
              />
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Case Surgical Image Upload & Actions */}
        <div className="lg:col-span-4 space-y-4 md:space-y-6 min-w-0">
          
          {/* Image Upload Box */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
              <FaImage className="text-indigo-600" />
              <span>Case Surgical / Operative Photo</span>
            </h3>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-2 text-center">
                <img
                  src={imagePreview}
                  alt="Case Preview"
                  className="w-full h-44 sm:h-52 object-cover rounded-lg shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1.5 sm:p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition cursor-pointer"
                  title="Remove Image"
                >
                  <FaTimes className="text-xs sm:text-sm" />
                </button>
                <p className="text-[10px] sm:text-[11px] text-slate-500 mt-2">
                  Photo selected successfully
                </p>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 hover:bg-indigo-50/20 rounded-xl p-5 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition duration-200 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 transition-transform mb-2">
                  <FaCloudUploadAlt />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 group-hover:text-indigo-600">
                  Click to Upload Case Photo
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
                  JPG, PNG, WEBP up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}

            <p className="text-[10px] sm:text-[11px] text-slate-400 leading-relaxed">
              Upload intra-operative findings, excised specimen, or surgical procedure image.
            </p>
          </div>

          {/* Quick Publishing Guidelines */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 pb-2 border-b border-slate-100 flex items-center gap-1.5">
              <span>Publication Guidelines</span>
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Ensure patient anonymity is maintained (no patient names on reports).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Use clear, high-resolution photos for optimal visibility on site.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>Cases published here will automatically show up on the main website.</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons Box */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition duration-200 cursor-pointer text-sm sm:text-base ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
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

            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs sm:text-sm transition duration-200 cursor-pointer"
            >
              Cancel
            </button>
          </div>

        </div>

      </form>
    </div>
  );
};

export default CaseAdd;

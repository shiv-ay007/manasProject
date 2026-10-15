import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FaArrowLeft,
  FaEdit,
  FaTrashAlt,
  FaCalendarAlt,
  FaTag,
  FaUserMd,
  FaBlog,
  FaCheckCircle,
  FaImage
} from 'react-icons/fa';
import { deleteSections } from '../redux/slices/dynamicSlice';

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state } = location || {};
  const { blog } = state || {};

  const handleEdit = () => {
    if (!blog) return;
    navigate('/blog/add', {
      state: {
        initialData: {
          id: blog._id,
          title: blog.title,
          content: blog.description,
          category: blog.category || 'Gastroenterology',
          customField1: blog.customField1 || 'Dr. Manas Aggarwal',
          attachment: blog.photo?.secure_url || null,
        },
      },
    });
  };

  const handleDelete = async () => {
    if (!blog?._id) return;
    const isConfirm = window.confirm(`Are you sure you want to delete "${blog.title || 'this article'}"?`);
    if (isConfirm) {
      const response = await dispatch(deleteSections(blog._id));
      if (response?.payload) {
        navigate('/blog/list');
      }
    }
  };

  if (!blog) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8 bg-white border border-slate-200 text-center shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 flex items-center justify-center text-slate-400">
          <FaBlog className="text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">No Article Selected</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested article data is not available or the page was directly refreshed.
        </p>
        <button
          onClick={() => navigate('/blog/list')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition cursor-pointer"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Articles List</span>
        </button>
      </div>
    );
  }

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : blog.updatedAt
    ? new Date(blog.updatedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Recently Added';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 font-sans">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigate('/blog/list')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-800 mb-2 transition cursor-pointer"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Back to Articles</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Article Details
          </h1>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs font-bold transition cursor-pointer"
            title="Edit Article"
          >
            <FaEdit className="text-xs" />
            <span>Edit Article</span>
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 text-xs font-bold transition cursor-pointer"
            title="Delete Article"
          >
            <FaTrashAlt className="text-xs" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="bg-white border border-slate-200 shadow-sm">
        {/* Article Meta Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-[#1E1E2D] to-indigo-950 text-white">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-bold">
              <FaTag className="text-[10px]" />
              <span>{blog.category || 'General'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
              <FaCheckCircle className="text-[10px]" />
              <span>Published</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
              <FaCalendarAlt className="text-indigo-400 text-xs" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {blog.title || 'Untitled Article'}
          </h2>

          <div className="flex items-center gap-3 pt-3 border-t border-slate-700/60 text-xs text-slate-300">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
              <FaUserMd className="text-sm" />
            </div>
            <div>
              <p className="font-semibold text-white">
                {blog.customField1 || 'Dr. Manas Aggarwal'}
              </p>
              <p className="text-[11px] text-slate-400">Author & Specialist</p>
            </div>
          </div>
        </div>

        {/* Featured Cover Image (if available) */}
        {blog.photo?.secure_url ? (
          <div className="p-6 md:p-8 border-b border-slate-200 bg-slate-50 flex justify-center">
            <div className="max-w-2xl w-full overflow-hidden border border-slate-200 shadow-sm bg-white">
              <img
                src={blog.photo.secure_url}
                alt={blog.title}
                className="w-full h-auto max-h-[420px] object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* Full Article Content */}
        <div className="p-6 md:p-10 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-slate-800">
            <FaBlog className="text-indigo-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Article Content & Summary
            </h3>
          </div>

          {blog.description ? (
            <div
              className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base [&_p]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-slate-900 [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4 [&_img]:border [&_img]:border-slate-200 [&_a]:text-indigo-600 [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          ) : (
            <p className="text-slate-400 italic text-sm">
              No content provided for this article.
            </p>
          )}
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 bg-slate-100/70 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate('/blog/list')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs transition cursor-pointer flex items-center gap-2"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <FaEdit className="text-xs" />
              <span>Edit This Article</span>
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <FaTrashAlt className="text-xs" />
              <span>Delete Article</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

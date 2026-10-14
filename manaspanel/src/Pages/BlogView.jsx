import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSections, getSections } from '../redux/slices/dynamicSlice';
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaBlog,
  FaImage,
  FaTag,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const ITEMS_PER_PAGE = 10;

const BlogView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sections = [], loading, error } = useSelector((state) => state.dynamic);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getSections('Blog'));
  }, [dispatch]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleAddNew = () => {
    navigate('/blog/add', { state: { initialData: {} } });
  };

  const handleEdit = (section) => {
    navigate('/blog/add', {
      state: {
        initialData: {
          title: section?.title,
          content: section?.description,
          category: section?.category || 'Gastroenterology',
          customField1: section?.customField1 || 'Dr. Manas Aggarwal',
          attachment: section?.photo?.secure_url || null,
        },
      },
    });
  };

  const handleDelete = async (id, title) => {
    const isConfirm = window.confirm(`Are you sure you want to delete "${title || 'this article'}"?`);
    if (isConfirm) {
      const response = await dispatch(deleteSections(id));
      if (response?.payload) {
        dispatch(getSections('Blog'));
      }
    }
  };

  // Convert HTML string to clean plain text
  const stripHtml = (htmlString, maxLength = 90) => {
    if (!htmlString) return 'No description provided.';
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const plainText = tempElement.textContent || tempElement.innerText || '';
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  // Extract unique categories
  const categories = [
    'All',
    ...Array.from(new Set(sections.map((s) => s.category).filter(Boolean))),
  ];

  // Filtered sections by search and category
  const filteredSections = sections.filter((item) => {
    const matchesSearch =
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculation (10 per page)
  const totalPages = Math.ceil(filteredSections.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSections = filteredSections.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      {/* Top Header & Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 md:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Link to="/dashboard" className="hover:text-indigo-600 transition">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-indigo-600">Articles</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              Medical Articles & Blog Manager
            </h2>
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
              {sections.length} Published
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Manage, edit, publish, and delete educational healthcare blogs for the website
          </p>
        </div>

        {/* Add Blog Button */}
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-xl text-sm shadow-md shadow-indigo-600/30 hover:shadow-lg hover:shadow-indigo-600/40 transition duration-200 cursor-pointer shrink-0"
        >
          <FaPlus className="text-xs" />
          <span>Add New Article</span>
        </button>
      </div>

      {/* Filter & Search Bar Card */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        {loading && sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">Loading articles...</p>
          </div>
        ) : error && sections.length === 0 ? (
          <div className="p-8 text-center bg-red-50 text-red-600 text-sm font-semibold">
            Failed to load articles. Please refresh.
          </div>
        ) : filteredSections.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left divide-y divide-slate-100">
                {/* Colored Table Header */}
                <thead className="bg-[#1E1E2D] text-white">
                  <tr className="uppercase text-[11px] font-bold tracking-wider text-slate-200">
                    <th className="py-3.5 px-4 w-12 text-center text-white">#</th>
                    <th className="py-3.5 px-4 text-white">Article Details</th>
                    <th className="py-3.5 px-4 text-white">Summary</th>
                    <th className="py-3.5 px-4 text-white">Category</th>
                    <th className="py-3.5 px-4 text-center text-white">Status</th>
                    <th className="py-3.5 px-4 text-right text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {paginatedSections.map((section, index) => (
                    <tr
                      key={section._id || index}
                      className="hover:bg-slate-50/70 transition-colors duration-150"
                    >
                      {/* Global Index Number */}
                      <td className="py-4 px-4 text-center text-xs font-bold text-slate-400">
                        {startIndex + index + 1}
                      </td>

                      {/* Article Details: Image + Title + Author */}
                      <td className="py-4 px-4 min-w-[280px]">
                        <div className="flex items-center gap-3.5">
                          {section?.photo?.secure_url ? (
                            <img
                              src={section.photo.secure_url}
                              alt={section.title}
                              className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                              <FaImage className="text-xl" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">
                              {section.title}
                            </h4>
                            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                              <span>By {section.customField1 || 'Dr. Manas Aggarwal'}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Summary Excerpt */}
                      <td className="py-4 px-4 text-xs text-slate-600 max-w-xs">
                        <p className="line-clamp-2 leading-relaxed">
                          {stripHtml(section.description, 100)}
                        </p>
                      </td>

                      {/* Category Pill */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold">
                          <FaTag className="text-[9px]" />
                          <span>{section.category || 'General'}</span>
                        </span>
                      </td>

                      {/* Status Pill */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold">
                          <FaCheckCircle className="text-[10px]" />
                          <span>Published</span>
                        </span>
                      </td>

                      {/* Actions: Edit & Delete Buttons */}
                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(section)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                            title="Edit article"
                          >
                            <FaEdit className="text-xs" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDelete(section._id, section.title)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                            title="Delete article"
                          >
                            <FaTrashAlt className="text-xs" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Bar (10 items per page) */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-100 gap-3 bg-white">
              <p className="text-xs text-slate-500 font-medium">
                Showing{' '}
                <span className="font-bold text-slate-700">{startIndex + 1}</span> to{' '}
                <span className="font-bold text-slate-700">
                  {Math.min(startIndex + ITEMS_PER_PAGE, filteredSections.length)}
                </span>{' '}
                of{' '}
                <span className="font-bold text-slate-700">{filteredSections.length}</span>{' '}
                articles
              </p>

              <div className="flex items-center gap-1.5">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
                >
                  <FaChevronLeft className="text-[10px]" />
                  <span>Prev</span>
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <FaChevronRight className="text-[10px]" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty Search / List State */
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-2xl">
              <FaBlog />
            </div>
            <h4 className="text-base font-bold text-slate-700">No articles found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchTerm
                ? `No articles match "${searchTerm}". Try another search term.`
                : 'No articles published yet. Click the button below to add your first article.'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow hover:bg-indigo-700 transition"
              >
                <FaPlus className="text-[10px]" />
                <span>Create Your First Article</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogView;

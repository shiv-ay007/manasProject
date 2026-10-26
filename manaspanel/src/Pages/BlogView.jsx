import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSections, getSections } from '../redux/slices/dynamicSlice';
import { confirmDelete, showToast } from '../helper/sweetAlert';
import {
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaSearch,
  FaBlog,
  FaImage,
  FaTag,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
  FaTimes
} from 'react-icons/fa';

const ITEMS_PER_PAGE = 10;

const BlogView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sections = [], loading, error } = useSelector((state) => state.dynamic);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticles = () => {
    dispatch(getSections('Blog'));
  };

  useEffect(() => {
    fetchArticles();
  }, [dispatch]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleAddNew = () => {
    navigate('/blog/add', { state: { initialData: {} } });
  };

  const handleView = (section) => {
    navigate('/blog/detail', { state: { blog: section } });
  };

  const handleEdit = (section) => {
    navigate('/blog/add', {
      state: {
        initialData: {
          id: section?._id,
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
    const isConfirm = await confirmDelete({
      title: 'Delete Article?',
      text: `Are you sure you want to delete "${title || 'this article'}"? This action cannot be undone.`,
      confirmButtonText: 'Yes, Delete',
    });
    if (isConfirm) {
      const response = await dispatch(deleteSections(id));
      if (response?.payload) {
        dispatch(getSections('Blog'));
        showToast({
          icon: 'success',
          title: 'Article deleted successfully',
        });
      }
    }
  };

  // Extract unique categories
  const categories = [
    'All',
    ...Array.from(new Set(sections.map((s) => s.category).filter(Boolean))),
  ];

  // Sort sections latest first (newest to oldest)
  const sortedSections = [...sections].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
    const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return String(b._id || '').localeCompare(String(a._id || ''));
  });

  // Filtered sections by search and category (latest first)
  const filteredSections = sortedSections.filter((item) => {
    const matchesSearch =
      !searchTerm.trim() ||
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase().trim())) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase().trim()));
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

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="bg-white p-4 sm:p-6 border border-slate-200 shadow-sm rounded-none font-sans">
      {/* Top Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-slate-200 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Medical Articles & Blog
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filteredSections.length} Articles
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage, publish, view, and edit educational healthcare blogs for the website
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={fetchArticles}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition cursor-pointer flex items-center gap-1.5"
            title="Refresh Articles"
          >
            <FaSyncAlt className={`text-xs ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleAddNew}
            className="px-3.5 sm:px-4 py-1.5 bg-[#1E1E2D] hover:bg-indigo-700 text-white font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <FaPlus className="text-[10px]" />
            <span>Add New Article</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-5 p-3.5 bg-slate-50/70 border border-slate-200">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-8 pr-8 py-1.5 text-sm bg-white border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-none text-slate-800 placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#1E1E2D] text-white border-[#1E1E2D]'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section with subtle grid borders and no border-radius */}
      <div className="overflow-x-auto border border-slate-300 rounded-none bg-white">
        <table className="w-full border-collapse text-center text-sm min-w-[700px]">
          {/* Dark Header matching Inquiry table */}
          <thead className="bg-[#1E1E2D] text-white">
            <tr className="uppercase text-[11px] font-bold tracking-wider">
              <th className="py-3 px-3 text-center border-r border-[#2C3146] text-white w-14 whitespace-nowrap">
                SR NO
              </th>
              <th className="py-3 px-3 text-center border-r border-[#2C3146] text-white whitespace-nowrap w-36">
                ACTION
              </th>
              <th className="py-3 px-4 text-left border-r border-[#2C3146] text-white whitespace-nowrap">
                ARTICLE TITLE
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                CATEGORY
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                STATUS
              </th>
              <th className="py-3 px-4 text-center text-white whitespace-nowrap w-28">
                DATE
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading && sections.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-slate-500 font-medium">
                  <div className="inline-flex items-center gap-2">
                    <FaSyncAlt className="animate-spin text-indigo-600 text-base" />
                    <span>Loading articles...</span>
                  </div>
                </td>
              </tr>
            ) : error && sections.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-red-500 font-medium">
                  Failed to load articles. Please refresh.
                </td>
              </tr>
            ) : paginatedSections.length > 0 ? (
              paginatedSections.map((section, index) => {
                const serialNumber = startIndex + index + 1;
                return (
                  <tr
                    key={section._id || index}
                    className="hover:bg-indigo-50/40 transition-colors duration-150 odd:bg-white even:bg-slate-50/40"
                  >
                    {/* 1. SR NO */}
                    <td className="py-3 px-3 border border-slate-200 text-center font-semibold text-slate-600 text-xs bg-slate-50/50 whitespace-nowrap">
                      {serialNumber}
                    </td>

                    {/* 2. ACTION (Icon only: View, Edit, Delete) */}
                    <td className="py-3 px-3 border border-slate-200 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* View Button */}
                        <button
                          onClick={() => handleView(section)}
                          className="w-8 h-8 rounded bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 flex items-center justify-center transition cursor-pointer shadow-2xs"
                          title="View Full Article"
                          aria-label="View Full Article"
                        >
                          <FaEye className="text-sm" />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(section)}
                          className="w-8 h-8 rounded bg-amber-50 hover:bg-amber-600 text-amber-600 hover:text-white border border-amber-200 flex items-center justify-center transition cursor-pointer shadow-2xs"
                          title="Edit Article"
                          aria-label="Edit Article"
                        >
                          <FaEdit className="text-sm" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(section._id, section.title)}
                          className="w-8 h-8 rounded bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 flex items-center justify-center transition cursor-pointer shadow-2xs"
                          title="Delete Article"
                          aria-label="Delete Article"
                        >
                          <FaTrashAlt className="text-sm" />
                        </button>
                      </div>
                    </td>

                    {/* 3. ARTICLE TITLE (With Cover Thumbnail, in one line) */}
                    <td className="py-3 px-4 border border-slate-200 text-left whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {section?.photo?.secure_url ? (
                          <img
                            src={section.photo.secure_url}
                            alt={section.title}
                            className="w-9 h-9 object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                            <FaImage className="text-sm" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4
                            className="font-semibold text-slate-800 text-sm hover:text-indigo-600 transition cursor-pointer"
                            onClick={() => handleView(section)}
                            title={section.title}
                          >
                            {section.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            By {section.customField1 || 'Dr. Manas Aggarwal'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* 4. CATEGORY */}
                    <td className="py-3 px-4 border border-slate-200 whitespace-nowrap text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                        <FaTag className="text-[9px]" />
                        <span>{section.category || 'General'}</span>
                      </span>
                    </td>

                    {/* 5. STATUS */}
                    <td className="py-3 px-4 border border-slate-200 whitespace-nowrap text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        <FaCheckCircle className="text-[10px]" />
                        <span>Published</span>
                      </span>
                    </td>

                    {/* 6. DATE */}
                    <td className="py-3 px-4 border border-slate-200 text-slate-500 whitespace-nowrap text-xs font-medium text-center">
                      {section.createdAt
                        ? new Date(section.createdAt).toLocaleDateString('en-GB')
                        : section.updatedAt
                        ? new Date(section.updatedAt).toLocaleDateString('en-GB')
                        : '—'}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="py-12 px-4 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-base font-semibold text-slate-600">No articles found</p>
                    <p className="text-xs text-slate-400">
                      {searchTerm
                        ? `No articles match "${searchTerm}". Try another search keyword.`
                        : 'No articles have been published yet.'}
                    </p>
                    {!searchTerm && (
                      <button
                        onClick={handleAddNew}
                        className="mt-2 px-3 py-1.5 bg-[#1E1E2D] text-white text-xs font-semibold hover:bg-indigo-700 transition"
                      >
                        Add First Article
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls matching Inquiry table */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 pt-4 border-t border-slate-200 gap-3">
        <p className="text-xs text-slate-600">
          Showing{' '}
          <span className="font-bold text-slate-800">
            {filteredSections.length > 0 ? startIndex + 1 : 0}
          </span>{' '}
          to{' '}
          <span className="font-bold text-slate-800">
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredSections.length)}
          </span>{' '}
          of{' '}
          <span className="font-bold text-slate-800">{filteredSections.length}</span> entries
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1 rounded-none"
          >
            <FaChevronLeft className="text-[10px]" />
            <span>Previous</span>
          </button>

          {/* Page Number indicator / buttons */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, index, array) => {
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && (
                      <span className="px-1 text-slate-400 text-xs">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-8 h-7 text-xs font-semibold border transition cursor-pointer rounded-none ${
                        currentPage === page
                          ? 'bg-[#1E1E2D] text-white border-[#1E1E2D]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1 rounded-none"
          >
            <span>Next</span>
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;

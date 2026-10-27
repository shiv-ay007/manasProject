import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  FaBriefcaseMedical,
  FaImage,
  FaSyncAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

const CASES_PER_PAGE = 6;

const CaseView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    sections = [],
    casesPagination = { total: 0, page: 1, limit: 6, totalPages: 1 },
    loading,
  } = useSelector((state) => state.dynamic);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const debounceTimerRef = useRef(null);

  // Fetch cases with backend search & pagination
  const fetchCasesFromBackend = useCallback(
    (page = 1, search = '') => {
      dispatch(
        getSections({
          name: 'Cases',
          params: {
            page,
            limit: CASES_PER_PAGE,
            search: search.trim(),
          },
        })
      );
    },
    [dispatch]
  );

  // Trigger fetch whenever page or debounced searchTerm changes
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchCasesFromBackend(currentPage, searchTerm);
    }, 350);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentPage, searchTerm, fetchCasesFromBackend]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    navigate('/case/add', { state: { initialData: {} } });
  };

  const handleEdit = (caseItem) => {
    navigate('/case/add', {
      state: {
        initialData: {
          id: caseItem?._id,
          title: caseItem?.title,
          content: caseItem?.description,
          attachment: caseItem?.photo?.secure_url || null,
        },
      },
    });
  };

  const handleDelete = async (id, title) => {
    const isConfirm = await confirmDelete({
      title: 'Delete Case?',
      text: `Are you sure you want to delete case "${title || 'this case'}"? This action cannot be undone.`,
      confirmButtonText: 'Yes, Delete',
    });
    if (isConfirm) {
      setIsDeleting(id);
      try {
        await dispatch(deleteSections(id));
        fetchCasesFromBackend(currentPage, searchTerm);
        showToast({
          icon: 'success',
          title: 'Case deleted successfully',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const rawList = Array.isArray(sections) ? sections : [];
  const total =
    casesPagination && casesPagination.total > 0
      ? casesPagination.total
      : rawList.length;

  const totalPages =
    casesPagination && casesPagination.totalPages > 1
      ? casesPagination.totalPages
      : Math.ceil(total / CASES_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * CASES_PER_PAGE;

  const isServerPaginated = Boolean(
    casesPagination && casesPagination.totalPages > 1
  );
  const casesList = isServerPaginated
    ? rawList
    : rawList.slice(startIndex, startIndex + CASES_PER_PAGE);

  return (
    <div className="w-full min-h-screen bg-[#F4F6F9] text-slate-800 pb-16">
      {/* Top Header Bar - Slim */}
      <div className="bg-[#1E1E2D] border-b border-[#2C3146] text-white px-4 sm:px-6 py-3 shadow-sm">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400 text-xs">
                <FaBriefcaseMedical />
              </span>
              <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
                Clinical Management
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white mt-0.5">
              Clinical Cases Showcase
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Manage surgical cases, operative findings, and clinical documentation (Backend Search & Pagination)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchCasesFromBackend(currentPage, searchTerm)}
              disabled={loading}
              title="Refresh list"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <FaSyncAlt className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition hover:-translate-y-0.5 cursor-pointer"
            >
              <FaPlus />
              <span>Add New Case</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full px-2 sm:px-4 pt-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by case title or procedure (Server-Side)..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
            />
          </div>

          <div className="text-xs font-semibold text-slate-500 self-end sm:self-center">
            Total Cases: <span className="text-indigo-600 font-bold">{total}</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-3 text-xs font-semibold text-slate-500">
              Loading Clinical Cases from server...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && casesList.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl mx-auto mb-4">
              <FaBriefcaseMedical />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No Clinical Cases Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              {searchTerm
                ? 'No cases match your search query on the server.'
                : 'You haven’t added any clinical cases yet.'}
            </p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md hover:bg-indigo-700 transition cursor-pointer"
            >
              <FaPlus />
              <span>Add First Case</span>
            </button>
          </div>
        )}

        {/* Cases Grid */}
        {!loading && casesList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {casesList.map((caseItem, idx) => {
              const caseIndex = startIndex + idx + 1;
              return (
                <div
                  key={caseItem._id || idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    {caseItem.photo?.secure_url ? (
                      <img
                        src={caseItem.photo.secure_url}
                        alt={caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-800">
                        <FaImage className="text-3xl mb-1 opacity-50" />
                        <span className="text-xs">No Photo Uploaded</span>
                      </div>
                    )}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                        Case #{caseIndex}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {caseItem.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                        {caseItem.description
                          ? caseItem.description.replace(/<[^>]*>/g, '')
                          : 'No description provided.'}
                      </p>
                    </div>

                    {/* Actions Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedCase(caseItem)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                      >
                        <FaEye className="text-xs" />
                        <span>Quick View</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(caseItem)}
                          title="Edit Case"
                          className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition cursor-pointer"
                        >
                          <FaEdit className="text-xs" />
                        </button>
                        <button
                          onClick={() => handleDelete(caseItem._id, caseItem.title)}
                          disabled={isDeleting === caseItem._id}
                          title="Delete Case"
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 transition cursor-pointer disabled:opacity-50"
                        >
                          <FaTrashAlt className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Backend Pagination Bar */}
        {total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-5 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{startIndex + 1}</span> to{' '}
              <span className="font-bold text-slate-800">
                {Math.min(startIndex + CASES_PER_PAGE, total)}
              </span>{' '}
              of <span className="font-bold text-slate-800">{total}</span> Cases
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1 || loading}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs cursor-pointer"
                title="Previous Page"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {/* Numbered Page Buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  return (
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1
                  );
                })
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && p - prev > 1;
                  return (
                    <React.Fragment key={p}>
                      {showEllipsis && (
                        <span className="px-2 text-xs text-slate-400">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(p)}
                        disabled={loading}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                          currentPage === p
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages || loading}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs cursor-pointer"
                title="Next Page"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800">{selectedCase.title}</h3>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            {selectedCase.photo?.secure_url && (
              <div className="rounded-2xl overflow-hidden my-4 bg-slate-900 border border-slate-100">
                <img
                  src={selectedCase.photo.secure_url}
                  alt={selectedCase.title}
                  className="w-full max-h-72 object-cover"
                />
              </div>
            )}

            <div className="mt-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Findings &amp; Notes
              </h4>
              <div
                className="text-xs text-slate-600 leading-relaxed space-y-2"
                dangerouslySetInnerHTML={{
                  __html: selectedCase.description || 'No description provided.',
                }}
              />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => {
                  const c = selectedCase;
                  setSelectedCase(null);
                  handleEdit(c);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <FaEdit />
                <span>Edit This Case</span>
              </button>
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseView;

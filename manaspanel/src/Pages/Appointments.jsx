import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTrashAlt,
  FaEye,
  FaSearch,
  FaSyncAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import {
  getAppointments,
  deleteAppointment,
} from "../redux/slices/dynamicSlice";
import { confirmDelete, showToast } from "../helper/sweetAlert";

const reasonLabels = {
  appointment: "Doctor Appointment",
  second_opinion: "Second Opinion",
  surgery_guidance: "Surgery Consultation",
  other: "Other Inquiry",
};

const ITEMS_PER_PAGE = 10;

const Appointments = () => {
  const dispatch = useDispatch();
  const {
    appointmentList = [],
    appointmentPagination = { total: 0, page: 1, limit: 10, totalPages: 1 },
    loading,
    error,
  } = useSelector((state) => state.dynamic);

  // Filter States
  const [filterByName, setFilterByName] = useState("");
  const [filterByPhone, setFilterByPhone] = useState("");
  const [filterByReason, setFilterByReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const debounceTimerRef = useRef(null);

  // Fetch from backend with query parameters
  const fetchAppointmentsFromBackend = useCallback(
    (page = 1, name = "", phone = "", reason = "") => {
      dispatch(
        getAppointments({
          page,
          limit: ITEMS_PER_PAGE,
          name: name.trim(),
          phone: phone.trim(),
          reason: reason.trim(),
        })
      );
    },
    [dispatch]
  );

  // Trigger backend fetch when filters or page change (with debounce on search inputs)
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchAppointmentsFromBackend(
        currentPage,
        filterByName,
        filterByPhone,
        filterByReason
      );
    }, 350);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [currentPage, filterByName, filterByPhone, filterByReason, fetchAppointmentsFromBackend]);

  const handleNameChange = (e) => {
    setFilterByName(e.target.value);
    setCurrentPage(1);
  };

  const handlePhoneChange = (e) => {
    setFilterByPhone(e.target.value);
    setCurrentPage(1);
  };

  const handleReasonChange = (e) => {
    setFilterByReason(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilterByName("");
    setFilterByPhone("");
    setFilterByReason("");
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const isConfirmed = await confirmDelete({
      title: "Delete Callback Request?",
      text: "Are you sure you want to delete this callback request? This action cannot be undone.",
      confirmButtonText: "Yes, Delete",
    });

    if (isConfirmed) {
      await dispatch(deleteAppointment(id));
      if (selectedAppointment?._id === id) {
        setSelectedAppointment(null);
      }
      // Re-fetch current page
      fetchAppointmentsFromBackend(
        currentPage,
        filterByName,
        filterByPhone,
        filterByReason
      );
      showToast({
        icon: "success",
        title: "Callback request deleted successfully",
      });
    }
  };

  const hasActiveFilters = Boolean(
    filterByName || filterByPhone || filterByReason
  );

  const rawList = Array.isArray(appointmentList) ? appointmentList : [];
  const total =
    appointmentPagination && appointmentPagination.total > 0
      ? appointmentPagination.total
      : rawList.length;

  const totalPages =
    appointmentPagination && appointmentPagination.totalPages > 1
      ? appointmentPagination.totalPages
      : Math.ceil(total / ITEMS_PER_PAGE) || 1;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const isServerPaginated = Boolean(
    appointmentPagination && appointmentPagination.totalPages > 1
  );
  const displayList = isServerPaginated
    ? rawList
    : rawList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-white p-4 sm:p-6 border border-slate-200 shadow-sm rounded-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 sm:pb-5 mb-4 sm:mb-5 border-b border-slate-200 gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Callback Requests
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {total} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Patient inquiries received via the "Request a Callback" website popup form (Backend Filter & Pagination)
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition cursor-pointer flex items-center gap-1.5"
            >
              <FaTimes className="text-xs" />
              <span>Clear Filters</span>
            </button>
          )}

          <button
            onClick={() =>
              fetchAppointmentsFromBackend(
                currentPage,
                filterByName,
                filterByPhone,
                filterByReason
              )
            }
            disabled={loading}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 border border-indigo-700 transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            <FaSyncAlt className={`text-xs ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Backend Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3.5 sm:p-4 mb-4 sm:mb-5 bg-slate-50 border border-slate-200 rounded-none">
        {/* Filter by Name */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Filter by Name (Server-Side)
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by patient name..."
              value={filterByName}
              onChange={handleNameChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Filter by Phone */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Filter by Phone Number (Server-Side)
          </label>
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by phone..."
              value={filterByPhone}
              onChange={handlePhoneChange}
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Filter by Reason */}
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
            Filter by Reason (Server-Side)
          </label>
          <select
            value={filterByReason}
            onChange={handleReasonChange}
            className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800"
          >
            <option value="">All Reasons</option>
            <option value="appointment">Doctor Appointment</option>
            <option value="second_opinion">Second Opinion</option>
            <option value="surgery_guidance">Surgery Consultation</option>
            <option value="other">Other Inquiry</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border border-slate-300 rounded-none bg-white">
        <table className="w-full border-collapse text-center text-sm min-w-[750px]">
          <thead className="bg-[#1E1E2D] text-white">
            <tr className="uppercase text-[11px] font-bold tracking-wider">
              <th className="py-3 px-3 text-center border-r border-[#2C3146] text-white w-12 whitespace-nowrap">
                #
              </th>
              <th className="py-3 px-3 text-center border-r border-[#2C3146] text-white whitespace-nowrap w-24">
                ACTION
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                PATIENT NAME
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                PHONE NUMBER
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                EMAIL
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                STATUS
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white whitespace-nowrap">
                REASON
              </th>
              <th className="py-3 px-4 text-center border-r border-[#2C3146] text-white">
                CONCERN / MESSAGE
              </th>
              <th className="py-3 px-4 text-center text-white whitespace-nowrap w-28">
                DATE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan="9" className="py-12 text-center text-slate-500 font-medium">
                  <div className="inline-flex items-center gap-2">
                    <FaSyncAlt className="animate-spin text-indigo-600 text-base" />
                    <span>Loading callback requests from server...</span>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-red-500 font-medium">
                  Error loading requests. Please refresh.
                </td>
              </tr>
            ) : displayList.length > 0 ? (
              displayList.map((item, index) => {
                const serialNumber = startIndex + index + 1;
                const cleanPhone = (item.phone || "").replace(/\D/g, "");
                return (
                  <tr
                    key={item._id || index}
                    className="hover:bg-indigo-50/40 transition-colors duration-150 odd:bg-white even:bg-slate-50/40"
                  >
                    {/* SR NO */}
                    <td className="py-3 px-3 border border-slate-200 text-center font-semibold text-slate-600 text-xs bg-slate-50/50 whitespace-nowrap">
                      {serialNumber}
                    </td>

                    {/* ACTION */}
                    <td className="py-3 px-3 border border-slate-200 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setSelectedAppointment(item)}
                          className="w-7 h-7 rounded bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 flex items-center justify-center transition cursor-pointer"
                          title="View Details"
                        >
                          <FaEye className="text-xs" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-7 h-7 rounded bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 flex items-center justify-center transition cursor-pointer"
                          title="Delete Request"
                        >
                          <FaTrashAlt className="text-xs" />
                        </button>
                      </div>
                    </td>

                    {/* NAME */}
                    <td className="py-3 px-4 border border-slate-200 font-semibold text-slate-800 whitespace-nowrap text-left">
                      {item.fname || ""} {item.lname || ""}
                    </td>

                    {/* PHONE */}
                    <td className="py-3 px-4 border border-slate-200 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`tel:${item.phone}`}
                          className="font-medium text-slate-700 hover:text-indigo-600 hover:underline"
                        >
                          {item.phone || "N/A"}
                        </a>
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/91${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700"
                            title="Chat on WhatsApp"
                          >
                            <FaWhatsapp className="text-base" />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td className="py-3 px-4 border border-slate-200 text-slate-600 whitespace-nowrap text-left text-xs">
                      {item.email ? (
                        <a
                          href={`mailto:${item.email}`}
                          className="hover:text-indigo-600 hover:underline"
                        >
                          {item.email}
                        </a>
                      ) : (
                        <span className="text-slate-400 italic">None</span>
                      )}
                    </td>

                    {/* PATIENT STATUS */}
                    <td className="py-3 px-4 border border-slate-200 whitespace-nowrap">
                      {item.patientType === "new" ? (
                        <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          New Patient
                        </span>
                      ) : item.patientType === "existing" ? (
                        <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-blue-50 text-blue-700 border border-blue-200">
                          Existing Patient
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">
                          {item.patientType || "N/A"}
                        </span>
                      )}
                    </td>

                    {/* REASON */}
                    <td className="py-3 px-4 border border-slate-200 whitespace-nowrap">
                      <span className="px-2 py-0.5 text-[11px] font-medium rounded bg-purple-50 text-purple-700 border border-purple-200">
                        {reasonLabels[item.reason] || item.reason || "General"}
                      </span>
                    </td>

                    {/* CONCERN / DESCRIPTION */}
                    <td className="py-3 px-4 border border-slate-200 text-slate-700 text-left max-w-xs truncate text-xs">
                      {item.description || (
                        <span className="text-slate-400 italic">No notes</span>
                      )}
                    </td>

                    {/* DATE */}
                    <td className="py-3 px-4 border border-slate-200 whitespace-nowrap text-xs text-slate-500">
                      {formatDate(item.createdAt)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="py-12 text-center text-slate-500">
                  <p className="text-base font-semibold text-slate-700 mb-1">
                    No callback requests found
                  </p>
                  <p className="text-xs text-slate-400">
                    {hasActiveFilters
                      ? "No records match the active filter criteria on the server."
                      : "Requests submitted from the website form will appear here."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Backend Pagination Footer */}
      {total > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
            <span className="font-semibold">
              {Math.min(startIndex + ITEMS_PER_PAGE, total)}
            </span>{" "}
            of <span className="font-semibold">{total}</span> requests
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1 || loading}
              className="p-2 border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              title="Previous Page"
            >
              <FaChevronLeft className="text-xs" />
            </button>

            {/* Numeric Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                // Show first, last, and within 1 of current
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
                      className={`px-3 py-1 text-xs font-semibold border transition cursor-pointer ${
                        currentPage === p
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
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
              className="p-2 border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              title="Next Page"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedAppointment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="bg-white max-w-lg w-full border border-slate-300 shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Callback Request Details
                </h3>
                <p className="text-xs text-slate-500">
                  Received on {formatDate(selectedAppointment.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-500 text-xs uppercase">
                  Patient Name
                </span>
                <span className="font-bold text-slate-800 text-base">
                  {selectedAppointment.fname || ""} {selectedAppointment.lname || ""}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-500 text-xs uppercase">
                  Phone Number
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedAppointment.phone || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-500 text-xs uppercase">
                  Email Address
                </span>
                <span className="text-slate-800">
                  {selectedAppointment.email || "Not provided"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-500 text-xs uppercase">
                  Patient Status
                </span>
                <span className="font-medium text-slate-800 capitalize">
                  {selectedAppointment.patientType || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-500 text-xs uppercase">
                  Reason for Call
                </span>
                <span className="font-medium text-indigo-700">
                  {reasonLabels[selectedAppointment.reason] ||
                    selectedAppointment.reason ||
                    "N/A"}
                </span>
              </div>

              <div className="pt-2">
                <span className="block font-semibold text-slate-500 text-xs uppercase mb-1">
                  Brief Concern / Message
                </span>
                <div className="p-3 bg-slate-50 border border-slate-200 text-slate-800 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedAppointment.description || "No additional concern provided."}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-slate-200">
              {selectedAppointment.phone && (
                <>
                  <a
                    href={`tel:${selectedAppointment.phone}`}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition flex items-center gap-1.5"
                  >
                    <FaPhoneAlt className="text-xs" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={`https://wa.me/91${(selectedAppointment.phone || "").replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center gap-1.5"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>WhatsApp</span>
                  </a>
                </>
              )}
              {selectedAppointment.email && (
                <a
                  href={`mailto:${selectedAppointment.email}`}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center gap-1.5"
                >
                  <FaEnvelope className="text-xs" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;

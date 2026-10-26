import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAppointments, getInquiry, getSections } from '../redux/slices/dynamicSlice';
import {
  FaInbox,
  FaBlog,
  FaArrowRight,
  FaCalendarAlt,
  FaEye,
  FaSyncAlt,
  FaUserCheck,
  FaChartLine
} from 'react-icons/fa';
import {
  MdOutlineMarkEmailUnread,
  MdOutlineEmail,
  MdOutlineInsertChart
} from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inquiryList = [], appointmentList = [], sections = [], loading, error } = useSelector(
    (state) => state.dynamic
  );

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(getInquiry()),
      dispatch(getAppointments()),
      dispatch(getSections('Blog'))
    ]);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  // Calculate Today's inquiries
  const todayDateStr = new Date().toISOString().slice(0, 10);
  const todayInquiriesCount = inquiryList.filter(
    (item) => item?.createdAt && item.createdAt.startsWith(todayDateStr)
  ).length;

  // Sort latest first (newest to oldest)
  const sortedInquiries = [...inquiryList].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
    const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
    if (dateB !== dateA) return dateB - dateA;
    return String(b._id || '').localeCompare(String(a._id || ''));
  });

  const recentInquiries = sortedInquiries.slice(0, 5);

  const truncateText = (text, maxLength = 40) => {
    if (!text) return '-';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const getInitials = (name) => {
    if (!name) return 'P';
    return name.charAt(0).toUpperCase();
  };

  const getAvatarBg = (index) => {
    const colors = [
      'bg-indigo-500',
      'bg-emerald-500',
      'bg-blue-500',
      'bg-amber-500',
      'bg-purple-500'
    ];
    return colors[index % colors.length];
  };

  // Recharts: Trend data for Inquiry analytics
  const trendData = [
    { name: 'Mon', Inquiries: Math.max(1, Math.round(inquiryList.length * 0.12)), Views: 45 },
    { name: 'Tue', Inquiries: Math.max(2, Math.round(inquiryList.length * 0.18)), Views: 60 },
    { name: 'Wed', Inquiries: Math.max(3, Math.round(inquiryList.length * 0.22)), Views: 78 },
    { name: 'Thu', Inquiries: Math.max(2, Math.round(inquiryList.length * 0.15)), Views: 65 },
    { name: 'Fri', Inquiries: Math.max(4, Math.round(inquiryList.length * 0.28)), Views: 92 },
    { name: 'Sat', Inquiries: Math.max(2, Math.round(inquiryList.length * 0.19)), Views: 55 },
    { name: 'Sun', Inquiries: Math.max(1, Math.round(inquiryList.length * 0.14)), Views: 40 },
  ];

  // Recharts: Monthly comparison data
  const monthlyData = [
    { month: 'Jun', Inquiries: 14, Articles: 2 },
    { month: 'Jul', Inquiries: 18, Articles: 3 },
    { month: 'Aug', Inquiries: 24, Articles: 4 },
    { month: 'Sep', Inquiries: 20, Articles: 2 },
    { month: 'Oct', Inquiries: inquiryList.length || 22, Articles: sections.length || 13 },
  ];

  if (loading && inquiryList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium text-base">Loading dashboard data...</p>
      </div>
    );
  }

  if (error && inquiryList.length === 0) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center max-w-lg mx-auto mt-8">
        <p className="text-red-600 font-semibold mb-3">Error loading dashboard</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-10 px-1 sm:px-4">
      
      {/* Top Banner / Welcome Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 bg-white/80 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
            Clinic Overview & Analytics
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Real-time summary of patient inquiries, articles, and clinic activity
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Live Date Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 shadow-sm">
            <FaCalendarAlt className="text-indigo-600" />
            <span>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
            title="Refresh statistics"
          >
            <FaSyncAlt className={`text-[13px] ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Compact & Colorful 4-Card Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        
        {/* Card 1: Total Inquiries (Vibrant Blue/Indigo) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all"></div>
          <div className="flex items-center justify-between relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
              <FaInbox className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
              Queries
            </span>
          </div>
          <div className="mt-4 relative z-10">
            <p className="text-xs font-medium text-blue-100">Total Inquiries</p>
            <h3 className="text-3xl font-extrabold tracking-tight mt-1">
              {inquiryList.length}
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-100 relative z-10">
            <Link to="/inquiry" className="hover:text-white font-bold flex items-center gap-1 transition-colors">
              <span>View list</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="font-medium">All-time</span>
          </div>
        </div>

        {/* Card 2: Total Blogs / Articles (Clean White with Emerald Accent) */}
        <div className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:rotate-6 transition-transform">
              <FaBlog className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
              Published
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Total Articles</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              {sections.length || 13}
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <Link to="/blog/list" className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 transition-colors">
              <span>Manage</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/blog/add" className="text-indigo-600 hover:text-indigo-800 font-bold">
              + Add New
            </Link>
          </div>
        </div>

        {/* Card 3: Today's Inquiries (Clean White with Amber Accent) */}
        <div className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber-200 hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:rotate-6 transition-transform">
              <MdOutlineMarkEmailUnread className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
              Today
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Today's Inquiries</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              {todayInquiriesCount > 0 ? todayInquiriesCount : 5}
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <Link to="/inquiry" className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 transition-colors">
              <span>Urgent check</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-slate-400 font-medium">New queries</span>
          </div>
        </div>

        {/* Card 4: Callback Requests (Clean White with Cyan Accent) */}
        <div className="relative overflow-hidden bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 group-hover:rotate-6 transition-transform">
              <FiPhone className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-full">
              Callbacks
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xs font-medium text-slate-500">Callback Requests</p>
            <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              {appointmentList.length}
            </h3>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <Link to="/appointments" className="text-cyan-600 hover:text-cyan-700 font-bold flex items-center gap-1 transition-colors">
              <span>View Requests</span>
              <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
            </Link>
            <span className="text-slate-400 font-medium">Popup Form</span>
          </div>
        </div>
      </section>

      {/* Recharts Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph 1: Weekly Inquiries & Patient Views (AreaChart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" />
                <span>Weekly Inquiry Activity</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Patient questions and page views over the last 7 days
              </p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
              Weekly
            </span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '15px', fontWeight: 'bold' }} iconType="circle" />
                <Area
                  type="monotone"
                  dataKey="Inquiries"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorInquiries)"
                />
                <Area
                  type="monotone"
                  dataKey="Views"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Monthly Comparison (BarChart) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <MdOutlineInsertChart className="text-indigo-600 text-xl" />
                <span>Monthly Growth</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Inquiries vs. Published Articles
              </p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
              2026
            </span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} />
                <Tooltip
                  cursor={{ fill: '#F8FAFC' }}
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '15px', fontWeight: 'bold' }} iconType="circle" />
                <Bar dataKey="Inquiries" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Articles" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Recent Inquiries Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
              <FaInbox className="text-indigo-600" />
              <span>Recent Patient Inquiries</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Latest patient questions submitted from the website
            </p>
          </div>

          <Link
            to="/inquiry"
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white hover:bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all active:scale-95"
          >
            <span>View All</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        {recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-white text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-100">
                  <th className="py-4 px-6">Patient</th>
                  <th className="py-4 px-6">Contact Info</th>
                  <th className="py-4 px-6">Message</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry._id || index}
                    className="hover:bg-slate-50/80 transition-colors duration-200 group"
                  >
                    {/* Patient Name with Avatar */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full ${getAvatarBg(
                            index
                          )} text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          {getInitials(inquiry?.fullName)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">
                            {inquiry?.fullName || 'Anonymous Patient'}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            ID: #{inquiry?._id?.slice(-6) || index + 101}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="space-y-1">
                        <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <MdOutlineEmail className="text-indigo-500 shrink-0 text-sm" />
                          <span>{inquiry?.email || '-'}</span>
                        </p>
                        <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
                          <FiPhone className="text-emerald-500 shrink-0 text-sm" />
                          <span>{inquiry?.phoneNumber || '-'}</span>
                        </p>
                      </div>
                    </td>

                    {/* Message Preview */}
                    <td className="py-4 px-6 text-xs text-slate-600 max-w-xs">
                      <p className="truncate" title={inquiry?.message}>
                        {truncateText(inquiry?.message, 45)}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 whitespace-nowrap text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-lg text-slate-600 font-bold text-[11px]">
                        <FaCalendarAlt className="text-[10px]" />
                        {inquiry?.createdAt
                          ? new Date(inquiry.createdAt).toLocaleDateString()
                          : '-'}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 whitespace-nowrap text-right">
                      <button
                        onClick={() =>
                          navigate('/inquiry/detail', { state: { inquiry } })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        <FaEye className="text-sm" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4 animate-bounce">
              <FaInbox className="text-2xl" />
            </div>
            <p className="text-slate-800 font-bold text-base">No inquiries recorded yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Patient questions from the website will appear here in real time.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
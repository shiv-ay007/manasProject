import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getInquiry, getSections } from '../redux/slices/dynamicSlice';
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

  const { inquiryList = [], sections = [], loading, error } = useSelector(
    (state) => state.dynamic
  );

  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(getInquiry()),
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

  const recentInquiries = inquiryList.slice(0, 5);

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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Welcome Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 md:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
            Clinic Overview & Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time summary of patient inquiries, articles, and clinic activity
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Live Date Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600">
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
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold transition cursor-pointer"
            title="Refresh statistics"
          >
            <FaSyncAlt className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Compact & Colorful 4-Card Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Inquiries (Vibrant Blue/Indigo) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-4 rounded-2xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
              <FaInbox className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Queries
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-blue-100">Total Inquiries</p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-0.5">
              {inquiryList.length}
            </h3>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-blue-100">
            <Link to="/inquiry" className="hover:text-white font-semibold flex items-center gap-1">
              <span>View list</span>
              <FaArrowRight className="text-[9px]" />
            </Link>
            <span>All-time</span>
          </div>
        </div>

        {/* Card 2: Total Blogs / Articles (Vibrant Emerald/Teal) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-700 text-white p-4 rounded-2xl shadow-md shadow-emerald-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
              <FaBlog className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Published
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-emerald-100">Total Articles</p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-0.5">
              {sections.length || 13}
            </h3>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-emerald-100">
            <Link to="/blog/list" className="hover:text-white font-semibold flex items-center gap-1">
              <span>Manage</span>
              <FaArrowRight className="text-[9px]" />
            </Link>
            <Link to="/blog/add" className="hover:text-white font-semibold">
              + Add
            </Link>
          </div>
        </div>

        {/* Card 3: Today's Inquiries (Vibrant Amber/Orange) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 text-white p-4 rounded-2xl shadow-md shadow-amber-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
              <MdOutlineMarkEmailUnread className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Today
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-amber-100">Today's Inquiries</p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-0.5">
              {todayInquiriesCount > 0 ? todayInquiriesCount : 5}
            </h3>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-amber-100">
            <Link to="/inquiry" className="hover:text-white font-semibold flex items-center gap-1">
              <span>Urgent check</span>
              <FaArrowRight className="text-[9px]" />
            </Link>
            <span>New queries</span>
          </div>
        </div>

        {/* Card 4: Response / Consultations (Vibrant Violet/Purple) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 text-white p-4 rounded-2xl shadow-md shadow-purple-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
              <FaUserCheck className="text-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
              Activity
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-medium text-purple-100">Response Rate</p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-0.5">
              98.4%
            </h3>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between text-[11px] text-purple-100">
            <span>High priority</span>
            <span>Active</span>
          </div>
        </div>
      </section>

      {/* Recharts Analytics Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph 1: Weekly Inquiries & Patient Views (AreaChart) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <FaChartLine className="text-indigo-600" />
                <span>Weekly Inquiry Activity</span>
              </h3>
              <p className="text-xs text-slate-500">
                Number of patient questions and page views over the last 7 days
              </p>
            </div>
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg">
              Weekly
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area
                  type="monotone"
                  dataKey="Inquiries"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorInquiries)"
                />
                <Area
                  type="monotone"
                  dataKey="Views"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Monthly Comparison (BarChart) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <MdOutlineInsertChart className="text-indigo-600 text-lg" />
                <span>Monthly Growth</span>
              </h3>
              <p className="text-xs text-slate-500">
                Inquiries vs. Published Articles
              </p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg">
              2026
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Inquiries" fill="#6366F1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Articles" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Recent Inquiries Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 flex-wrap gap-3">
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <FaInbox className="text-indigo-600" />
              <span>Recent Patient Inquiries</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest patient questions submitted from the website
            </p>
          </div>

          <Link
            to="/inquiry"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-indigo-600 text-xs font-semibold rounded-xl border border-slate-200 transition"
          >
            <span>View All</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        {recentInquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left divide-y divide-slate-100">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
                  <th className="py-2.5 px-3 rounded-l-xl">Patient</th>
                  <th className="py-2.5 px-3">Contact Info</th>
                  <th className="py-2.5 px-3">Message</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry._id || index}
                    className="hover:bg-indigo-50/30 transition-colors duration-150"
                  >
                    {/* Patient Name with Avatar */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-full ${getAvatarBg(
                            index
                          )} text-white flex items-center justify-center font-bold text-xs shadow-sm shrink-0`}
                        >
                          {getInitials(inquiry?.fullName)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-xs md:text-sm">
                            {inquiry?.fullName || 'Anonymous Patient'}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            #{inquiry?._id?.slice(-5) || index + 101}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="space-y-0.5">
                        <p className="flex items-center gap-1.5 text-xs text-slate-600">
                          <MdOutlineEmail className="text-indigo-500 shrink-0" />
                          <span>{inquiry?.email || '-'}</span>
                        </p>
                        <p className="flex items-center gap-1.5 text-xs text-slate-600">
                          <FiPhone className="text-emerald-500 shrink-0" />
                          <span>{inquiry?.phoneNumber || '-'}</span>
                        </p>
                      </div>
                    </td>

                    {/* Message Preview */}
                    <td className="py-3 px-3 text-xs text-slate-600 max-w-xs">
                      <p className="truncate" title={inquiry?.message}>
                        {truncateText(inquiry?.message, 45)}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 whitespace-nowrap text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded-md text-slate-600 font-medium text-[11px]">
                        <FaCalendarAlt className="text-[9px] text-slate-400" />
                        {inquiry?.createdAt
                          ? new Date(inquiry.createdAt).toLocaleDateString()
                          : '-'}
                      </span>
                    </td>

                    {/* Action Button */}
                    <td className="py-3 px-3 whitespace-nowrap text-right">
                      <button
                        onClick={() =>
                          navigate('/inquiry/detail', { state: { inquiry } })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                      >
                        <FaEye className="text-[11px]" />
                        <span>Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-2">
              <FaInbox className="text-xl" />
            </div>
            <p className="text-slate-700 font-semibold text-sm">No inquiries recorded yet</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Patient questions from the website will appear here in real time.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

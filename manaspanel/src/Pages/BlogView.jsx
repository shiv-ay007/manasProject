import React, { useEffect } from 'react';
import HomeLayout from '../Component/HomeLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSections, getSections } from '../redux/slices/dynamicSlice';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const BlogView = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sections = [], loading, error } = useSelector((state) => state.dynamic);

  useEffect(() => {
    dispatch(getSections("Blog"));
  }, [dispatch]);

  const handleAddNew = () => {
    navigate('/blog/add', { state: { initialData: {} } });
  };

  const handleEdit = (section) => {
    navigate('/blog/add', {
      state: {
        initialData: {
          title: section?.title,
          content: section?.description,
          category: section?.category || 'Azolla Benefits',
          customField1: section?.customField1 || '',
          attachment: section?.photo?.secure_url || null,
        },
      },
    });
  };

  const truncateDescription = (htmlString, maxLength = 100) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;
    const plainText = tempElement.textContent || tempElement.innerText || '';
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  const renderError = () => {
    if (typeof error === 'string') {
      return <p>Error: {error}</p>;
    }
    if (error && error.message) {
      return <p>Error: {error.message}</p>;
    }
    return <p>An unknown error occurred.</p>;
  };

  const renderSections = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return renderError();
    if (sections.length === 0) return <p>No Data Found</p>;

    return sections.map((section, index) => (
      <tr key={section._id} className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer" >
        <td className="px-4 py-2 border-b text-center">{index + 1}</td>
        <td className="px-4 py-2 border-b">{section.title}</td>
        <td className="px-4 py-2 border-b">{truncateDescription(section.description, 100)}</td>
        <td className="px-4 py-2 border-b text-center">
          {section?.photo ? (
            <img src={section?.photo?.secure_url} alt={section.title} className="w-20 h-20 object-cover mx-auto" />
          ) : (
            <p>No Image</p>
          )}
        </td>
        <td className="px-4 py-2 border-b text-center flex justify-center gap-3">
          <button
            className="bg-[#2F3349] text-white px-3 py-1 rounded hover:bg-[#1a1d2f] transition duration-200 flex items-center"
            onClick={() => handleEdit(section)}
          >
            <FaEdit className="mr-1" />
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 flex items-center"
            onClick={() => handleDelete(section?._id)}
          >
            <MdDelete className="mr-1" />
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const handleDelete = async (id) => {
    const response_ans = window.confirm("Are you sure you want to delete?");
    if (response_ans) {
      const response = await dispatch(deleteSections(id));
      if (response?.payload) {
        dispatch(getSections("Blog"));
      }
    }
  };

  return (
    <HomeLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Content Manager Related To Blogs</h1>
        <div className="flex justify-end mb-4">
          <button
            className="bg-[#2F3349] text-white px-4 py-2 rounded hover:bg-[#2F3349]"
            onClick={handleAddNew}
          >
            + Add New Section
          </button>
        </div>
        <table className="min-w-full bg-white border rounded-lg shadow-md overflow-hidden">
          <thead className="bg-[#2F3349] text-white">
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>{renderSections()}</tbody>
        </table>
      </div>
    </HomeLayout>
  );
};

export default BlogView;

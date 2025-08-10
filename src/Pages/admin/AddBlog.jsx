import React, { useEffect, useRef, useState, useContext } from "react";
import uploadimg from "../../assets/upload_area-Be9Tisqp.svg";
import Quill from "quill";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProviders";
import { parse } from "marked";

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const token = user?.accessToken;

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDetails, setShortDetails] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const blogCategories = [
    "Technology",
    "Business",
    "Lifestyle",
    "Design",
    "Travel",
    "Food & Health",
  ];

  // Image upload function
  const imageUpload = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return data?.data?.display_url;
    } catch (error) {
      console.error(
        "Image upload failed:",
        error.response?.data || error.message
      );
      return null;
    }
  };

  // Form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please upload an image.",
      });
      return;
    }

    const uploadedImageUrl = await imageUpload(image);
    if (!uploadedImageUrl) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image upload failed. Try again.",
      });
      return;
    }

    // Get content from Quill editor
    const blogDescription = quillRef.current.root.innerHTML;

    const newBlog = {
      title,
      shortDetails,
      category,
      blogDetails: blogDescription,
      addedEmail: user?.email,
      addedUser: user?.displayName,
      photo: uploadedImageUrl,
      isPublished,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/add-blog`, newBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Blog added successfully",
          icon: "success",
        });
        navigate("/admin");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add blog",
        });
      });
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3x1 md:w-2xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? uploadimg : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>

        <p className="mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4">Subtitle</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setShortDetails(e.target.value)}
          value={shortDetails}
        />

        <p className="mt-4">Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          name="category"
          className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <p className="mt-4">Blog Description</p>
        <div className="w-full h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
        </div>

        <button
          type="submit"
          className="h-10 px-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm btn mt-5 text-white font-bold"
        >
          {loading ? "Submitting..." : "Add Your Blog"}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;

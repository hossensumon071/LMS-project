import SectionHeader from "@/components/SectionHeader";
import { getCourse } from "@/prisma/courses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CheckOut = ({ course }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    courseTitle: course.title,
    price: course.price,
  });

  useEffect(() => {
    if (session) {
      setFormData(() => ({
        ...prev,
        name: session.user.name,
        email: session.user.email,
      }));
    }
  }, [session]);

  const handleCheckout = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="wrapper py-10 min-h-screen">
      <SectionHeader
        span={"Checkout"}
        h2={"Please provide your details"}
        p={"Fill out this form to contiue checkout"}
      />
      <div className="flex justify-center">
        <form onSubmit={handleCheckout} className="flex flex-col gap-5 mt-10 w-full lg:w-[35rem]">
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="name" className="cursor-pointer">
              Name
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="name"
              placeholder="Sarah"
              value={formData.name}
              readOnly
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="email" className="cursor-pointer">
              Email
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="email"
              id="email"
              placeholder="example@example.com"
              value={formData.email}
              readOnly
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="phone" className="cursor-pointer">
              Phone Number
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="tel"
              id="phone"
              placeholder="+01834xxxxx"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="address" className="cursor-pointer">
              Phone
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="address"
              placeholder="ABC Street, NY"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="courseTitle" className="cursor-pointer">
              Course Title
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="courseTitle"
              placeholder="Advanced Javascript course 2023"
              value={formData.courseTitle}
              readOnly
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="courseTitle" className="cursor-pointer">
              Price (USD)
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="number"
              id="price"
              placeholder="$1000"
              value={formData.price}
              readOnly
            />
          </div>
          <button role="link" type="submit" className="bg-black py-4 rounded-lg text-white hover:bg-gray-700 duration-300 uppercase">
            Proceed to checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;

export const getServerSideProps = async ({ query }) => {
  const course = await getCourse(query.courseId);

  const updatedCourse = {
    ...course,
    updatedAt: course.updatedAt.toString(),
    createdAt: course.createdAt.toString(),
  };

  return {
    props: {
      course: updatedCourse,
    },
  };
};

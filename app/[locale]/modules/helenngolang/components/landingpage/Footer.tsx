import React from 'react';
// import Image from 'next/image';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="h-screen w-full items-center justify-center border-t">
      <div className=" flex pb-[32px] pl-40 pr-40 pt-[48px] ">
        <div className="mx-4">
          <div className="flex gap-2">
            <FaFacebookSquare />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
            <FaTiktok />
          </div>
        </div>
        <div className=" grid w-fit grid-cols-4 gap-4">
          <div className="mx-4">
            <h3 className="text-lg font-bold"> Khoá học online </h3>
            <ul>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                IELTS General Reading
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                IELTS General Writing
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Complete TOEIC
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                IELTS Fundamentals
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                IELTS Intensive Listening
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                IELTS Intensive Reading
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                IELTS Intensive Speaking
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                IELTS Intensive Writing
              </li>
            </ul>
          </div>
          <div className="mx-4">
            <h3 className="text-lg font-bold"> Tài nguyên </h3>
            <ul>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Lịch khai giảng
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Thư viện đề thi
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Bài viết
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Kho tài liệu
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Live class
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Study spaces
              </li>
            </ul>
          </div>
          <div className="mx-4">
            <h3 className=" text-lg font-bold"> Hỗ trợ </h3>
            <ul>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Hướng dẫn sử dụng
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Hướng dẫn mua hàng
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Chăm sóc khách hàng
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Phản hồi khiếu nại
              </li>
            </ul>
          </div>
          <div className="mx-4">
            <h3 className=" text-lg font-bold"> Helen </h3>
            <ul>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Về chúng tôi
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Liên hệ
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Điều khoản bảo mật
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Điều khoản sử dụng
              </li>
              <li className="w-full cursor-pointer  text-gray-700 hover:underline">
                Điều khoản và Điều Kiện Giao Dịch
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

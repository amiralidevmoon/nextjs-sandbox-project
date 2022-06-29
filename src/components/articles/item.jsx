import React from 'react';
import {EyeIcon} from "@heroicons/react/solid";
import DeleteModal from "./deleteModal";

function Item({article}) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition duration-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-center">
                {article.id}
            </th>
            <td className="px-6 py-4 text-center">
                {article.title}
            </td>
            <td className="px-6 py-4 text-center">
                {`${article.description.substring(0, 100)}...`}
            </td>
            <td className="px-6 py-4 text-center">
                {new Date(article.createdAt).toLocaleDateString('fa-IR')}
            </td>
            <td className="px-6 py-4 text-right flex gap-4 text-center ml-6 align-middle">
                <DeleteModal articleId={article.id}/>
                <EyeIcon className='w-5 h-5 text-cyan-500 hover:text-cyan-700 transition duration-200'/>
            </td>
        </tr>
    );
}

export default Item;